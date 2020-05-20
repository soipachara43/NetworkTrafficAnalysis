"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _APMLink = require("./APMLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SettingsLink = function SettingsLink(props) {
  return _react.default.createElement(_APMLink.APMLink, _extends({
    path: "/settings"
  }, props));
};

exports.SettingsLink = SettingsLink;