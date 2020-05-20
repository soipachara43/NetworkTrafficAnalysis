"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PingList = exports.PingListComponent = exports.toggleDetails = exports.AllLocationOption = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helper = require("../../../lib/helper");

var _higher_order = require("../../higher_order");

var _queries = require("../../../queries");

var _location_name = require("./location_name");

var _expanded_row = require("./expanded_row");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AllLocationOption = {
  text: 'All',
  value: ''
};
exports.AllLocationOption = AllLocationOption;

var toggleDetails = function toggleDetails(ping, itemIdToExpandedRowMap, setItemIdToExpandedRowMap) {
  // If the user has clicked on the expanded map, close all expanded rows.
  if (itemIdToExpandedRowMap[ping.id]) {
    setItemIdToExpandedRowMap({});
    return;
  } // Otherwise expand this row


  var newItemIdToExpandedRowMap = {};
  newItemIdToExpandedRowMap[ping.id] = _react2.default.createElement(_expanded_row.PingListExpandedRowComponent, {
    ping: ping
  });
  setItemIdToExpandedRowMap(newItemIdToExpandedRowMap);
};

exports.toggleDetails = toggleDetails;

var SpanWithMargin = _styledComponents.default.span.withConfig({
  displayName: "SpanWithMargin",
  componentId: "sc-12zrdx5-0"
})(["margin-right:16px;"]);

