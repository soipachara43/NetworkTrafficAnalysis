"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerDetailsRoute = registerDetailsRoute;

var _call_with_request_factory = require("../../../lib/call_with_request_factory");

var _is_es_error = require("../../../lib/is_es_error");

var _error_wrappers = require("../../../lib/error_wrappers");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function findMatchingNodes(stats, nodeAttrs) {
  return Object.entries(stats.nodes).reduce((accum, [nodeId, nodeStats]) => {
    const attributes = nodeStats.attributes || {};

    for (const [key, value] of Object.entries(attributes)) {
      if (`${key}:${value}` === nodeAttrs) {
        accum.push({
          nodeId,
          stats: nodeStats
        });
        break;
      }
    }

    return accum;
  }, []);
}

async function fetchNodeStats(callWithRequest) {
  const params = {
    format: 'json'
  };
  return await callWithRequest('nodes.stats', params);
}

function registerDetailsRoute(server) {
  const licensePreRouting = (0, _license_pre_routing_factory.licensePreRoutingFactory)(server);
  server.route({
    path: '/api/index_lifecycle_management/nodes/{nodeAttrs}/details',
    method: 'GET',
    handler: async request => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(server, request);

      try {
        const stats = await fetchNodeStats(callWithRequest);
        const response = findMatchingNodes(stats, request.params.nodeAttrs);
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