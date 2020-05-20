"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UncommonProcessQueryTabBody = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _uncommon_processes = require("../../../containers/uncommon_processes");

var _hosts = require("../../../components/page/hosts");

var _manage_query = require("../../../components/page/manage_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UncommonProcessTableManage = (0, _manage_query.manageQuery)(_hosts.UncommonProcessTable);

var UncommonProcessQueryTabBody = function UncommonProcessQueryTabBody(_ref) {
  var deleteQuery = _ref.deleteQuery,
      endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      skip = _ref.skip,
      setQuery = _ref.setQuery,
      startDate = _ref.startDate,
      type = _ref.type;
  return _react.default.createElement(_uncommon_processes.UncommonProcessesQuery, {
    endDate: endDate,
    filterQuery: filterQuery,
    skip: skip,
    sourceId: "default",
    startDate: startDate,
    type: type
  }, function (_ref2) {
    var uncommonProcesses = _ref2.uncommonProcesses,
        totalCount = _ref2.totalCount,
        loading = _ref2.loading,
        pageInfo = _ref2.pageInfo,
        loadPage = _ref2.loadPage,
        id = _ref2.id,
        inspect = _ref2.inspect,
        isInspected = _ref2.isInspected,
        refetch = _ref2.refetch;
    return _react.default.createElement(UncommonProcessTableManage, {
      deleteQuery: deleteQuery,
      data: uncommonProcesses,
      fakeTotalCount: (0, _fp.getOr)(50, 'fakeTotalCount', pageInfo),
      id: id,
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

exports.UncommonProcessQueryTabBody = UncommonProcessQueryTabBody;
UncommonProcessQueryTabBody.dispalyName = 'UncommonProcessQueryTabBody';