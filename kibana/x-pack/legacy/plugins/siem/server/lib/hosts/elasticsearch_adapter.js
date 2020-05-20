"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatHostEdgesData = exports.ElasticsearchHostsAdapter = void 0;

var _fp = require("lodash/fp");

var _build_query = require("../../utils/build_query");

var _ecs_fields = require("../ecs_fields");

var _queryDetail_host = require("./query.detail_host.dsl");

var _queryHosts = require("./query.hosts.dsl");

var _queryLast_first_seen_host = require("./query.last_first_seen_host.dsl");

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchHostsAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getHosts(request, options) {
    const dsl = (0, _queryHosts.buildHostsQuery)(options);

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
    const totalCount = (0, _fp.getOr)(0, 'aggregations.host_count.value', response);
    const buckets = (0, _fp.getOr)([], 'aggregations.host_data.buckets', response);
    const hostsEdges = buckets.map(bucket => formatHostEdgesData(options.fields, bucket));
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const edges = hostsEdges.splice(cursorStart, querySize - cursorStart);
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

  async getHostOverview(request, options) {
    const dsl = (0, _queryDetail_host.buildHostOverviewQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const aggregations = (0, _fp.get)('aggregations', response) || {};
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    return {
      inspect,
      _id: options.hostName,
      ...formatHostItem(options.fields, aggregations)
    };
  }

  async getHostFirstLastSeen(request, options) {
    const dsl = (0, _queryLast_first_seen_host.buildLastFirstSeenHostQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const aggregations = (0, _fp.get)('aggregations', response) || {};
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    return {
      inspect,
      firstSeen: (0, _fp.get)('firstSeen.value_as_string', aggregations),
      lastSeen: (0, _fp.get)('lastSeen.value_as_string', aggregations)
    };
  }

}

exports.ElasticsearchHostsAdapter = ElasticsearchHostsAdapter;

const formatHostEdgesData = (fields, bucket) => fields.reduce((flattenedFields, fieldName) => {
  const hostId = (0, _fp.get)('key', bucket);
  flattenedFields.node._id = hostId || null;
  flattenedFields.cursor.value = hostId || '';
  const fieldValue = getHostFieldValue(fieldName, bucket);

  if (fieldValue != null) {
    return (0, _fp.set)(`node.${fieldName}`, fieldValue, flattenedFields);
  }

  return flattenedFields;
}, {
  node: {},
  cursor: {
    value: '',
    tiebreaker: null
  }
});

exports.formatHostEdgesData = formatHostEdgesData;

const formatHostItem = (fields, bucket) => fields.reduce((flattenedFields, fieldName) => {
  const fieldValue = getHostFieldValue(fieldName, bucket);

  if (fieldValue != null) {
    return (0, _fp.set)(fieldName, fieldValue, flattenedFields);
  }

  return flattenedFields;
}, {});

const getHostFieldValue = (fieldName, bucket) => {
  const aggField = _ecs_fields.hostFieldsMap[fieldName] ? _ecs_fields.hostFieldsMap[fieldName].replace(/\./g, '_') : fieldName.replace(/\./g, '_');

  if (['host.ip', 'host.mac', 'cloud.instance.id', 'cloud.machine.type', 'cloud.provider', 'cloud.region'].includes(fieldName) && (0, _fp.has)(aggField, bucket)) {
    const data = (0, _fp.get)(aggField, bucket);
    return data.buckets.map(obj => obj.key);
  } else if ((0, _fp.has)(`${aggField}.buckets`, bucket)) {
    return getFirstItem((0, _fp.get)(`${aggField}`, bucket));
  } else if ((0, _fp.has)(aggField, bucket)) {
    const valueObj = (0, _fp.get)(aggField, bucket);
    return valueObj.value_as_string;
  } else if (['host.name', 'host.os.name', 'host.os.version'].includes(fieldName)) {
    switch (fieldName) {
      case 'host.name':
        return (0, _fp.get)('key', bucket) || null;

      case 'host.os.name':
        return (0, _fp.get)('os.hits.hits[0]._source.host.os.name', bucket) || null;

      case 'host.os.version':
        return (0, _fp.get)('os.hits.hits[0]._source.host.os.version', bucket) || null;
    }
  }

  return null;
};

const getFirstItem = data => {
  const firstItem = (0, _fp.head)(data.buckets);

  if (firstItem == null) {
    return null;
  }

  return firstItem.key;
};