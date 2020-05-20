"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readableColor = readableColor;

var _chromaJs = _interopRequireDefault(require("chroma-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function readableColor(background) {
  var light = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#FFF';
  var dark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#333';

  try {
    return _chromaJs.default.contrast(background, '#000') < 7 ? light : dark;
  } catch (e) {
    return dark;
  }
}