"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIndexRoute = void 0;

var _constants = require("../../../../../common/constants");

var _utils = require("../utils");

var _get_index_exists = require("../../index/get_index_exists");

var _get_policy_exists = require("../../index/get_policy_exists");

var _set_policy = require("../../index/set_policy");

var _set_template = require("../../index/set_template");

var _get_signals_template = require("./get_signals_template");

var _get_template_exists = require("../../index/get_template_exists");

var _create_bootstrap_index = require("../../index/create_bootstrap_index");

var _signals_policy = _interopRequireDefault(require("./signals_policy.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createIndexRoute = router => {
  router.post({
    path: _constants.DETECTION_ENGINE_INDEX_URL,
    validate: false,
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    const siemResponse = (0, _utils.buildSiemResponse)(response);

    try {
      var _context$siem;

      const clusterClient = context.core.elasticsearch.dataClient;
      const siemClient = (_context$siem = context.siem) === null || _context$siem === void 0 ? void 0 : _context$siem.getSiemClient();
      const callCluster = clusterClient.callAsCurrentUser;

      if (!siemClient) {
        return siemResponse.error({
          statusCode: 404
        });
      }

      const index = siemClient.signalsIndex;
      const indexExists = await (0, _get_index_exists.getIndexExists)(callCluster, index);

      if (indexExists) {
        return siemResponse.error({
          statusCode: 409,
          body: `index: "${index}" already exists`
        });
      } else {
        const policyExists = await (0, _get_policy_exists.getPolicyExists)(callCluster, index);

        if (!policyExists) {
          await (0, _set_policy.setPolicy)(callCluster, index, _signals_policy.default);
        }

        const templateExists = await (0, _get_template_exists.getTemplateExists)(callCluster, index);

        if (!templateExists) {
          const template = (0, _get_signals_template.getSignalsTemplate)(index);
          await (0, _set_template.setTemplate)(callCluster, index, template);
        }

        await (0, _create_bootstrap_index.createBootstrapIndex)(callCluster, index);
        return response.ok({
          body: {
            acknowledged: true
          }
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

exports.createIndexRoute = createIndexRoute;