"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingIndices = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var LoadingIndices = function LoadingIndices(_ref) {
  var rest = Object.assign({}, _ref);
  return _react.default.createElement(_eui.EuiFlexGroup, _extends({
    justifyContent: "center",
    alignItems: "center"
  }, rest), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_eui.EuiTextColor, {
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.step.loadingHeader",
    defaultMessage: "Looking for matching indices\u2026"
  }))), _react.default.createElement(_eui.EuiText, {
    size: "s",
    style: {
      textAlign: 'center'
    }
  }, _react.default.createElement(_eui.EuiTextColor, {
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.step.loadingLabel",
    defaultMessage: "Just a sec\u2026"
  })))));
};

exports.LoadingIndices = LoadingIndices;