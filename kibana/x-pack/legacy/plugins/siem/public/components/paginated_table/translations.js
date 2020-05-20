"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOAST_TEXT = exports.TOAST_TITLE = exports.ROWS = exports.SHOWING = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SHOWING = _i18n.i18n.translate('xpack.siem.paginatedTable.showingSubtitle', {
  defaultMessage: 'Showing'
});

exports.SHOWING = SHOWING;

var ROWS = _i18n.i18n.translate('xpack.siem.paginatedTable.rowsButtonLabel', {
  defaultMessage: 'Rows per page'
});

exports.ROWS = ROWS;

var TOAST_TITLE = _i18n.i18n.translate('xpack.siem.paginatedTable.tooManyResultsToastTitle', {
  defaultMessage: ' - too many results'
});

exports.TOAST_TITLE = TOAST_TITLE;

var TOAST_TEXT = _i18n.i18n.translate('xpack.siem.paginatedTable.tooManyResultsToastText', {
  defaultMessage: 'Narrow your query to better filter the results'
});

exports.TOAST_TEXT = TOAST_TEXT;