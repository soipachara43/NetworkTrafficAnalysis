"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REMOVE_COLUMN = exports.TYPE = exports.FIELD = exports.DESCRIPTION = exports.CATEGORY = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CATEGORY = _i18n.i18n.translate('xpack.siem.timeline.categoryTooltip', {
  defaultMessage: 'Category'
});

exports.CATEGORY = CATEGORY;

var DESCRIPTION = _i18n.i18n.translate('xpack.siem.timeline.descriptionTooltip', {
  defaultMessage: 'Description'
});

exports.DESCRIPTION = DESCRIPTION;

var FIELD = _i18n.i18n.translate('xpack.siem.timeline.fieldTooltip', {
  defaultMessage: 'Field'
});

exports.FIELD = FIELD;

var TYPE = _i18n.i18n.translate('xpack.siem.timeline.typeTooltip', {
  defaultMessage: 'Type'
});

exports.TYPE = TYPE;

var REMOVE_COLUMN = _i18n.i18n.translate('xpack.siem.timeline.flyout.pane.removeColumnButtonLabel', {
  defaultMessage: 'Remove column'
});

exports.REMOVE_COLUMN = REMOVE_COLUMN;