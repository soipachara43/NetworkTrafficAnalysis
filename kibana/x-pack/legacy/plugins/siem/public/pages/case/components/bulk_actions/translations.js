"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BULK_ACTION_DELETE_SELECTED = exports.BULK_ACTION_OPEN_SELECTED = exports.BULK_ACTION_CLOSE_SELECTED = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BULK_ACTION_CLOSE_SELECTED = _i18n.i18n.translate('xpack.siem.case.caseTable.bulkActions.closeSelectedTitle', {
  defaultMessage: 'Close selected'
});

exports.BULK_ACTION_CLOSE_SELECTED = BULK_ACTION_CLOSE_SELECTED;

var BULK_ACTION_OPEN_SELECTED = _i18n.i18n.translate('xpack.siem.case.caseTable.bulkActions.openSelectedTitle', {
  defaultMessage: 'Reopen selected'
});

exports.BULK_ACTION_OPEN_SELECTED = BULK_ACTION_OPEN_SELECTED;

var BULK_ACTION_DELETE_SELECTED = _i18n.i18n.translate('xpack.siem.case.caseTable.bulkActions.deleteSelectedTitle', {
  defaultMessage: 'Delete selected'
});

exports.BULK_ACTION_DELETE_SELECTED = BULK_ACTION_DELETE_SELECTED;