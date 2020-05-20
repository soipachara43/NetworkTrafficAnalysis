"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TlsQueryTabBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _fp = require("lodash/fp");

var _manage_query = require("../../../components/page/manage_query");

var _tls = require("../../../containers/tls");

var _tls_table = require("../../../components/page/network/tls_table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TlsTableManage = (0, _manage_query.manageQuery)(_tls_table.TlsTable);

var TlsQueryTabBody = function TlsQueryTabBody(_ref) {
  var endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      flowTarget = _ref.flowTarget,
      _ref$ip = _ref.ip,
      ip = _ref$ip === void 0 ? '' : _ref$ip,
      setQuery = _ref.setQuery,
      skip = _ref.skip,
      startDate = _ref.startDate,
      type = _ref.type;
  return _react.default.createElement(_tls.TlsQuery, {
    endDate: endDate,
    filterQuery: filterQuery,
    flowTarget: flowTarget,
    ip: ip,
    skip: skip,
    sourceId: "default",
    startDate: startDate,
    type: type
  }, function (_ref2) {
    var id = _ref2.id,
        inspect = _ref2.inspect,
        isInspected = _ref2.isInspected,
        tls = _ref2.tls,
        totalCount = _ref2.totalCount,
        pageInfo = _ref2.pageInfo,
        loading = _ref2.loading,
        loadPage = _ref2.loadPage,
        refetch = _ref2.refetch;
    return _react.default.createElement(TlsTableManage, {
      data: tls,
      id: id,
      inspect: inspect,
      isInspect: isInspected,
      fakeTotalCount: (0, _fp.getOr)(50, 'fakeTotalCount', pageInfo),
      loading: loading,
      loadPage: loadPage,
      showMorePagesIndicator: (0, _fp.getOr)(false, 'showMorePagesIndicator', pageInfo),
      refetch: refetch,
      setQuery: setQuery,
      totalCount: totalCount,
      type: type
    });
  });
};

exports.TlsQueryTabBody = TlsQueryTabBody;