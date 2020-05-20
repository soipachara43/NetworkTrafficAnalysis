"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRules = void 0;

var _transform_actions = require("../../../../common/detection_engine/transform_actions");

var _read_rules = require("./read_rules");

var _add_tags = require("./add_tags");

var _saved_object_mappings = require("./saved_object_mappings");

var _utils = require("./utils");

var _feature_flags = require("../feature_flags");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const updateRules = async ({
  alertsClient,
  actionsClient,
  // TODO: Use this whenever we add feature support for different action types
  savedObjectsClient,
  description,
  falsePositives,
  enabled,
  query,
  language,
  outputIndex,
  savedId,
  timelineId,
  timelineTitle,
  meta,
  filters,
  from,
  id,
  ruleId,
  index,
  interval,
  maxSignals,
  riskScore,
  name,
  severity,
  tags,
  threat,
  to,
  type,
  references,
  version,
  note,
  lists,
  anomalyThreshold,
  machineLearningJobId,
  actions
}) => {
  const rule = await (0, _read_rules.readRules)({
    alertsClient,
    ruleId,
    id
  });

  if (rule == null) {
    return null;
  }

  const calculatedVersion = (0, _utils.calculateVersion)(rule.params.immutable, rule.params.version, {
    description,
    falsePositives,
    query,
    language,
    outputIndex,
    savedId,
    timelineId,
    timelineTitle,
    meta,
    filters,
    from,
    index,
    interval,
    maxSignals,
    riskScore,
    name,
    severity,
    tags,
    threat,
    to,
    type,
    references,
    version,
    note,
    anomalyThreshold,
    machineLearningJobId
  }); // TODO: Remove this and use regular lists once the feature is stable for a release

  const listsParam = (0, _feature_flags.hasListsFeature)() ? {
    lists
  } : {};
  const update = await alertsClient.update({
    id: rule.id,
    data: {
      tags: (0, _add_tags.addTags)(tags, rule.params.ruleId, rule.params.immutable),
      name,
      schedule: {
        interval
      },
      actions: actions.map(_transform_actions.transformRuleToAlertAction),
      throttle: null,
      params: {
        description,
        ruleId: rule.params.ruleId,
        falsePositives,
        from,
        immutable: rule.params.immutable,
        query,
        language,
        outputIndex,
        savedId,
        timelineId,
        timelineTitle,
        meta,
        filters,
        index,
        maxSignals,
        riskScore,
        severity,
        threat,
        to,
        type,
        references,
        note,
        version: calculatedVersion,
        anomalyThreshold,
        machineLearningJobId,
        ...listsParam
      }
    }
  });

  if (rule.enabled && enabled === false) {
    await alertsClient.disable({
      id: rule.id
    });
  } else if (!rule.enabled && enabled === true) {
    await alertsClient.enable({
      id: rule.id
    });
    const ruleCurrentStatus = savedObjectsClient ? await savedObjectsClient.find({
      type: _saved_object_mappings.ruleStatusSavedObjectType,
      perPage: 1,
      sortField: 'statusDate',
      sortOrder: 'desc',
      search: rule.id,
      searchFields: ['alertId']
    }) : null; // set current status for this rule to be 'going to run'

    if (ruleCurrentStatus && ruleCurrentStatus.saved_objects.length > 0) {
      const currentStatusToDisable = ruleCurrentStatus.saved_objects[0];
      currentStatusToDisable.attributes.status = 'going to run';
      await (savedObjectsClient === null || savedObjectsClient === void 0 ? void 0 : savedObjectsClient.update(_saved_object_mappings.ruleStatusSavedObjectType, currentStatusToDisable.id, { ...currentStatusToDisable.attributes
      }));
    }
  }

  return { ...update,
    enabled
  };
};

exports.updateRules = updateRules;