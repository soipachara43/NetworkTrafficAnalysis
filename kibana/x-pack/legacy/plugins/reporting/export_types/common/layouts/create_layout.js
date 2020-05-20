"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLayout = createLayout;

var _constants = require("../constants");

var _preserve_layout = require("./preserve_layout");

var _print_layout = require("./print_layout");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createLayout(server, layoutParams) {
  if (layoutParams && layoutParams.id === _constants.LayoutTypes.PRESERVE_LAYOUT) {
    return new _preserve_layout.PreserveLayout(layoutParams.dimensions);
  } // this is the default because some jobs won't have anything specified


  return new _print_layout.PrintLayout(server);
}