"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptJobHeaders = void 0;

var _i18n = require("@kbn/i18n");

var _crypto = require("../../../server/lib/crypto");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO merge functionality with CSV execute job
const decryptJobHeaders = async ({
  server,
  job,
  logger
}) => {
  const crypto = (0, _crypto.cryptoFactory)(server);

  try {
    const decryptedHeaders = await crypto.decrypt(job.headers);
    return decryptedHeaders;
  } catch (err) {
    logger.error(err);
    throw new Error(_i18n.i18n.translate('xpack.reporting.exportTypes.common.failedToDecryptReportJobDataErrorMessage', {
      defaultMessage: 'Failed to decrypt report job data. Please ensure that {encryptionKey} is set and re-generate this report. {err}',
      values: {
        encryptionKey: 'xpack.reporting.encryptionKey',
        err: err.toString()
      }
    }));
  }
};

exports.decryptJobHeaders = decryptJobHeaders;