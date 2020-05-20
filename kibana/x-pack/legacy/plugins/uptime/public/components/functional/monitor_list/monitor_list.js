"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorList = exports.MonitorListComponent = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _higher_order = require("../../higher_order");

var _monitor_states_query = require("../../../queries/monitor_states_query");

var _monitor_list_status_column = require("./monitor_list_status_column");

var _format_error_list = require("../../../lib/helper/format_error_list");

var _charts = require("../charts");

var _monitor_page_link = require("./monitor_page_link");

var _overview_page_link = require("./overview_page_link");

var labels = _interopRequireWildcard(require("./translations"));

var _connected = require("../../connected");

var _monitor_list_page_size_select = require("./monitor_list_page_size_select");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TruncatedEuiLink = (0, _styledComponents.default)(_eui.EuiLink).withConfig({
  displayName: "TruncatedEuiLink",
  componentId: "sc-7qsk9c-0"
})(["white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"]);

var MonitorListComponent = function MonitorListComponent(props) {
  var _ref, _data$monitorStates, _ref2, _data$monitorStates2, _ref3, _data$monitorStates3;

  var dangerColor = props.dangerColor,
      data = props.data,
      errors = props.errors,
      hasActiveFilters = props.hasActiveFilters,
      linkParameters = props.linkParameters,
      loading = props.loading;

  var _useState = (0, _react2.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      drawerIds = _useState2[0],
      updateDrawerIds = _useState2[1];

  var items = (_ref = data === null || data === void 0 ? void 0 : (_data$monitorStates = data.monitorStates) === null || _data$monitorStates === void 0 ? void 0 : _data$monitorStates.summaries) !== null && _ref !== void 0 ? _ref : [];
  var nextPagePagination = (_ref2 = data === null || data === void 0 ? void 0 : (_data$monitorStates2 = data.monitorStates) === null || _data$monitorStates2 === void 0 ? void 0 : _data$monitorStates2.nextPagePagination) !== null && _ref2 !== void 0 ? _ref2 : '';
  var prevPagePagination = (_ref3 = data === null || data === void 0 ? void 0 : (_data$monitorStates3 = data.monitorStates) === null || _data$monitorStates3 === void 0 ? void 0 : _data$monitorStates3.prevPagePagination) !== null && _ref3 !== void 0 ? _ref3 : '';

  var getExpandedRowMap = function getExpandedRowMap() {
    return drawerIds.reduce(function (map, id) {
      return _objectSpread({}, map, _defineProperty({}, id, _react2.default.createElement(_connected.MonitorListDrawer, {
        summary: items.find(function (_ref4) {
          var monitorId = _ref4.monitor_id;
          return monitorId === id;
        })
      })));
    }, {});
  };

  var columns = [{
    align: 'left',
    field: 'state.monitor.status',
    name: labels.STATUS_COLUMN_LABEL,
    mobileOptions: {
      fullWidth: true
    },
    render: function render(status, _ref5) {
      var _ref5$state = _ref5.state,
          timestamp = _ref5$state.timestamp,
          checks = _ref5$state.checks;
      return _react2.default.createElement(_monitor_list_status_column.MonitorListStatusColumn, {
        status: status,
        timestamp: timestamp,
        checks: checks !== null && checks !== void 0 ? checks : []
      });
    }
  }, {
    align: 'left',
    field: 'state.monitor.name',
    name: labels.NAME_COLUMN_LABEL,
    mobileOptions: {
      fullWidth: true
    },
    render: function render(name, summary) {
      return _react2.default.createElement(_monitor_page_link.MonitorPageLink, {
        monitorId: summary.monitor_id,
        linkParameters: linkParameters
      }, name ? name : "Unnamed - ".concat(summary.monitor_id));
    },
    sortable: true
  }, {
    align: 'left',
    field: 'state.url.full',
    name: labels.URL,
    render: function render(url, summary) {
      return _react2.default.createElement(TruncatedEuiLink, {
        href: url,
        target: "_blank",
        color: "text"
      }, url, " ", _react2.default.createElement(_eui.EuiIcon, {
        size: "s",
        type: "popout",
        color: "subbdued"
      }));
    }
  }, {
    align: 'center',
    field: 'histogram.points',
    name: labels.HISTORY_COLUMN_LABEL,
    mobileOptions: {
      show: false
    },
    render: function render(histogramSeries) {
      return _react2.default.createElement(_charts.MonitorBarSeries, {
        dangerColor: dangerColor,
        histogramSeries: histogramSeries
      });
    }
  }, {
    align: 'right',
    field: 'monitor_id',
    name: '',
    sortable: true,
    isExpander: true,
    width: '24px',
    render: function render(id) {
      return _react2.default.createElement(_eui.EuiButtonIcon, {
        "aria-label": labels.getExpandDrawerLabel(id),
        iconType: drawerIds.includes(id) ? 'arrowUp' : 'arrowDown',
        onClick: function onClick() {
          if (drawerIds.includes(id)) {
            updateDrawerIds(drawerIds.filter(function (p) {
              return p !== id;
            }));
          } else {
            updateDrawerIds([].concat(_toConsumableArray(drawerIds), [id]));
          }
        }
      });
    }
  }];
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiPanel, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react2.default.createElement("h5", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.uptime.monitorList.monitoringStatusTitle",
    defaultMessage: "Monitor status"
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react2.default.createElement(_eui.EuiBasicTable, {
    "aria-label": labels.getDescriptionLabel(items.length),
    error: errors ? (0, _format_error_list.formatUptimeGraphQLErrorList)(errors) : errors // Only set loading to true when there are no items present to prevent the bug outlined in
    // in https://github.com/elastic/eui/issues/2393 . Once that is fixed we can simply set the value here to
    // loading={loading}
    ,
    loading: loading && (!items || items.length < 1),
    isExpandable: true,
    hasActions: true,
    itemId: "monitor_id",
    itemIdToExpandedRowMap: getExpandedRowMap(),
    items: items // TODO: not needed without sorting and pagination
    // onChange={onChange}
    ,
    noItemsMessage: hasActiveFilters ? labels.NO_MONITOR_ITEM_SELECTED : labels.NO_DATA_MESSAGE // TODO: reintegrate pagination in future release
    // pagination={pagination}
    // TODO: reintegrate sorting in future release
    // sorting={sorting}
    ,
    columns: columns
  }), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    responsive: false
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_monitor_list_page_size_select.MonitorListPageSizeSelect, {
    size: props.pageSize,
    setSize: props.setPageSize
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    responsive: false
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_overview_page_link.OverviewPageLink, {
    dataTestSubj: "xpack.uptime.monitorList.prevButton",
    direction: "prev",
    pagination: prevPagePagination
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_overview_page_link.OverviewPageLink, {
    dataTestSubj: "xpack.uptime.monitorList.nextButton",
    direction: "next",
    pagination: nextPagePagination
  })))))));
};

exports.MonitorListComponent = MonitorListComponent;
var MonitorList = (0, _higher_order.withUptimeGraphQL)(MonitorListComponent, _monitor_states_query.monitorStatesQuery);
exports.MonitorList = MonitorList;