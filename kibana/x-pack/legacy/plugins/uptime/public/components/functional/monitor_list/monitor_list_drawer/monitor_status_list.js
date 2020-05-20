"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorStatusList = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _location_link = require("./location_link");

var _monitor_status_row = require("./monitor_status_row");

var _constants = require("../../../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var MonitorStatusList = function MonitorStatusList(_ref) {
  var checks = _ref.checks;
  var upChecks = new Set();
  var downChecks = new Set();
  checks.forEach(function (check) {
    // Doing this way because name is either string or null, get() default value only works on undefined value
    var location = (0, _lodash.get)(check, 'observer.geo.name', null) || _constants.UNNAMED_LOCATION;

    if (check.monitor.status === _constants.STATUS.UP) {
      upChecks.add((0, _lodash.capitalize)(location));
    } else if (check.monitor.status === _constants.STATUS.DOWN) {
      downChecks.add((0, _lodash.capitalize)(location));
    }
  }); // if monitor is down in one dns, it will be considered down so removing it from up list

  var absUpChecks = new Set(_toConsumableArray(upChecks).filter(function (item) {
    return !downChecks.has(item);
  }));
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_monitor_status_row.MonitorStatusRow, {
    locationNames: downChecks,
    status: _constants.STATUS.DOWN
  }), _react.default.createElement(_monitor_status_row.MonitorStatusRow, {
    locationNames: absUpChecks,
    status: _constants.STATUS.UP
  }), (downChecks.has(_constants.UNNAMED_LOCATION) || upChecks.has(_constants.UNNAMED_LOCATION)) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiCallOut, {
    color: "warning"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorList.drawer.missingLocation",
    defaultMessage: "Some heartbeat instances do not have a location defined. {link} to your heartbeat configuration.",
    values: {
      link: _react.default.createElement(_location_link.LocationLink, null)
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })));
};

exports.MonitorStatusList = MonitorStatusList;