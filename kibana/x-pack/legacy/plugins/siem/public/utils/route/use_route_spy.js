"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouteSpy = void 0;

var _react = require("react");

var _helpers = require("./helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useRouteSpy = function useRouteSpy() {
  return (0, _react.useContext)(_helpers.RouterSpyStateContext);
};

exports.useRouteSpy = useRouteSpy;