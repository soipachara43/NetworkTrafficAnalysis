"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchRules = void 0;

var _fp = require("lodash/fp");

var _read_rules = require("./read_rules");

var _add_tags = require("./add_tags");

var _saved_object_mappings = require("./saved_object_mappings");

var _utils = require("./utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const patchRules = async ({
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
  immutable,
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
  note,
  version,
  lists,
  anomalyThreshold,
  machineLearningJobId
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
    lists,
    anomalyThreshold,
    machineLearningJobId
  });
  const nextParams = (0, _fp.defaults)({ ...rule.params
  }, {
    description,
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
    lists,
    anomalyThreshold,
    machineLearningJobId
  });
  const update = await alertsClient.update({
    id: rule.id,
    data: {
      tags: (0, _add_tags.addTags)(tags !== null && tags !== void 0 ? tags : rule.tags, rule.params.ruleId, immutable !== null && immutable !== void 0 ? immutable : rule.params.immutable),
      throttle: null,
      name: (0, _utils.calculateName)({
        updatedName: name,
        originalName: rule.name
      }),
      schedule: {
        interval: (0, _utils.calculateInterval)(interval, rule.schedule.interval)
      },
      actions: rule.actions,
      params: nextParams
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
  } else {// enabled is null or undefined and we do not touch the rule
  }

  if (enabled != null) {
    return { ...update,
      enabled
    };
  } else {
    return update;
  }
};

exports.patchRules = patchRules;