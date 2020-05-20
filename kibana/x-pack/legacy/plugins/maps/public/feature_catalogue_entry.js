"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featureCatalogueEntry = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../common/constants");

var _i18n_getters = require("../common/i18n_getters");

var _public = require("../../../../../src/plugins/home/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var featureCatalogueEntry = {
  id: _constants.APP_ID,
  title: (0, _i18n_getters.getAppTitle)(),
  description: _i18n.i18n.translate('xpack.maps.feature.appDescription', {
    defaultMessage: 'Explore geospatial data from Elasticsearch and the Elastic Maps Service'
  }),
  icon: _constants.APP_ICON,
  path: '/app/maps',
  showOnHomePage: true,
  category: _public.FeatureCatalogueCategory.DATA
};
exports.featureCatalogueEntry = featureCatalogueEntry;