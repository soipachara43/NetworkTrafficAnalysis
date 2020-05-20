"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRulesBulkRoute = void 0;

var _constants = require("../../../../../common/constants");

var _utils = require("./utils");

var _validate = require("./validate");

var _utils2 = require("../utils");

var _update_rules_bulk_schema = require("../schemas/update_rules_bulk_schema");

var _saved_object_mappings = require("../../rules/saved_object_mappings");

var _update_rules = require("../../rules/update_rules");

var _rules_bulk_schema = require("../schemas/response/rules_bulk_schema");

var _update_rules_notifications = require("../../rules/update_rules_notifications");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const updateRulesBulkRoute = router => {
  router.put({
    path: `${_constants.DETECTION_ENGINE_RULES_URL}/_bulk_update`,
    validate: {
      body: (0, _utils2.buildRouteValidation)(_update_rules_bulk_schema.updateRulesBulkSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    var _context$alerting, _context$actions, _context$siem;

    const siemResponse = (0, _utils2.buildSiemResponse)(response);
    const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();
    const actionsClient = (_context$actions = context.actions) === null || _context$actions === void 0 ? void 0 : _context$actions.getActionsClient();
    const savedObjectsClient = context.core.savedObjects.client;
    const siemClient = (_context$siem = context.siem) === null || _context$siem === void 0 ? void 0 : _context$siem.getSiemClient();

    if (!siemClient || !actionsClient || !alertsClient) {
      return siemResponse.error({
        statusCode: 404
      });
    }

    const rules = await Promise.all(request.body.map(async payloadRule => {
      var _ref;

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
        timeline_id: timelineId,
        timeline_title: timelineTitle,
        meta,
        filters,
        rule_id: ruleId,
        id,
        index,
        interval,
        max_signals: maxSignals,
        risk_score: riskScore,
        name,
        severity,
        tags,
        to,
        type,
        threat,
        throttle,
        references,
        note,
        version,
        lists
      } = payloadRule;
      const finalIndex = outputIndex !== null && outputIndex !== void 0 ? outputIndex : siemClient.signalsIndex;
      const idOrRuleIdOrUnknown = (_ref = id !== null && id !== void 0 ? id : ruleId) !== null && _ref !== void 0 ? _ref : '(unknown id)';

      try {
        (0, _utils2.validateLicenseForRuleType)({
          license: context.licensing.license,
          ruleType: type
        });
        const rule = await (0, _update_rules.updateRules)({
          alertsClient,
          actionsClient,
          anomalyThreshold,
          description,
          enabled,
          falsePositives,
          from,
          query,
          language,
          machineLearningJobId,
          outputIndex: finalIndex,
          savedId,
          savedObjectsClient,
          timelineId,
          timelineTitle,
          meta,
          filters,
          id,
          ruleId,
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
          actions
        });

        if (rule != null) {
          const ruleActions = await (0, _update_rules_notifications.updateRulesNotifications)({
            ruleAlertId: rule.id,
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
            search: rule.id,
            searchFields: ['alertId']
          });
          return (0, _validate.transformValidateBulkError)(rule.id, rule, ruleActions, ruleStatuses.saved_objects[0]);
        } else {
          return (0, _utils.getIdBulkError)({
            id,
            ruleId
          });
        }
      } catch (err) {
        return (0, _utils2.transformBulkError)(idOrRuleIdOrUnknown, err);
      }
    }));
    const [validated, errors] = (0, _validate.validate)(rules, _rules_bulk_schema.rulesBulkSchema);

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

exports.updateRulesBulkRoute = updateRulesBulkRoute;