"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slide = void 0;

require("./slide.css");

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.TransitionStrings.slide;

var slide = function slide() {
  return {
    name: 'slide',
    displayName: strings.getDisplayName(),
    help: strings.getHelp(),
    enter: 'slideIn',
    exit: 'slideOut'
  };
};

exports.slide = slide;