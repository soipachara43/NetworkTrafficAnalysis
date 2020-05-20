"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchRulesBulkRoute = void 0;

var _constants = require("../../../../../common/constants");

var _utils = require("../utils");

var _utils2 = require("./utils");

var _validate = require("./validate");

var _patch_rules_bulk_schema = require("../schemas/patch_rules_bulk_schema");

var _rules_bulk_schema = require("../schemas/response/rules_bulk_schema");

var _patch_rules = require("../../rules/patch_rules");

var _saved_object_mappings = require("../../rules/saved_object_mappings");

var _update_rules_notifications = require("../../rules/update_rules_notifications");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const patchRulesBulkRoute = router => {
  router.patch({
    path: `${_constants.DETECTION_ENGINE_RULES_URL}/_bulk_update`,
    validate: {
      body: (0, _utils.buildRouteValidation)(_patch_rules_bulk_schema.patchRulesBulkSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    var _context$alerting, _context$actions;

    const siemResponse = (0, _utils.buildSiemResponse)(response);
    const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();
    const actionsClient = (_context$actions = context.actions) === null || _context$actions === void 0 ? void 0 : _context$actions.getActionsClient();
    const savedObjectsClient = context.core.savedObjects.client;

    if (!actionsClient || !alertsClient) {
      return siemResponse.error({
        statusCode: 404
      });
    }

    const rules = await Promise.all(request.body.map(async payloadRule => {
      var _ref;

      const {
        actions,
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
        anomaly_threshold: anomalyThreshold,
        machine_learning_job_id: machineLearningJobId
      } = payloadRule;
      const idOrRuleIdOrUnknown = (_ref = id !== null && id !== void 0 ? id : ruleId) !== null && _ref !== void 0 ? _ref : '(unknown id)';

      try {
        if (type) {
          (0, _utils.validateLicenseForRuleType)({
            license: context.licensing.license,
            ruleType: type
          });
        }

        const rule = await (0, _patch_rules.patchRules)({
          alertsClient,
          actionsClient,
          description,
          enabled,
          falsePositives,
          from,
          query,
          language,
          outputIndex,
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
          anomalyThreshold,
          machineLearningJobId
        });

        if (rule != null && rule.enabled != null && rule.name != null) {
          const ruleActions = await (0, _update_rules_notifications.updateRulesNotifications)({
            ruleAlertId: rule.id,
            alertsClient,
            savedObjectsClient,
            enabled: rule.enabled,
            actions,
            throttle,
            name: rule.name
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
          return (0, _utils2.getIdBulkError)({
            id,
            ruleId
          });
        }
      } catch (err) {
        return (0, _utils.transformBulkError)(idOrRuleIdOrUnknown, err);
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

exports.patchRulesBulkRoute = patchRulesBulkRoute;