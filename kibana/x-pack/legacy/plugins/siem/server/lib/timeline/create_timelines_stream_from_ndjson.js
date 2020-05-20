"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTimelinesStreamFromNdJson = exports.validateTimelines = void 0;

var _utils = require("../../../../../../../src/legacy/utils");

var _create_rules_stream_from_ndjson = require("../detection_engine/rules/create_rules_stream_from_ndjson");

var _import_timelines_schema = require("./routes/schemas/import_timelines_schema");

var _bad_request_error = require("../detection_engine/errors/bad_request_error");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const validateTimelines = () => {
  return (0, _utils.createMapStream)(obj => {
    if (!(obj instanceof Error)) {
      const validated = _import_timelines_schema.importTimelinesSchema.validate(obj);

      if (validated.error != null) {
        return new _bad_request_error.BadRequestError(validated.error.message);
      } else {
        return validated.value;
      }
    } else {
      return obj;
    }
  });
};

exports.validateTimelines = validateTimelines;

const createTimelinesStreamFromNdJson = ruleLimit => {
  return [(0, _utils.createSplitStream)('\n'), (0, _create_rules_stream_from_ndjson.parseNdjsonStrings)(), (0, _create_rules_stream_from_ndjson.filterExportedCounts)(), validateTimelines(), (0, _create_rules_stream_from_ndjson.createLimitStream)(ruleLimit), (0, _utils.createConcatStream)([])];
};

exports.createTimelinesStreamFromNdJson = createTimelinesStreamFromNdJson;