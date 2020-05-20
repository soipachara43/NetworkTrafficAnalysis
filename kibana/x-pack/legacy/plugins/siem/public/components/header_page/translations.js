"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EDIT_TITLE_ARIA = exports.CANCEL = exports.SAVE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SAVE = _i18n.i18n.translate('xpack.siem.header.editableTitle.save', {
  defaultMessage: 'Save'
});

exports.SAVE = SAVE;

var CANCEL = _i18n.i18n.translate('xpack.siem.header.editableTitle.cancel', {
  defaultMessage: 'Cancel'
});

exports.CANCEL = CANCEL;

var EDIT_TITLE_ARIA = function EDIT_TITLE_ARIA(title) {
  return _i18n.i18n.translate('xpack.siem.header.editableTitle.editButtonAria', {
    values: {
      title: title
    },
    defaultMessage: 'You can edit {title} by clicking'
  });
};

exports.EDIT_TITLE_ARIA = EDIT_TITLE_ARIA;