"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterSpyStateContext = exports.initRouteSpy = void 0;

var _fp = require("lodash/fp");

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initRouteSpy = {
  pageName: '',
  detailName: undefined,
  tabName: undefined,
  search: '',
  pathName: '/',
  state: undefined
};
exports.initRouteSpy = initRouteSpy;
var RouterSpyStateContext = (0, _react.createContext)([initRouteSpy, function () {
  return _fp.noop;
}]);
exports.RouterSpyStateContext = RouterSpyStateContext;