"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorStatusDetails = exports.Container = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _hooks = require("../../../hooks");

var _selectors = require("../../../state/selectors");

var _monitor = require("../../../state/actions/monitor");

var _monitor_status_details = require("../../functional/monitor_status_details");

var _contexts = require("../../../contexts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Container = function Container(_ref) {
  var loadMonitorLocations = _ref.loadMonitorLocations,
      monitorLocations = _ref.monitorLocations,
      monitorId = _ref.monitorId;

  var _useContext = (0, _react.useContext)(_contexts.UptimeRefreshContext),
      lastRefresh = _useContext.lastRefresh;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      dateStart = _getUrlParams.dateRangeStart,
      dateEnd = _getUrlParams.dateRangeEnd;

  (0, _react.useEffect)(function () {
    loadMonitorLocations({
      dateStart: dateStart,
      dateEnd: dateEnd,
      monitorId: monitorId
    });
  }, [loadMonitorLocations, monitorId, dateStart, dateEnd, lastRefresh]);
  return _react.default.createElement(_monitor_status_details.MonitorStatusDetailsComponent, {
    monitorId: monitorId,
    monitorLocations: monitorLocations
  });
};

exports.Container = Container;

var mapStateToProps = function mapStateToProps(state, _ref2) {
  var monitorId = _ref2.monitorId;
  return {
    monitorLocations: (0, _selectors.monitorLocationsSelector)(state, monitorId)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadMonitorLocations: function loadMonitorLocations(params) {
      dispatch((0, _monitor.getMonitorLocationsAction)(params));
    }
  };
};

var MonitorStatusDetails = (0, _reactRedux.connect)( // @ts-ignore TODO: Investigate typescript issues here
mapStateToProps, mapDispatchToProps)(Container);
exports.MonitorStatusDetails = MonitorStatusDetails;