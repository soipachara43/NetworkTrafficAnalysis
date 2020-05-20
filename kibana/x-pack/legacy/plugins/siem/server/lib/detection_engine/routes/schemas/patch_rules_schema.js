"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchRulesSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _schemas = require("./schemas");

var _feature_flags = require("../../feature_flags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */

/* eslint-enable @typescript-eslint/camelcase */
const patchRulesSchema = _joi.default.object({
  actions: _schemas.actions,
  anomaly_threshold: _schemas.anomaly_threshold,
  description: _schemas.description,
  enabled: _schemas.enabled,
  false_positives: _schemas.false_positives,
  filters: _schemas.filters,
  from: _schemas.from,
  rule_id: _schemas.rule_id,
  id: _schemas.id,
  index: _schemas.index,
  interval: _schemas.interval,
  query: _schemas.query.allow(''),
  language: _schemas.language,
  machine_learning_job_id: _schemas.machine_learning_job_id,
  output_index: _schemas.output_index,
  saved_id: _schemas.saved_id,
  timeline_id: _schemas.timeline_id,
  timeline_title: _schemas.timeline_title,
  meta: _schemas.meta,
  risk_score: _schemas.risk_score,
  max_signals: _schemas.max_signals,
  name: _schemas.name,
  severity: _schemas.severity,
  tags: _schemas.tags,
  to: _schemas.to,
  type: _schemas.type,
  threat: _schemas.threat,
  throttle: _schemas.throttle,
  references: _schemas.references,
  note: _schemas.note.allow(''),
  version: _schemas.version,
  // TODO: (LIST-FEATURE) Remove the hasListsFeatures once this is ready for release
  lists: (0, _feature_flags.hasListsFeature)() ? _schemas.lists.default([]) : _schemas.lists.forbidden().default([])
}).xor('id', 'rule_id');

exports.patchRulesSchema = patchRulesSchema;