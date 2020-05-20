"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.telemetryManagementSectionWrapper = telemetryManagementSectionWrapper;

var _react = _interopRequireDefault(require("react"));

var _telemetry_management_section = require("./telemetry_management_section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function telemetryManagementSectionWrapper(telemetryService) {
  var TelemetryManagementSectionWrapper = function TelemetryManagementSectionWrapper(props) {
    return _react.default.createElement(_telemetry_management_section.TelemetryManagementSection, _extends({
      showAppliesSettingMessage: true,
      telemetryService: telemetryService
    }, props));
  };

  return TelemetryManagementSectionWrapper;
}