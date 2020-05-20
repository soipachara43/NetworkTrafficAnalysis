"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMitreAttackInvalid = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isMitreAttackInvalid = function isMitreAttackInvalid(tacticName, technique) {
  if ((0, _fp.isEmpty)(tacticName) || tacticName !== 'none' && (0, _fp.isEmpty)(technique)) {
    return true;
  }

  return false;
};

exports.isMitreAttackInvalid = isMitreAttackInvalid;