"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KpiNetworkQuery = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _reactApollo = require("react-apollo");

var _reactRedux = require("react-redux");

var _constants = require("../../../common/constants");

var _store = require("../../store");

var _kibana = require("../../lib/kibana");

var _helpers = require("../helpers");

var _index = require("./index.gql_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ID = 'kpiNetworkQuery';

var KpiNetworkComponentQuery = _react.default.memo(function (_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? ID : _ref$id,
      children = _ref.children,
      filterQuery = _ref.filterQuery,
      isInspected = _ref.isInspected,
      skip = _ref.skip,
      sourceId = _ref.sourceId,
      startDate = _ref.startDate,
      endDate = _ref.endDate;
  return _react.default.createElement(_reactApollo.Query, {
    query: _index.kpiNetworkQuery,
    fetchPolicy: (0, _helpers.getDefaultFetchPolicy)(),
    notifyOnNetworkStatusChange: true,
    skip: skip,
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
    var kpiNetwork = (0, _fp.getOr)({}, "source.KpiNetwork", data);
    return children({
      id: id,
      inspect: (0, _fp.getOr)(null, 'source.KpiNetwork.inspect', data),
      kpiNetwork: kpiNetwork,
      loading: loading,
      refetch: refetch
    });
  });
});

KpiNetworkComponentQuery.displayName = 'KpiNetworkComponentQuery';

var makeMapStateToProps = function makeMapStateToProps() {
  var getQuery = _store.inputsSelectors.globalQueryByIdSelector();

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
var KpiNetworkQuery = connector(KpiNetworkComponentQuery);
exports.KpiNetworkQuery = KpiNetworkQuery;