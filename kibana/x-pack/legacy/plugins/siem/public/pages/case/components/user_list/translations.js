"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEND_EMAIL_ARIA = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SEND_EMAIL_ARIA = function SEND_EMAIL_ARIA(user) {
  return _i18n.i18n.translate('xpack.siem.case.caseView.sendEmalLinkAria', {
    values: {
      user: user
    },
    defaultMessage: 'click to send an email to {user}'
  });
};

exports.SEND_EMAIL_ARIA = SEND_EMAIL_ARIA;