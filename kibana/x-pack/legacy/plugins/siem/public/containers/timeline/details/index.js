"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineDetailsQuery = void 0;

var _fp = require("lodash/fp");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _constants = require("../../../../common/constants");

var _kibana = require("../../../lib/kibana");

var _index = require("./index.gql_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDetailsEvent = (0, _memoizeOne.default)(function (variables, detail) {
  return detail;
});

var TimelineDetailsQueryComponent = function TimelineDetailsQueryComponent(_ref) {
  var children = _ref.children,
      indexName = _ref.indexName,
      eventId = _ref.eventId,
      executeQuery = _ref.executeQuery,
      sourceId = _ref.sourceId;
  var variables = {
    sourceId: sourceId,
    indexName: indexName,
    eventId: eventId,
    defaultIndex: (0, _kibana.useUiSetting)(_constants.DEFAULT_INDEX_KEY)
  };
  return executeQuery ? _react.default.createElement(_reactApollo.Query, {
    query: _index.timelineDetailsQuery,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: variables
  }, function (_ref2) {
    var data = _ref2.data,
        loading = _ref2.loading,
        refetch = _ref2.refetch;
    return children({
      loading: loading,
      detailsData: getDetailsEvent(JSON.stringify(variables), (0, _fp.getOr)([], 'source.TimelineDetails.data', data))
    });
  }) : children({
    loading: false,
    detailsData: null
  });
};

var TimelineDetailsQuery = _react.default.memo(TimelineDetailsQueryComponent);

exports.TimelineDetailsQuery = TimelineDetailsQuery;