"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFetchRoute = registerFetchRoute;

var _call_with_request_factory = require("../../../lib/call_with_request_factory");

var _is_es_error = require("../../../lib/is_es_error");

var _error_wrappers = require("../../../lib/error_wrappers");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * We don't want to output system template (whose name starts with a ".") which don't
 * have a time base index pattern (with a wildcard in it) as those templates are already
 * assigned to a single index.
 *
 * @param {String} templateName The index template
 * @param {Array} indexPatterns Index patterns
 */
function isReservedSystemTemplate(templateName, indexPatterns) {
  return templateName.startsWith('kibana_index_template') || templateName.startsWith('.') && indexPatterns.every(pattern => {
    return !pattern.includes('*');
  });
}

function filterAndFormatTemplates(templates) {
  const formattedTemplates = [];
  const templateNames = Object.keys(templates);

  for (const templateName of templateNames) {
    const {
      settings,
      index_patterns
    } = templates[templateName]; // eslint-disable-line camelcase

    if (isReservedSystemTemplate(templateName, index_patterns)) {
      continue;
    }

    const formattedTemplate = {
      index_lifecycle_name: settings.index && settings.index.lifecycle ? settings.index.lifecycle.name : undefined,
      index_patterns,
      allocation_rules: settings.index && settings.index.routing ? settings.index.routing : undefined,
      settings,
      name: templateName
    };
    formattedTemplates.push(formattedTemplate);
  }

  return formattedTemplates;
}

async function fetchTemplates(callWithRequest) {
  const params = {
    method: 'GET',
    path: '/_template',
    // we allow 404 incase the user shutdown security in-between the check and now
    ignore: [404]
  };
  return await callWithRequest('transport.request', params);
}

function registerFetchRoute(server) {
  const licensePreRouting = (0, _license_pre_routing_factory.licensePreRoutingFactory)(server);
  server.route({
    path: '/api/index_lifecycle_management/templates',
    method: 'GET',
    handler: async request => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(server, request);

      try {
        const templates = await fetchTemplates(callWithRequest);
        return filterAndFormatTemplates(templates);
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