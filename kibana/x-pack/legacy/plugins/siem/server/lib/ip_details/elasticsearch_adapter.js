"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersEdges = exports.getIpOverviewHostAgg = exports.getIpOverviewAgg = exports.ElasticsearchIpDetailsAdapter = void 0;

var _fp = require("lodash/fp");

var _build_query = require("../../utils/build_query");

var _constants = require("../../../common/constants");

var _query_overview = require("./query_overview.dsl");

var _query_users = require("./query_users.dsl");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ElasticsearchIpDetailsAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getIpDetails(request, options) {
    const dsl = (0, _query_overview.buildOverviewQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const inspect = {
      dsl: [(0, _build_query.inspectStringifyObject)(dsl)],
      response: [(0, _build_query.inspectStringifyObject)(response)]
    };
    return {
      inspect,
      ...getIpOverviewAgg('source', (0, _fp.getOr)({}, 'aggregations.source', response)),
      ...getIpOverviewAgg('destination', (0, _fp.getOr)({}, 'aggregations.destination', response)),
      ...getIpOverviewHostAgg((0, _fp.getOr)({}, 'aggregations.host', response))
    };
  }

  async getUsers(request, options) {
    if (options.pagination && options.pagination.querySize >= _constants.DEFAULT_MAX_TABLE_QUERY_SIZE) {
      throw new Error(`No query size above ${_constants.DEFAULT_MAX_TABLE_QUERY_SIZE}`);
    }

    const dsl = (0, _query_users.buildUsersQuery)(options);
    const response = await this.framework.callWithRequest(request, 'search', dsl);
    const {
      activePage,
      cursorStart,
      fakePossibleCount,
      querySize
    } = options.pagination;
    const totalCount = (0, _fp.getOr)(0, 'aggregations.user_count.value', response);
    const usersEdges = getUsersEdges(response);
    const fakeTotalCount = fakePossibleCount <= totalCount ? fakePossibleCount : totalCount;
    const edges = usersEdges.splice(cursorStart, querySize - cursorStart);
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

exports.ElasticsearchIpDetailsAdapter = ElasticsearchIpDetailsAdapter;

const getIpOverviewAgg = (type, overviewHit) => {
  const firstSeen = (0, _fp.getOr)(null, `firstSeen.value_as_string`, overviewHit);
  const lastSeen = (0, _fp.getOr)(null, `lastSeen.value_as_string`, overviewHit);
  const autonomousSystem = (0, _fp.getOr)(null, `as.results.hits.hits[0]._source.${type}.as`, overviewHit);
  const geoFields = (0, _fp.getOr)(null, `geo.results.hits.hits[0]._source.${type}.geo`, overviewHit);
  return {
    [type]: {
      firstSeen,
      lastSeen,
      autonomousSystem: { ...autonomousSystem
      },
      geo: { ...geoFields
      }
    }
  };
};

exports.getIpOverviewAgg = getIpOverviewAgg;

const getIpOverviewHostAgg = overviewHostHit => {
  const hostFields = (0, _fp.getOr)(null, `results.hits.hits[0]._source.host`, overviewHostHit);
  return {
    host: { ...hostFields
    }
  };
};

exports.getIpOverviewHostAgg = getIpOverviewHostAgg;

const getUsersEdges = response => (0, _fp.getOr)([], `aggregations.users.buckets`, response).map(bucket => ({
  node: {
    _id: bucket.key,
    user: {
      id: (0, _fp.getOr)([], 'id.buckets', bucket).map(id => id.key),
      name: bucket.key,
      groupId: (0, _fp.getOr)([], 'groupId.buckets', bucket).map(groupId => groupId.key),
      groupName: (0, _fp.getOr)([], 'groupName.buckets', bucket).map(groupName => groupName.key),
      count: (0, _fp.get)('doc_count', bucket)
    }
  },
  cursor: {
    value: bucket.key,
    tiebreaker: null
  }
}));

exports.getUsersEdges = getUsersEdges;