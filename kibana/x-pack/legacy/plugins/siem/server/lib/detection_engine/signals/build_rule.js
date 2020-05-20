"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRule = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildRule = ({
  ruleParams,
  name,
  id,
  actions,
  enabled,
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
  interval,
  tags,
  throttle
}) => {
  return (0, _fp.pickBy)(value => value != null, {
    id,
    rule_id: ruleParams.ruleId,
    actions,
    false_positives: ruleParams.falsePositives,
    saved_id: ruleParams.savedId,
    timeline_id: ruleParams.timelineId,
    timeline_title: ruleParams.timelineTitle,
    meta: ruleParams.meta,
    max_signals: ruleParams.maxSignals,
    risk_score: ruleParams.riskScore,
    output_index: ruleParams.outputIndex,
    description: ruleParams.description,
    note: ruleParams.note,
    from: ruleParams.from,
    immutable: ruleParams.immutable,
    index: ruleParams.index,
    interval,
    language: ruleParams.language,
    name,
    query: ruleParams.query,
    references: ruleParams.references,
    severity: ruleParams.severity,
    tags,
    type: ruleParams.type,
    to: ruleParams.to,
    enabled,
    filters: ruleParams.filters,
    created_by: createdBy,
    updated_by: updatedBy,
    threat: ruleParams.threat,
    throttle,
    version: ruleParams.version,
    created_at: createdAt,
    updated_at: updatedAt,
    lists: ruleParams.lists,
    machine_learning_job_id: ruleParams.machineLearningJobId,
    anomaly_threshold: ruleParams.anomalyThreshold
  });
};

exports.buildRule = buildRule;