"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldName = FieldName;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _eui = require("@elastic/eui");

var _public = require("../../../../kibana_react/public");

var _helpers = require("../../helpers");

var _field_type_name = require("./field_type_name");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function FieldName(_ref) {
  var field = _ref.field,
      fieldName = _ref.fieldName,
      fieldType = _ref.fieldType,
      useShortDots = _ref.useShortDots,
      fieldIconProps = _ref.fieldIconProps;
  var type = field ? String(field.type) : String(fieldType);
  var typeName = (0, _field_type_name.getFieldTypeName)(type);
  var name = field ? String(field.name) : String(fieldName);
  var displayName = useShortDots ? (0, _helpers.shortenDottedString)(name) : name;
  var noResults = field ? !field.rowCount && !field.scripted : false;
  var className = (0, _classnames.default)('dscFieldName', {
    'dscFieldName--noResults': noResults
  });
  return _react.default.createElement(_eui.EuiFlexGroup, {
    className: className,
    alignItems: "center",
    gutterSize: "s",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_public.FieldIcon, _extends({
    type: type,
    label: typeName,
    scripted: field ? field.scripted : false
  }, fieldIconProps))), _react.default.createElement(_eui.EuiFlexItem, {
    className: "eui-textTruncate"
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: displayName,
    delay: "long",
    anchorClassName: "eui-textTruncate"
  }, _react.default.createElement("span", null, displayName))));
}