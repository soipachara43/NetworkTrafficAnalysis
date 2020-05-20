"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchKpiHostsAdapter = void 0;

var _fp = require("lodash/fp");

var _query_hosts = require("./query_hosts.dsl");

var _query_authentication = require("./query_authentication.dsl");

var _query_unique_ips = require("./query_unique_ips.dsl");

var _build_query = require("../../utils/build_query");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const formatGeneralHistogramData = data => {
  return data && data.length > 0 ? data.map(({
    key,
    count
  }) => ({
    x: key,
    y: count.value
  })) : null;
};

const formatAuthHistogramData = data => {
  return data && data.length > 0 ? data.map(({
    key,
    count
  }) => ({
    x: key,
    y: count.doc_count
  })) : null;
};

class ElasticsearchKpiHostsAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getKpiHosts(request, options) {
    const hostsQuery = (0, _query_hosts.buildHostsQuery)(options);
    const uniqueIpsQuery = (0, _query_unique_ips.buildUniqueIpsQuery)(options);
    const authQuery = (0, _query_authentication.buildAuthQuery)(options);
    const response = await this.framework.callWithRequest(request, 'msearch', {
      body: [...hostsQuery, ...authQuery, ...uniqueIpsQuery]
    });
    const hostsHistogram = (0, _fp.getOr)(null, 'responses.0.aggregations.hosts_histogram.buckets', response);
    const authSuccessHistogram = (0, _fp.getOr)(null, 'responses.1.aggregations.authentication_success_histogram.buckets', response);
    const authFailureHistogram = (0, _fp.getOr)(null, 'responses.1.aggregations.authentication_failure_histogram.buckets', response);
    const uniqueSourceIpsHistogram = (0, _fp.getOr)(null, 'responses.2.aggregations.unique_source_ips_histogram.buckets', response);
    const uniqueDestinationIpsHistogram = (0, _fp.getOr)(null, 'responses.2.aggregations.unique_destination_ips_histogram.buckets', response);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)({ ...hostsQuery[0],
        body: hostsQuery[1]
      }), (0, _build_query.inspectStringifyObject)({ ...authQuery[0],
        body: authQuery[1]
      }), (0, _build_query.inspectStringifyObject)({ ...uniqueIpsQuery[0],
        body: uniqueIpsQuery[1]
      })],
      response: [(0, _build_query.inspectStringifyObject)(response.responses[0]), (0, _build_query.inspectStringifyObject)(response.responses[1]), (0, _build_query.inspectStringifyObject)(response.responses[2])]
    };
    return {
      inspect,
      hosts: (0, _fp.getOr)(null, 'responses.0.aggregations.hosts.value', response),
      hostsHistogram: formatGeneralHistogramData(hostsHistogram),
      authSuccess: (0, _fp.getOr)(null, 'responses.1.aggregations.authentication_success.doc_count', response),
      authSuccessHistogram: formatAuthHistogramData(authSuccessHistogram),
      authFailure: (0, _fp.getOr)(null, 'responses.1.aggregations.authentication_failure.doc_count', response),
      authFailureHistogram: formatAuthHistogramData(authFailureHistogram),
      uniqueSourceIps: (0, _fp.getOr)(null, 'responses.2.aggregations.unique_source_ips.value', response),
      uniqueSourceIpsHistogram: formatGeneralHistogramData(uniqueSourceIpsHistogram),
      uniqueDestinationIps: (0, _fp.getOr)(null, 'responses.2.aggregations.unique_destination_ips.value', response),
      uniqueDestinationIpsHistogram: formatGeneralHistogramData(uniqueDestinationIpsHistogram)
    };
  }

  async getKpiHostDetails(request, options) {
    const uniqueIpsQuery = (0, _query_unique_ips.buildUniqueIpsQuery)(options);
    const authQuery = (0, _query_authentication.buildAuthQuery)(options);
    const response = await this.framework.callWithRequest(request, 'msearch', {
      body: [...authQuery, ...uniqueIpsQuery]
    });
    const authSuccessHistogram = (0, _fp.getOr)(null, 'responses.0.aggregations.authentication_success_histogram.buckets', response);
    const authFailureHistogram = (0, _fp.getOr)(null, 'responses.0.aggregations.authentication_failure_histogram.buckets', response);
    const uniqueSourceIpsHistogram = (0, _fp.getOr)(null, 'responses.1.aggregations.unique_source_ips_histogram.buckets', response);
    const uniqueDestinationIpsHistogram = (0, _fp.getOr)(null, 'responses.1.aggregations.unique_destination_ips_histogram.buckets', response);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)({ ...authQuery[0],
        body: authQuery[1]
      }), (0, _build_query.inspectStringifyObject)({ ...uniqueIpsQuery[0],
        body: uniqueIpsQuery[1]
      })],
      response: [(0, _build_query.inspectStringifyObject)(response.responses[0]), (0, _build_query.inspectStringifyObject)(response.responses[1])]
    };
    return {
      inspect,
      authSuccess: (0, _fp.getOr)(null, 'responses.0.aggregations.authentication_success.doc_count', response),
      authSuccessHistogram: formatAuthHistogramData(authSuccessHistogram),
      authFailure: (0, _fp.getOr)(null, 'responses.0.aggregations.authentication_failure.doc_count', response),
      authFailureHistogram: formatAuthHistogramData(authFailureHistogram),
      uniqueSourceIps: (0, _fp.getOr)(null, 'responses.1.aggregations.unique_source_ips.value', response),
      uniqueSourceIpsHistogram: formatGeneralHistogramData(uniqueSourceIpsHistogram),
      uniqueDestinationIps: (0, _fp.getOr)(null, 'responses.1.aggregations.unique_destination_ips.value', response),
      uniqueDestinationIpsHistogram: formatGeneralHistogramData(uniqueDestinationIpsHistogram)
    };
  }

}

exports.ElasticsearchKpiHostsAdapter = ElasticsearchKpiHostsAdapter;