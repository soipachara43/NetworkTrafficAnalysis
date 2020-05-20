"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rollupBadgeExtension = exports.rollupToggleExtension = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var propertyPath = 'isRollupIndex';
var rollupToggleExtension = {
  matchIndex: function matchIndex(index) {
    return (0, _lodash.get)(index, propertyPath);
  },
  label: _i18n.i18n.translate('xpack.rollupJobs.indexMgmtToggle.toggleLabel', {
    defaultMessage: 'Include rollup indices'
  }),
  name: 'rollupToggle'
};
exports.rollupToggleExtension = rollupToggleExtension;
var rollupBadgeExtension = {
  matchIndex: function matchIndex(index) {
    return (0, _lodash.get)(index, propertyPath);
  },
  label: _i18n.i18n.translate('xpack.rollupJobs.indexMgmtBadge.rollupLabel', {
    defaultMessage: 'Rollup'
  }),
  color: 'secondary',
  filterExpression: 'isRollupIndex:true'
};
exports.rollupBadgeExtension = rollupBadgeExtension;