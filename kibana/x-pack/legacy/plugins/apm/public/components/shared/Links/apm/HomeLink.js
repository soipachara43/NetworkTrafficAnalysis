"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _APMLink = require("./APMLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HomeLink = function HomeLink(props) {
  return _react.default.createElement(_APMLink.APMLink, _extends({
    path: "/"
  }, props));
};

exports.HomeLink = HomeLink;