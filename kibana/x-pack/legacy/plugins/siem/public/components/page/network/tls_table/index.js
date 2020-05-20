"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TlsTable = exports.tlsTableId = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _network = require("../../../../store/network");

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
var tlsTableId = 'tls-table';
exports.tlsTableId = tlsTableId;

var TlsTableComponent = _react.default.memo(function (_ref) {
  var activePage = _ref.activePage,
      data = _ref.data,
      fakeTotalCount = _ref.fakeTotalCount,
      id = _ref.id,
      isInspect = _ref.isInspect,
      limit = _ref.limit,
      loading = _ref.loading,
      loadPage = _ref.loadPage,
      showMorePagesIndicator = _ref.showMorePagesIndicator,
      sort = _ref.sort,
      totalCount = _ref.totalCount,
      type = _ref.type,
      updateNetworkTable = _ref.updateNetworkTable;
  var tableType = type === _store.networkModel.NetworkType.page ? _store.networkModel.NetworkTableType.tls : _store.networkModel.IpDetailsTableType.tls;
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
      var newTlsSort = {
        field: getSortFromString(splitField[splitField.length - 1]),
        direction: criteria.sort.direction
      };

      if (!(0, _fastDeepEqual.default)(newTlsSort, sort)) {
        updateNetworkTable({
          networkType: type,
          tableType: tableType,
          updates: {
            sort: newTlsSort
          }
        });
      }
    }
  }, [sort, type, tableType, updateNetworkTable]);
  var columns = (0, _react.useMemo)(function () {
    return (0, _columns.getTlsColumns)(tlsTableId);
  }, [tlsTableId]);
  return _react.default.createElement(_paginated_table.PaginatedTable, {
    activePage: activePage,
    columns: columns,
    dataTestSubj: "table-".concat(tableType),
    showMorePagesIndicator: showMorePagesIndicator,
    headerCount: totalCount,
    headerTitle: i18n.TRANSPORT_LAYER_SECURITY,
    headerUnit: i18n.UNIT(totalCount),
    id: id,
    isInspect: isInspect,
    itemsPerRow: rowItems,
    limit: limit,
    loading: loading,
    loadPage: loadPage,
    onChange: onChange,
    pageOfItems: data,
    sorting: getSortField(sort),
    totalCount: fakeTotalCount,
    updateActivePage: updateActivePage,
    updateLimitPagination: updateLimitPagination
  });
});

TlsTableComponent.displayName = 'TlsTableComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getTlsSelector = _store.networkSelectors.tlsSelector();

  return function (state, _ref2) {
    var type = _ref2.type;
    return getTlsSelector(state, type);
  };
};

var mapDispatchToProps = {
  updateNetworkTable: _network.networkActions.updateNetworkTable
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var TlsTable = connector(TlsTableComponent);
exports.TlsTable = TlsTable;

var getSortField = function getSortField(sortField) {
  return {
    field: "node.".concat(sortField.field),
    direction: sortField.direction
  };
};

var getSortFromString = function getSortFromString(sortField) {
  switch (sortField) {
    case '_id':
      return _types.TlsFields._id;

    default:
      return _types.TlsFields._id;
  }
};