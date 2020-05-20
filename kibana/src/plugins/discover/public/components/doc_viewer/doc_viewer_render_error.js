"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocViewerError = DocViewerError;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _public = require("../../../../kibana_legacy/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function DocViewerError(_ref) {
  var error = _ref.error;
  var errMsg = (0, _public.formatMsg)(error);
  var errStack = _typeof(error) === 'object' ? (0, _public.formatStack)(error) : '';
  return _react.default.createElement(_eui.EuiCallOut, {
    title: errMsg,
    color: "danger",
    iconType: "cross",
    "data-test-subj": "docViewerError"
  }, errStack && _react.default.createElement(_eui.EuiCodeBlock, null, errStack));
}