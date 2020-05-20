"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installPrepackagedRules = void 0;

var _create_rules = require("./create_rules");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const installPrepackagedRules = (alertsClient, actionsClient, rules, outputIndex) => rules.reduce((acc, rule) => {
  const {
    anomaly_threshold: anomalyThreshold,
    description,
    enabled,
    false_positives: falsePositives,
    from,
    immutable,
    query,
    language,
    machine_learning_job_id: machineLearningJobId,
    saved_id: savedId,
    timeline_id: timelineId,
    timeline_title: timelineTitle,
    meta,
    filters,
    rule_id: ruleId,
    index,
    interval,
    max_signals: maxSignals,
    risk_score: riskScore,
    name,
    severity,
    tags,
    to,
    type,
    threat,
    references,
    note,
    version,
    lists
  } = rule;
  return [...acc, (0, _create_rules.createRules)({
    alertsClient,
    actionsClient,
    anomalyThreshold,
    description,
    enabled,
    falsePositives,
    from,
    immutable,
    query,
    language,
    machineLearningJobId,
    outputIndex,
    savedId,
    timelineId,
    timelineTitle,
    meta,
    filters,
    ruleId,
    index,
    interval,
    maxSignals,
    riskScore,
    name,
    severity,
    tags,
    to,
    type,
    threat,
    references,
    note,
    version,
    lists,
    actions: [] // At this time there is no pre-packaged actions

  })];
}, []);

exports.installPrepackagedRules = installPrepackagedRules;