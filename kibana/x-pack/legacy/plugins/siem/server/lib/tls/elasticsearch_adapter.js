"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTlsEdges = exports.ElasticsearchTlsAdapter = void 0;

var _fp = require("lodash/fp");

var _build_query = require("../../utils/build_query");

var _constants = require("../../../common/constants");

var _query_tls = require("./query_tls.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchTlsAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getTls(request, options) {
    if (options.pagination && options.pagination.querySize >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${_constants.DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    const dsl = (0, _query_tls.buildTlsQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      activePage,
      cursorStart,
      fakePossibleCount,
      querySize
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'aggregations.count.value', response);
    const tlsEdges = getTlsEdges(response, options);
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const edges = tlsEdges.splice(cursorStart, querySize - cursorStart);
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

exports.ElasticsearchTlsAdapter = ElasticsearchTlsAdapter;

const getTlsEdges = (response, options) => {
  return formatTlsEdges((0, _fp.getOr)([], 'aggregations.sha1.buckets', response));
};

const formatTlsEdges = buckets => {
  return buckets.map(bucket => {
    const edge = {
      node: {
        _id: bucket.key,
        subjects: bucket.subjects.buckets.map(({
          key
        }) => key),
        ja3: bucket.ja3.buckets.map(({
          key
        }) => key),
        issuers: bucket.issuers.buckets.map(({
          key
        }) => key),
        // eslint-disable-next-line @typescript-eslint/camelcase
        notAfter: bucket.not_after.buckets.map(({
          key_as_string
        }) => key_as_string)
      },
      cursor: {
        value: bucket.key,
        tiebreaker: null
      }
    };
    return edge;
  });
};

exports.formatTlsEdges = formatTlsEdges;