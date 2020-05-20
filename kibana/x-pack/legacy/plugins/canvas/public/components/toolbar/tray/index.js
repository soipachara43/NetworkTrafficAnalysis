"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tray = void 0;

var _recompose = require("recompose");

var _tray = require("./tray");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Tray = (0, _recompose.pure)(_tray.Tray);
exports.Tray = Tray;