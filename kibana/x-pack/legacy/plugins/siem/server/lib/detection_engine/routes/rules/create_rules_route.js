"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRulesRoute = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _constants = require("../../../../../common/constants");

var _create_rules = require("../../rules/create_rules");

var _read_rules = require("../../rules/read_rules");

var _saved_object_mappings = require("../../rules/saved_object_mappings");

var _validate = require("./validate");

var _get_index_exists = require("../../index/get_index_exists");

var _create_rules_schema = require("../schemas/create_rules_schema");

var _utils = require("../utils");

var _update_rules_notifications = require("../../rules/update_rules_notifications");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createRulesRoute = router => {
  router.post({
    path: _constants.DETECTION_ENGINE_RULES_URL,
    validate: {
      body: (0, _utils.buildRouteValidation)(_create_rules_schema.createRulesSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    const {
      actions,
      anomaly_threshold: anomalyThreshold,
      description,
      enabled,
      false_positives: falsePositives,
      from,
      query,
      language,
      output_index: outputIndex,
      saved_id: savedId,
      timeline_id: timelineId,
      timeline_title: timelineTitle,
      meta,
      machine_learning_job_id: machineLearningJobId,
      filters,
      rule_id: ruleId,
      index,
      interval,
      max_signals: maxSignals,
      risk_score: riskScore,
      name,
      severity,
      tags,
      threat,
      throttle,
      to,
      type,
      references,
      note,
      lists
    } = request.body;
    const siemResponse = (0, _utils.buildSiemResponse)(response);

    try {
      var _context$alerting, _context$actions, _context$siem;

      (0, _utils.validateLicenseForRuleType)({
        license: context.licensing.license,
        ruleType: type
      });
      const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();
      const actionsClient = (_context$actions = context.actions) === null || _context$actions === void 0 ? void 0 : _context$actions.getActionsClient();
      const clusterClient = context.core.elasticsearch.dataClient;
      const savedObjectsClient = context.core.savedObjects.client;
      const siemClient = (_context$siem = context.siem) === null || _context$siem === void 0 ? void 0 : _context$siem.getSiemClient();

      if (!siemClient || !actionsClient || !alertsClient) {
        return siemResponse.error({
          statusCode: 404
        });
      }

      const finalIndex = outputIndex !== null && outputIndex !== void 0 ? outputIndex : siemClient.signalsIndex;
      const indexExists = await (0, _get_index_exists.getIndexExists)(clusterClient.callAsCurrentUser, finalIndex);

      if (!indexExists) {
        return siemResponse.error({
          statusCode: 400,
          body: `To create a rule, the index must exist first. Index ${finalIndex} does not exist`
        });
      }

      if (ruleId != null) {
        const rule = await (0, _read_rules.readRules)({
          alertsClient,
          ruleId
        });

        if (rule != null) {
          return siemResponse.error({
            statusCode: 409,
            body: `rule_id: "${ruleId}" already exists`
          });
        }
      }

      const createdRule = await (0, _create_rules.createRules)({
        alertsClient,
        actionsClient,
        anomalyThreshold,
        description,
        enabled,
        falsePositives,
        from,
        immutable: false,
        query,
        language,
        outputIndex: finalIndex,
        savedId,
        timelineId,
        timelineTitle,
        meta,
        machineLearningJobId,
        filters,
        ruleId: ruleId !== null && ruleId !== void 0 ? ruleId : _uuid.default.v4(),
        index,
        interval,
        maxSignals,
        riskScore,
        name,
        severity,
        tags,
        to,
        type,
        threat,
        references,
        note,
        version: 1,
        lists,
        actions: throttle === 'rule' ? actions : [] // Only enable actions if throttle is rule, otherwise we are a notification and should not enable it,

      });
      const ruleActions = await (0, _update_rules_notifications.updateRulesNotifications)({
        ruleAlertId: createdRule.id,
        alertsClient,
        savedObjectsClient,
        enabled,
        actions,
        throttle,
        name
      });
      const ruleStatuses = await savedObjectsClient.find({
        type: _saved_object_mappings.ruleStatusSavedObjectType,
        perPage: 1,
        sortField: 'statusDate',
        sortOrder: 'desc',
        search: `${createdRule.id}`,
        searchFields: ['alertId']
      });
      const [validated, errors] = (0, _validate.transformValidate)(createdRule, ruleActions, ruleStatuses.saved_objects[0]);

      if (errors != null) {
        return siemResponse.error({
          statusCode: 500,
          body: errors
        });
      } else {
        return response.ok({
          body: validated !== null && validated !== void 0 ? validated : {}
        });
      }
    } catch (err) {
      const error = (0, _utils.transformError)(err);
      return siemResponse.error({
        body: error.message,
        statusCode: error.statusCode
      });
    }
  });
};

exports.createRulesRoute = createRulesRoute;