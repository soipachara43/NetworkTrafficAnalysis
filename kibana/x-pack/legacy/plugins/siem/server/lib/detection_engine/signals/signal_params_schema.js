"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signalParamsSchema = void 0;

var _configSchema = require("@kbn/config-schema");

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * This is the schema for the Alert Rule that represents the SIEM alert for signals
 * that index into the .siem-signals-${space-id}
 */
const signalParamsSchema = () => _configSchema.schema.object({
  anomalyThreshold: _configSchema.schema.maybe(_configSchema.schema.number()),
  description: _configSchema.schema.string(),
  note: _configSchema.schema.nullable(_configSchema.schema.string()),
  falsePositives: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
    defaultValue: []
  }),
  from: _configSchema.schema.string(),
  ruleId: _configSchema.schema.string(),
  immutable: _configSchema.schema.boolean({
    defaultValue: false
  }),
  index: _configSchema.schema.nullable(_configSchema.schema.arrayOf(_configSchema.schema.string())),
  language: _configSchema.schema.nullable(_configSchema.schema.string()),
  outputIndex: _configSchema.schema.nullable(_configSchema.schema.string()),
  savedId: _configSchema.schema.nullable(_configSchema.schema.string()),
  timelineId: _configSchema.schema.nullable(_configSchema.schema.string()),
  timelineTitle: _configSchema.schema.nullable(_configSchema.schema.string()),
  meta: _configSchema.schema.nullable(_configSchema.schema.object({}, {
    unknowns: 'allow'
  })),
  machineLearningJobId: _configSchema.schema.maybe(_configSchema.schema.string()),
  query: _configSchema.schema.nullable(_configSchema.schema.string()),
  filters: _configSchema.schema.nullable(_configSchema.schema.arrayOf(_configSchema.schema.object({}, {
    unknowns: 'allow'
  }))),
  maxSignals: _configSchema.schema.number({
    defaultValue: _constants.DEFAULT_MAX_SIGNALS
  }),
  riskScore: _configSchema.schema.number(),
  severity: _configSchema.schema.string(),
  threat: _configSchema.schema.nullable(_configSchema.schema.arrayOf(_configSchema.schema.object({}, {
    unknowns: 'allow'
  }))),
  to: _configSchema.schema.string(),
  type: _configSchema.schema.string(),
  references: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
    defaultValue: []
  }),
  version: _configSchema.schema.number({
    defaultValue: 1
  }),
  lists: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.object({}, {
    unknowns: 'allow'
  })))
});

exports.signalParamsSchema = signalParamsSchema;