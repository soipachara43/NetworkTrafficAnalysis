"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobCreatorContext = void 0;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JobCreatorContext = (0, _react.createContext)({
  jobCreatorUpdated: 0,
  jobCreatorUpdate: function jobCreatorUpdate() {},
  jobCreator: {},
  chartLoader: {},
  resultsLoader: {},
  chartInterval: {},
  jobValidator: {},
  jobValidatorUpdated: 0,
  fields: [],
  aggs: [],
  existingJobsAndGroups: {}
});
exports.JobCreatorContext = JobCreatorContext;