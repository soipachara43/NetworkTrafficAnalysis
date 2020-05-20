"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  EDIT_TAGS_ARIA: true
};
exports.EDIT_TAGS_ARIA = void 0;

var _i18n = require("@kbn/i18n");

var _translations = require("../../translations");

Object.keys(_translations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _translations[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EDIT_TAGS_ARIA = _i18n.i18n.translate('xpack.siem.case.caseView.editTagsLinkAria', {
  defaultMessage: 'click to edit tags'
});

exports.EDIT_TAGS_ARIA = EDIT_TAGS_ARIA;