"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomEUIColor = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var randomEUIColor = function randomEUIColor(euiVars) {
  var rgb = (0, _lodash.sample)(Object.keys(euiVars).filter(function (key) {
    return key.startsWith('euiColorVis');
  }).map(function (key) {
    return euiVars[key];
  }));
  var matchedrgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return matchedrgb && matchedrgb.length === 4 ? '#' + ('0' + parseInt(matchedrgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(matchedrgb[2], 10).toString(16)).slice(-2) + ('0' + parseInt(matchedrgb[3], 10).toString(16)).slice(-2) : '';
};

exports.randomEUIColor = randomEUIColor;