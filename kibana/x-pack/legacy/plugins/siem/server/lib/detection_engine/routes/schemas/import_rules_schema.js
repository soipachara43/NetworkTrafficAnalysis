"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importRulesPayloadSchema = exports.importRulesQuerySchema = exports.importRulesSchema = void 0;

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

/**
 * Differences from this and the createRulesSchema are
 *   - rule_id is required
 *   - id is optional (but ignored in the import code - rule_id is exclusively used for imports)
 *   - created_at is optional (but ignored in the import code)
 *   - updated_at is optional (but ignored in the import code)
 *   - created_by is optional (but ignored in the import code)
 *   - updated_by is optional (but ignored in the import code)
 */
const importRulesSchema = _joi.default.object({
  anomaly_threshold: _schemas.anomaly_threshold.when('type', {
    is: 'machine_learning',
    then: _joi.default.required(),
    otherwise: _joi.default.forbidden()
  }),
  id: _schemas.id,
  actions: _schemas.actions.default([]),
  description: _schemas.description.required(),
  enabled: _schemas.enabled.default(true),
  false_positives: _schemas.false_positives.default([]),
  filters: _schemas.filters,
  from: _schemas.from.default('now-6m'),
  rule_id: _schemas.rule_id.required(),
  immutable: _schemas.immutable.default(false).valid(false),
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
  machine_learning_job_id: _schemas.machine_learning_job_id.when('type', {
    is: 'machine_learning',
    then: _joi.default.required(),
    otherwise: _joi.default.forbidden()
  }),
  saved_id: _schemas.saved_id.when('type', {
    is: 'saved_query',
    then: _joi.default.required(),
    otherwise: _joi.default.forbidden()
  }),
  timeline_id: _schemas.timeline_id,
  timeline_title: _schemas.timeline_title,
  meta: _schemas.meta,
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
  created_at: _schemas.created_at,
  updated_at: _schemas.updated_at,
  created_by: _schemas.created_by,
  updated_by: _schemas.updated_by,
  // TODO: (LIST-FEATURE) Remove the hasListsFeatures once this is ready for release
  lists: (0, _feature_flags.hasListsFeature)() ? _schemas.lists.default([]) : _schemas.lists.forbidden().default([])
});

exports.importRulesSchema = importRulesSchema;

const importRulesQuerySchema = _joi.default.object({
  overwrite: _joi.default.boolean().default(false)
});

exports.importRulesQuerySchema = importRulesQuerySchema;

const importRulesPayloadSchema = _joi.default.object({
  file: _joi.default.object().required()
});

exports.importRulesPayloadSchema = importRulesPayloadSchema;