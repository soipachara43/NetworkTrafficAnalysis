"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readIndexRoute = void 0;

var _constants = require("../../../../../common/constants");

var _utils = require("../utils");

var _get_index_exists = require("../../index/get_index_exists");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const readIndexRoute = router => {
  router.get({
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

      if (!siemClient) {
        return siemResponse.error({
          statusCode: 404
        });
      }

      const index = siemClient.signalsIndex;
      const indexExists = await (0, _get_index_exists.getIndexExists)(clusterClient.callAsCurrentUser, index);

      if (indexExists) {
        return response.ok({
          body: {
            name: index
          }
        });
      } else {
        return siemResponse.error({
          statusCode: 404,
          body: 'index for this space does not exist'
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

exports.readIndexRoute = readIndexRoute;