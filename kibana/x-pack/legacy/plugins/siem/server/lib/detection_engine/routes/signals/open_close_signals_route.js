"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSignalsStatusRoute = void 0;

var _constants = require("../../../../../common/constants");

var _set_signal_status_schema = require("../schemas/set_signal_status_schema");

var _utils = require("../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const setSignalsStatusRoute = router => {
  router.post({
    path: _constants.DETECTION_ENGINE_SIGNALS_STATUS_URL,
    validate: {
      body: (0, _utils.buildRouteValidation)(_set_signal_status_schema.setSignalsStatusSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    var _context$siem;

    const {
      signal_ids: signalIds,
      query,
      status
    } = request.body;
    const clusterClient = context.core.elasticsearch.dataClient;
    const siemClient = (_context$siem = context.siem) === null || _context$siem === void 0 ? void 0 : _context$siem.getSiemClient();
    const siemResponse = (0, _utils.buildSiemResponse)(response);

    if (!siemClient) {
      return siemResponse.error({
        statusCode: 404
      });
    }

    let queryObject;

    if (signalIds) {
      queryObject = {
        ids: {
          values: signalIds
        }
      };
    }

    if (query) {
      queryObject = {
        bool: {
          filter: query
        }
      };
    }

    try {
      const result = await clusterClient.callAsCurrentUser('updateByQuery', {
        index: siemClient.signalsIndex,
        body: {
          script: {
            source: `ctx._source.signal.status = '${status}'`,
            lang: 'painless'
          },
          query: queryObject
        },
        ignoreUnavailable: true
      });
      return response.ok({
        body: result
      });
    } catch (err) {
      // error while getting or updating signal with id: id in signal index .siem-signals
      const error = (0, _utils.transformError)(err);
      return siemResponse.error({
        body: error.message,
        statusCode: error.statusCode
      });
    }
  });
};

exports.setSignalsStatusRoute = setSignalsStatusRoute;