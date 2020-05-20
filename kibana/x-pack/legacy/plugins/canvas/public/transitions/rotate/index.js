"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotate = void 0;

require("./rotate.css");

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.TransitionStrings.rotate;

var rotate = function rotate() {
  return {
    name: 'rotate',
    displayName: strings.getDisplayName(),
    help: strings.getHelp(),
    enter: 'rotateIn',
    exit: 'rotateOut'
  };
};

exports.rotate = rotate;