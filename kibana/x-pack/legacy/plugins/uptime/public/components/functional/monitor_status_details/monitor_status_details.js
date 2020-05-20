"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorStatusDetailsComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _location_map = require("../location_map");

var _contexts = require("../../../contexts");

var _connected = require("../../connected");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WrapFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "WrapFlexItem",
  componentId: "pnztv4-0"
})(["@media (max-width:1150px){width:100%;}"]);

var MonitorStatusDetailsComponent = function MonitorStatusDetailsComponent(_ref) {
  var monitorId = _ref.monitorId,
      monitorLocations = _ref.monitorLocations;

  var _useContext = (0, _react.useContext)(_contexts.UptimeRefreshContext),
      refreshApp = _useContext.refreshApp;

  var _useState = (0, _react.useState)(document.visibilityState),
      _useState2 = _slicedToArray(_useState, 1),
      isTabActive = _useState2[0];

  var onTabActive = function onTabActive() {
    if (document.visibilityState === 'visible' && isTabActive === 'hidden') {
      refreshApp();
    }
  }; // Refreshing application state after Tab becomes active to render latest map state
  // If application renders in when tab is not in focus it gives some unexpected behaviors
  // Where map is not visible on change


  (0, _react.useEffect)(function () {
    document.addEventListener('visibilitychange', onTabActive);
    return function () {
      document.removeEventListener('visibilitychange', onTabActive);
    }; // we want this effect to execute exactly once after the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l",
    wrap: true,
    responsive: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_connected.MonitorStatusBar, {
    monitorId: monitorId
  })), _react.default.createElement(WrapFlexItem, {
    grow: false
  }, _react.default.createElement(_location_map.LocationMap, {
    monitorLocations: monitorLocations
  }))));
};

exports.MonitorStatusDetailsComponent = MonitorStatusDetailsComponent;