"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transitions = void 0;

var _fade = require("./fade");

var _rotate = require("./rotate");

var _slide = require("./slide");

var _zoom = require("./zoom");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var transitions = [_fade.fade, _rotate.rotate, _slide.slide, _zoom.zoom];
exports.transitions = transitions;