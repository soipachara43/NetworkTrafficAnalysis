"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IPsQueryTabBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _fp = require("lodash/fp");

var _network = require("../../../components/page/network");

var _network_top_n_flow = require("../../../containers/network_top_n_flow");

var _store = require("../../../store");

var _manage_query = require("../../../components/page/manage_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NetworkTopNFlowTableManage = (0, _manage_query.manageQuery)(_network.NetworkTopNFlowTable);

var IPsQueryTabBody = function IPsQueryTabBody(_ref) {
  var endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      skip = _ref.skip,
      startDate = _ref.startDate,
      setQuery = _ref.setQuery,
      flowTarget = _ref.flowTarget;
  return _react.default.createElement(_network_top_n_flow.NetworkTopNFlowQuery, {
    endDate: endDate,
    flowTarget: flowTarget,
    filterQuery: filterQuery,
    skip: skip,
    sourceId: "default",
    startDate: startDate,
    type: _store.networkModel.NetworkType.page
  }, function (_ref2) {
    var id = _ref2.id,
        inspect = _ref2.inspect,
        isInspected = _ref2.isInspected,
        loading = _ref2.loading,
        loadPage = _ref2.loadPage,
        networkTopNFlow = _ref2.networkTopNFlow,
        pageInfo = _ref2.pageInfo,
        refetch = _ref2.refetch,
        totalCount = _ref2.totalCount;
    return _react.default.createElement(NetworkTopNFlowTableManage, {
      data: networkTopNFlow,
      fakeTotalCount: (0, _fp.getOr)(50, 'fakeTotalCount', pageInfo),
      flowTargeted: flowTarget,
      id: id,
      inspect: inspect,
      isInspect: isInspected,
      loading: loading,
      loadPage: loadPage,
      refetch: refetch,
      setQuery: setQuery,
      showMorePagesIndicator: (0, _fp.getOr)(false, 'showMorePagesIndicator', pageInfo),
      totalCount: totalCount,
      type: _store.networkModel.NetworkType.page
    });
  });
};

exports.IPsQueryTabBody = IPsQueryTabBody;
IPsQueryTabBody.displayName = 'IPsQueryTabBody';