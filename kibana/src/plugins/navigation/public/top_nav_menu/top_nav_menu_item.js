"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopNavMenuItem = TopNavMenuItem;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function TopNavMenuItem(props) {
  function isDisabled() {
    var val = (0, _lodash.isFunction)(props.disableButton) ? props.disableButton() : props.disableButton;
    return val;
  }

  function getTooltip() {
    var val = (0, _lodash.isFunction)(props.tooltip) ? props.tooltip() : props.tooltip;
    return val;
  }

  function handleClick(e) {
    if (isDisabled()) return;
    props.run(e.currentTarget);
  }

  var commonButtonProps = {
    isDisabled: isDisabled(),
    onClick: handleClick,
    iconType: props.iconType,
    iconSide: props.iconSide,
    'data-test-subj': props.testId
  };
  var btn = props.emphasize ? _react.default.createElement(_eui.EuiButton, _extends({}, commonButtonProps, {
    size: "s",
    fill: true,
    style: {
      fontSize: 'smaller'
    }
  }), (0, _lodash.capitalize)(props.label || props.id)) : _react.default.createElement(_eui.EuiButtonEmpty, _extends({}, commonButtonProps, {
    size: "xs"
  }), (0, _lodash.capitalize)(props.label || props.id));
  var tooltip = getTooltip();

  if (tooltip) {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: tooltip
    }, btn);
  }

  return btn;
}

TopNavMenuItem.defaultProps = {
  disableButton: false,
  tooltip: ''
};