"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQueueFactory = createQueueFactory;

var _esqueue = require("./esqueue");

var _create_worker = require("./create_worker");

var _create_tagged_logger = require("./create_tagged_logger");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// TODO remove createTaggedLogger once esqueue is removed
async function createQueueFactory(reporting, server, elasticsearch, logger) {
  const queueConfig = server.config().get('xpack.reporting.queue');
  const index = server.config().get('xpack.reporting.index');
  const queueOptions = {
    interval: queueConfig.indexInterval,
    timeout: queueConfig.timeout,
    dateSeparator: '.',
    client: elasticsearch.dataClient,
    logger: (0, _create_tagged_logger.createTaggedLogger)(logger, ['esqueue', 'queue-worker'])
  };
  const queue = new _esqueue.Esqueue(index, queueOptions);

  if (queueConfig.pollEnabled) {
    // create workers to poll the index for idle jobs waiting to be claimed and executed
    const createWorker = (0, _create_worker.createWorkerFactory)(reporting, server, elasticsearch, logger);
    await createWorker(queue);
  } else {
    logger.info('xpack.reporting.queue.pollEnabled is set to false. This Kibana instance ' + 'will not poll for idle jobs to claim and execute. Make sure another ' + 'Kibana instance with polling enabled is running in this cluster so ' + 'reporting jobs can complete.', ['create_queue']);
  }

  return queue;
}