"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRegularString = exports.isRisonObject = exports.decodeRison = void 0;

var _risonNode = require("rison-node");

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var decodeRison = function decodeRison(value) {
  try {
    return (0, _risonNode.decode)(value);
  } catch (error) {
    return null;
  }
};

exports.decodeRison = decodeRison;

var isRisonObject = function isRisonObject(value) {
  return (0, _fp.isObject)(value);
};

exports.isRisonObject = isRisonObject;

var isRegularString = function isRegularString(value) {
  return (0, _fp.isString)(value);
};

exports.isRegularString = isRegularString;