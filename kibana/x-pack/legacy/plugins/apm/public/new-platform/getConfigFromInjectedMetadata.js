"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigFromInjectedMetadata = getConfigFromInjectedMetadata;

var _new_platform = require("ui/new_platform");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var core = _new_platform.npStart.core;

function getConfigFromInjectedMetadata() {
  var _core$injectedMetadat = core.injectedMetadata.getInjectedVars(),
      apmIndexPatternTitle = _core$injectedMetadat.apmIndexPatternTitle,
      apmServiceMapEnabled = _core$injectedMetadat.apmServiceMapEnabled,
      apmUiEnabled = _core$injectedMetadat.apmUiEnabled;

  return {
    indexPatternTitle: "".concat(apmIndexPatternTitle),
    serviceMapEnabled: !!apmServiceMapEnabled,
    ui: {
      enabled: !!apmUiEnabled
    }
  };
}