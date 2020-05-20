"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featureCatalogueEntry = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../src/plugins/home/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var featureCatalogueEntry = {
  id: 'canvas',
  title: 'Canvas',
  description: _i18n.i18n.translate('xpack.canvas.appDescription', {
    defaultMessage: 'Showcase your data in a pixel-perfect way.'
  }),
  icon: 'canvasApp',
  path: '/app/canvas',
  showOnHomePage: true,
  category: _public.FeatureCatalogueCategory.DATA
};
exports.featureCatalogueEntry = featureCatalogueEntry;