"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOGGLE_COLUMN_TOOLTIP = exports.COPY_TO_CLIPBOARD = exports.PLACEHOLDER = exports.BLANK = exports.DESCRIPTION = exports.VALUE = exports.FIELD = exports.JSON_VIEW = exports.TABLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TABLE = _i18n.i18n.translate('xpack.siem.eventDetails.table', {
  defaultMessage: 'Table'
});

exports.TABLE = TABLE;

var JSON_VIEW = _i18n.i18n.translate('xpack.siem.eventDetails.jsonView', {
  defaultMessage: 'JSON View'
});

exports.JSON_VIEW = JSON_VIEW;

var FIELD = _i18n.i18n.translate('xpack.siem.eventDetails.field', {
  defaultMessage: 'Field'
});

exports.FIELD = FIELD;

var VALUE = _i18n.i18n.translate('xpack.siem.eventDetails.value', {
  defaultMessage: 'Value'
});

exports.VALUE = VALUE;

var DESCRIPTION = _i18n.i18n.translate('xpack.siem.eventDetails.description', {
  defaultMessage: 'Description'
});

exports.DESCRIPTION = DESCRIPTION;

var BLANK = _i18n.i18n.translate('xpack.siem.eventDetails.blank', {
  defaultMessage: ' '
});

exports.BLANK = BLANK;

var PLACEHOLDER = _i18n.i18n.translate('xpack.siem.eventDetails.filter.placeholder', {
  defaultMessage: 'Filter by Field, Value, or Description...'
});

exports.PLACEHOLDER = PLACEHOLDER;

var COPY_TO_CLIPBOARD = _i18n.i18n.translate('xpack.siem.eventDetails.copyToClipboard', {
  defaultMessage: 'Copy to Clipboard'
});

exports.COPY_TO_CLIPBOARD = COPY_TO_CLIPBOARD;

var TOGGLE_COLUMN_TOOLTIP = _i18n.i18n.translate('xpack.siem.eventDetails.toggleColumnTooltip', {
  defaultMessage: 'Toggle column'
});

exports.TOGGLE_COLUMN_TOOLTIP = TOGGLE_COLUMN_TOOLTIP;