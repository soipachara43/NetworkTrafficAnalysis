"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTupleDuplicateErrorsAndUniqueRules = exports.getDuplicates = exports.transformOrImportError = exports.transformOrBulkError = exports.transform = exports.transformFindAlerts = exports.transformAlertsToRules = exports.transformDataToNdjson = exports.transformAlertToRule = exports.transformTags = exports.getIdBulkError = exports.getIdError = void 0;

var _fp = require("lodash/fp");

var _uuid = _interopRequireDefault(require("uuid"));

var _constants = require("../../../../../common/constants");

var _types = require("../../rules/types");

var _utils = require("../utils");

var _feature_flags = require("../../feature_flags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getIdError = ({
  id,
  ruleId
}) => {
  if (id != null) {
    return {
      message: `id: "${id}" not found`,
      statusCode: 404
    };
  } else if (ruleId != null) {
    return {
      message: `rule_id: "${ruleId}" not found`,
      statusCode: 404
    };
  } else {
    return {
      message: 'id or rule_id should have been defined',
      statusCode: 404
    };
  }
};

exports.getIdError = getIdError;

const getIdBulkError = ({
  id,
  ruleId
}) => {
  if (id != null && ruleId != null) {
    return (0, _utils.createBulkErrorObject)({
      id,
      ruleId,
      statusCode: 404,
      message: `id: "${id}" and rule_id: "${ruleId}" not found`
    });
  } else if (id != null) {
    return (0, _utils.createBulkErrorObject)({
      id,
      statusCode: 404,
      message: `id: "${id}" not found`
    });
  } else if (ruleId != null) {
    return (0, _utils.createBulkErrorObject)({
      ruleId,
      statusCode: 404,
      message: `rule_id: "${ruleId}" not found`
    });
  } else {
    return (0, _utils.createBulkErrorObject)({
      statusCode: 404,
      message: `id or rule_id should have been defined`
    });
  }
};

exports.getIdBulkError = getIdBulkError;

const transformTags = tags => {
  return tags.filter(tag => !tag.startsWith(_constants.INTERNAL_IDENTIFIER));
}; // Transforms the data but will remove any null or undefined it encounters and not include
// those on the export


exports.transformTags = transformTags;

const transformAlertToRule = (alert, ruleActions, ruleStatus) => {
  var _ref;

  return (0, _fp.pickBy)(value => value != null, {
    actions: (_ref = ruleActions === null || ruleActions === void 0 ? void 0 : ruleActions.actions) !== null && _ref !== void 0 ? _ref : [],
    created_at: alert.createdAt.toISOString(),
    updated_at: alert.updatedAt.toISOString(),
    created_by: alert.createdBy,
    description: alert.params.description,
    enabled: alert.enabled,
    anomaly_threshold: alert.params.anomalyThreshold,
    false_positives: alert.params.falsePositives,
    filters: alert.params.filters,
    from: alert.params.from,
    id: alert.id,
    immutable: alert.params.immutable,
    index: alert.params.index,
    interval: alert.schedule.interval,
    rule_id: alert.params.ruleId,
    language: alert.params.language,
    output_index: alert.params.outputIndex,
    max_signals: alert.params.maxSignals,
    machine_learning_job_id: alert.params.machineLearningJobId,
    risk_score: alert.params.riskScore,
    name: alert.name,
    query: alert.params.query,
    references: alert.params.references,
    saved_id: alert.params.savedId,
    timeline_id: alert.params.timelineId,
    timeline_title: alert.params.timelineTitle,
    meta: alert.params.meta,
    severity: alert.params.severity,
    updated_by: alert.updatedBy,
    tags: transformTags(alert.tags),
    to: alert.params.to,
    type: alert.params.type,
    threat: alert.params.threat,
    throttle: (ruleActions === null || ruleActions === void 0 ? void 0 : ruleActions.ruleThrottle) || 'no_actions',
    note: alert.params.note,
    version: alert.params.version,
    status: ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.attributes.status,
    status_date: ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.attributes.statusDate,
    last_failure_at: ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.attributes.lastFailureAt,
    last_success_at: ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.attributes.lastSuccessAt,
    last_failure_message: ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.attributes.lastFailureMessage,
    last_success_message: ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.attributes.lastSuccessMessage,
    // TODO: (LIST-FEATURE) Remove hasListsFeature() check once we have lists available for a release
    lists: (0, _feature_flags.hasListsFeature)() ? alert.params.lists : null
  });
};

exports.transformAlertToRule = transformAlertToRule;

