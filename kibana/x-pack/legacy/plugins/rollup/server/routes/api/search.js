"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSearchRoute = registerSearchRoute;

var _configSchema = require("@kbn/config-schema");

var _call_with_request_factory = require("../../lib/call_with_request_factory");

var _is_es_error = require("../../lib/is_es_error");

var _license_pre_routing_factory = require("../../lib/license_pre_routing_factory");

var _common = require("../../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerSearchRoute(deps, legacy) {
  const handler = async (ctx, request, response) => {
    const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request);

    try {
      const requests = request.body.map(({
        index,
        query
      }) => callWithRequest('rollup.search', {
        index,
        rest_total_hits_as_int: true,
        body: query
      }));
      const data = await Promise.all(requests);
      return response.ok({
        body: data
      });
    } catch (err) {
      if ((0, _is_es_error.isEsError)(err)) {
        return response.customError({
          statusCode: err.statusCode,
          body: err
        });
      }

      return response.internalError({
        body: err
      });
    }
  };

  deps.router.post({
    path: `${_common.API_BASE_PATH}/search`,
    validate: {
      body: _configSchema.schema.arrayOf(_configSchema.schema.object({
        index: _configSchema.schema.string(),
        query: _configSchema.schema.any()
      }))
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, handler));
}