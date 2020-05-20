"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpStatusCodeToColor = httpStatusCodeToColor;
exports.warningColor = exports.successColor = exports.neutralColor = exports.errorColor = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var euiColorDarkShade = _eui_theme_light.default.euiColorDarkShade,
    euiColorWarning = _eui_theme_light.default.euiColorWarning;
var errorColor = '#c23c2b';
exports.errorColor = errorColor;
var neutralColor = euiColorDarkShade;
exports.neutralColor = neutralColor;
var successColor = '#327a42';
exports.successColor = successColor;
var warningColor = euiColorWarning;
exports.warningColor = warningColor;
var httpStatusCodeColors = {
  1: neutralColor,
  2: successColor,
  3: neutralColor,
  4: warningColor,
  5: errorColor
};

function getStatusColor(status) {
  return httpStatusCodeColors[status.toString().substr(0, 1)];
}
/**
 * Convert an HTTP status code to a color.
 *
 * If passed a string, it will remove all non-numeric characters
 */


function httpStatusCodeToColor(status) {
  if (typeof status === 'string') {
    return getStatusColor(parseInt(status.replace(/\D/g, ''), 10));
  } else {
    return getStatusColor(status);
  }
}