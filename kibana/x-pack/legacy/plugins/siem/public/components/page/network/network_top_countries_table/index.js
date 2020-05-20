"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkTopCountriesTable = exports.NetworkTopCountriesTableId = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _actions = require("../../../../store/actions");

var _types = require("../../../../graphql/types");

var _store = require("../../../../store");

var _paginated_table = require("../../../paginated_table");

var _columns = require("./columns");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var rowItems = [{
  text: i18n.ROWS_5,
  numberOfRow: 5
}, {
  text: i18n.ROWS_10,
  numberOfRow: 10
}];
var NetworkTopCountriesTableId = 'networkTopCountries-top-talkers';
exports.NetworkTopCountriesTableId = NetworkTopCountriesTableId;

var NetworkTopCountriesTableComponent = _react.default.memo(function (_ref) {
  var activePage = _ref.activePage,
      data = _ref.data,
      fakeTotalCount = _ref.fakeTotalCount,
      flowTargeted = _ref.flowTargeted,
      id = _ref.id,
      indexPattern = _ref.indexPattern,
      isInspect = _ref.isInspect,
      limit = _ref.limit,
      loading = _ref.loading,
      loadPage = _ref.loadPage,
      showMorePagesIndicator = _ref.showMorePagesIndicator,
      sort = _ref.sort,
      totalCount = _ref.totalCount,
      type = _ref.type,
      updateNetworkTable = _ref.updateNetworkTable;
  var tableType;
  var headerTitle = flowTargeted === _types.FlowTargetSourceDest.source ? i18n.SOURCE_COUNTRIES : i18n.DESTINATION_COUNTRIES;

  if (type === _store.networkModel.NetworkType.page) {
    tableType = flowTargeted === _types.FlowTargetSourceDest.source ? _store.networkModel.NetworkTableType.topCountriesSource : _store.networkModel.NetworkTableType.topCountriesDestination;
  } else {
    tableType = flowTargeted === _types.FlowTargetSourceDest.source ? _store.networkModel.IpDetailsTableType.topCountriesSource : _store.networkModel.IpDetailsTableType.topCountriesDestination;
  }

  var field = sort.field === _types.NetworkTopTablesFields.bytes_out || sort.field === _types.NetworkTopTablesFields.bytes_in ? "node.network.".concat(sort.field) : "node.".concat(flowTargeted, ".").concat(sort.field);
  var updateLimitPagination = (0, _react.useCallback)(function (newLimit) {
    return updateNetworkTable({
      networkType: type,
      tableType: tableType,
      updates: {
        limit: newLimit
      }
    });
  }, [type, updateNetworkTable, tableType]);
  var updateActivePage = (0, _react.useCallback)(function (newPage) {
    return updateNetworkTable({
      networkType: type,
      tableType: tableType,
      updates: {
        activePage: newPage
      }
    });
  }, [type, updateNetworkTable, tableType]);
  var onChange = (0, _react.useCallback)(function (criteria) {
    if (criteria.sort != null) {
      var splitField = criteria.sort.field.split('.');
      var lastField = (0, _fp.last)(splitField);
      var newSortDirection = lastField !== sort.field ? _types.Direction.desc : criteria.sort.direction; // sort by desc on init click

      var newTopCountriesSort = {
        field: lastField,
        direction: newSortDirection
      };

      if (!(0, _fastDeepEqual.default)(newTopCountriesSort, sort)) {
        updateNetworkTable({
          networkType: type,
          tableType: tableType,
          updates: {
            sort: newTopCountriesSort
          }
        });
      }
    }
  }, [type, sort, tableType, updateNetworkTable]);
  var columns = (0, _react.useMemo)(function () {
    return (0, _columns.getCountriesColumnsCurated)(indexPattern, flowTargeted, type, NetworkTopCountriesTableId);
  }, [indexPattern, flowTargeted, type]);
  return _react.default.createElement(_paginated_table.PaginatedTable, {
    activePage: activePage,
    columns: columns,
    dataTestSubj: "table-".concat(tableType),
    headerCount: totalCount,
    headerTitle: headerTitle,
    headerUnit: i18n.UNIT(totalCount),
    id: id,
    isInspect: isInspect,
    itemsPerRow: rowItems,
    limit: limit,
    loading: loading,
    loadPage: loadPage,
    onChange: onChange,
    pageOfItems: data,
    showMorePagesIndicator: showMorePagesIndicator,
    sorting: {
      field: field,
      direction: sort.direction
    },
    totalCount: fakeTotalCount,
    updateActivePage: updateActivePage,
    updateLimitPagination: updateLimitPagination
  });
});

NetworkTopCountriesTableComponent.displayName = 'NetworkTopCountriesTableComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getTopCountriesSelector = _store.networkSelectors.topCountriesSelector();

  return function (state, _ref2) {
    var type = _ref2.type,
        flowTargeted = _ref2.flowTargeted;
    return getTopCountriesSelector(state, type, flowTargeted);
  };
};

var mapDispatchToProps = {
  updateNetworkTable: _actions.networkActions.updateNetworkTable
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var NetworkTopCountriesTable = connector(NetworkTopCountriesTableComponent);
exports.NetworkTopCountriesTable = NetworkTopCountriesTable;