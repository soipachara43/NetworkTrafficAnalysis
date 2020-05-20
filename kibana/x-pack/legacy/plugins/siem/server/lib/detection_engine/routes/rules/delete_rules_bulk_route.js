"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRulesBulkRoute = void 0;

var _constants = require("../../../../../common/constants");

var _query_rules_bulk_schema = require("../schemas/query_rules_bulk_schema");

var _rules_bulk_schema = require("../schemas/response/rules_bulk_schema");

var _utils = require("./utils");

var _validate = require("./validate");

var _utils2 = require("../utils");

var _delete_rules = require("../../rules/delete_rules");

var _delete_notifications = require("../../notifications/delete_notifications");

var _saved_object_mappings = require("../../rules/saved_object_mappings");

var _delete_rule_actions_saved_object = require("../../rule_actions/delete_rule_actions_saved_object");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const deleteRulesBulkRoute = router => {
  const config = {
    validate: {
      body: (0, _utils2.buildRouteValidation)(_query_rules_bulk_schema.queryRulesBulkSchema)
    },
    path: `${_constants.DETECTION_ENGINE_RULES_URL}/_bulk_delete`,
    options: {
      tags: ['access:siem']
    }
  };

  const handler = async (context, request, response) => {
    var _context$alerting, _context$actions;

    const siemResponse = (0, _utils2.buildSiemResponse)(response);
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
        id,
        rule_id: ruleId
      } = payloadRule;
      const idOrRuleIdOrUnknown = (_ref = id !== null && id !== void 0 ? id : ruleId) !== null && _ref !== void 0 ? _ref : '(unknown id)';

      try {
        const rule = await (0, _delete_rules.deleteRules)({
          actionsClient,
          alertsClient,
          id,
          ruleId
        });

        if (rule != null) {
          await (0, _delete_notifications.deleteNotifications)({
            alertsClient,
            ruleAlertId: rule.id
          });
          await (0, _delete_rule_actions_saved_object.deleteRuleActionsSavedObject)({
            ruleAlertId: rule.id,
            savedObjectsClient
          });
          const ruleStatuses = await savedObjectsClient.find({
            type: _saved_object_mappings.ruleStatusSavedObjectType,
            perPage: 6,
            search: rule.id,
            searchFields: ['alertId']
          });
          ruleStatuses.saved_objects.forEach(async obj => savedObjectsClient.delete(_saved_object_mappings.ruleStatusSavedObjectType, obj.id));
          return (0, _validate.transformValidateBulkError)(idOrRuleIdOrUnknown, rule, undefined, ruleStatuses);
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
  };

  router.delete(config, handler);
  router.post(config, handler);
};

exports.deleteRulesBulkRoute = deleteRulesBulkRoute;