"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorListStatusColumn = exports.getLocationStatus = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _parse_timestamp = require("./parse_timestamp");

var _constants = require("../../../../common/constants");

var labels = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var PaddedSpan = _styledComponents.default.span.withConfig({
  displayName: "PaddedSpan",
  componentId: "mdq9x4-0"
})(["padding-left:17px;"]);

var StatusColumnFlexG = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "StatusColumnFlexG",
  componentId: "mdq9x4-1"
})(["@media (max-width:574px){min-width:230px;}"]);

var getHealthColor = function getHealthColor(status) {
  switch (status) {
    case _constants.STATUS.UP:
      return 'success';

    case _constants.STATUS.DOWN:
      return 'danger';

    default:
      return '';
  }
};

var getHealthMessage = function getHealthMessage(status) {
  switch (status) {
    case _constants.STATUS.UP:
      return labels.UP;

    case _constants.STATUS.DOWN:
      return labels.DOWN;

    default:
      return null;
  }
};

var getRelativeShortTimeStamp = function getRelativeShortTimeStamp(timeStamp) {
  var _moment$locale;

  var prevLocale = (_moment$locale = _moment.default.locale()) !== null && _moment$locale !== void 0 ? _moment$locale : 'en';

  var shortLocale = _moment.default.locale(_constants.SHORT_TS_LOCALE) === _constants.SHORT_TS_LOCALE;

  if (!shortLocale) {
    _moment.default.defineLocale(_constants.SHORT_TS_LOCALE, _constants.SHORT_TIMESPAN_LOCALE);
  }

  var shortTimestamp = (0, _parse_timestamp.parseTimestamp)(timeStamp).fromNow(); // Reset it so, it does't impact other part of the app

  _moment.default.locale(prevLocale);

  return shortTimestamp;
};

var getLocationStatus = function getLocationStatus(checks, status) {
  var upChecks = new Set();
  var downChecks = new Set();
  checks.forEach(function (check) {
    var _ref, _check$observer, _check$observer$geo;

    var location = (_ref = check === null || check === void 0 ? void 0 : (_check$observer = check.observer) === null || _check$observer === void 0 ? void 0 : (_check$observer$geo = _check$observer.geo) === null || _check$observer$geo === void 0 ? void 0 : _check$observer$geo.name) !== null && _ref !== void 0 ? _ref : _constants.UNNAMED_LOCATION;

    if (check.monitor.status === _constants.STATUS.UP) {
      upChecks.add((0, _lodash.capitalize)(location));
    } else if (check.monitor.status === _constants.STATUS.DOWN) {
      downChecks.add((0, _lodash.capitalize)(location));
    }
  }); // if monitor is down in one dns, it will be considered down so removing it from up list

  var absUpChecks = new Set(_toConsumableArray(upChecks).filter(function (item) {
    return !downChecks.has(item);
  }));
  var totalLocations = absUpChecks.size + downChecks.size;
  var statusMessage = '';

  if (status === _constants.STATUS.DOWN) {
    statusMessage = "".concat(downChecks.size, "/").concat(totalLocations);
  } else {
    statusMessage = "".concat(absUpChecks.size, "/").concat(totalLocations);
  }

  if (totalLocations > 1) {
    return _i18n.i18n.translate('xpack.uptime.monitorList.statusColumn.locStatusMessage.multiple', {
      defaultMessage: 'in {noLoc} Locations',
      values: {
        noLoc: statusMessage
      }
    });
  }

  return _i18n.i18n.translate('xpack.uptime.monitorList.statusColumn.locStatusMessage', {
    defaultMessage: 'in {noLoc} Location',
    values: {
      noLoc: statusMessage
    }
  });
};

exports.getLocationStatus = getLocationStatus;

var MonitorListStatusColumn = function MonitorListStatusColumn(_ref2) {
  var status = _ref2.status,
      _ref2$checks = _ref2.checks,
      checks = _ref2$checks === void 0 ? [] : _ref2$checks,
      tsString = _ref2.timestamp;
  var timestamp = (0, _parse_timestamp.parseTimestamp)(tsString);
  return _react.default.createElement(StatusColumnFlexG, {
    alignItems: "center",
    gutterSize: "none",
    wrap: false,
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1,
    style: {
      flexBasis: 40
    }
  }, _react.default.createElement(_eui.EuiHealth, {
    color: getHealthColor(status),
    style: {
      display: 'block'
    }
  }, getHealthMessage(status)), _react.default.createElement(PaddedSpan, null, _react.default.createElement(_eui.EuiToolTip, {
    content: _react.default.createElement(_eui.EuiText, {
      color: "ghost",
      size: "xs"
    }, timestamp.toLocaleString())
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, getRelativeShortTimeStamp(tsString))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, getLocationStatus(checks, status))));
};

exports.MonitorListStatusColumn = MonitorListStatusColumn;