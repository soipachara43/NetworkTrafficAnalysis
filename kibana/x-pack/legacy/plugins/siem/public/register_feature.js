"use strict";

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../src/plugins/home/public");

var _constants = require("../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO(rylnd): move this into Plugin.setup once we're on NP
_new_platform.npSetup.plugins.home.featureCatalogue.register({
  id: _constants.APP_ID,
  title: 'SIEM',
  description: 'Explore security metrics and logs for events and alerts',
  icon: 'securityAnalyticsApp',
  path: "/app/".concat(_constants.APP_ID),
  showOnHomePage: true,
  category: _public.FeatureCatalogueCategory.DATA
});