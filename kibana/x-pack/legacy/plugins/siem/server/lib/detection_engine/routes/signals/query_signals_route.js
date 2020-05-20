"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.querySignalsRoute = void 0;

var _constants = require("../../../../../common/constants");

var _query_signals_index_schema = require("../schemas/query_signals_index_schema");

var _utils = require("../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const querySignalsRoute = router => {
  router.post({
    path: _constants.DETECTION_ENGINE_QUERY_SIGNALS_URL,
    validate: {
      body: (0, _utils.buildRouteValidation)(_query_signals_index_schema.querySignalsSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    const {
      query,
      aggs,
      _source,
      track_total_hits,
      size
    } = request.body;
    const clusterClient = context.core.elasticsearch.dataClient;
    const siemClient = context.siem.getSiemClient();
    const siemResponse = (0, _utils.buildSiemResponse)(response);

    try {
      const result = await clusterClient.callAsCurrentUser('search', {
        index: siemClient.signalsIndex,
        body: {
          query,
          aggs,
          _source,
          track_total_hits,
          size
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

exports.querySignalsRoute = querySignalsRoute;