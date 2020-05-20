"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diskIOWriteBytes = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const diskIOWriteBytes = {
  diskIOWriteBytes: {
    avg: {
      field: 'aws.ec2.diskio.write.bytes_per_sec'
    }
  }
};
exports.diskIOWriteBytes = diskIOWriteBytes;