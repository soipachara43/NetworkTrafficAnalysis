"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RulesSchema = exports.RuleSchema = exports.NewRulesSchema = exports.NewRuleSchema = exports.action = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _types = require("../../../../common/detection_engine/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Params is an "record", since it is a type of AlertActionParams which is action templates.
 * @see x-pack/plugins/alerting/common/alert.ts
 */
var action = t.exact(t.type({
  group: t.string,
  id: t.string,
  action_type_id: t.string,
  params: t.record(t.string, t.any)
}));
exports.action = action;
var NewRuleSchema = t.intersection([t.type({
  description: t.string,
  enabled: t.boolean,
  interval: t.string,
  name: t.string,
  risk_score: t.number,
  severity: t.string,
  type: _types.RuleTypeSchema
}), t.partial({
  actions: t.array(action),
  anomaly_threshold: t.number,
  created_by: t.string,
  false_positives: t.array(t.string),
  filters: t.array(t.unknown),
  from: t.string,
  id: t.string,
  index: t.array(t.string),
  language: t.string,
  machine_learning_job_id: t.string,
  max_signals: t.number,
  query: t.string,
  references: t.array(t.string),
  rule_id: t.string,
  saved_id: t.string,
  tags: t.array(t.string),
  threat: t.array(t.unknown),
  throttle: t.union([t.string, t.null]),
  to: t.string,
  updated_by: t.string,
  note: t.string
})]);
exports.NewRuleSchema = NewRuleSchema;
var NewRulesSchema = t.array(NewRuleSchema);
exports.NewRulesSchema = NewRulesSchema;
var MetaRule = t.intersection([t.type({
  from: t.string
}), t.partial({
  throttle: t.string,
  kibana_siem_app_url: t.string
})]);
var RuleSchema = t.intersection([t.type({
  created_at: t.string,
  created_by: t.string,
  description: t.string,
  enabled: t.boolean,
  false_positives: t.array(t.string),
  from: t.string,
  id: t.string,
  interval: t.string,
  immutable: t.boolean,
  name: t.string,
  max_signals: t.number,
  references: t.array(t.string),
  risk_score: t.number,
  rule_id: t.string,
  severity: t.string,
  tags: t.array(t.string),
  type: _types.RuleTypeSchema,
  to: t.string,
  threat: t.array(t.unknown),
  updated_at: t.string,
  updated_by: t.string,
  actions: t.array(action),
  throttle: t.union([t.string, t.null])
}), t.partial({
  anomaly_threshold: t.number,
  filters: t.array(t.unknown),
  index: t.array(t.string),
  language: t.string,
  last_failure_at: t.string,
  last_failure_message: t.string,
  meta: MetaRule,
  machine_learning_job_id: t.string,
  output_index: t.string,
  query: t.string,
  saved_id: t.string,
  status: t.string,
  status_date: t.string,
  timeline_id: t.string,
  timeline_title: t.string,
  note: t.string,
  version: t.number
})]);
exports.RuleSchema = RuleSchema;
var RulesSchema = t.array(RuleSchema);
exports.RulesSchema = RulesSchema;