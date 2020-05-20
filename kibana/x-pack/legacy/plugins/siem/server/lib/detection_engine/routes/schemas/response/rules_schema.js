"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeList = exports.rulesSchema = exports.rulesWithoutTypeDependentsSchema = exports.partialRulesSchema = exports.dependentRulesSchema = exports.requiredRulesSchema = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _fp = require("lodash/fp");

var _Either = require("fp-ts/lib/Either");

var _pipeable = require("fp-ts/lib/pipeable");

var _check_type_dependents = require("./check_type_dependents");

var _schemas = require("./schemas");

var _lists_default_array = require("../types/lists_default_array");

var _feature_flags = require("../../../feature_flags");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

/**
 * This is the required fields for the rules schema response. Put all required properties on
 * this base for schemas such as create_rules, update_rules, for the correct validation of the
 * output schema.
 */
const requiredRulesSchema = t.type({
  description: _schemas.description,
  enabled: _schemas.enabled,
  false_positives: _schemas.false_positives,
  from: _schemas.from,
  id: _schemas.id,
  immutable: _schemas.immutable,
  interval: _schemas.interval,
  rule_id: _schemas.rule_id,
  output_index: _schemas.output_index,
  max_signals: _schemas.max_signals,
  risk_score: _schemas.risk_score,
  name: _schemas.name,
  references: _schemas.references,
  severity: _schemas.severity,
  updated_by: _schemas.updated_by,
  tags: _schemas.tags,
  to: _schemas.to,
  type: _schemas.type,
  threat: _schemas.threat,
  created_at: _schemas.created_at,
  updated_at: _schemas.updated_at,
  created_by: _schemas.created_by,
  version: _schemas.version,
  lists: _lists_default_array.ListsDefaultArray
});
exports.requiredRulesSchema = requiredRulesSchema;

/**
 * If you have type dependents or exclusive or situations add them here AND update the
 * check_type_dependents file for whichever REST flow it is going through.
 */
const dependentRulesSchema = t.partial({
  // query fields
  language: _schemas.language,
  query: _schemas.query,
  // when type = saved_query, saved_is is required
  saved_id: _schemas.saved_id,
  // These two are required together or not at all.
  timeline_id: _schemas.timeline_id,
  timeline_title: _schemas.timeline_title,
  // ML fields
  anomaly_threshold: _schemas.anomaly_threshold,
  machine_learning_job_id: _schemas.machine_learning_job_id
});
/**
 * This is the partial or optional fields for the rules schema. Put all optional
 * properties on this. DO NOT PUT type dependents such as xor relationships here.
 * Instead use dependentRulesSchema and check_type_dependents for how to do those.
 */

exports.dependentRulesSchema = dependentRulesSchema;
const partialRulesSchema = t.partial({
  actions: _schemas.actions,
  throttle: _schemas.throttle,
  status: _schemas.job_status,
  status_date: _schemas.status_date,
  last_success_at: _schemas.last_success_at,
  last_success_message: _schemas.last_success_message,
  last_failure_at: _schemas.last_failure_at,
  last_failure_message: _schemas.last_failure_message,
  filters: _schemas.filters,
  meta: _schemas.meta,
  index: _schemas.index,
  note: _schemas.note
});
/**
 * This is the rules schema WITHOUT typeDependents. You don't normally want to use this for a decode
 */

exports.partialRulesSchema = partialRulesSchema;
const rulesWithoutTypeDependentsSchema = t.intersection([t.exact(dependentRulesSchema), t.exact(partialRulesSchema), t.exact(requiredRulesSchema)]);
exports.rulesWithoutTypeDependentsSchema = rulesWithoutTypeDependentsSchema;

/**
 * This is the rulesSchema you want to use for checking type dependents and all the properties
 * through: rulesSchema.decode(someJSONObject)
 */
const rulesSchema = new t.Type('RulesSchema', input => (0, _fp.isObject)(input), input => {
  const output = (0, _check_type_dependents.checkTypeDependents)(input);

  if (!(0, _feature_flags.hasListsFeature)()) {
    // TODO: (LIST-FEATURE) Remove this after the lists feature is an accepted feature for a particular release
    return removeList(output);
  } else {
    return output;
  }
}, t.identity); // TODO: (LIST-FEATURE) Remove this after the lists feature is an accepted feature for a particular release

exports.rulesSchema = rulesSchema;

const removeList = decoded => {
  const onLeft = errors => (0, _Either.left)(errors);

  const onRight = decodedValue => {
    delete decodedValue.lists;
    return (0, _Either.right)(decodedValue);
  };

  const folded = (0, _Either.fold)(onLeft, onRight);
  return (0, _pipeable.pipe)(decoded, folded);
};
/**
 * This is the correct type you want to use for Rules that are outputted from the
 * REST interface. This has all base and all optional properties merged together.
 */


exports.removeList = removeList;