const transformDataToNdjson = data => {
  if (data.length !== 0) {
    const dataString = data.map(rule => JSON.stringify(rule)).join('\n');
    return `${dataString}\n`;
  } else {
    return '';
  }
};

exports.transformDataToNdjson = transformDataToNdjson;

const transformAlertsToRules = alerts => {
  return alerts.map(alert => transformAlertToRule(alert));
};

exports.transformAlertsToRules = transformAlertsToRules;

const transformFindAlerts = (findResults, ruleActions, ruleStatuses) => {
  if (!ruleStatuses && (0, _types.isAlertTypes)(findResults.data)) {
    return {
      page: findResults.page,
      perPage: findResults.perPage,
      total: findResults.total,
      data: findResults.data.map((alert, idx) => transformAlertToRule(alert, ruleActions[idx]))
    };
  } else if ((0, _types.isAlertTypes)(findResults.data) && (0, _types.isRuleStatusFindTypes)(ruleStatuses)) {
    return {
      page: findResults.page,
      perPage: findResults.perPage,
      total: findResults.total,
      data: findResults.data.map((alert, idx) => transformAlertToRule(alert, ruleActions[idx], ruleStatuses[idx].saved_objects[0]))
    };
  } else {
    return null;
  }
};

exports.transformFindAlerts = transformFindAlerts;

const transform = (alert, ruleActions, ruleStatus) => {
  if ((0, _types.isAlertType)(alert)) {
    return transformAlertToRule(alert, ruleActions, (0, _types.isRuleStatusSavedObjectType)(ruleStatus) ? ruleStatus : undefined);
  }

  return null;
};

exports.transform = transform;

const transformOrBulkError = (ruleId, alert, ruleActions, ruleStatus) => {
  if ((0, _types.isAlertType)(alert)) {
    if ((0, _types.isRuleStatusFindType)(ruleStatus) && (ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.saved_objects.length) > 0) {
      var _ref2;

      return transformAlertToRule(alert, ruleActions, (_ref2 = ruleStatus === null || ruleStatus === void 0 ? void 0 : ruleStatus.saved_objects[0]) !== null && _ref2 !== void 0 ? _ref2 : ruleStatus);
    } else {
      return transformAlertToRule(alert, ruleActions);
    }
  } else {
    return (0, _utils.createBulkErrorObject)({
      ruleId,
      statusCode: 500,
      message: 'Internal error transforming'
    });
  }
};

exports.transformOrBulkError = transformOrBulkError;

const transformOrImportError = (ruleId, alert, existingImportSuccessError) => {
  if ((0, _types.isAlertType)(alert)) {
    return (0, _utils.createSuccessObject)(existingImportSuccessError);
  } else {
    return (0, _utils.createImportErrorObject)({
      ruleId,
      statusCode: 500,
      message: 'Internal error transforming',
      existingImportSuccessError
    });
  }
};

exports.transformOrImportError = transformOrImportError;

const getDuplicates = (ruleDefinitions, by) => {
  const mappedDuplicates = (0, _fp.countBy)(by, ruleDefinitions.filter(r => r[by] != null));
  const hasDuplicates = Object.values(mappedDuplicates).some(i => i > 1);

  if (hasDuplicates) {
    return Object.keys(mappedDuplicates).filter(key => mappedDuplicates[key] > 1);
  }

  return [];
};

exports.getDuplicates = getDuplicates;

const getTupleDuplicateErrorsAndUniqueRules = (rules, isOverwrite) => {
  const {
    errors,
    rulesAcc
  } = rules.reduce((acc, parsedRule) => {
    if (parsedRule instanceof Error) {
      acc.rulesAcc.set(_uuid.default.v4(), parsedRule);
    } else {
      const {
        rule_id: ruleId
      } = parsedRule;

      if (ruleId != null) {
        if (acc.rulesAcc.has(ruleId) && !isOverwrite) {
          acc.errors.set(_uuid.default.v4(), (0, _utils.createBulkErrorObject)({
            ruleId,
            statusCode: 400,
            message: `More than one rule with rule-id: "${ruleId}" found`
          }));
        }

        acc.rulesAcc.set(ruleId, parsedRule);
      } else {
        acc.rulesAcc.set(_uuid.default.v4(), parsedRule);
      }
    }

    return acc;
  }, // using map (preserves ordering)
  {
    errors: new Map(),
    rulesAcc: new Map()
  });
  return [Array.from(errors.values()), Array.from(rulesAcc.values())];
};

exports.getTupleDuplicateErrorsAndUniqueRules = getTupleDuplicateErrorsAndUniqueRules;