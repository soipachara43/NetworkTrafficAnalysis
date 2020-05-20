"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattedKey = FormattedKey;
exports.FormattedValue = FormattedValue;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n = require("../../../../../../../plugins/apm/common/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyValue = _styledComponents.default.span.withConfig({
  displayName: "EmptyValue",
  componentId: "sc-1g8xvnn-0"
})(["color:", ";text-align:left;"], _eui_theme_light.default.euiColorMediumShade);

function FormattedKey(_ref) {
  var k = _ref.k,
      value = _ref.value;

  if (value == null) {
    return _react.default.createElement(EmptyValue, null, k);
  }

  return _react.default.createElement(_react.default.Fragment, null, k);
}

function FormattedValue(_ref2) {
  var value = _ref2.value;

  if ((0, _lodash.isObject)(value)) {
    return _react.default.createElement("pre", null, JSON.stringify(value, null, 4));
  } else if ((0, _lodash.isBoolean)(value) || (0, _lodash.isNumber)(value)) {
    return _react.default.createElement(_react.default.Fragment, null, String(value));
  } else if (!value) {
    return _react.default.createElement(EmptyValue, null, _i18n.NOT_AVAILABLE_LABEL);
  }

  return _react.default.createElement(_react.default.Fragment, null, value);
}