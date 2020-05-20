"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorPage = exports.MonitorPageComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _functional = require("../components/functional");

var _contexts = require("../contexts");

var _hooks = require("../hooks");

var _public = require("../../../../../plugins/observability/public");

var _connected = require("../components/connected");

var _selectors = require("../state/selectors");

var _actions = require("../state/actions");

var _page_header = require("./page_header");

var _use_breadcrumbs = require("../hooks/use_breadcrumbs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MonitorPageComponent = function MonitorPageComponent(_ref) {
  var _selectedMonitor$moni, _selectedMonitor$moni2;

  var selectedMonitor = _ref.selectedMonitor,
      dispatchGetMonitorStatus = _ref.dispatchGetMonitorStatus;

  // decode 64 base string, it was decoded to make it a valid url, since monitor id can be a url
  var _useParams = (0, _reactRouterDom.useParams)(),
      monitorId = _useParams.monitorId;

  monitorId = atob(monitorId || '');
  (0, _react.useEffect)(function () {
    if (monitorId) {
      dispatchGetMonitorStatus(monitorId);
    }
  }, [dispatchGetMonitorStatus, monitorId]);

  var _useState = (0, _react.useState)(10),
      _useState2 = _slicedToArray(_useState, 2),
      pingListPageCount = _useState2[0],
      setPingListPageCount = _useState2[1];

  var _useContext = (0, _react.useContext)(_contexts.UptimeRefreshContext),
      refreshApp = _useContext.refreshApp;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      getUrlParams = _useUrlParams2[0],
      updateUrlParams = _useUrlParams2[1];

  var _getUrlParams = getUrlParams(),
      absoluteDateRangeStart = _getUrlParams.absoluteDateRangeStart,
      absoluteDateRangeEnd = _getUrlParams.absoluteDateRangeEnd,
      params = _objectWithoutProperties(_getUrlParams, ["absoluteDateRangeStart", "absoluteDateRangeEnd"]);

  var dateRangeStart = params.dateRangeStart,
      dateRangeEnd = params.dateRangeEnd,
      selectedPingStatus = params.selectedPingStatus;

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedLocation = _useState4[0],
      setSelectedLocation = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      pingListIndex = _useState6[0],
      setPingListIndex = _useState6[1];

  var sharedVariables = {
    dateRangeStart: dateRangeStart,
    dateRangeEnd: dateRangeEnd,
    location: selectedLocation,
    monitorId: monitorId
  };
  (0, _hooks.useUptimeTelemetry)(_hooks.UptimePage.Monitor);
  (0, _public.useTrackPageview)({
    app: 'uptime',
    path: 'monitor'
  });
  (0, _public.useTrackPageview)({
    app: 'uptime',
    path: 'monitor',
    delay: 15000
  });
  var nameOrId = (selectedMonitor === null || selectedMonitor === void 0 ? void 0 : (_selectedMonitor$moni = selectedMonitor.monitor) === null || _selectedMonitor$moni === void 0 ? void 0 : _selectedMonitor$moni.name) || (selectedMonitor === null || selectedMonitor === void 0 ? void 0 : (_selectedMonitor$moni2 = selectedMonitor.monitor) === null || _selectedMonitor$moni2 === void 0 ? void 0 : _selectedMonitor$moni2.id) || '';
  (0, _use_breadcrumbs.useBreadcrumbs)([{
    text: nameOrId
  }]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_page_header.PageHeader, {
    headingText: nameOrId,
    datePicker: true
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_connected.MonitorStatusDetails, {
    monitorId: monitorId
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_functional.MonitorCharts, {
    monitorId: monitorId
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_functional.PingList, {
    onPageCountChange: setPingListPageCount,
    onSelectedLocationChange: setSelectedLocation,
    onSelectedStatusChange: function onSelectedStatusChange(selectedStatus) {
      updateUrlParams({
        selectedPingStatus: selectedStatus || ''
      });
      refreshApp();
    },
    onPageIndexChange: function onPageIndexChange(index) {
      return setPingListIndex(index);
    },
    pageIndex: pingListIndex,
    pageSize: pingListPageCount,
    selectedOption: selectedPingStatus,
    selectedLocation: selectedLocation,
    variables: _objectSpread({}, sharedVariables, {
      page: pingListIndex,
      size: pingListPageCount,
      status: selectedPingStatus
    })
  }));
};

exports.MonitorPageComponent = MonitorPageComponent;

var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedMonitor: (0, _selectors.selectSelectedMonitor)(state)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, own) {
  return {
    dispatchGetMonitorStatus: function dispatchGetMonitorStatus(monitorId) {
      dispatch((0, _actions.getSelectedMonitorAction)({
        monitorId: monitorId
      }));
    }
  };
};

var MonitorPage = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MonitorPageComponent);
exports.MonitorPage = MonitorPage;