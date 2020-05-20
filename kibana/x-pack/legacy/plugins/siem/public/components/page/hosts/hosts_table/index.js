"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostsTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../../store/actions");

var _types = require("../../../../graphql/types");

var _helpers = require("../../../../lib/helpers");

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
var tableType = _store.hostsModel.HostsTableType.hosts;
var rowItems = [{
  text: i18n.ROWS_5,
  numberOfRow: 5
}, {
  text: i18n.ROWS_10,
  numberOfRow: 10
}];

var getSorting = function getSorting(trigger, sortField, direction) {
  return {
    field: getNodeField(sortField),
    direction: direction
  };
};

var HostsTableComponent = _react.default.memo(function (_ref) {
  var activePage = _ref.activePage,
      data = _ref.data,
      direction = _ref.direction,
      fakeTotalCount = _ref.fakeTotalCount,
      id = _ref.id,
      indexPattern = _ref.indexPattern,
      isInspect = _ref.isInspect,
      limit = _ref.limit,
      loading = _ref.loading,
      loadPage = _ref.loadPage,
      showMorePagesIndicator = _ref.showMorePagesIndicator,
      sortField = _ref.sortField,
      totalCount = _ref.totalCount,
      type = _ref.type,
      updateHostsSort = _ref.updateHostsSort,
      updateTableActivePage = _ref.updateTableActivePage,
      updateTableLimit = _ref.updateTableLimit;
  var updateLimitPagination = (0, _react.useCallback)(function (newLimit) {
    return updateTableLimit({
      hostsType: type,
      limit: newLimit,
      tableType: tableType
    });
  }, [type, updateTableLimit]);
  var updateActivePage = (0, _react.useCallback)(function (newPage) {
    return updateTableActivePage({
      activePage: newPage,
      hostsType: type,
      tableType: tableType
    });
  }, [type, updateTableActivePage]);
  var onChange = (0, _react.useCallback)(function (criteria) {
    if (criteria.sort != null) {
      var sort = {
        field: getSortField(criteria.sort.field),
        direction: criteria.sort.direction
      };

      if (sort.direction !== direction || sort.field !== sortField) {
        updateHostsSort({
          sort: sort,
          hostsType: type
        });
      }
    }
  }, [direction, sortField, type, updateHostsSort]);
  var hostsColumns = (0, _react.useMemo)(function () {
    return (0, _columns.getHostsColumns)();
  }, []);
  var sorting = (0, _react.useMemo)(function () {
    return getSorting("".concat(sortField, "-").concat(direction), sortField, direction);
  }, [sortField, direction]);
  return _react.default.createElement(_paginated_table.PaginatedTable, {
    activePage: activePage,
    columns: hostsColumns,
    dataTestSubj: "table-".concat(tableType),
    headerCount: totalCount,
    headerTitle: i18n.HOSTS,
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
    sorting: sorting,
    totalCount: fakeTotalCount,
    updateLimitPagination: updateLimitPagination,
    updateActivePage: updateActivePage
  });
});

HostsTableComponent.displayName = 'HostsTableComponent';

var getSortField = function getSortField(field) {
  switch (field) {
    case 'node.host.name':
      return _types.HostsFields.hostName;

    case 'node.lastSeen':
      return _types.HostsFields.lastSeen;

    default:
      return _types.HostsFields.lastSeen;
  }
};

var getNodeField = function getNodeField(field) {
  switch (field) {
    case _types.HostsFields.hostName:
      return 'node.host.name';

    case _types.HostsFields.lastSeen:
      return 'node.lastSeen';
  }

  (0, _helpers.assertUnreachable)(field);
};

var makeMapStateToProps = function makeMapStateToProps() {
  var getHostsSelector = _store.hostsSelectors.hostsSelector();

  var mapStateToProps = function mapStateToProps(state, _ref2) {
    var type = _ref2.type;
    return getHostsSelector(state, type);
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  updateHostsSort: _actions.hostsActions.updateHostsSort,
  updateTableActivePage: _actions.hostsActions.updateTableActivePage,
  updateTableLimit: _actions.hostsActions.updateTableLimit
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var HostsTable = connector(HostsTableComponent);
exports.HostsTable = HostsTable;
HostsTable.displayName = 'HostsTable';