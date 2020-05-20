"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkDnsTable = exports.NetworkDnsTableComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _actions = require("../../../../store/actions");

var _store = require("../../../../store");

var _paginated_table = require("../../../paginated_table");

var _columns = require("./columns");

var _is_ptr_included = require("./is_ptr_included");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var tableType = _store.networkModel.NetworkTableType.dns;
var rowItems = [{
  text: i18n.ROWS_5,
  numberOfRow: 5
}, {
  text: i18n.ROWS_10,
  numberOfRow: 10
}];

var NetworkDnsTableComponent = _react.default.memo(function (_ref) {
  var activePage = _ref.activePage,
      data = _ref.data,
      fakeTotalCount = _ref.fakeTotalCount,
      id = _ref.id,
      isInspect = _ref.isInspect,
      isPtrIncluded = _ref.isPtrIncluded,
      limit = _ref.limit,
      loading = _ref.loading,
      loadPage = _ref.loadPage,
      showMorePagesIndicator = _ref.showMorePagesIndicator,
      sort = _ref.sort,
      totalCount = _ref.totalCount,
      type = _ref.type,
      updateNetworkTable = _ref.updateNetworkTable;
  var updateLimitPagination = (0, _react.useCallback)(function (newLimit) {
    return updateNetworkTable({
      networkType: type,
      tableType: tableType,
      updates: {
        limit: newLimit
      }
    });
  }, [type, updateNetworkTable]);
  var updateActivePage = (0, _react.useCallback)(function (newPage) {
    return updateNetworkTable({
      networkType: type,
      tableType: tableType,
      updates: {
        activePage: newPage
      }
    });
  }, [type, updateNetworkTable]);
  var onChange = (0, _react.useCallback)(function (criteria) {
    if (criteria.sort != null) {
      var newDnsSortField = {
        field: criteria.sort.field.split('.')[1],
        direction: criteria.sort.direction
      };

      if (!(0, _fastDeepEqual.default)(newDnsSortField, sort)) {
        updateNetworkTable({
          networkType: type,
          tableType: tableType,
          updates: {
            sort: newDnsSortField
          }
        });
      }
    }
  }, [sort, type, updateNetworkTable]);
  var onChangePtrIncluded = (0, _react.useCallback)(function () {
    return updateNetworkTable({
      networkType: type,
      tableType: tableType,
      updates: {
        isPtrIncluded: !isPtrIncluded
      }
    });
  }, [type, updateNetworkTable, isPtrIncluded]);
  var columns = (0, _react.useMemo)(function () {
    return (0, _columns.getNetworkDnsColumns)();
  }, []);
  return _react.default.createElement(_paginated_table.PaginatedTable, {
    activePage: activePage,
    columns: columns,
    dataTestSubj: "table-".concat(tableType),
    headerCount: totalCount,
    headerSupplement: _react.default.createElement(_is_ptr_included.IsPtrIncluded, {
      isPtrIncluded: isPtrIncluded,
      onChange: onChangePtrIncluded
    }),
    headerTitle: i18n.TOP_DNS_DOMAINS,
    headerTooltip: i18n.TOOLTIP,
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
    sorting: {
      field: "node.".concat(sort.field),
      direction: sort.direction
    },
    totalCount: fakeTotalCount,
    updateActivePage: updateActivePage,
    updateLimitPagination: updateLimitPagination
  });
});

exports.NetworkDnsTableComponent = NetworkDnsTableComponent;
NetworkDnsTableComponent.displayName = 'NetworkDnsTableComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getNetworkDnsSelector = _store.networkSelectors.dnsSelector();

  var mapStateToProps = function mapStateToProps(state) {
    return getNetworkDnsSelector(state);
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  updateNetworkTable: _actions.networkActions.updateNetworkTable
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var NetworkDnsTable = connector(NetworkDnsTableComponent);
exports.NetworkDnsTable = NetworkDnsTable;