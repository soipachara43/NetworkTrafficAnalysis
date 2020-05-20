"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readRulesRoute = void 0;

var _constants = require("../../../../../common/constants");

var _utils = require("./utils");

var _validate = require("./validate");

var _utils2 = require("../utils");

var _read_rules = require("../../rules/read_rules");

var _query_rules_schema = require("../schemas/query_rules_schema");

var _saved_object_mappings = require("../../rules/saved_object_mappings");

var _get_rule_actions_saved_object = require("../../rule_actions/get_rule_actions_saved_object");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const readRulesRoute = router => {
  router.get({
    path: _constants.DETECTION_ENGINE_RULES_URL,
    validate: {
      query: (0, _utils2.buildRouteValidation)(_query_rules_schema.queryRulesSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    var _context$alerting;

    const {
      id,
      rule_id: ruleId
    } = request.query;
    const siemResponse = (0, _utils2.buildSiemResponse)(response);
    const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();
    const savedObjectsClient = context.core.savedObjects.client;

    try {
      if (!alertsClient) {
        return siemResponse.error({
          statusCode: 404
        });
      }

      const rule = await (0, _read_rules.readRules)({
        alertsClient,
        id,
        ruleId
      });

      if (rule != null) {
        const ruleActions = await (0, _get_rule_actions_saved_object.getRuleActionsSavedObject)({
          savedObjectsClient,
          ruleAlertId: rule.id
        });
        const ruleStatuses = await savedObjectsClient.find({
          type: _saved_object_mappings.ruleStatusSavedObjectType,
          perPage: 1,
          sortField: 'statusDate',
          sortOrder: 'desc',
          search: rule.id,
          searchFields: ['alertId']
        });
        const [validated, errors] = (0, _validate.transformValidate)(rule, ruleActions, ruleStatuses.saved_objects[0]);

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

exports.readRulesRoute = readRulesRoute;