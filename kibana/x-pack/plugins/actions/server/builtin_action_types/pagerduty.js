"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _configSchema = require("@kbn/config-schema");

var _post_pagerduty = require("./lib/post_pagerduty");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// uses the PagerDuty Events API v2
// https://v2.developer.pagerduty.com/docs/events-api-v2
const PAGER_DUTY_API_URL = 'https://events.pagerduty.com/v2/enqueue'; // config definition

const configSchemaProps = {
  apiUrl: _configSchema.schema.nullable(_configSchema.schema.string())
};

const ConfigSchema = _configSchema.schema.object(configSchemaProps); // secrets definition


const SecretsSchema = _configSchema.schema.object({
  routingKey: _configSchema.schema.string()
}); // params definition


const EVENT_ACTION_TRIGGER = 'trigger';
const EVENT_ACTION_RESOLVE = 'resolve';
const EVENT_ACTION_ACKNOWLEDGE = 'acknowledge';

const EventActionSchema = _configSchema.schema.oneOf([_configSchema.schema.literal(EVENT_ACTION_TRIGGER), _configSchema.schema.literal(EVENT_ACTION_RESOLVE), _configSchema.schema.literal(EVENT_ACTION_ACKNOWLEDGE)]);

const PayloadSeveritySchema = _configSchema.schema.oneOf([_configSchema.schema.literal('critical'), _configSchema.schema.literal('error'), _configSchema.schema.literal('warning'), _configSchema.schema.literal('info')]);

const ParamsSchema = _configSchema.schema.object({
  eventAction: _configSchema.schema.maybe(EventActionSchema),
  dedupKey: _configSchema.schema.maybe(_configSchema.schema.string({
    maxLength: 255
  })),
  summary: _configSchema.schema.maybe(_configSchema.schema.string({
    maxLength: 1024
  })),
  source: _configSchema.schema.maybe(_configSchema.schema.string()),
  severity: _configSchema.schema.maybe(PayloadSeveritySchema),
  timestamp: _configSchema.schema.maybe(_configSchema.schema.string()),
  component: _configSchema.schema.maybe(_configSchema.schema.string()),
  group: _configSchema.schema.maybe(_configSchema.schema.string()),
  class: _configSchema.schema.maybe(_configSchema.schema.string())
}, {
  validate: validateParams
});

function validateParams(paramsObject) {
  const params = paramsObject;
  const {
    timestamp
  } = params;

  if (timestamp != null) {
    let date;

    try {
      date = Date.parse(timestamp);
    } catch (err) {
      return 'error parsing timestamp: ${err.message}';
    }

    if (isNaN(date)) {
      return 'error parsing timestamp';
    }
  }
} // action type definition


function getActionType({
  logger,
  configurationUtilities
}) {
  return {
    id: '.pagerduty',
    minimumLicenseRequired: 'gold',
    name: _i18n.i18n.translate('xpack.actions.builtin.pagerdutyTitle', {
      defaultMessage: 'PagerDuty'
    }),
    validate: {
      config: _configSchema.schema.object(configSchemaProps, {
        validate: (0, _lodash.curry)(valdiateActionTypeConfig)(configurationUtilities)
      }),
      secrets: SecretsSchema,
      params: ParamsSchema
    },
    executor: (0, _lodash.curry)(executor)({
      logger
    })
  };
}

function valdiateActionTypeConfig(configurationUtilities, configObject) {
  try {
    configurationUtilities.ensureWhitelistedUri(getPagerDutyApiUrl(configObject));
  } catch (whitelistError) {
    return _i18n.i18n.translate('xpack.actions.builtin.pagerduty.pagerdutyConfigurationError', {
      defaultMessage: 'error configuring pagerduty action: {message}',
      values: {
        message: whitelistError.message
      }
    });
  }
}

function getPagerDutyApiUrl(config) {
  return config.apiUrl || PAGER_DUTY_API_URL;
} // action executor


async function executor({
  logger
}, execOptions) {
  const actionId = execOptions.actionId;
  const config = execOptions.config;
  const secrets = execOptions.secrets;
  const params = execOptions.params;
  const services = execOptions.services;
  const apiUrl = getPagerDutyApiUrl(config);
  const headers = {
    'Content-Type': 'application/json',
    'X-Routing-Key': secrets.routingKey
  };
  const data = getBodyForEventAction(actionId, params);
  let response;

  try {
    response = await (0, _post_pagerduty.postPagerduty)({
      apiUrl,
      data,
      headers,
      services
    });
  } catch (err) {
    const message = _i18n.i18n.translate('xpack.actions.builtin.pagerduty.postingErrorMessage', {
      defaultMessage: 'error posting pagerduty event'
    });

    logger.warn(`error thrown posting pagerduty event: ${err.message}`);
    return {
      status: 'error',
      actionId,
      message,
      serviceMessage: err.message
    };
  }

  logger.debug(`response posting pagerduty event: ${response.status}`);

  if (response.status === 202) {
    return {
      status: 'ok',
      actionId,
      data: response.data
    };
  }

  if (response.status === 429 || response.status >= 500) {
    const message = _i18n.i18n.translate('xpack.actions.builtin.pagerduty.postingRetryErrorMessage', {
      defaultMessage: 'error posting pagerduty event: http status {status}, retry later',
      values: {
        status: response.status
      }
    });

    return {
      status: 'error',
      actionId,
      message,
      retry: true
    };
  }

  const message = _i18n.i18n.translate('xpack.actions.builtin.pagerduty.postingUnexpectedErrorMessage', {
    defaultMessage: 'error posting pagerduty event: unexpected status {status}',
    values: {
      status: response.status
    }
  });

  return {
    status: 'error',
    actionId,
    message
  };
} // utilities


const AcknowledgeOrResolve = new Set([EVENT_ACTION_ACKNOWLEDGE, EVENT_ACTION_RESOLVE]);

function getBodyForEventAction(actionId, params) {
  const eventAction = params.eventAction || EVENT_ACTION_TRIGGER;
  const dedupKey = params.dedupKey || `action:${actionId}`;
  const data = {
    event_action: eventAction,
    dedup_key: dedupKey
  }; // for acknowledge / resolve, just send the dedup key

  if (AcknowledgeOrResolve.has(eventAction)) {
    return data;
  }

  data.payload = {
    summary: params.summary || 'No summary provided.',
    source: params.source || `Kibana Action ${actionId}`,
    severity: params.severity || 'info'
  };
  if (params.timestamp != null) data.payload.timestamp = params.timestamp;
  if (params.component != null) data.payload.component = params.component;
  if (params.group != null) data.payload.group = params.group;
  if (params.class != null) data.payload.class = params.class;
  return data;
}