"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByTypes = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var groupByTypes = {
  all: {
    text: _i18n.i18n.translate('xpack.watcher.thresholdWatchExpression.groupByLabel.allDocumentsLabel', {
      defaultMessage: 'all documents'
    }),
    sizeRequired: false,
    value: 'all',
    validNormalizedTypes: []
  },
  top: {
    text: _i18n.i18n.translate('xpack.watcher.thresholdWatchExpression.groupByLabel.topLabel', {
      defaultMessage: 'top'
    }),
    sizeRequired: true,
    value: 'top',
    validNormalizedTypes: ['number', 'date', 'keyword']
  }
};
exports.groupByTypes = groupByTypes;