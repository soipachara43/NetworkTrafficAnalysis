"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchKpiNetworkAdapter = void 0;

var _fp = require("lodash/fp");

var _build_query = require("../../utils/build_query");

var _query_dns = require("./query_dns.dsl");

var _query_tls_handshakes = require("./query_tls_handshakes.dsl");

var _query_unique_private_ips = require("./query_unique_private_ips.dsl");

var _query_network_events = require("./query_network_events");

var _query_unique_flow = require("./query_unique_flow");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const formatHistogramData = data => {
  return data && data.length > 0 ? data.map(({
    key,
    count
  }) => {
    return {
      x: key,
      y: (0, _fp.getOr)(null, 'value', count)
    };
  }) : null;
};

class ElasticsearchKpiNetworkAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getKpiNetwork(request, options) {
    const networkEventsQuery = (0, _query_network_events.buildNetworkEventsQuery)(options);
    const uniqueFlowIdsQuery = (0, _query_unique_flow.buildUniqueFlowIdsQuery)(options);
    const uniquePrivateIpsQuery = (0, _query_unique_private_ips.buildUniquePrvateIpQuery)(options);
    const dnsQuery = (0, _query_dns.buildDnsQuery)(options);
    const tlsHandshakesQuery = (0, _query_tls_handshakes.buildTlsHandshakeQuery)(options);
    const response = await this.framework.callWithRequest(request, 'msearch', {
      body: [...networkEventsQuery, ...dnsQuery, ...uniquePrivateIpsQuery, ...uniqueFlowIdsQuery, ...tlsHandshakesQuery]
    });
    const uniqueSourcePrivateIpsHistogram = (0, _fp.getOr)(null, 'responses.2.aggregations.source.histogram.buckets', response);
    const uniqueDestinationPrivateIpsHistogram = (0, _fp.getOr)(null, 'responses.2.aggregations.destination.histogram.buckets', response);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)({ ...networkEventsQuery[0],
        body: networkEventsQuery[1]
      }), (0, _build_query.inspectStringifyObject)({ ...dnsQuery[0],
        body: dnsQuery[1]
      }), (0, _build_query.inspectStringifyObject)({ ...uniquePrivateIpsQuery[0],
        body: uniquePrivateIpsQuery[1]
      }), (0, _build_query.inspectStringifyObject)({ ...uniqueFlowIdsQuery[0],
        body: uniqueFlowIdsQuery[1]
      }), (0, _build_query.inspectStringifyObject)({ ...tlsHandshakesQuery[0],
        body: tlsHandshakesQuery[1]
      })],
      response: [(0, _build_query.inspectStringifyObject)(response.responses[0]), (0, _build_query.inspectStringifyObject)(response.responses[1]), (0, _build_query.inspectStringifyObject)(response.responses[2]), (0, _build_query.inspectStringifyObject)(response.responses[3]), (0, _build_query.inspectStringifyObject)(response.responses[4])]
    };
    return {
      inspect,
      networkEvents: (0, _fp.getOr)(null, 'responses.0.hits.total.value', response),
      dnsQueries: (0, _fp.getOr)(null, 'responses.1.hits.total.value', response),
      uniqueSourcePrivateIps: (0, _fp.getOr)(null, 'responses.2.aggregations.source.unique_private_ips.value', response),
      uniqueSourcePrivateIpsHistogram: formatHistogramData(uniqueSourcePrivateIpsHistogram),
      uniqueDestinationPrivateIps: (0, _fp.getOr)(null, 'responses.2.aggregations.destination.unique_private_ips.value', response),
      uniqueDestinationPrivateIpsHistogram: formatHistogramData(uniqueDestinationPrivateIpsHistogram),
      uniqueFlowId: (0, _fp.getOr)(null, 'responses.3.aggregations.unique_flow_id.value', response),
      tlsHandshakes: (0, _fp.getOr)(null, 'responses.4.hits.total.value', response)
    };
  }

}

exports.ElasticsearchKpiNetworkAdapter = ElasticsearchKpiNetworkAdapter;