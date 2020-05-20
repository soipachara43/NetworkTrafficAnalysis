"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRemoveRoute = registerRemoveRoute;

var _call_with_request_factory = require("../../../lib/call_with_request_factory");

var _is_es_error = require("../../../lib/is_es_error");

var _error_wrappers = require("../../../lib/error_wrappers");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function removeLifecycle(callWithRequest, indexNames) {
  const responses = [];

  for (let i = 0; i < indexNames.length; i++) {
    const indexName = indexNames[i];
    const params = {
      method: 'POST',
      path: `/${encodeURIComponent(indexName)}/_ilm/remove`,
      ignore: [404]
    };
    responses.push(callWithRequest('transport.request', params));
  }

  return Promise.all(responses);
}

function registerRemoveRoute(server) {
  const licensePreRouting = (0, _license_pre_routing_factory.licensePreRoutingFactory)(server);
  server.route({
    path: '/api/index_lifecycle_management/index/remove',
    method: 'POST',
    handler: async request => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(server, request);

      try {
        const response = await removeLifecycle(callWithRequest, request.payload.indexNames);
        return response;
      } catch (err) {
        if ((0, _is_es_error.isEsError)(err)) {
          return (0, _error_wrappers.wrapEsError)(err);
        }

        return (0, _error_wrappers.wrapUnknownError)(err);
      }
    },
    config: {
      pre: [licensePreRouting]
    }
  });
}