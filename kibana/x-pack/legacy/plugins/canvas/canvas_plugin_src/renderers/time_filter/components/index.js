"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeFilter = void 0;

var _react = _interopRequireDefault(require("react"));

var _kibana_advanced_settings = require("../../../../public/lib/kibana_advanced_settings");

var _time_filter = require("./time_filter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TimeFilter = props => {
  const customQuickRanges = (_kibana_advanced_settings.AdvancedSettings.get('timepicker:quickRanges') || []).map(({
    from,
    to,
    display
  }) => ({
    start: from,
    end: to,
    label: display
  }));

  const customDateFormat = _kibana_advanced_settings.AdvancedSettings.get('dateFormat');

  return _react.default.createElement(_time_filter.TimeFilter, _extends({}, props, {
    commonlyUsedRanges: customQuickRanges,
    dateFormat: customDateFormat
  }));
};

exports.TimeFilter = TimeFilter;