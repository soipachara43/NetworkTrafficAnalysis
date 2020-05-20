"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRulesSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _schemas = require("./schemas");

var _constants = require("../../../../../common/constants");

var _feature_flags = require("../../feature_flags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

/* eslint-enable @typescript-eslint/camelcase */
const createRulesSchema = _joi.default.object({
  actions: _schemas.actions.default([]),
  anomaly_threshold: _schemas.anomaly_threshold.when('type', {
    is: 'machine_learning',
    then: _joi.default.required(),
    otherwise: _joi.default.forbidden()
  }),
  description: _schemas.description.required(),
  enabled: _schemas.enabled.default(true),
  false_positives: _schemas.false_positives.default([]),
  filters: _schemas.filters,
  from: _schemas.from.default('now-6m'),
  rule_id: _schemas.rule_id,
  index: _schemas.index,
  interval: _schemas.interval.default('5m'),
  query: _schemas.query.when('type', {
    is: 'machine_learning',
    then: _joi.default.forbidden(),
    otherwise: _schemas.query.allow('').default('')
  }),
  language: _schemas.language.when('type', {
    is: 'machine_learning',
    then: _joi.default.forbidden(),
    otherwise: _schemas.language.default('kuery')
  }),
  output_index: _schemas.output_index,
  saved_id: _schemas.saved_id.when('type', {
    is: 'saved_query',
    then: _joi.default.required(),
    otherwise: _joi.default.forbidden()
  }),
  timeline_id: _schemas.timeline_id,
  timeline_title: _schemas.timeline_title,
  meta: _schemas.meta,
  machine_learning_job_id: _schemas.machine_learning_job_id.when('type', {
    is: 'machine_learning',
    then: _joi.default.required(),
    otherwise: _joi.default.forbidden()
  }),
  risk_score: _schemas.risk_score.required(),
  max_signals: _schemas.max_signals.default(_constants.DEFAULT_MAX_SIGNALS),
  name: _schemas.name.required(),
  severity: _schemas.severity.required(),
  tags: _schemas.tags.default([]),
  to: _schemas.to.default('now'),
  type: _schemas.type.required(),
  threat: _schemas.threat.default([]),
  throttle: _schemas.throttle.default(null),
  references: _schemas.references.default([]),
  note: _schemas.note.allow(''),
  version: _schemas.version.default(1),
  // TODO: (LIST-FEATURE) Remove the hasListsFeatures once this is ready for release
  lists: (0, _feature_flags.hasListsFeature)() ? _schemas.lists.default([]) : _schemas.lists.forbidden().default([])
});

exports.createRulesSchema = createRulesSchema;