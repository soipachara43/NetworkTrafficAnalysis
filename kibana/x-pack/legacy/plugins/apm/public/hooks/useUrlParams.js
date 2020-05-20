"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUrlParams = useUrlParams;

var _react = require("react");

var _UrlParamsContext = require("../context/UrlParamsContext");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useUrlParams() {
  return (0, _react.useContext)(_UrlParamsContext.UrlParamsContext);
}