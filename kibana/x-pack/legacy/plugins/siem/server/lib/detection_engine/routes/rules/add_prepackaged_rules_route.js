"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPrepackedRulesRoute = void 0;

var _constants = require("../../../../../common/constants");

var _get_index_exists = require("../../index/get_index_exists");

var _utils = require("../utils");

var _get_prepackaged_rules = require("../../rules/get_prepackaged_rules");

var _install_prepacked_rules = require("../../rules/install_prepacked_rules");

var _update_prepacked_rules = require("../../rules/update_prepacked_rules");

var _get_rules_to_install = require("../../rules/get_rules_to_install");

var _get_rules_to_update = require("../../rules/get_rules_to_update");

var _get_existing_prepackaged_rules = require("../../rules/get_existing_prepackaged_rules");

var _prepackaged_rules_schema = require("../schemas/response/prepackaged_rules_schema");

var _validate = require("./validate");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const addPrepackedRulesRoute = router => {
  router.put({
    path: _constants.DETECTION_ENGINE_PREPACKAGED_URL,
    validate: false,
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    const siemResponse = (0, _utils.buildSiemResponse)(response);

    try {
      var _context$alerting, _context$actions, _context$siem;

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

      const rulesFromFileSystem = (0, _get_prepackaged_rules.getPrepackagedRules)();
      const prepackagedRules = await (0, _get_existing_prepackaged_rules.getExistingPrepackagedRules)({
        alertsClient
      });
      const rulesToInstall = (0, _get_rules_to_install.getRulesToInstall)(rulesFromFileSystem, prepackagedRules);
      const rulesToUpdate = (0, _get_rules_to_update.getRulesToUpdate)(rulesFromFileSystem, prepackagedRules);
      const {
        signalsIndex
      } = siemClient;

      if (rulesToInstall.length !== 0 || rulesToUpdate.length !== 0) {
        const signalsIndexExists = await (0, _get_index_exists.getIndexExists)(clusterClient.callAsCurrentUser, signalsIndex);

        if (!signalsIndexExists) {
          return siemResponse.error({
            statusCode: 400,
            body: `Pre-packaged rules cannot be installed until the signals index is created: ${signalsIndex}`
          });
        }
      }

      await Promise.all((0, _install_prepacked_rules.installPrepackagedRules)(alertsClient, actionsClient, rulesToInstall, signalsIndex));
      await (0, _update_prepacked_rules.updatePrepackagedRules)(alertsClient, actionsClient, savedObjectsClient, rulesToUpdate, signalsIndex);
      const prepackagedRulesOutput = {
        rules_installed: rulesToInstall.length,
        rules_updated: rulesToUpdate.length
      };
      const [validated, errors] = (0, _validate.validate)(prepackagedRulesOutput, _prepackaged_rules_schema.prePackagedRulesSchema);

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

exports.addPrepackedRulesRoute = addPrepackedRulesRoute;