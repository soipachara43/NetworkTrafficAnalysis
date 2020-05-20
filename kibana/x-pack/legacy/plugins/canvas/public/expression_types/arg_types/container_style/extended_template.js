"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BorderStyle", {
  enumerable: true,
  get: function get() {
    return _border_form.BorderStyle;
  }
});
exports.ExtendedTemplate = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _border_form = require("./border_form");

var _appearance_form = require("./appearance_form");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ArgTypesStrings.ContainerStyle;

var ExtendedTemplate = function ExtendedTemplate(_ref) {
  var getArgValue = _ref.getArgValue,
      setArgValue = _ref.setArgValue,
      workpad = _ref.workpad;
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs",
    textTransform: "uppercase"
  }, _react.default.createElement("h6", null, strings.getAppearanceTitle())), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_appearance_form.AppearanceForm, {
    onChange: setArgValue,
    opacity: getArgValue('opacity'),
    overflow: getArgValue('overflow'),
    padding: getArgValue('padding')
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs",
    textTransform: "uppercase"
  }, _react.default.createElement("h6", null, strings.getBorderTitle())), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_border_form.BorderForm, {
    colors: workpad.colors,
    onChange: setArgValue,
    radius: getArgValue('borderRadius'),
    value: getArgValue('border')
  }));
};

exports.ExtendedTemplate = ExtendedTemplate;
ExtendedTemplate.displayName = 'ContainerStyleArgExtendedInput';
ExtendedTemplate.propTypes = {
  getArgValue: _propTypes.default.func.isRequired,
  setArgValue: _propTypes.default.func.isRequired,
  workpad: _propTypes.default.shape({
    colors: _propTypes.default.array.isRequired
  }).isRequired
};