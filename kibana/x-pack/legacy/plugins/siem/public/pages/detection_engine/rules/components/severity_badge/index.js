"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeverityBadge = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SeverityBadgeComponent = function SeverityBadgeComponent(_ref) {
  var value = _ref.value;
  return _react.default.createElement(_eui.EuiHealth, {
    "data-test-subj": "severity",
    color: value === 'low' ? _eui_theme_light.default.euiColorVis0 : value === 'medium' ? _eui_theme_light.default.euiColorVis5 : value === 'high' ? _eui_theme_light.default.euiColorVis7 : _eui_theme_light.default.euiColorVis9
  }, (0, _fp.upperFirst)(value));
};

var SeverityBadge = _react.default.memo(SeverityBadgeComponent);

exports.SeverityBadge = SeverityBadge;