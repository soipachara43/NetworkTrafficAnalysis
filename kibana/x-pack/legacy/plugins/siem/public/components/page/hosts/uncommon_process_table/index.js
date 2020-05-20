"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUncommonColumnsCurated = exports.getHostNames = exports.UncommonProcessTable = exports.getArgs = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = require("../../../../store/actions");

var _store = require("../../../../store");

var _empty_value = require("../../../empty_value");

var _links = require("../../../links");

var _paginated_table = require("../../../paginated_table");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers = require("../../../tables/helpers");

var _model = require("../../../../store/hosts/model");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var tableType = _store.hostsModel.HostsTableType.uncommonProcesses;
var rowItems = [{
  text: i18n.ROWS_5,
  numberOfRow: 5
}, {
  text: i18n.ROWS_10,
  numberOfRow: 10
}];

var getArgs = function getArgs(args) {
  if (args != null && args.length !== 0) {
    return args.join(' ');
  } else {
    return null;
  }
};

exports.getArgs = getArgs;

var UncommonProcessTableComponent = _react.default.memo(function (_ref) {
  var activePage = _ref.activePage,
      data = _ref.data,
      fakeTotalCount = _ref.fakeTotalCount,
      id = _ref.id,
      isInspect = _ref.isInspect,
      limit = _ref.limit,
      loading = _ref.loading,
      loadPage = _ref.loadPage,
      totalCount = _ref.totalCount,
      showMorePagesIndicator = _ref.showMorePagesIndicator,
      updateTableActivePage = _ref.updateTableActivePage,
      updateTableLimit = _ref.updateTableLimit,
      type = _ref.type;
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
  var columns = (0, _react.useMemo)(function () {
    return getUncommonColumnsCurated(type);
  }, [type]);
  return _react.default.createElement(_paginated_table.PaginatedTable, {
    activePage: activePage,
    columns: columns,
    dataTestSubj: "table-".concat(tableType),
    headerCount: totalCount,
    headerTitle: i18n.UNCOMMON_PROCESSES,
    headerUnit: i18n.UNIT(totalCount),
    id: id,
    isInspect: isInspect,
    itemsPerRow: rowItems,
    limit: limit,
    loading: loading,
    loadPage: loadPage,
    pageOfItems: data,
    showMorePagesIndicator: showMorePagesIndicator,
    totalCount: fakeTotalCount,
    updateLimitPagination: updateLimitPagination,
    updateActivePage: updateActivePage
  });
});

UncommonProcessTableComponent.displayName = 'UncommonProcessTableComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getUncommonProcessesSelector = _store.hostsSelectors.uncommonProcessesSelector();

  return function (state, _ref2) {
    var type = _ref2.type;
    return getUncommonProcessesSelector(state, type);
  };
};

var mapDispatchToProps = {
  updateTableActivePage: _actions.hostsActions.updateTableActivePage,
  updateTableLimit: _actions.hostsActions.updateTableLimit
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var UncommonProcessTable = connector(UncommonProcessTableComponent);
exports.UncommonProcessTable = UncommonProcessTable;
UncommonProcessTable.displayName = 'UncommonProcessTable';

var getUncommonColumns = function getUncommonColumns() {
  return [{
    name: i18n.NAME,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref3) {
      var node = _ref3.node;
      return (0, _helpers.getRowItemDraggables)({
        rowItems: node.process.name,
        attrName: 'process.name',
        idPrefix: "uncommon-process-table-".concat(node._id, "-processName")
      });
    },
    width: '20%'
  }, {
    align: 'right',
    name: i18n.NUMBER_OF_HOSTS,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref4) {
      var node = _ref4.node;
      return _react.default.createElement(_react.default.Fragment, null, node.hosts != null ? node.hosts.length : (0, _empty_value.getEmptyValue)());
    },
    width: '8%'
  }, {
    align: 'right',
    name: i18n.NUMBER_OF_INSTANCES,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref5) {
      var node = _ref5.node;
      return (0, _empty_value.defaultToEmptyTag)(node.instances);
    },
    width: '8%'
  }, {
    name: i18n.HOSTS,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref6) {
      var node = _ref6.node;
      return (0, _helpers.getRowItemDraggables)({
        rowItems: getHostNames(node),
        attrName: 'host.name',
        idPrefix: "uncommon-process-table-".concat(node._id, "-processHost"),
        render: function render(item) {
          return _react.default.createElement(_links.HostDetailsLink, {
            hostName: item
          });
        }
      });
    },
    width: '25%'
  }, {
    name: i18n.LAST_COMMAND,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref7) {
      var node = _ref7.node;
      return (0, _helpers.getRowItemDraggables)({
        rowItems: node.process != null ? node.process.args : null,
        attrName: 'process.args',
        idPrefix: "uncommon-process-table-".concat(node._id, "-processArgs"),
        displayCount: 1 // TODO: Change this back once we have improved the UI

      });
    },
    width: '25%'
  }, {
    name: i18n.LAST_USER,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref8) {
      var node = _ref8.node;
      return (0, _helpers.getRowItemDraggables)({
        rowItems: node.user != null ? node.user.name : null,
        attrName: 'user.name',
        idPrefix: "uncommon-process-table-".concat(node._id, "-processUser")
      });
    }
  }];
};

var getHostNames = function getHostNames(node) {
  if (node.hosts != null) {
    return node.hosts.filter(function (host) {
      return host.name != null && host.name[0] != null;
    }).map(function (host) {
      return host.name != null && host.name[0] != null ? host.name[0] : '';
    });
  } else {
    return [];
  }
};

exports.getHostNames = getHostNames;

var getUncommonColumnsCurated = function getUncommonColumnsCurated(pageType) {
  var columns = getUncommonColumns();

  if (pageType === _model.HostsType.details) {
    return [i18n.HOSTS, i18n.NUMBER_OF_HOSTS].reduce(function (acc, name) {
      acc.splice(acc.findIndex(function (column) {
        return column.name === name;
      }), 1);
      return acc;
    }, columns);
  } else {
    return columns;
  }
};

exports.getUncommonColumnsCurated = getUncommonColumnsCurated;