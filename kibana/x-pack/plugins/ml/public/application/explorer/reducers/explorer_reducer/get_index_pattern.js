"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPattern = getIndexPattern;

var _index_patterns = require("../../../../../common/constants/index_patterns");

var _explorer_utils = require("../../explorer_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Creates index pattern in the format expected by the kuery bar/kuery autocomplete provider
// Field objects required fields: name, type, aggregatable, searchable
function getIndexPattern(selectedJobs) {
  return {
    title: _index_patterns.ML_RESULTS_INDEX_PATTERN,
    fields: (0, _explorer_utils.getInfluencers)(selectedJobs).map(function (influencer) {
      return {
        name: influencer,
        type: 'string',
        aggregatable: true,
        searchable: true
      };
    })
  };
}