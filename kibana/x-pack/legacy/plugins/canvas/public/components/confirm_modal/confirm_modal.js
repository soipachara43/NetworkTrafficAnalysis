"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmModal = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ConfirmModal = function ConfirmModal(props) {
  var isOpen = props.isOpen,
      title = props.title,
      message = props.message,
      onConfirm = props.onConfirm,
      onCancel = props.onCancel,
      confirmButtonText = props.confirmButtonText,
      cancelButtonText = props.cancelButtonText,
      className = props.className,
      rest = _objectWithoutProperties(props, ["isOpen", "title", "message", "onConfirm", "onCancel", "confirmButtonText", "cancelButtonText", "className"]); // render nothing if this component isn't open


  if (!isOpen) {
    return null;
  }

  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, _extends({}, rest, {
    className: "canvasConfirmModal ".concat(className || ''),
    title: title,
    onCancel: onCancel,
    onConfirm: onConfirm,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    defaultFocusedButton: "confirm",
    buttonColor: "danger"
  }), message));
};

exports.ConfirmModal = ConfirmModal;
ConfirmModal.propTypes = {
  isOpen: _propTypes.default.bool,
  title: _propTypes.default.string,
  message: _propTypes.default.string.isRequired,
  onConfirm: _propTypes.default.func.isRequired,
  onCancel: _propTypes.default.func.isRequired,
  cancelButtonText: _propTypes.default.string,
  confirmButtonText: _propTypes.default.string,
  className: _propTypes.default.string
};
ConfirmModal.defaultProps = {
  title: 'Confirm',
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel'
};