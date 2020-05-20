"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useApmPluginContext = useApmPluginContext;

var _react = require("react");

var _ApmPluginContext = require("../context/ApmPluginContext");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useApmPluginContext() {
  return (0, _react.useContext)(_ApmPluginContext.ApmPluginContext);
}