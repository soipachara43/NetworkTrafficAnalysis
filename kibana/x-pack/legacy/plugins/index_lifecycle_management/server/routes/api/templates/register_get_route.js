"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerGetRoute = registerGetRoute;

var _call_with_request_factory = require("../../../lib/call_with_request_factory");

var _is_es_error = require("../../../lib/is_es_error");

var _error_wrappers = require("../../../lib/error_wrappers");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function fetchTemplate(callWithRequest, templateName) {
  const params = {
    method: 'GET',
    path: `/_template/${encodeURIComponent(templateName)}`,
    // we allow 404 incase the user shutdown security in-between the check and now
    ignore: [404]
  };
  return await callWithRequest('transport.request', params);
}

function registerGetRoute(server) {
  const licensePreRouting = (0, _license_pre_routing_factory.licensePreRoutingFactory)(server);
  server.route({
    path: '/api/index_lifecycle_management/templates/{templateName}',
    method: 'GET',
    handler: async request => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(server, request);
      const templateName = request.params.templateName;

      try {
        const template = await fetchTemplate(callWithRequest, templateName);
        return template[templateName];
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