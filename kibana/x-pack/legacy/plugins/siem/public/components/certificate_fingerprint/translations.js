"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVER_CERT = exports.CLIENT_CERT = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CLIENT_CERT = _i18n.i18n.translate('xpack.siem.certificate.fingerprint.clientCertLabel', {
  defaultMessage: 'client cert'
});

exports.CLIENT_CERT = CLIENT_CERT;

var SERVER_CERT = _i18n.i18n.translate('xpack.siem.certificate.fingerprint.serverCertLabel', {
  defaultMessage: 'server cert'
});

exports.SERVER_CERT = SERVER_CERT;