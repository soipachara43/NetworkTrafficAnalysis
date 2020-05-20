"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Props", {
  enumerable: true,
  get: function get() {
    return _color_picker.Props;
  }
});
exports.ColorPicker = void 0;

var _recompose = require("recompose");

var _color_picker = require("./color_picker");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ColorPicker = (0, _recompose.pure)(_color_picker.ColorPicker);
exports.ColorPicker = ColorPicker;