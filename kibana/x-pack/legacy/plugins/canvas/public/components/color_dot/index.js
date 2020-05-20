"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Props", {
  enumerable: true,
  get: function get() {
    return _color_dot.Props;
  }
});
exports.ColorDot = void 0;

var _recompose = require("recompose");

var _color_dot = require("./color_dot");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ColorDot = (0, _recompose.pure)(_color_dot.ColorDot);
exports.ColorDot = ColorDot;