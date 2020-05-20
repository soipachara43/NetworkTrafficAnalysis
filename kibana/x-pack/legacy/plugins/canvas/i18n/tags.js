"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagStrings = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const TagStrings = {
  chart: () => _i18n.i18n.translate('xpack.canvas.tags.chartTag', {
    defaultMessage: 'chart'
  }),
  filter: () => _i18n.i18n.translate('xpack.canvas.tags.filterTag', {
    defaultMessage: 'filter'
  }),
  graphic: () => _i18n.i18n.translate('xpack.canvas.tags.graphicTag', {
    defaultMessage: 'graphic'
  }),
  presentation: () => _i18n.i18n.translate('xpack.canvas.tags.presentationTag', {
    defaultMessage: 'presentation'
  }),
  proportion: () => _i18n.i18n.translate('xpack.canvas.tags.proportionTag', {
    defaultMessage: 'proportion'
  }),
  report: () => _i18n.i18n.translate('xpack.canvas.tags.reportTag', {
    defaultMessage: 'report'
  }),
  text: () => _i18n.i18n.translate('xpack.canvas.tags.textTag', {
    defaultMessage: 'text'
  })
};
exports.TagStrings = TagStrings;