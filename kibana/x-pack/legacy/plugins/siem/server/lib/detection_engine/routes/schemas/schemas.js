"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lists = exports.list = exports.list_value = exports.list_type = exports.boolean_operator = exports.note = exports.throttle = exports.actions = exports.action = exports.action_params = exports.action_action_type_id = exports.action_id = exports.action_group = exports.version = exports.updated_by = exports.created_by = exports.updated_at = exports.created_at = exports.threat = exports.threat_techniques = exports.threat_technique = exports.threat_technique_reference = exports.threat_technique_name = exports.threat_technique_id = exports.threat_tactic = exports.threat_tactic_reference = exports.threat_tactic_name = exports.threat_tactic_id = exports.threat_framework = exports.fields = exports.tags = exports.sort_order = exports.sort_field = exports.signal_status_query = exports.signal_ids = exports.page = exports.per_page = exports.references = exports.queryFilter = exports.machine_learning_job_id = exports.type = exports.to = exports.status = exports.severity = exports.risk_score = exports.name = exports.max_signals = exports.meta = exports.timeline_title = exports.timeline_id = exports.saved_id = exports.output_index = exports.objects = exports.language = exports.query = exports.interval = exports.index = exports.id = exports.rule_id = exports.immutable = exports.from = exports.filters = exports.file_name = exports.false_positives = exports.exclude_export_details = exports.enabled = exports.description = exports.anomaly_threshold = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */
const anomaly_threshold = _joi.default.number().integer().greater(-1).less(101);

exports.anomaly_threshold = anomaly_threshold;

const description = _joi.default.string();

exports.description = description;

const enabled = _joi.default.boolean();

exports.enabled = enabled;

const exclude_export_details = _joi.default.boolean();

exports.exclude_export_details = exclude_export_details;

const false_positives = _joi.default.array().items(_joi.default.string());

exports.false_positives = false_positives;

const file_name = _joi.default.string();

exports.file_name = file_name;

const filters = _joi.default.array();

exports.filters = filters;

const from = _joi.default.string();

exports.from = from;

const immutable = _joi.default.boolean();

exports.immutable = immutable;

const rule_id = _joi.default.string();

exports.rule_id = rule_id;

const id = _joi.default.string();

exports.id = id;

const index = _joi.default.array().items(_joi.default.string()).single();

exports.index = index;

const interval = _joi.default.string();

exports.interval = interval;

const query = _joi.default.string();

exports.query = query;

const language = _joi.default.string().valid('kuery', 'lucene');

exports.language = language;

const objects = _joi.default.array().items(_joi.default.object({
  rule_id
}).required());

exports.objects = objects;

const output_index = _joi.default.string();

exports.output_index = output_index;

const saved_id = _joi.default.string();

exports.saved_id = saved_id;

const timeline_id = _joi.default.string();

exports.timeline_id = timeline_id;

const timeline_title = _joi.default.string().when('timeline_id', {
  is: _joi.default.exist(),
  then: _joi.default.required(),
  otherwise: _joi.default.forbidden()
});

exports.timeline_title = timeline_title;

const meta = _joi.default.object();

exports.meta = meta;

const max_signals = _joi.default.number().integer().greater(0);

exports.max_signals = max_signals;

const name = _joi.default.string();

exports.name = name;

const risk_score = _joi.default.number().integer().greater(-1).less(101);

exports.risk_score = risk_score;

const severity = _joi.default.string().valid('low', 'medium', 'high', 'critical');

exports.severity = severity;

const status = _joi.default.string().valid('open', 'closed');

exports.status = status;

const to = _joi.default.string();

exports.to = to;

const type = _joi.default.string().valid('query', 'saved_query', 'machine_learning');

exports.type = type;

const machine_learning_job_id = _joi.default.string();

exports.machine_learning_job_id = machine_learning_job_id;

const queryFilter = _joi.default.string();

exports.queryFilter = queryFilter;

const references = _joi.default.array().items(_joi.default.string()).single();

exports.references = references;

