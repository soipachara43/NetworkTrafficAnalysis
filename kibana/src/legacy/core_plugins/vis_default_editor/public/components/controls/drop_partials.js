"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropPartialsParamEditor = DropPartialsParamEditor;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _switch = require("./switch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DropPartialsParamEditor(props) {
  return _react.default.createElement(_switch.SwitchParamEditor, _extends({
    dataTestSubj: "dropPartialBucketsCheckbox",
    displayLabel: _i18n.i18n.translate('visDefaultEditor.controls.dropPartialBucketsLabel', {
      defaultMessage: 'Drop partial buckets'
    }),
    displayToolTip: _i18n.i18n.translate('visDefaultEditor.controls.dropPartialBucketsTooltip', {
      defaultMessage: "Remove buckets that span time outside the time range so the histogram doesn't start and end with incomplete buckets."
    })
  }, props));
}