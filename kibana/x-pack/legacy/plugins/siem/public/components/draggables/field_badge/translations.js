"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CATEGORY = exports.TYPE = exports.FIELD = exports.COPY_TO_CLIPBOARD = exports.CATEGORY = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CATEGORY = _i18n.i18n.translate('xpack.siem.draggables.field.categoryLabel', {
  defaultMessage: 'Category'
});

exports.CATEGORY = CATEGORY;

var COPY_TO_CLIPBOARD = _i18n.i18n.translate('xpack.siem.eventDetails.copyToClipboardTooltip', {
  defaultMessage: 'Copy to Clipboard'
});

exports.COPY_TO_CLIPBOARD = COPY_TO_CLIPBOARD;

var FIELD = _i18n.i18n.translate('xpack.siem.draggables.field.fieldLabel', {
  defaultMessage: 'Field'
});

exports.FIELD = FIELD;

var TYPE = _i18n.i18n.translate('xpack.siem.draggables.field.typeLabel', {
  defaultMessage: 'Type'
});

exports.TYPE = TYPE;

var VIEW_CATEGORY = _i18n.i18n.translate('xpack.siem.draggables.field.viewCategoryTooltip', {
  defaultMessage: 'View Category'
});

exports.VIEW_CATEGORY = VIEW_CATEGORY;