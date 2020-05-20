"use strict";

var _i18n = require("@kbn/i18n");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _new_platform = require("ui/new_platform");

var _public = require("../../../../../src/plugins/home/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var home = _new_platform.npSetup.plugins.home;

if (_chrome.default.getInjected('monitoringUiEnabled')) {
  home.featureCatalogue.register({
    id: 'monitoring',
    title: _i18n.i18n.translate('xpack.monitoring.monitoringTitle', {
      defaultMessage: 'Monitoring'
    }),
    description: _i18n.i18n.translate('xpack.monitoring.monitoringDescription', {
      defaultMessage: 'Track the real-time health and performance of your Elastic Stack.'
    }),
    icon: 'monitoringApp',
    path: '/app/monitoring',
    showOnHomePage: true,
    category: _public.FeatureCatalogueCategory.ADMIN
  });
}