"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeJobFactory = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../../../common/constants");

var _lib = require("../../../server/lib");

var _lib2 = require("./lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const executeJobFactory = async function executeJobFactoryFn(reporting, server, elasticsearch, parentLogger) {
  const crypto = (0, _lib.cryptoFactory)(server);
  const logger = parentLogger.clone([_constants.CSV_FROM_SAVEDOBJECT_JOB_TYPE, 'execute-job']);
  const generateCsv = (0, _lib2.createGenerateCsv)(reporting, server, elasticsearch, parentLogger);
  return async function executeJob(jobId, job, realRequest) {
    // There will not be a jobID for "immediate" generation.
    // jobID is only for "queued" jobs
    // Use the jobID as a logging tag or "immediate"
    const jobLogger = logger.clone([jobId === null ? 'immediate' : jobId]);
    const {
      jobParams
    } = job;
    const {
      isImmediate,
      panel,
      visType
    } = jobParams;

    if (!panel) {
      _i18n.i18n.translate('xpack.reporting.exportTypes.csv_from_savedobject.executeJob.failedToAccessPanel', {
        defaultMessage: 'Failed to access panel metadata for job execution'
      });
    }

    jobLogger.debug(`Execute job generating [${visType}] csv`);
    let requestObject;

    if (isImmediate && realRequest) {
      jobLogger.info(`Executing job from immediate API`);
      requestObject = realRequest;
    } else {
      jobLogger.info(`Executing job async using encrypted headers`);
      let decryptedHeaders;
      const serializedEncryptedHeaders = job.headers;

      try {
        decryptedHeaders = await crypto.decrypt(serializedEncryptedHeaders);
      } catch (err) {
        jobLogger.error(err);
        throw new Error(_i18n.i18n.translate('xpack.reporting.exportTypes.csv_from_savedobject.executeJob.failedToDecryptReportJobDataErrorMessage', {
          defaultMessage: 'Failed to decrypt report job data. Please ensure that {encryptionKey} is set and re-generate this report. {err}',
          values: {
            encryptionKey: 'xpack.reporting.encryptionKey',
            err
          }
        }));
      }

      requestObject = {
        headers: decryptedHeaders,
        server
      };
    }

    let content;
    let maxSizeReached = false;
    let size = 0;

    try {
      const generateResults = await generateCsv(requestObject, visType, panel, jobParams);
      ({
        result: {
          content,
          maxSizeReached,
          size
        }
      } = generateResults);
    } catch (err) {
      jobLogger.error(`Generate CSV Error! ${err}`);
      throw err;
    }

    if (maxSizeReached) {
      jobLogger.warn(`Max size reached: CSV output truncated to ${size} bytes`);
    }

    return {
      content_type: _constants.CONTENT_TYPE_CSV,
      content,
      max_size_reached: maxSizeReached,
      size
    };
  };
};

exports.executeJobFactory = executeJobFactory;