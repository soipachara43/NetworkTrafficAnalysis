"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRulesBulkRoute = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _constants = require("../../../../../common/constants");

var _create_rules = require("../../rules/create_rules");

var _read_rules = require("../../rules/read_rules");

var _utils = require("./utils");

var _validate = require("./validate");

var _get_index_exists = require("../../index/get_index_exists");

var _utils2 = require("../utils");

var _create_rules_bulk_schema = require("../schemas/create_rules_bulk_schema");

var _rules_bulk_schema = require("../schemas/response/rules_bulk_schema");

var _update_rules_notifications = require("../../rules/update_rules_notifications");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createRulesBulkRoute = router => {
  router.post({
    path: `${_constants.DETECTION_ENGINE_RULES_URL}/_bulk_create`,
    validate: {
      body: (0, _utils2.buildRouteValidation)(_create_rules_bulk_schema.createRulesBulkSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    var _context$alerting, _context$actions, _context$siem;

    const siemResponse = (0, _utils2.buildSiemResponse)(response);
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

    const ruleDefinitions = request.body;
    const dupes = (0, _utils.getDuplicates)(ruleDefinitions, 'rule_id');
    const rules = await Promise.all(ruleDefinitions.filter(rule => rule.rule_id == null || !dupes.includes(rule.rule_id)).map(async payloadRule => {
      const {
        actions,
        anomaly_threshold: anomalyThreshold,
        description,
        enabled,
        false_positives: falsePositives,
        from,
        query,
        language,
        machine_learning_job_id: machineLearningJobId,
        output_index: outputIndex,
        saved_id: savedId,
        meta,
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
        timeline_id: timelineId,
        timeline_title: timelineTitle,
        version,
        lists
      } = payloadRule;
      const ruleIdOrUuid = ruleId !== null && ruleId !== void 0 ? ruleId : _uuid.default.v4();

      try {
        (0, _utils2.validateLicenseForRuleType)({
          license: context.licensing.license,
          ruleType: type
        });
        const finalIndex = outputIndex !== null && outputIndex !== void 0 ? outputIndex : siemClient.signalsIndex;
        const indexExists = await (0, _get_index_exists.getIndexExists)(clusterClient.callAsCurrentUser, finalIndex);

        if (!indexExists) {
          return (0, _utils2.createBulkErrorObject)({
            ruleId: ruleIdOrUuid,
            statusCode: 400,
            message: `To create a rule, the index must exist first. Index ${finalIndex} does not exist`
          });
        }

        if (ruleId != null) {
          const rule = await (0, _read_rules.readRules)({
            alertsClient,
            ruleId
          });

          if (rule != null) {
            return (0, _utils2.createBulkErrorObject)({
              ruleId,
              statusCode: 409,
              message: `rule_id: "${ruleId}" already exists`
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
          machineLearningJobId,
          outputIndex: finalIndex,
          savedId,
          timelineId,
          timelineTitle,
          meta,
          filters,
          ruleId: ruleIdOrUuid,
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
          version,
          lists,
          actions: throttle === 'rule' ? actions : [] // Only enable actions if throttle is set to rule, otherwise we are a notification and should not enable it,

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
        return (0, _validate.transformValidateBulkError)(ruleIdOrUuid, createdRule, ruleActions);
      } catch (err) {
        return (0, _utils2.transformBulkError)(ruleIdOrUuid, err);
      }
    }));
    const rulesBulk = [...rules, ...dupes.map(ruleId => (0, _utils2.createBulkErrorObject)({
      ruleId,
      statusCode: 409,
      message: `rule_id: "${ruleId}" already exists`
    }))];
    const [validated, errors] = (0, _validate.validate)(rulesBulk, _rules_bulk_schema.rulesBulkSchema);

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
  });
};

exports.createRulesBulkRoute = createRulesBulkRoute;