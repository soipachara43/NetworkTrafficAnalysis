"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatAuthenticationData = exports.ElasticsearchAuthenticationAdapter = void 0;

var _fp = require("lodash/fp");

var _build_query = require("../../utils/build_query");

var _constants = require("../../../common/constants");

var _query = require("./query.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchAuthenticationAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getAuthentications(request, options) {
    const dsl = (0, _query.buildQuery)(options);

    if (options.pagination && options.pagination.querySize >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${_constants.DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      activePage,
      cursorStart,
      fakePossibleCount,
      querySize
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'aggregations.user_count.value', response);
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const hits = (0, _fp.getOr)([], 'aggregations.group_by_users.buckets', response).map(bucket => ({
      _id: (0, _fp.getOr)(`${bucket.key}+${bucket.doc_count}`, 'failures.lastFailure.hits.hits[0].id', bucket),
      _source: {
        lastSuccess: (0, _fp.getOr)(null, 'successes.lastSuccess.hits.hits[0]._source', bucket),
        lastFailure: (0, _fp.getOr)(null, 'failures.lastFailure.hits.hits[0]._source', bucket)
      },
      user: bucket.key,
      failures: bucket.failures.doc_count,
      successes: bucket.successes.doc_count
    }));
    const authenticationEdges = hits.map(hit => formatAuthenticationData(options.fields, hit, _query.auditdFieldsMap));
    const edges = authenticationEdges.splice(cursorStart, querySize - cursorStart);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    const showMorePagesIndicator = totalCount > fakeTotalCount;
    return {
      inspect,
      edges,
      totalCount,
      pageInfo: {
        activePage: activePage ? activePage : 0,
        fakeTotalCount,
        showMorePagesIndicator
      }
    };
  }

}

exports.ElasticsearchAuthenticationAdapter = ElasticsearchAuthenticationAdapter;

const formatAuthenticationData = (fields, hit, fieldMap) => fields.reduce((flattenedFields, fieldName) => {
  if (hit.cursor) {
    flattenedFields.cursor.value = hit.cursor;
  }

  flattenedFields.node = { ...flattenedFields.node,
    ...{
      _id: hit._id,
      user: {
        name: [hit.user]
      },
      failures: hit.failures,
      successes: hit.successes
    }
  };
  return (0, _build_query.mergeFieldsWithHit)(fieldName, flattenedFields, fieldMap, hit);
}, {
  node: {
    failures: 0,
    successes: 0,
    _id: '',
    user: {
      name: ['']
    }
  },
  cursor: {
    value: '',
    tiebreaker: null
  }
});

exports.formatAuthenticationData = formatAuthenticationData;