"use strict";

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../src/plugins/home/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var home = _new_platform.npSetup.plugins.home;
home.featureCatalogue.register({
  id: 'grokdebugger',
  title: _i18n.i18n.translate('xpack.grokDebugger.registryProviderTitle', {
    defaultMessage: '{grokLogParsingTool} Debugger',
    values: {
      grokLogParsingTool: 'Grok'
    }
  }),
  description: _i18n.i18n.translate('xpack.grokDebugger.registryProviderDescription', {
    defaultMessage: 'Simulate and debug {grokLogParsingTool} patterns for data transformation on ingestion.',
    values: {
      grokLogParsingTool: 'grok'
    }
  }),
  icon: 'grokApp',
  path: '/app/kibana#/dev_tools/grokdebugger',
  showOnHomePage: false,
  category: _public.FeatureCatalogueCategory.ADMIN
});