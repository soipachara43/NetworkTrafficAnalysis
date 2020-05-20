"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkHttpTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../../store/actions");

var _types = require("../../../../graphql/types");

var _store = require("../../../../store");

var _paginated_table = require("../../../paginated_table");

var _columns = require("./columns");

var i18n = _interopRequireWildcard(require("./translations"));

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

var NetworkHttpTableComponent = function NetworkHttpTableComponent(_ref) {
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
  var tableType = type === _store.networkModel.NetworkType.page ? _store.networkModel.NetworkTableType.http : _store.networkModel.IpDetailsTableType.http;
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
    if (criteria.sort != null && criteria.sort.direction !== sort.direction) {
      updateNetworkTable({
        networkType: type,
        tableType: tableType,
        updates: {
          sort: {
            direction: criteria.sort.direction
          }
        }
      });
    }
  }, [tableType, sort.direction, type, updateNetworkTable]);
  var sorting = {
    field: "node.".concat(_types.NetworkHttpFields.requestCount),
    direction: sort.direction
  };
  var columns = (0, _react.useMemo)(function () {
    return (0, _columns.getNetworkHttpColumns)(tableType);
  }, [tableType]);
  return _react.default.createElement(_paginated_table.PaginatedTable, {
    activePage: activePage,
    columns: columns,
    dataTestSubj: "table-".concat(tableType),
    headerCount: totalCount,
    headerTitle: i18n.HTTP_REQUESTS,
    headerUnit: i18n.UNIT(totalCount),
    id: id,
    itemsPerRow: rowItems,
    isInspect: isInspect,
    limit: limit,
    loading: loading,
    loadPage: loadPage,
    onChange: onChange,
    pageOfItems: data,
    showMorePagesIndicator: showMorePagesIndicator,
    sorting: sorting,
    totalCount: fakeTotalCount,
    updateActivePage: updateActivePage,
    updateLimitPagination: updateLimitPagination
  });
};

NetworkHttpTableComponent.displayName = 'NetworkHttpTableComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getNetworkHttpSelector = _store.networkSelectors.httpSelector();

  var mapStateToProps = function mapStateToProps(state, _ref2) {
    var type = _ref2.type;
    return getNetworkHttpSelector(state, type);
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  updateNetworkTable: _actions.networkActions.updateNetworkTable
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var NetworkHttpTable = connector(_react.default.memo(NetworkHttpTableComponent));
exports.NetworkHttpTable = NetworkHttpTable;