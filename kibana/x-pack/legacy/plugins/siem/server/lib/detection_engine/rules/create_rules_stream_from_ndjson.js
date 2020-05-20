"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRulesStreamFromNdJson = exports.createLimitStream = exports.validateRules = exports.filterExportedCounts = exports.parseNdjsonStrings = void 0;

var _stream = require("stream");

var _fp = require("lodash/fp");

var _streams = require("../../../../../../../../src/legacy/utils/streams");

var _import_rules_schema = require("../routes/schemas/import_rules_schema");

var _bad_request_error = require("../errors/bad_request_error");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const parseNdjsonStrings = () => {
  return (0, _streams.createMapStream)(ndJsonStr => {
    if ((0, _fp.isString)(ndJsonStr) && ndJsonStr.trim() !== '') {
      try {
        return JSON.parse(ndJsonStr);
      } catch (err) {
        return err;
      }
    }
  });
};

exports.parseNdjsonStrings = parseNdjsonStrings;

const filterExportedCounts = () => {
  return (0, _streams.createFilterStream)(obj => obj != null && !(0, _fp.has)('exported_count', obj));
};

exports.filterExportedCounts = filterExportedCounts;

const validateRules = () => {
  return (0, _streams.createMapStream)(obj => {
    if (!(obj instanceof Error)) {
      const validated = _import_rules_schema.importRulesSchema.validate(obj);

      if (validated.error != null) {
        return new _bad_request_error.BadRequestError(validated.error.message);
      } else {
        return validated.value;
      }
    } else {
      return obj;
    }
  });
}; // Adaptation from: saved_objects/import/create_limit_stream.ts


exports.validateRules = validateRules;

const createLimitStream = limit => {
  let counter = 0;
  return new _stream.Transform({
    objectMode: true,

    async transform(obj, _, done) {
      if (counter >= limit) {
        return done(new Error(`Can't import more than ${limit} rules`));
      }

      counter++;
      done(undefined, obj);
    }

  });
}; // TODO: Capture both the line number and the rule_id if you have that information for the error message
// eventually and then pass it down so we can give error messages on the line number

/**
 * Inspiration and the pattern of code followed is from:
 * saved_objects/lib/create_saved_objects_stream_from_ndjson.ts
 */


exports.createLimitStream = createLimitStream;

const createRulesStreamFromNdJson = ruleLimit => {
  return [(0, _streams.createSplitStream)('\n'), parseNdjsonStrings(), filterExportedCounts(), validateRules(), createLimitStream(ruleLimit), (0, _streams.createConcatStream)([])];
};

exports.createRulesStreamFromNdJson = createRulesStreamFromNdJson;