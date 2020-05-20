"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refetchQueries = void 0;

var _index = require("../../containers/timeline/all/index.gql_query");

var _types = require("../../graphql/types");

var _constants = require("../../components/open_timeline/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var refetchQueries = [{
  query: _index.allTimelinesQuery,
  variables: {
    search: '',
    pageInfo: {
      pageIndex: 1,
      pageSize: 10
    },
    sort: {
      sortField: _constants.DEFAULT_SORT_FIELD,
      sortOrder: _types.Direction.desc
    },
    onlyUserFavorite: false
  }
}];
exports.refetchQueries = refetchQueries;