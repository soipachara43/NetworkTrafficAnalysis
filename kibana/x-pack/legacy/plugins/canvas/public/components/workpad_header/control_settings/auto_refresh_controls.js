"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoRefreshControls = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _time_duration = require("../../../lib/time_duration");

var _refresh_control = require("../refresh_control");

var _custom_interval = require("./custom_interval");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var strings = _i18n.ComponentStrings.WorkpadHeaderAutoRefreshControls;
var timeStrings = _i18n.UnitStrings.time;
var getSecondsText = timeStrings.getSecondsText,
    getMinutesText = timeStrings.getMinutesText,
    getHoursText = timeStrings.getHoursText;

var ListGroup = function ListGroup(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return _react.default.createElement("ul", _extends({
    style: {
      listStyle: 'none',
      margin: 0
    }
  }, rest), [children]);
};

var generateId = (0, _eui.htmlIdGenerator)();

var AutoRefreshControls = function AutoRefreshControls(_ref2) {
  var refreshInterval = _ref2.refreshInterval,
      setRefresh = _ref2.setRefresh,
      disableInterval = _ref2.disableInterval;

  var RefreshItem = function RefreshItem(_ref3) {
    var duration = _ref3.duration,
        label = _ref3.label,
        descriptionId = _ref3.descriptionId;
    return _react.default.createElement("li", null, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        return setRefresh(duration);
      },
      "aria-describedby": descriptionId
    }, label));
  };

  var interval = (0, _time_duration.timeDuration)(refreshInterval);
  var intervalTitleId = generateId();
  return _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceAround",
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
    textStyle: "reverse"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, strings.getRefreshListTitle()), _react.default.createElement(_eui.EuiDescriptionListDescription, null, refreshInterval > 0 ? _react.default.createElement(_react.default.Fragment, null, timeStrings.getCycleTimeText(interval.length, interval.format)) : _react.default.createElement(_react.default.Fragment, null, strings.getRefreshListDurationManualText())))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    gutterSize: "xs"
  }, refreshInterval > 0 ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "bottom",
    content: strings.getDisableTooltip()
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "cross",
    onClick: disableInterval,
    "aria-label": strings.getDisableTooltip()
  }))) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_refresh_control.RefreshControl, null))))), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs",
    id: intervalTitleId
  }, _react.default.createElement("p", null, strings.getIntervalFormLabelText())), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(ListGroup, {
    "aria-labelledby": intervalTitleId,
    className: "canvasControlSettings__list"
  }, _react.default.createElement(RefreshItem, {
    duration: 5000,
    label: getSecondsText(5),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 15000,
    label: getSecondsText(15),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 30000,
    label: getSecondsText(30),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 60000,
    label: getMinutesText(1),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 300000,
    label: getMinutesText(5),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 900000,
    label: getMinutesText(15),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 1800000,
    label: getMinutesText(30),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 3600000,
    label: getHoursText(1),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 7200000,
    label: getHoursText(2),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 21600000,
    label: getHoursText(6),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 43200000,
    label: getHoursText(12),
    descriptionId: intervalTitleId
  }), _react.default.createElement(RefreshItem, {
    duration: 86400000,
    label: getHoursText(24),
    descriptionId: intervalTitleId
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_custom_interval.CustomInterval, {
    onSubmit: function onSubmit(value) {
      return setRefresh(value);
    }
  })));
};

exports.AutoRefreshControls = AutoRefreshControls;
AutoRefreshControls.propTypes = {
  refreshInterval: _propTypes.default.number,
  setRefresh: _propTypes.default.func.isRequired,
  disableInterval: _propTypes.default.func.isRequired
};