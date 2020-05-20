"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRules = void 0;

var _transform_actions = require("../../../../common/detection_engine/transform_actions");

var _constants = require("../../../../common/constants");

var _add_tags = require("./add_tags");

var _feature_flags = require("../feature_flags");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createRules = async ({
  alertsClient,
  anomalyThreshold,
  description,
  enabled,
  falsePositives,
  from,
  query,
  language,
  savedId,
  timelineId,
  timelineTitle,
  meta,
  machineLearningJobId,
  filters,
  ruleId,
  immutable,
  index,
  interval,
  maxSignals,
  riskScore,
  outputIndex,
  name,
  severity,
  tags,
  threat,
  to,
  type,
  references,
  note,
  version,
  lists,
  actions
}) => {
  // TODO: Remove this and use regular lists once the feature is stable for a release
  const listsParam = (0, _feature_flags.hasListsFeature)() ? {
    lists
  } : {};
  return alertsClient.create({
    data: {
      name,
      tags: (0, _add_tags.addTags)(tags, ruleId, immutable),
      alertTypeId: _constants.SIGNALS_ID,
      consumer: _constants.APP_ID,
      params: {
        anomalyThreshold,
        description,
        ruleId,
        index,
        falsePositives,
        from,
        immutable,
        query,
        language,
        outputIndex,
        savedId,
        timelineId,
        timelineTitle,
        meta,
        machineLearningJobId,
        filters,
        maxSignals,
        riskScore,
        severity,
        threat,
        to,
        type,
        references,
        note,
        version,
        ...listsParam
      },
      schedule: {
        interval
      },
      enabled,
      actions: actions.map(_transform_actions.transformRuleToAlertAction),
      throttle: null
    }
  });
};

exports.createRules = createRules;