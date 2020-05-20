"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IconType", {
  enumerable: true,
  get: function get() {
    return _tooltip_icon.IconType;
  }
});
exports.TooltipIcon = void 0;

var _recompose = require("recompose");

var _tooltip_icon = require("./tooltip_icon");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TooltipIcon = (0, _recompose.pure)(_tooltip_icon.TooltipIcon);
exports.TooltipIcon = TooltipIcon;