const per_page = _joi.default.number().integer().min(0).default(20);

exports.per_page = per_page;

const page = _joi.default.number().integer().min(1).default(1);

exports.page = page;

const signal_ids = _joi.default.array().items(_joi.default.string());

exports.signal_ids = signal_ids;

const signal_status_query = _joi.default.object();

exports.signal_status_query = signal_status_query;

const sort_field = _joi.default.string();

exports.sort_field = sort_field;

const sort_order = _joi.default.string().valid('asc', 'desc');

exports.sort_order = sort_order;

const tags = _joi.default.array().items(_joi.default.string());

exports.tags = tags;

const fields = _joi.default.array().items(_joi.default.string()).single();

exports.fields = fields;

const threat_framework = _joi.default.string();

exports.threat_framework = threat_framework;

const threat_tactic_id = _joi.default.string();

exports.threat_tactic_id = threat_tactic_id;

const threat_tactic_name = _joi.default.string();

exports.threat_tactic_name = threat_tactic_name;

const threat_tactic_reference = _joi.default.string();

exports.threat_tactic_reference = threat_tactic_reference;

const threat_tactic = _joi.default.object({
  id: threat_tactic_id.required(),
  name: threat_tactic_name.required(),
  reference: threat_tactic_reference.required()
});

exports.threat_tactic = threat_tactic;

const threat_technique_id = _joi.default.string();

exports.threat_technique_id = threat_technique_id;

const threat_technique_name = _joi.default.string();

exports.threat_technique_name = threat_technique_name;

const threat_technique_reference = _joi.default.string();

exports.threat_technique_reference = threat_technique_reference;

const threat_technique = _joi.default.object({
  id: threat_technique_id.required(),
  name: threat_technique_name.required(),
  reference: threat_technique_reference.required()
});

exports.threat_technique = threat_technique;

const threat_techniques = _joi.default.array().items(threat_technique.required());

exports.threat_techniques = threat_techniques;

const threat = _joi.default.array().items(_joi.default.object({
  framework: threat_framework.required(),
  tactic: threat_tactic.required(),
  technique: threat_techniques.required()
}));

exports.threat = threat;

const created_at = _joi.default.string().isoDate().strict();

exports.created_at = created_at;

const updated_at = _joi.default.string().isoDate().strict();

exports.updated_at = updated_at;

const created_by = _joi.default.string();

exports.created_by = created_by;

const updated_by = _joi.default.string();

exports.updated_by = updated_by;

const version = _joi.default.number().integer().min(1);

exports.version = version;

const action_group = _joi.default.string();

exports.action_group = action_group;

const action_id = _joi.default.string();

exports.action_id = action_id;

const action_action_type_id = _joi.default.string();

exports.action_action_type_id = action_action_type_id;

const action_params = _joi.default.object();

exports.action_params = action_params;

const action = _joi.default.object({
  group: action_group.required(),
  id: action_id.required(),
  action_type_id: action_action_type_id.required(),
  params: action_params.required()
});

exports.action = action;

const actions = _joi.default.array().items(action);

exports.actions = actions;

const throttle = _joi.default.string().allow(null);

exports.throttle = throttle;

const note = _joi.default.string(); // NOTE: Experimental list support not being shipped currently and behind a feature flag
// TODO: (LIST-FEATURE) Remove this comment once we lists have passed testing and is ready for the release


exports.note = note;

const boolean_operator = _joi.default.string().valid('and', 'and not');

exports.boolean_operator = boolean_operator;

const list_type = _joi.default.string().valid('value'); // TODO: (LIST-FEATURE) Eventually this can be "list" when we support list types


exports.list_type = list_type;

const list_value = _joi.default.object({
  name: _joi.default.string().required(),
  type: list_type.required()
});

exports.list_value = list_value;

const list = _joi.default.object({
  field: _joi.default.string().required(),
  boolean_operator: boolean_operator.required(),
  values: _joi.default.array().items(list_value)
});

exports.list = list;

const lists = _joi.default.array().items(list);

exports.lists = lists;