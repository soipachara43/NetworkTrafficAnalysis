"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComponentId = useComponentId;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var uniqueId = 0;

var getUniqueId = function getUniqueId() {
  return uniqueId++;
};

function useComponentId() {
  var idRef = (0, _react.useRef)(getUniqueId());
  return idRef.current;
}