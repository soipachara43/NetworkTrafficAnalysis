"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentField = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * This is a special-case field which allows us to perform
 * document-level operations such as count.
 */
var documentField = {
  name: _i18n.i18n.translate('xpack.lens.indexPattern.records', {
    defaultMessage: 'Records'
  }),
  type: 'document',
  aggregatable: true,
  searchable: true
};
exports.documentField = documentField;