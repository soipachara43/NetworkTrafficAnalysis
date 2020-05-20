"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resizer = Resizer;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Resizer(props) {
  return _react.default.createElement("button", _extends({}, props, {
    "data-test-subj": "splitPanelResizer",
    "aria-label": _i18n.i18n.translate('kibana-react.splitPanel.adjustPanelSizeAriaLabel', {
      defaultMessage: 'Press left/right to adjust panels size'
    })
  }), _react.default.createElement(_eui.EuiIcon, {
    type: "grabHorizontal"
  }));
}