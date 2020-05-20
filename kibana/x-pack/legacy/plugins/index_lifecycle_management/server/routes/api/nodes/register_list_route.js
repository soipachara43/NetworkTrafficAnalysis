"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerListRoute = registerListRoute;

var _call_with_request_factory = require("../../../lib/call_with_request_factory");

var _is_es_error = require("../../../lib/is_es_error");

var _error_wrappers = require("../../../lib/error_wrappers");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

var _constants = require("./constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function convertStatsIntoList(stats, attributesToBeFiltered) {
  return Object.entries(stats.nodes).reduce((accum, [nodeId, nodeStats]) => {
    const attributes = nodeStats.attributes || {};

    for (const [key, value] of Object.entries(attributes)) {
      if (!attributesToBeFiltered.includes(key)) {
        const attributeString = `${key}:${value}`;
        accum[attributeString] = accum[attributeString] || [];
        accum[attributeString].push(nodeId);
      }
    }

    return accum;
  }, {});
}

async function fetchNodeStats(callWithRequest) {
  const params = {
    format: 'json'
  };
  return await callWithRequest('nodes.stats', params);
}

function registerListRoute(server) {
  const config = server.config();
  const filteredNodeAttributes = config.get('xpack.ilm.filteredNodeAttributes');
  const attributesToBeFiltered = [..._constants.NODE_ATTRS_KEYS_TO_IGNORE, ...filteredNodeAttributes];
  const licensePreRouting = (0, _license_pre_routing_factory.licensePreRoutingFactory)(server);
  server.route({
    path: '/api/index_lifecycle_management/nodes/list',
    method: 'GET',
    handler: async request => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(server, request);

      try {
        const stats = await fetchNodeStats(callWithRequest);
        const response = convertStatsIntoList(stats, attributesToBeFiltered);
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