"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthenticationColumnsCurated = exports.AuthenticationTable = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _hosts = require("../../../../store/hosts");

var _store = require("../../../../store");

var _draggable_wrapper = require("../../../drag_and_drop/draggable_wrapper");

var _helpers = require("../../../drag_and_drop/helpers");

var _empty_value = require("../../../empty_value");

var _formatted_date = require("../../../formatted_date");

var _links = require("../../../links");

var _paginated_table = require("../../../paginated_table");

var _data_provider = require("../../../timeline/data_providers/data_provider");

var _provider = require("../../../timeline/data_providers/provider");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers2 = require("../../../tables/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var tableType = _store.hostsModel.HostsTableType.authentications;
var rowItems = [{
  text: i18n.ROWS_5,
  numberOfRow: 5
}, {
  text: i18n.ROWS_10,
  numberOfRow: 10
}];

var AuthenticationTableComponent = _react.default.memo(function (_ref) {
  var activePage = _ref.activePage,
      data = _ref.data,
      fakeTotalCount = _ref.fakeTotalCount,
      id = _ref.id,
      isInspect = _ref.isInspect,
      limit = _ref.limit,
      loading = _ref.loading,
      loadPage = _ref.loadPage,
      showMorePagesIndicator = _ref.showMorePagesIndicator,
      totalCount = _ref.totalCount,
      type = _ref.type,
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
  var columns = (0, _react.useMemo)(function () {
    return getAuthenticationColumnsCurated(type);
  }, [type]);
  return _react.default.createElement(_paginated_table.PaginatedTable, {
    activePage: activePage,
    columns: columns,
    dataTestSubj: "table-".concat(tableType),
    headerCount: totalCount,
    headerTitle: i18n.AUTHENTICATIONS,
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

AuthenticationTableComponent.displayName = 'AuthenticationTableComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getAuthenticationsSelector = _store.hostsSelectors.authenticationsSelector();

  return function (state, _ref2) {
    var type = _ref2.type;
    return getAuthenticationsSelector(state, type);
  };
};

var mapDispatchToProps = {
  updateTableActivePage: _hosts.hostsActions.updateTableActivePage,
  updateTableLimit: _hosts.hostsActions.updateTableLimit
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var AuthenticationTable = connector(AuthenticationTableComponent);
exports.AuthenticationTable = AuthenticationTable;

var getAuthenticationColumns = function getAuthenticationColumns() {
  return [{
    name: i18n.USER,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref3) {
      var node = _ref3.node;
      return (0, _helpers2.getRowItemDraggables)({
        rowItems: node.user.name,
        attrName: 'user.name',
        idPrefix: "authentications-table-".concat(node._id, "-userName")
      });
    }
  }, {
    name: i18n.SUCCESSES,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref4) {
      var node = _ref4.node;
      var id = (0, _helpers.escapeDataProviderId)("authentications-table-".concat(node._id, "-node-successes-").concat(node.successes));
      return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
        key: id,
        dataProvider: {
          and: [],
          enabled: true,
          id: id,
          name: 'authentication_success',
          excluded: false,
          kqlQuery: '',
          queryMatch: {
            field: 'event.type',
            value: 'authentication_success',
            operator: _data_provider.IS_OPERATOR
          }
        },
        render: function render(dataProvider, _, snapshot) {
          return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
            dataProvider: dataProvider
          })) : node.successes;
        }
      });
    },
    width: '8%'
  }, {
    name: i18n.FAILURES,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref5) {
      var node = _ref5.node;
      var id = (0, _helpers.escapeDataProviderId)("authentications-table-".concat(node._id, "-failures-").concat(node.failures));
      return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
        key: id,
        dataProvider: {
          and: [],
          enabled: true,
          id: id,
          name: 'authentication_failure',
          excluded: false,
          kqlQuery: '',
          queryMatch: {
            field: 'event.type',
            value: 'authentication_failure',
            operator: _data_provider.IS_OPERATOR
          }
        },
        render: function render(dataProvider, _, snapshot) {
          return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
            dataProvider: dataProvider
          })) : node.failures;
        }
      });
    },
    width: '8%'
  }, {
    name: i18n.LAST_SUCCESSFUL_TIME,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref6) {
      var node = _ref6.node;
      return (0, _fp.has)('lastSuccess.timestamp', node) && node.lastSuccess.timestamp != null ? _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
        value: node.lastSuccess.timestamp
      }) : (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    name: i18n.LAST_SUCCESSFUL_SOURCE,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref7) {
      var node = _ref7.node;
      return (0, _helpers2.getRowItemDraggables)({
        rowItems: node.lastSuccess != null && node.lastSuccess.source != null && node.lastSuccess.source.ip != null ? node.lastSuccess.source.ip : null,
        attrName: 'source.ip',
        idPrefix: "authentications-table-".concat(node._id, "-lastSuccessSource"),
        render: function render(item) {
          return _react.default.createElement(_links.IPDetailsLink, {
            ip: item
          });
        }
      });
    }
  }, {
    name: i18n.LAST_SUCCESSFUL_DESTINATION,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref8) {
      var node = _ref8.node;
      return (0, _helpers2.getRowItemDraggables)({
        rowItems: node.lastSuccess != null && node.lastSuccess.host != null && node.lastSuccess.host.name != null ? node.lastSuccess.host.name : null,
        attrName: 'host.name',
        idPrefix: "authentications-table-".concat(node._id, "-lastSuccessfulDestination"),
        render: function render(item) {
          return _react.default.createElement(_links.HostDetailsLink, {
            hostName: item
          });
        }
      });
    }
  }, {
    name: i18n.LAST_FAILED_TIME,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref9) {
      var node = _ref9.node;
      return (0, _fp.has)('lastFailure.timestamp', node) && node.lastFailure.timestamp != null ? _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
        value: node.lastFailure.timestamp
      }) : (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    name: i18n.LAST_FAILED_SOURCE,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref10) {
      var node = _ref10.node;
      return (0, _helpers2.getRowItemDraggables)({
        rowItems: node.lastFailure != null && node.lastFailure.source != null && node.lastFailure.source.ip != null ? node.lastFailure.source.ip : null,
        attrName: 'source.ip',
        idPrefix: "authentications-table-".concat(node._id, "-lastFailureSource"),
        render: function render(item) {
          return _react.default.createElement(_links.IPDetailsLink, {
            ip: item
          });
        }
      });
    }
  }, {
    name: i18n.LAST_FAILED_DESTINATION,
    truncateText: false,
    hideForMobile: false,
    render: function render(_ref11) {
      var node = _ref11.node;
      return (0, _helpers2.getRowItemDraggables)({
        rowItems: node.lastFailure != null && node.lastFailure.host != null && node.lastFailure.host.name != null ? node.lastFailure.host.name : null,
        attrName: 'host.name',
        idPrefix: "authentications-table-".concat(node._id, "-lastFailureDestination"),
        render: function render(item) {
          return _react.default.createElement(_links.HostDetailsLink, {
            hostName: item
          });
        }
      });
    }
  }];
};

var getAuthenticationColumnsCurated = function getAuthenticationColumnsCurated(pageType) {
  var columns = getAuthenticationColumns(); // Columns to exclude from host details pages

  if (pageType === _store.hostsModel.HostsType.details) {
    return [i18n.LAST_FAILED_DESTINATION, i18n.LAST_SUCCESSFUL_DESTINATION].reduce(function (acc, name) {
      acc.splice(acc.findIndex(function (column) {
        return column.name === name;
      }), 1);
      return acc;
    }, columns);
  }

  return columns;
};

exports.getAuthenticationColumnsCurated = getAuthenticationColumnsCurated;