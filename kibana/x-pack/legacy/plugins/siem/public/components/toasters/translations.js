"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLOSE_ERROR_MODAL = exports.TITLE_ERROR_MODAL = exports.SEE_ALL_ERRORS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SEE_ALL_ERRORS = _i18n.i18n.translate('xpack.siem.modalAllErrors.seeAllErrors.button', {
  defaultMessage: 'See the full error(s)'
});

exports.SEE_ALL_ERRORS = SEE_ALL_ERRORS;

var TITLE_ERROR_MODAL = _i18n.i18n.translate('xpack.siem.modalAllErrors.title', {
  defaultMessage: 'Your visualization has error(s)'
});

exports.TITLE_ERROR_MODAL = TITLE_ERROR_MODAL;

var CLOSE_ERROR_MODAL = _i18n.i18n.translate('xpack.siem.modalAllErrors.close.button', {
  defaultMessage: 'Close'
});

exports.CLOSE_ERROR_MODAL = CLOSE_ERROR_MODAL;