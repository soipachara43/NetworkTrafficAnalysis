"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWorkerFactory = createWorkerFactory;

var _constants = require("../../common/constants");

var _esqueue = require("./esqueue");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped dependency
function createWorkerFactory(reporting, server, elasticsearch, logger) {
  const config = server.config();
  const queueConfig = config.get('xpack.reporting.queue');
  const kibanaName = config.get('server.name');
  const kibanaId = config.get('server.uuid'); // Once more document types are added, this will need to be passed in

  return async function createWorker(queue) {
    // export type / execute job map
    const jobExecutors = new Map();

    for (const exportType of reporting.getExportTypesRegistry().getAll()) {
      // TODO: the executeJobFn should be unwrapped in the register method of the export types registry
      const jobExecutor = await exportType.executeJobFactory(reporting, server, elasticsearch, logger);
      jobExecutors.set(exportType.jobType, jobExecutor);
    }

    const workerFn = (jobSource, ...workerRestArgs) => {
      const {
        _id: jobId,
        _source: {
          jobtype: jobType
        }
      } = jobSource;
      const jobTypeExecutor = jobExecutors.get(jobType); // pass the work to the jobExecutor

      if (!jobTypeExecutor) {
        throw new Error(`Unable to find a job executor for the claimed job: [${jobId}]`);
      }

      if (jobId) {
        const jobExecutorWorker = jobTypeExecutor;
        return jobExecutorWorker(jobId, ...workerRestArgs);
      } else {
        const jobExecutorImmediate = jobExecutors.get(jobType);
        return jobExecutorImmediate(null, ...workerRestArgs);
      }
    };

    const workerOptions = {
      kibanaName,
      kibanaId,
      interval: queueConfig.pollInterval,
      intervalErrorMultiplier: queueConfig.pollIntervalErrorMultiplier
    };
    const worker = queue.registerWorker(_constants.PLUGIN_ID, workerFn, workerOptions);
    worker.on(_esqueue.events.EVENT_WORKER_COMPLETE, res => {
      logger.debug(`Worker completed: (${res.job.id})`);
    });
    worker.on(_esqueue.events.EVENT_WORKER_JOB_EXECUTION_ERROR, res => {
      logger.debug(`Worker error: (${res.job.id})`);
    });
    worker.on(_esqueue.events.EVENT_WORKER_JOB_TIMEOUT, res => {
      logger.debug(`Job timeout exceeded: (${res.job.id})`);
    });
  };
}