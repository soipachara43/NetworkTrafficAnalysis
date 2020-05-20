"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEncryptionKey = validateEncryptionKey;

var _i18n = require("@kbn/i18n");

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function validateEncryptionKey(serverFacade, logger) {
  const config = serverFacade.config();
  const encryptionKey = config.get('xpack.reporting.encryptionKey');

  if (encryptionKey == null) {
    // TODO this should simply throw an error and let the handler conver it to a warning mesasge. See validateServerHost.
    logger.warning(_i18n.i18n.translate('xpack.reporting.selfCheckEncryptionKey.warning', {
      defaultMessage: `Generating a random key for {setting}. To prevent pending reports ` + `from failing on restart, please set {setting} in kibana.yml`,
      values: {
        setting: 'xpack.reporting.encryptionKey'
      }
    })); // @ts-ignore: No set() method on KibanaConfig, just get() and has()

    config.set('xpack.reporting.encryptionKey', _crypto.default.randomBytes(16).toString('hex')); // update config in memory to contain a usable encryption key
  }
}