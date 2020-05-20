"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAddPolicyRoute = registerAddPolicyRoute;

var _lodash = require("lodash");

var _call_with_request_factory = require("../../../lib/call_with_request_factory");

var _is_es_error = require("../../../lib/is_es_error");

var _error_wrappers = require("../../../lib/error_wrappers");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getIndexTemplate(callWithRequest, templateName) {
  const response = await callWithRequest('indices.getTemplate', {
    name: templateName
  });
  return response[templateName];
}

async function updateIndexTemplate(callWithRequest, indexTemplatePatch) {
  // Fetch existing template
  const template = await getIndexTemplate(callWithRequest, indexTemplatePatch.templateName);
  (0, _lodash.merge)(template, {
    settings: {
      index: {
        lifecycle: {
          name: indexTemplatePatch.policyName,
          rollover_alias: indexTemplatePatch.aliasName
        }
      }
    }
  });
  const params = {
    method: 'PUT',
    path: `/_template/${encodeURIComponent(indexTemplatePatch.templateName)}`,
    ignore: [404],
    body: template
  };
  return await callWithRequest('transport.request', params);
}

function registerAddPolicyRoute(server) {
  const licensePreRouting = (0, _license_pre_routing_factory.licensePreRoutingFactory)(server);
  server.route({
    path: '/api/index_lifecycle_management/template',
    method: 'POST',
    handler: async request => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(server, request);

      try {
        const response = await updateIndexTemplate(callWithRequest, request.payload);
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