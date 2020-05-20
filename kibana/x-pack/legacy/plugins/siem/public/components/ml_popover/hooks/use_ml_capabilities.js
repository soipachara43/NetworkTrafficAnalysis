"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMlCapabilities = void 0;

var _react = require("react");

var _ml_capabilities_provider = require("../../ml/permissions/ml_capabilities_provider");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useMlCapabilities = function useMlCapabilities() {
  return (0, _react.useContext)(_ml_capabilities_provider.MlCapabilitiesContext);
};

exports.useMlCapabilities = useMlCapabilities;