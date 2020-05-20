"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConditionalHeaders = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getConditionalHeaders = ({
  server,
  job,
  filteredHeaders
}) => {
  const config = server.config();
  const [hostname, port, basePath, protocol] = [config.get('xpack.reporting.kibanaServer.hostname') || config.get('server.host'), config.get('xpack.reporting.kibanaServer.port') || config.get('server.port'), config.get('server.basePath'), config.get('xpack.reporting.kibanaServer.protocol') || server.info.protocol];
  const conditionalHeaders = {
    headers: filteredHeaders,
    conditions: {
      hostname: hostname.toLowerCase(),
      port,
      basePath,
      protocol
    }
  };
  return conditionalHeaders;
};

exports.getConditionalHeaders = getConditionalHeaders;