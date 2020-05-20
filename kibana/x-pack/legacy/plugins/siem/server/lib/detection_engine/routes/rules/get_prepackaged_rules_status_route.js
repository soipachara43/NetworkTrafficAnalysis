"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrepackagedRulesStatusRoute = void 0;

var _constants = require("../../../../../common/constants");

var _utils = require("../utils");

var _get_prepackaged_rules = require("../../rules/get_prepackaged_rules");

var _get_rules_to_install = require("../../rules/get_rules_to_install");

var _get_rules_to_update = require("../../rules/get_rules_to_update");

var _find_rules = require("../../rules/find_rules");

var _get_existing_prepackaged_rules = require("../../rules/get_existing_prepackaged_rules");

var _prepackaged_rules_status_schema = require("../schemas/response/prepackaged_rules_status_schema");

var _validate = require("./validate");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getPrepackagedRulesStatusRoute = router => {
  router.get({
    path: `${_constants.DETECTION_ENGINE_PREPACKAGED_URL}/_status`,
    validate: false,
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    var _context$alerting;

    const siemResponse = (0, _utils.buildSiemResponse)(response);
    const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();

    if (!alertsClient) {
      return siemResponse.error({
        statusCode: 404
      });
    }

    try {
      const rulesFromFileSystem = (0, _get_prepackaged_rules.getPrepackagedRules)();
      const customRules = await (0, _find_rules.findRules)({
        alertsClient,
        perPage: 1,
        page: 1,
        sortField: 'enabled',
        sortOrder: 'desc',
        filter: 'alert.attributes.tags:"__internal_immutable:false"'
      });
      const prepackagedRules = await (0, _get_existing_prepackaged_rules.getExistingPrepackagedRules)({
        alertsClient
      });
      const rulesToInstall = (0, _get_rules_to_install.getRulesToInstall)(rulesFromFileSystem, prepackagedRules);
      const rulesToUpdate = (0, _get_rules_to_update.getRulesToUpdate)(rulesFromFileSystem, prepackagedRules);
      const prepackagedRulesStatus = {
        rules_custom_installed: customRules.total,
        rules_installed: prepackagedRules.length,
        rules_not_installed: rulesToInstall.length,
        rules_not_updated: rulesToUpdate.length
      };
      const [validated, errors] = (0, _validate.validate)(prepackagedRulesStatus, _prepackaged_rules_status_schema.prePackagedRulesStatusSchema);

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

exports.getPrepackagedRulesStatusRoute = getPrepackagedRulesStatusRoute;