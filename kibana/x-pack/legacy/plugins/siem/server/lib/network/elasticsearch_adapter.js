"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElasticsearchNetworkAdapter = void 0;

var _fp = require("lodash/fp");

var _types = require("../../graphql/types");

var _build_query = require("../../utils/build_query");

var _constants = require("../../../common/constants");

var _query_dns = require("./query_dns.dsl");

var _query_top_n_flow = require("./query_top_n_flow.dsl");

var _query_http = require("./query_http.dsl");

var _query_top_countries = require("./query_top_countries.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchNetworkAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getNetworkTopCountries(request, options) {
    if (options.pagination && options.pagination.querySize >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${_constants.DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    const dsl = (0, _query_top_countries.buildTopCountriesQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      activePage,
      cursorStart,
      fakePossibleCount,
      querySize
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'aggregations.top_countries_count.value', response);
    const networkTopCountriesEdges = getTopCountriesEdges(response, options);
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const edges = networkTopCountriesEdges.splice(cursorStart, querySize - cursorStart);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    const showMorePagesIndicator = totalCount > fakeTotalCount;
    return {
      edges,
      inspect,
      pageInfo: {
        activePage: activePage ? activePage : 0,
        fakeTotalCount,
        showMorePagesIndicator
      },
      totalCount
    };
  }

  async getNetworkTopNFlow(request, options) {
    if (options.pagination && options.pagination.querySize >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${_constants.DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    const dsl = (0, _query_top_n_flow.buildTopNFlowQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      activePage,
      cursorStart,
      fakePossibleCount,
      querySize
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'aggregations.top_n_flow_count.value', response);
    const networkTopNFlowEdges = getTopNFlowEdges(response, options);
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const edges = networkTopNFlowEdges.splice(cursorStart, querySize - cursorStart);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    const showMorePagesIndicator = totalCount > fakeTotalCount;
    return {
      edges,
      inspect,
      pageInfo: {
        activePage: activePage ? activePage : 0,
        fakeTotalCount,
        showMorePagesIndicator
      },
      totalCount
    };
  }

  async getNetworkDns(request, options) {
    if (options.pagination && options.pagination.querySize >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${_constants.DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    const dsl = (0, _query_dns.buildDnsQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      activePage,
      cursorStart,
      fakePossibleCount,
      querySize
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'aggregations.dns_count.value', response);
    const networkDnsEdges = formatDnsEdges((0, _fp.getOr)([], 'aggregations.dns_name_query_count.buckets', response));
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const edges = networkDnsEdges.splice(cursorStart, querySize - cursorStart);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    const showMorePagesIndicator = totalCount > fakeTotalCount;
    return {
      edges,
      inspect,
      pageInfo: {
        activePage: activePage ? activePage : 0,
        fakeTotalCount,
        showMorePagesIndicator
      },
      totalCount
    };
  }

  async getNetworkHttp(request, options) {
    if (options.pagination && options.pagination.querySize >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${_constants.DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    const dsl = (0, _query_http.buildHttpQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      activePage,
      cursorStart,
      fakePossibleCount,
      querySize
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'aggregations.http_count.value', response);
    const networkHttpEdges = getHttpEdges(response);
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const edges = networkHttpEdges.splice(cursorStart, querySize - cursorStart);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    const showMorePagesIndicator = totalCount > fakeTotalCount;
    return {
      edges,
      inspect,
      pageInfo: {
        activePage: activePage ? activePage : 0,
        fakeTotalCount,
        showMorePagesIndicator
      },
      totalCount
    };
  }

}

exports.ElasticsearchNetworkAdapter = ElasticsearchNetworkAdapter;

const getTopNFlowEdges = (response, options) => {
  return formatTopNFlowEdges((0, _fp.getOr)([], `aggregations.${options.flowTarget}.buckets`, response), options.flowTarget);
};

const getTopCountriesEdges = (response, options) => {
  return formatTopCountriesEdges((0, _fp.getOr)([], `aggregations.${options.flowTarget}.buckets`, response), options.flowTarget);
};

const getHttpEdges = response => {
  return formatHttpEdges((0, _fp.getOr)([], `aggregations.url.buckets`, response));
};

const getFlowTargetFromString = flowAsString => flowAsString === 'source' ? _types.FlowTargetSourceDest.source : _types.FlowTargetSourceDest.destination;

const getGeoItem = result => result.location.top_geo.hits.hits.length > 0 && result.location.top_geo.hits.hits[0]._source ? {
  geo: (0, _fp.getOr)('', `location.top_geo.hits.hits[0]._source.${Object.keys(result.location.top_geo.hits.hits[0]._source)[0]}.geo`, result),
  flowTarget: getFlowTargetFromString(Object.keys(result.location.top_geo.hits.hits[0]._source)[0])
} : null;

const getAsItem = result => result.autonomous_system.top_as.hits.hits.length > 0 && result.autonomous_system.top_as.hits.hits[0]._source ? {
  number: (0, _fp.getOr)(null, `autonomous_system.top_as.hits.hits[0]._source.${Object.keys(result.autonomous_system.top_as.hits.hits[0]._source)[0]}.as.number`, result),
  name: (0, _fp.getOr)('', `autonomous_system.top_as.hits.hits[0]._source.${Object.keys(result.autonomous_system.top_as.hits.hits[0]._source)[0]}.as.organization.name`, result)
} : null;

const formatTopNFlowEdges = (buckets, flowTarget) => buckets.map(bucket => ({
  node: {
    _id: bucket.key,
    [flowTarget]: {
      domain: bucket.domain.buckets.map(bucketDomain => bucketDomain.key),
      ip: bucket.key,
      location: getGeoItem(bucket),
      autonomous_system: getAsItem(bucket),
      flows: (0, _fp.getOr)(0, 'flows.value', bucket),
      [`${(0, _query_top_n_flow.getOppositeField)(flowTarget)}_ips`]: (0, _fp.getOr)(0, `${(0, _query_top_n_flow.getOppositeField)(flowTarget)}_ips.value`, bucket)
    },
    network: {
      bytes_in: (0, _fp.getOr)(0, 'bytes_in.value', bucket),
      bytes_out: (0, _fp.getOr)(0, 'bytes_out.value', bucket)
    }
  },
  cursor: {
    value: bucket.key,
    tiebreaker: null
  }
}));

const formatTopCountriesEdges = (buckets, flowTarget) => buckets.map(bucket => ({
  node: {
    _id: bucket.key,
    [flowTarget]: {
      country: bucket.key,
      flows: (0, _fp.getOr)(0, 'flows.value', bucket),
      [`${(0, _query_top_n_flow.getOppositeField)(flowTarget)}_ips`]: (0, _fp.getOr)(0, `${(0, _query_top_n_flow.getOppositeField)(flowTarget)}_ips.value`, bucket),
      [`${flowTarget}_ips`]: (0, _fp.getOr)(0, `${flowTarget}_ips.value`, bucket)
    },
    network: {
      bytes_in: (0, _fp.getOr)(0, 'bytes_in.value', bucket),
      bytes_out: (0, _fp.getOr)(0, 'bytes_out.value', bucket)
    }
  },
  cursor: {
    value: bucket.key,
    tiebreaker: null
  }
}));

const formatDnsEdges = buckets => buckets.map(bucket => ({
  node: {
    _id: bucket.key,
    dnsBytesIn: getOrNumber('dns_bytes_in.value', bucket),
    dnsBytesOut: getOrNumber('dns_bytes_out.value', bucket),
    dnsName: bucket.key,
    queryCount: bucket.doc_count,
    uniqueDomains: getOrNumber('unique_domains.value', bucket)
  },
  cursor: {
    value: bucket.key,
    tiebreaker: null
  }
}));

const formatHttpEdges = buckets => buckets.map(bucket => ({
  node: {
    _id: bucket.key,
    domains: bucket.domains.buckets.map(({
      key
    }) => key),
    methods: bucket.methods.buckets.map(({
      key
    }) => key),
    statuses: bucket.status.buckets.map(({
      key
    }) => `${key}`),
    lastHost: (0, _fp.get)('source.hits.hits[0]._source.host.name', bucket),
    lastSourceIp: (0, _fp.get)('source.hits.hits[0]._source.source.ip', bucket),
    path: bucket.key,
    requestCount: bucket.doc_count
  },
  cursor: {
    value: bucket.key,
    tiebreaker: null
  }
}));

const getOrNumber = (path, bucket) => {
  const numb = (0, _fp.get)(path, bucket);

  if (numb == null) {
    return null;
  }

  return numb;
};