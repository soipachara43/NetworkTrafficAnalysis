"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRulesRoute = void 0;

var _constants = require("../../../../../common/constants");

var _find_rules = require("../../rules/find_rules");

var _find_rules_schema = require("../schemas/find_rules_schema");

var _validate = require("./validate");

var _utils = require("../utils");

var _saved_object_mappings = require("../../rules/saved_object_mappings");

var _get_rule_actions_saved_object = require("../../rule_actions/get_rule_actions_saved_object");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const findRulesRoute = router => {
  router.get({
    path: `${_constants.DETECTION_ENGINE_RULES_URL}/_find`,
    validate: {
      query: (0, _utils.buildRouteValidation)(_find_rules_schema.findRulesSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    const siemResponse = (0, _utils.buildSiemResponse)(response);

    try {
      var _context$alerting;

      const {
        query
      } = request;
      const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();
      const savedObjectsClient = context.core.savedObjects.client;

      if (!alertsClient) {
        return siemResponse.error({
          statusCode: 404
        });
      }

      const rules = await (0, _find_rules.findRules)({
        alertsClient,
        perPage: query.per_page,
        page: query.page,
        sortField: query.sort_field,
        sortOrder: query.sort_order,
        filter: query.filter
      });
      const ruleStatuses = await Promise.all(rules.data.map(async rule => {
        const results = await savedObjectsClient.find({
          type: _saved_object_mappings.ruleStatusSavedObjectType,
          perPage: 1,
          sortField: 'statusDate',
          sortOrder: 'desc',
          search: rule.id,
          searchFields: ['alertId']
        });
        return results;
      }));
      const ruleActions = await Promise.all(rules.data.map(async rule => {
        const results = await (0, _get_rule_actions_saved_object.getRuleActionsSavedObject)({
          savedObjectsClient,
          ruleAlertId: rule.id
        });
        return results;
      }));
      const [validated, errors] = (0, _validate.transformValidateFindAlerts)(rules, ruleActions, ruleStatuses);

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

exports.findRulesRoute = findRulesRoute;