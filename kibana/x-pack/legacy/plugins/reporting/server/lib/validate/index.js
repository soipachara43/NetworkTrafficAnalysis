"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runValidations = runValidations;

var _i18n = require("@kbn/i18n");

var _validate_browser = require("./validate_browser");

var _validate_encryption_key = require("./validate_encryption_key");

var _validate_max_content_length = require("./validate_max_content_length");

var _validate_server_host = require("./validate_server_host");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function runValidations(server, elasticsearch, browserFactory, logger) {
  try {
    await Promise.all([(0, _validate_browser.validateBrowser)(server, browserFactory, logger), (0, _validate_encryption_key.validateEncryptionKey)(server, logger), (0, _validate_max_content_length.validateMaxContentLength)(server, elasticsearch, logger), (0, _validate_server_host.validateServerHost)(server)]);
    logger.debug(_i18n.i18n.translate('xpack.reporting.selfCheck.ok', {
      defaultMessage: `Reporting plugin self-check ok!`
    }));
  } catch (err) {
    logger.error(err);
    logger.warning(_i18n.i18n.translate('xpack.reporting.selfCheck.warning', {
      defaultMessage: `Reporting plugin self-check generated a warning: {err}`,
      values: {
        err
      }
    }));
  }
}