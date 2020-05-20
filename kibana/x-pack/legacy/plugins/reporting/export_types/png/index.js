"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExportType = void 0;

var _constants = require("../../common/constants");

var _create_job = require("./server/create_job");

var _execute_job = require("./server/execute_job");

var _metadata = require("./metadata");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getExportType = () => ({ ..._metadata.metadata,
  jobType: _constants.PNG_JOB_TYPE,
  jobContentEncoding: 'base64',
  jobContentExtension: 'PNG',
  createJobFactory: _create_job.createJobFactory,
  executeJobFactory: _execute_job.executeJobFactory,
  validLicenses: [_constants.LICENSE_TYPE_TRIAL, _constants.LICENSE_TYPE_STANDARD, _constants.LICENSE_TYPE_GOLD, _constants.LICENSE_TYPE_PLATINUM, _constants.LICENSE_TYPE_ENTERPRISE]
});

exports.getExportType = getExportType;