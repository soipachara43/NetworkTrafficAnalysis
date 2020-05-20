"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReadonlyBadge = setReadonlyBadge;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function setReadonlyBadge(_ref) {
  var application = _ref.application,
      chrome = _ref.chrome;
  var canSave = application.capabilities.apm.save;
  var setBadge = chrome.setBadge;
  setBadge(!canSave ? {
    text: _i18n.i18n.translate('xpack.apm.header.badge.readOnly.text', {
      defaultMessage: 'Read only'
    }),
    tooltip: _i18n.i18n.translate('xpack.apm.header.badge.readOnly.tooltip', {
      defaultMessage: 'Unable to save'
    }),
    iconType: 'glasses'
  } : undefined);
}