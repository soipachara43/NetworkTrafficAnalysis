"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePrepackagedRules = void 0;

var _patch_rules = require("./patch_rules");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const updatePrepackagedRules = async (alertsClient, actionsClient, savedObjectsClient, rules, outputIndex) => {
  await rules.forEach(async rule => {
    const {
      description,
      false_positives: falsePositives,
      from,
      immutable,
      query,
      language,
      saved_id: savedId,
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
      version,
      note
    } = rule; // Note: we do not pass down enabled as we do not want to suddenly disable
    // or enable rules on the user when they were not expecting it if a rule updates

    return (0, _patch_rules.patchRules)({
      alertsClient,
      actionsClient,
      description,
      falsePositives,
      from,
      immutable,
      query,
      language,
      outputIndex,
      id: undefined,
      // We never have an id when updating from pre-packaged rules
      savedId,
      savedObjectsClient,
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
      version,
      note
    });
  });
};

exports.updatePrepackagedRules = updatePrepackagedRules;