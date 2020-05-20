"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRulesStatusesRoute = void 0;

var _constants = require("../../../../../common/constants");

var _find_rules_statuses_schema = require("../schemas/find_rules_statuses_schema");

var _saved_object_mappings = require("../../rules/saved_object_mappings");

var _utils = require("../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const findRulesStatusesRoute = router => {
  router.get({
    path: `${_constants.DETECTION_ENGINE_RULES_URL}/_find_statuses`,
    validate: {
      query: (0, _utils.buildRouteValidation)(_find_rules_statuses_schema.findRulesStatusesSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    var _context$alerting;

    const {
      query
    } = request;
    const siemResponse = (0, _utils.buildSiemResponse)(response);
    const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();
    const savedObjectsClient = context.core.savedObjects.client;

    if (!alertsClient) {
      return siemResponse.error({
        statusCode: 404
      });
    } // build return object with ids as keys and errors as values.

    /* looks like this
      {
          "someAlertId": [{"myerrorobject": "some error value"}, etc..],
          "anotherAlertId": ...
      }
    */


    try {
      const statuses = await query.ids.reduce(async (acc, id) => {
        var _lastFiveErrorsForId$;

        const lastFiveErrorsForId = await savedObjectsClient.find({
          type: _saved_object_mappings.ruleStatusSavedObjectType,
          perPage: 6,
          sortField: 'statusDate',
          sortOrder: 'desc',
          search: id,
          searchFields: ['alertId']
        });
        const accumulated = await acc; // Array accessors can result in undefined but
        // this is not represented in typescript for some reason,
        // https://github.com/Microsoft/TypeScript/issues/11122

        const currentStatus = (0, _utils.convertToSnakeCase)((_lastFiveErrorsForId$ = lastFiveErrorsForId.saved_objects[0]) === null || _lastFiveErrorsForId$ === void 0 ? void 0 : _lastFiveErrorsForId$.attributes);
        const failures = lastFiveErrorsForId.saved_objects.slice(1).map(errorItem => (0, _utils.convertToSnakeCase)(errorItem.attributes));
        return { ...accumulated,
          [id]: {
            current_status: currentStatus,
            failures
          }
        };
      }, Promise.resolve({}));
      return response.ok({
        body: statuses
      });
    } catch (err) {
      const error = (0, _utils.transformError)(err);
      return siemResponse.error({
        body: error.message,
        statusCode: error.statusCode
      });
    }
  });
};

exports.findRulesStatusesRoute = findRulesStatusesRoute;