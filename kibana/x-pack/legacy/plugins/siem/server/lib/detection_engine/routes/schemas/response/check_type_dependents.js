"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkTypeDependents = exports.getDependents = exports.addMlFields = exports.addQueryFields = exports.addTimelineTitle = exports.addSavedId = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

var _pipeable = require("fp-ts/lib/pipeable");

var _ml_helpers = require("../../../../../../common/detection_engine/ml_helpers");

var _rules_schema = require("./rules_schema");

var _type_timeline_only_schema = require("./type_timeline_only_schema");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const addSavedId = typeAndTimelineOnly => {
  if (typeAndTimelineOnly.type === 'saved_query') {
    return [t.exact(t.type({
      saved_id: _rules_schema.dependentRulesSchema.props.saved_id
    }))];
  } else {
    return [];
  }
};

exports.addSavedId = addSavedId;

const addTimelineTitle = typeAndTimelineOnly => {
  if (typeAndTimelineOnly.timeline_id != null) {
    return [t.exact(t.type({
      timeline_title: _rules_schema.dependentRulesSchema.props.timeline_title
    })), t.exact(t.type({
      timeline_id: _rules_schema.dependentRulesSchema.props.timeline_id
    }))];
  } else {
    return [];
  }
};

exports.addTimelineTitle = addTimelineTitle;

const addQueryFields = typeAndTimelineOnly => {
  if (typeAndTimelineOnly.type === 'query' || typeAndTimelineOnly.type === 'saved_query') {
    return [t.exact(t.type({
      query: _rules_schema.dependentRulesSchema.props.query
    })), t.exact(t.type({
      language: _rules_schema.dependentRulesSchema.props.language
    }))];
  } else {
    return [];
  }
};

exports.addQueryFields = addQueryFields;

const addMlFields = typeAndTimelineOnly => {
  if ((0, _ml_helpers.isMlRule)(typeAndTimelineOnly.type)) {
    return [t.exact(t.type({
      anomaly_threshold: _rules_schema.dependentRulesSchema.props.anomaly_threshold
    })), t.exact(t.type({
      machine_learning_job_id: _rules_schema.dependentRulesSchema.props.machine_learning_job_id
    }))];
  } else {
    return [];
  }
};

exports.addMlFields = addMlFields;

const getDependents = typeAndTimelineOnly => {
  const dependents = [t.exact(_rules_schema.requiredRulesSchema), t.exact(_rules_schema.partialRulesSchema), ...addSavedId(typeAndTimelineOnly), ...addTimelineTitle(typeAndTimelineOnly), ...addQueryFields(typeAndTimelineOnly), ...addMlFields(typeAndTimelineOnly)];

  if (dependents.length > 1) {
    // This unsafe cast is because t.intersection does not use an array but rather a set of
    // tuples and really does not look like they expected us to ever dynamically build up
    // intersections, but here we are doing that. Looking at their code, although they limit
    // the array elements to 5, it looks like you have N number of intersections
    const unsafeCast = dependents;
    return t.intersection(unsafeCast);
  } else {
    // We are not allowed to call t.intersection with a single value so we return without
    // it here normally.
    return dependents[0];
  }
};

exports.getDependents = getDependents;

const checkTypeDependents = input => {
  const typeOnlyDecoded = _type_timeline_only_schema.typeAndTimelineOnlySchema.decode(input);

  const onLeft = errors => (0, _Either.left)(errors);

  const onRight = typeAndTimelineOnly => {
    const intersections = getDependents(typeAndTimelineOnly);
    return intersections.decode(input);
  };

  return (0, _pipeable.pipe)(typeOnlyDecoded, (0, _Either.fold)(onLeft, onRight));
};

exports.checkTypeDependents = checkTypeDependents;