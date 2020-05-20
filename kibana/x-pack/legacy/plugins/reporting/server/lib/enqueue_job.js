"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enqueueJobFactory = enqueueJobFactory;

var _lodash = require("lodash");

var _esqueue = require("./esqueue");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
function enqueueJobFactory(reporting, server, elasticsearch, parentLogger) {
  const logger = parentLogger.clone(['queue-job']);
  const config = server.config();
  const captureConfig = config.get('xpack.reporting.capture');
  const browserType = captureConfig.browser.type;
  const maxAttempts = captureConfig.maxAttempts;
  const queueConfig = config.get('xpack.reporting.queue');
  return async function enqueueJob(exportTypeId, jobParams, user, headers, request) {
    const esqueue = await reporting.getEsqueue();
    const exportType = reporting.getExportTypesRegistry().getById(exportTypeId);

    if (exportType == null) {
      throw new Error(`Export type ${exportTypeId} does not exist in the registry!`);
    } // TODO: the createJobFn should be unwrapped in the register method of the export types registry


    const createJob = exportType.createJobFactory(reporting, server, elasticsearch, logger);
    const payload = await createJob(jobParams, headers, request);
    const options = {
      timeout: queueConfig.timeout,
      created_by: (0, _lodash.get)(user, 'username', false),
      browser_type: browserType,
      max_attempts: maxAttempts
    };
    return new Promise((resolve, reject) => {
      const job = esqueue.addJob(exportType.jobType, payload, options);
      job.on(_esqueue.events.EVENT_JOB_CREATED, createdJob => {
        if (createdJob.id === job.id) {
          logger.info(`Successfully queued job: ${createdJob.id}`);
          resolve(job);
        }
      });
      job.on(_esqueue.events.EVENT_JOB_CREATE_ERROR, reject);
    });
  };
}