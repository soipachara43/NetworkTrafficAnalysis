"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorStatusRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _contexts = require("../../../../contexts");

var _constants = require("../../../../../common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var MonitorStatusRow = function MonitorStatusRow(_ref) {
  var locationNames = _ref.locationNames,
      status = _ref.status;

  var _useContext = (0, _react.useContext)(_contexts.UptimeThemeContext),
      _useContext$colors = _useContext.colors,
      success = _useContext$colors.success,
      danger = _useContext$colors.danger;

  var color = status === _constants.STATUS.UP ? success : danger;

  var checkListArray = _toConsumableArray(locationNames); // If un-named location exists, move it to end


  if (locationNames.has(_constants.UNNAMED_LOCATION)) {
    checkListArray = checkListArray.filter(function (item) {
      return item !== _constants.UNNAMED_LOCATION;
    });
    checkListArray.push(_constants.UNNAMED_LOCATION);
  }

  if (locationNames.size === 0) {
    return null;
  }

  var locations = checkListArray.join(', ');
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiHealth, {
    color: color
  }, status === _constants.STATUS.UP ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorList.drawer.locations.statusUp",
    defaultMessage: "Up in {locations}",
    values: {
      locations: locations
    }
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorList.drawer.locations.statusDown",
    defaultMessage: "Down in {locations}",
    values: {
      locations: locations
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }));
};

exports.MonitorStatusRow = MonitorStatusRow;