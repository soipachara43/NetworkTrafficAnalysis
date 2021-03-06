"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeepObjectIdentity = useDeepObjectIdentity;

var _react = require("react");

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// preserve object identity if it is deeply equal to the previous instance of it
function useDeepObjectIdentity(value) {
  var valueRef = (0, _react.useRef)(value); // update ref if object has changed. Else return the original object and discard the new one

  if (!(0, _lodash.isEqual)(valueRef.current, value)) {
    valueRef.current = value;
  }

  return valueRef.current;
}