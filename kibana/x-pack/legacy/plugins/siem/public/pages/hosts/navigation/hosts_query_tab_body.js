"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostsQueryTabBody = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _hosts = require("../../../containers/hosts");

var _hosts2 = require("../../../components/page/hosts");

var _manage_query = require("../../../components/page/manage_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HostsTableManage = (0, _manage_query.manageQuery)(_hosts2.HostsTable);

var HostsQueryTabBody = function HostsQueryTabBody(_ref) {
  var deleteQuery = _ref.deleteQuery,
      endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      indexPattern = _ref.indexPattern,
      skip = _ref.skip,
      setQuery = _ref.setQuery,
      startDate = _ref.startDate,
      type = _ref.type;
  return _react.default.createElement(_hosts.HostsQuery, {
    endDate: endDate,
    filterQuery: filterQuery,
    skip: skip,
    sourceId: "default",
    startDate: startDate,
    type: type
  }, function (_ref2) {
    var hosts = _ref2.hosts,
        totalCount = _ref2.totalCount,
        loading = _ref2.loading,
        pageInfo = _ref2.pageInfo,
        loadPage = _ref2.loadPage,
        id = _ref2.id,
        inspect = _ref2.inspect,
        isInspected = _ref2.isInspected,
        refetch = _ref2.refetch;
    return _react.default.createElement(HostsTableManage, {
      deleteQuery: deleteQuery,
      data: hosts,
      fakeTotalCount: (0, _fp.getOr)(50, 'fakeTotalCount', pageInfo),
      id: id,
      indexPattern: indexPattern,
      inspect: inspect,
      isInspect: isInspected,
      loading: loading,
      loadPage: loadPage,
      refetch: refetch,
      setQuery: setQuery,
      showMorePagesIndicator: (0, _fp.getOr)(false, 'showMorePagesIndicator', pageInfo),
      totalCount: totalCount,
      type: type
    });
  });
};

exports.HostsQueryTabBody = HostsQueryTabBody;
HostsQueryTabBody.displayName = 'HostsQueryTabBody';