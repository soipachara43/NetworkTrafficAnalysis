"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewNetworkQuery = exports.OverviewNetworkComponentQuery = exports.ID = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _reactRedux = require("react-redux");

var _constants = require("../../../../common/constants");

var _kibana = require("../../../lib/kibana");

var _inputs = require("../../../store/inputs");

var _helpers = require("../../helpers");

var _index = require("./index.gql_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ID = 'overviewNetworkQuery';
exports.ID = ID;

var OverviewNetworkComponentQuery = _react.default.memo(function (_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? ID : _ref$id,
      children = _ref.children,
      filterQuery = _ref.filterQuery,
      isInspected = _ref.isInspected,
      sourceId = _ref.sourceId,
      startDate = _ref.startDate,
      endDate = _ref.endDate;
  return _react.default.createElement(_reactApollo.Query, {
    query: _index.overviewNetworkQuery,
    fetchPolicy: (0, _helpers.getDefaultFetchPolicy)(),
    notifyOnNetworkStatusChange: true,
    variables: {
      sourceId: sourceId,
      timerange: {
        interval: '12h',
        from: startDate,
        to: endDate
      },
      filterQuery: (0, _helpers.createFilter)(filterQuery),
      defaultIndex: (0, _kibana.useUiSetting)(_constants.DEFAULT_INDEX_KEY),
      inspect: isInspected
    }
  }, function (_ref2) {
    var data = _ref2.data,
        loading = _ref2.loading,
        refetch = _ref2.refetch;
    var overviewNetwork = (0, _fp.getOr)({}, "source.OverviewNetwork", data);
    return children({
      id: id,
      inspect: (0, _fp.getOr)(null, 'source.OverviewNetwork.inspect', data),
      overviewNetwork: overviewNetwork,
      loading: loading,
      refetch: refetch
    });
  });
});

exports.OverviewNetworkComponentQuery = OverviewNetworkComponentQuery;
OverviewNetworkComponentQuery.displayName = 'OverviewNetworkComponentQuery';

var makeMapStateToProps = function makeMapStateToProps() {
  var getQuery = _inputs.inputsSelectors.globalQueryByIdSelector();

  var mapStateToProps = function mapStateToProps(state, _ref3) {
    var _ref3$id = _ref3.id,
        id = _ref3$id === void 0 ? ID : _ref3$id;

    var _getQuery = getQuery(state, id),
        isInspected = _getQuery.isInspected;

    return {
      isInspected: isInspected
    };
  };

  return mapStateToProps;
};

var connector = (0, _reactRedux.connect)(makeMapStateToProps);
var OverviewNetworkQuery = connector(OverviewNetworkComponentQuery);
exports.OverviewNetworkQuery = OverviewNetworkQuery;