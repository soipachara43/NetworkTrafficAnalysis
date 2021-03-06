"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUiSettings = void 0;

var _kibana_context = require("./kibana_context");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useUiSettings = function useUiSettings() {
  return (0, _kibana_context.useMlKibana)().services.uiSettings;
};

exports.useUiSettings = useUiSettings;