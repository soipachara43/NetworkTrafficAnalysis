"use strict";

var _new_platform = require("ui/new_platform");

var _featureCatalogueEntry = require("./new-platform/featureCatalogueEntry");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var core = _new_platform.npSetup.core,
    home = _new_platform.npSetup.plugins.home;
var apmUiEnabled = core.injectedMetadata.getInjectedVar('apmUiEnabled');

if (apmUiEnabled) {
  home.featureCatalogue.register(_featureCatalogueEntry.featureCatalogueEntry);
}

home.environment.update({
  apmUi: apmUiEnabled
});