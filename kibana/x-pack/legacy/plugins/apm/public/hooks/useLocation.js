"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocation = useLocation;

var _react = require("react");

var _LocationContext = require("../context/LocationContext");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useLocation() {
  return (0, _react.useContext)(_LocationContext.LocationContext);
}