var PingListComponent = function PingListComponent(_ref) {
  var _ref2, _data$allPings, _ref3, _data$allPings2;

  var data = _ref.data,
      loading = _ref.loading,
      onPageCountChange = _ref.onPageCountChange,
      onPageIndexChange = _ref.onPageIndexChange,
      onSelectedLocationChange = _ref.onSelectedLocationChange,
      onSelectedStatusChange = _ref.onSelectedStatusChange,
      pageIndex = _ref.pageIndex,
      pageSize = _ref.pageSize,
      selectedOption = _ref.selectedOption,
      selectedLocation = _ref.selectedLocation;

  var _useState = (0, _react2.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      itemIdToExpandedRowMap = _useState2[0],
      setItemIdToExpandedRowMap = _useState2[1];

  var statusOptions = [{
    text: _i18n.i18n.translate('xpack.uptime.pingList.statusOptions.allStatusOptionLabel', {
      defaultMessage: 'All'
    }),
    value: ''
  }, {
    text: _i18n.i18n.translate('xpack.uptime.pingList.statusOptions.upStatusOptionLabel', {
      defaultMessage: 'Up'
    }),
    value: 'up'
  }, {
    text: _i18n.i18n.translate('xpack.uptime.pingList.statusOptions.downStatusOptionLabel', {
      defaultMessage: 'Down'
    }),
    value: 'down'
  }];
  var locations = (0, _lodash.get)(data, 'allPings.locations');
  var locationOptions = !locations ? [AllLocationOption] : [AllLocationOption].concat(locations.map(function (name) {
    return {
      text: name,
      value: name
    };
  }));
  var pings = (_ref2 = data === null || data === void 0 ? void 0 : (_data$allPings = data.allPings) === null || _data$allPings === void 0 ? void 0 : _data$allPings.pings) !== null && _ref2 !== void 0 ? _ref2 : [];
  var hasStatus = pings.reduce(function (hasHttpStatus, currentPing) {
    var _currentPing$http, _currentPing$http$res;

    return hasHttpStatus || !!((_currentPing$http = currentPing.http) === null || _currentPing$http === void 0 ? void 0 : (_currentPing$http$res = _currentPing$http.response) === null || _currentPing$http$res === void 0 ? void 0 : _currentPing$http$res.status_code);
  }, false);
  var columns = [{
    field: 'monitor.status',
    name: _i18n.i18n.translate('xpack.uptime.pingList.statusColumnLabel', {
      defaultMessage: 'Status'
    }),
    render: function render(pingStatus, item) {
      return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiHealth, {
        color: pingStatus === 'up' ? 'success' : 'danger'
      }, pingStatus === 'up' ? _i18n.i18n.translate('xpack.uptime.pingList.statusColumnHealthUpLabel', {
        defaultMessage: 'Up'
      }) : _i18n.i18n.translate('xpack.uptime.pingList.statusColumnHealthDownLabel', {
        defaultMessage: 'Down'
      })), _react2.default.createElement(_eui.EuiText, {
        size: "xs",
        color: "subdued"
      }, _i18n.i18n.translate('xpack.uptime.pingList.recencyMessage', {
        values: {
          fromNow: (0, _moment.default)(item.timestamp).fromNow()
        },
        defaultMessage: 'Checked {fromNow}',
        description: 'A string used to inform our users how long ago Heartbeat pinged the selected host.'
      })));
    }
  }, {
    align: 'left',
    field: 'observer.geo.name',
    name: _i18n.i18n.translate('xpack.uptime.pingList.locationNameColumnLabel', {
      defaultMessage: 'Location'
    }),
    render: function render(location) {
      return _react2.default.createElement(_location_name.LocationName, {
        location: location
      });
    }
  }, {
    align: 'right',
    dataType: 'number',
    field: 'monitor.ip',
    name: _i18n.i18n.translate('xpack.uptime.pingList.ipAddressColumnLabel', {
      defaultMessage: 'IP'
    })
  }, {
    align: 'right',
    field: 'monitor.duration.us',
    name: _i18n.i18n.translate('xpack.uptime.pingList.durationMsColumnLabel', {
      defaultMessage: 'Duration'
    }),
    render: function render(duration) {
      return _i18n.i18n.translate('xpack.uptime.pingList.durationMsColumnFormatting', {
        values: {
          millis: (0, _helper.convertMicrosecondsToMilliseconds)(duration)
        },
        defaultMessage: '{millis} ms'
      });
    }
  }, {
    align: hasStatus ? 'right' : 'center',
    field: 'error.type',
    name: _i18n.i18n.translate('xpack.uptime.pingList.errorTypeColumnLabel', {
      defaultMessage: 'Error type'
    }),
    render: function render(error) {
      return error !== null && error !== void 0 ? error : '-';
    }
  }].concat(_toConsumableArray(hasStatus ? [{
    field: 'http.response.status_code',
    align: 'right',
    name: _react2.default.createElement(SpanWithMargin, null, _i18n.i18n.translate('xpack.uptime.pingList.responseCodeColumnLabel', {
      defaultMessage: 'Response code'
    })),
    render: function render(statusCode) {
      return _react2.default.createElement(SpanWithMargin, null, _react2.default.createElement(_eui.EuiBadge, null, statusCode));
    }
  }] : []), [{
    align: 'right',
    width: '24px',
    isExpander: true,
    render: function render(item) {
      var _item$http, _item$http$response, _item$http$response$b;

      return _react2.default.createElement(_eui.EuiButtonIcon, {
        onClick: function onClick() {
          return toggleDetails(item, itemIdToExpandedRowMap, setItemIdToExpandedRowMap);
        },
        disabled: !item.error && !(((_item$http = item.http) === null || _item$http === void 0 ? void 0 : (_item$http$response = _item$http.response) === null || _item$http$response === void 0 ? void 0 : (_item$http$response$b = _item$http$response.body) === null || _item$http$response$b === void 0 ? void 0 : _item$http$response$b.bytes) > 0),
        "aria-label": itemIdToExpandedRowMap[item.id] ? _i18n.i18n.translate('xpack.uptime.pingList.collapseRow', {
          defaultMessage: 'Collapse'
        }) : _i18n.i18n.translate('xpack.uptime.pingList.expandRow', {
          defaultMessage: 'Expand'
        }),
        iconType: itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'
      });
    }
  }]);
  var pagination = {
    initialPageSize: 25,
    pageIndex: pageIndex,
    pageSize: pageSize,
    pageSizeOptions: [10, 25, 50, 100],
    totalItemCount: (_ref3 = data === null || data === void 0 ? void 0 : (_data$allPings2 = data.allPings) === null || _data$allPings2 === void 0 ? void 0 : _data$allPings2.total) !== null && _ref3 !== void 0 ? _ref3 : pageSize
  };
  return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiPanel, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.uptime.pingList.checkHistoryTitle",
    defaultMessage: "History"
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, {
    style: {
      minWidth: 200
    }
  }, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
    label: "Status",
    "aria-label": _i18n.i18n.translate('xpack.uptime.pingList.statusLabel', {
      defaultMessage: 'Status'
    })
  }, _react2.default.createElement(_eui.EuiSelect, {
    options: statusOptions,
    "aria-label": _i18n.i18n.translate('xpack.uptime.pingList.statusLabel', {
      defaultMessage: 'Status'
    }),
    value: selectedOption,
    onChange: function onChange(selected) {
      if (typeof selected.target.value === 'string') {
        onSelectedStatusChange(selected.target && selected.target.value !== '' ? selected.target.value : undefined);
      }
    }
  }))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
    label: "Location",
    "aria-label": _i18n.i18n.translate('xpack.uptime.pingList.locationLabel', {
      defaultMessage: 'Location'
    })
  }, _react2.default.createElement(_eui.EuiSelect, {
    options: locationOptions,
    value: selectedLocation,
    "aria-label": _i18n.i18n.translate('xpack.uptime.pingList.locationLabel', {
      defaultMessage: 'Location'
    }),
    onChange: function onChange(selected) {
      onSelectedLocationChange(selected.target && selected.target.value !== '' ? selected.target.value : null);
    }
  })))))))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react2.default.createElement(_eui.EuiBasicTable, {
    loading: loading,
    columns: columns,
    isExpandable: true,
    hasActions: true,
    items: pings,
    itemId: "id",
    itemIdToExpandedRowMap: itemIdToExpandedRowMap,
    pagination: pagination,
    onChange: function onChange(criteria) {
      onPageCountChange(criteria.page.size);
      onPageIndexChange(criteria.page.index);
    }
  })));
};

exports.PingListComponent = PingListComponent;
var PingList = (0, _higher_order.withUptimeGraphQL)(PingListComponent, _queries.pingsQuery);
exports.PingList = PingList;