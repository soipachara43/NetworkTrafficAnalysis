"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Props", {
  enumerable: true,
  get: function get() {
    return _color_picker_popover.Props;
  }
});
exports.ColorPickerPopover = void 0;

var _recompose = require("recompose");

var _color_picker_popover = require("./color_picker_popover");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ColorPickerPopover = (0, _recompose.pure)(_color_picker_popover.ColorPickerPopover);
exports.ColorPickerPopover = ColorPickerPopover;