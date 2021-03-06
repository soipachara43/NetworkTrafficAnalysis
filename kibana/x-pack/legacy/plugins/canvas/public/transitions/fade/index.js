"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fade = void 0;

require("./fade.css");

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.TransitionStrings.fade;

var fade = function fade() {
  return {
    name: 'fade',
    displayName: strings.getDisplayName(),
    help: strings.getHelp(),
    enter: 'fadeIn',
    exit: 'fadeOut'
  };
};

exports.fade = fade;