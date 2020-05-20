"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRulesRoute = void 0;

var _constants = require("../../../../../common/constants");

var _delete_rules = require("../../rules/delete_rules");

var _query_rules_schema = require("../schemas/query_rules_schema");

var _utils = require("./utils");

var _validate = require("./validate");

var _utils2 = require("../utils");

var _saved_object_mappings = require("../../rules/saved_object_mappings");

var _delete_notifications = require("../../notifications/delete_notifications");

var _delete_rule_actions_saved_object = require("../../rule_actions/delete_rule_actions_saved_object");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const deleteRulesRoute = router => {
  router.delete({
    path: _constants.DETECTION_ENGINE_RULES_URL,
    validate: {
      query: (0, _utils2.buildRouteValidation)(_query_rules_schema.queryRulesSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    const siemResponse = (0, _utils2.buildSiemResponse)(response);

    try {
      var _context$alerting, _context$actions;

      const {
        id,
        rule_id: ruleId
      } = request.query;
      const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();
      const actionsClient = (_context$actions = context.actions) === null || _context$actions === void 0 ? void 0 : _context$actions.getActionsClient();
      const savedObjectsClient = context.core.savedObjects.client;

      if (!actionsClient || !alertsClient) {
        return siemResponse.error({
          statusCode: 404
        });
      }

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
        const [validated, errors] = (0, _validate.transformValidate)(rule, undefined, ruleStatuses.saved_objects[0]);

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
      } else {
        const error = (0, _utils.getIdError)({
          id,
          ruleId
        });
        return siemResponse.error({
          body: error.message,
          statusCode: error.statusCode
        });
      }
    } catch (err) {
      const error = (0, _utils2.transformError)(err);
      return siemResponse.error({
        body: error.message,
        statusCode: error.statusCode
      });
    }
  });
};

exports.deleteRulesRoute = deleteRulesRoute;