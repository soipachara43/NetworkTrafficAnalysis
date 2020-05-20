"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatUncommonProcessesData = exports.getHosts = exports.getHits = exports.ElasticsearchUncommonProcessesAdapter = void 0;

var _fp = require("lodash/fp");

var _build_query = require("../../utils/build_query");

var _ecs_fields = require("../ecs_fields");

var _constants = require("../../../common/constants");

var _query = require("./query.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchUncommonProcessesAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getUncommonProcesses(request, options) {
    if (options.pagination && options.pagination.querySize >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${_constants.DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    const dsl = (0, _query.buildQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      activePage,
      cursorStart,
      fakePossibleCount,
      querySize
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'aggregations.process_count.value', response);
    const buckets = (0, _fp.getOr)([], 'aggregations.group_by_process.buckets', response);
    const hits = getHits(buckets);
    const uncommonProcessesEdges = hits.map(hit => formatUncommonProcessesData(options.fields, hit, { ..._ecs_fields.processFieldsMap,
      ..._ecs_fields.userFieldsMap
    }));
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const edges = uncommonProcessesEdges.splice(cursorStart, querySize - cursorStart);
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

exports.ElasticsearchUncommonProcessesAdapter = ElasticsearchUncommonProcessesAdapter;

const getHits = buckets => buckets.map(bucket => ({
  _id: bucket.process.hits.hits[0]._id,
  _index: bucket.process.hits.hits[0]._index,
  _type: bucket.process.hits.hits[0]._type,
  _score: bucket.process.hits.hits[0]._score,
  _source: bucket.process.hits.hits[0]._source,
  sort: bucket.process.hits.hits[0].sort,
  cursor: bucket.process.hits.hits[0].cursor,
  total: bucket.process.hits.total,
  host: getHosts(bucket.hosts.buckets)
}));

exports.getHits = getHits;

const getHosts = buckets => buckets.map(bucket => {
  const source = (0, _fp.get)('host.hits.hits[0]._source', bucket);
  return {
    id: [bucket.key],
    name: (0, _fp.get)('host.name', source)
  };
});

exports.getHosts = getHosts;

const formatUncommonProcessesData = (fields, hit, fieldMap) => fields.reduce((flattenedFields, fieldName) => {
  flattenedFields.node._id = hit._id;
  flattenedFields.node.instances = (0, _fp.getOr)(0, 'total.value', hit);
  flattenedFields.node.hosts = hit.host;

  if (hit.cursor) {
    flattenedFields.cursor.value = hit.cursor;
  }

  return (0, _build_query.mergeFieldsWithHit)(fieldName, flattenedFields, fieldMap, hit);
}, {
  node: {
    _id: '',
    instances: 0,
    process: {},
    hosts: []
  },
  cursor: {
    value: '',
    tiebreaker: null
  }
});

exports.formatUncommonProcessesData = formatUncommonProcessesData;