"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = exports.list_value = exports.list_type = exports.boolean_operator = exports.note = exports.rules_not_updated = exports.rules_not_installed = exports.rules_custom_installed = exports.success_count = exports.success = exports.total = exports.perPage = exports.message = exports.status_code = exports.rules_updated = exports.rules_installed = exports.status_date = exports.last_failure_message = exports.last_failure_at = exports.last_success_message = exports.last_success_at = exports.version = exports.created_by = exports.updated_by = exports.updated_at = exports.created_at = exports.threat = exports.threat_techniques = exports.threat_technique = exports.threat_technique_reference = exports.threat_technique_name = exports.threat_technique_id = exports.threat_tactic = exports.threat_tactic_reference = exports.threat_tactic_name = exports.threat_tactic_id = exports.threat_framework = exports.fields = exports.tags = exports.sort_order = exports.sort_field = exports.signal_status_query = exports.signal_ids = exports.page = exports.per_page = exports.references = exports.queryFilter = exports.type = exports.to = exports.job_status = exports.status = exports.severity = exports.risk_score = exports.name = exports.max_signals = exports.meta = exports.machine_learning_job_id = exports.anomaly_threshold = exports.throttle = exports.timeline_title = exports.timeline_id = exports.saved_id = exports.output_index = exports.objects = exports.language = exports.query = exports.interval = exports.index = exports.id = exports.rule_id = exports.immutable = exports.from = exports.actions = exports.action = exports.action_params = exports.action_action_type_id = exports.action_id = exports.action_group = exports.filters = exports.file_name = exports.false_positives = exports.exclude_export_details = exports.enabled = exports.description = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _risk_score = require("../types/risk_score");

var _uuid = require("../types/uuid");

var _iso_date_string = require("../types/iso_date_string");

var _positive_integer_greater_than_zero = require("../types/positive_integer_greater_than_zero");

var _positive_integer = require("../types/positive_integer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/camelcase */
const description = t.string;
exports.description = description;
const enabled = t.boolean;
exports.enabled = enabled;
const exclude_export_details = t.boolean;
exports.exclude_export_details = exclude_export_details;
const false_positives = t.array(t.string);
exports.false_positives = false_positives;
const file_name = t.string;
/**
 * TODO: Right now the filters is an "unknown", when it could more than likely
 * become the actual ESFilter as a type.
 */

exports.file_name = file_name;
const filters = t.array(t.unknown); // Filters are not easily type-able yet

/**
 * Params is an "object", since it is a type of AlertActionParams which is action templates.
 * @see x-pack/plugins/alerting/common/alert.ts
 */

exports.filters = filters;
const action_group = t.string;
exports.action_group = action_group;
const action_id = t.string;
exports.action_id = action_id;
const action_action_type_id = t.string;
exports.action_action_type_id = action_action_type_id;
const action_params = t.object;
exports.action_params = action_params;
const action = t.exact(t.type({
  group: action_group,
  id: action_id,
  action_type_id: action_action_type_id,
  params: action_params
}));
exports.action = action;
const actions = t.array(action); // TODO: Create a regular expression type or custom date math part type here

exports.actions = actions;
const from = t.string;
exports.from = from;
const immutable = t.boolean; // Note: Never make this a strict uuid, we allow the rule_id to be any string at the moment
// in case we encounter 3rd party rule systems which might be using auto incrementing numbers
// or other different things.

exports.immutable = immutable;
const rule_id = t.string;
exports.rule_id = rule_id;
const id = _uuid.UUID;
exports.id = id;
const index = t.array(t.string);
exports.index = index;
const interval = t.string;
exports.interval = interval;
const query = t.string;
exports.query = query;
const language = t.keyof({
  kuery: null,
  lucene: null
});
exports.language = language;
const objects = t.array(t.type({
  rule_id
}));
exports.objects = objects;
const output_index = t.string;
exports.output_index = output_index;
const saved_id = t.string;
exports.saved_id = saved_id;
const timeline_id = t.string;
exports.timeline_id = timeline_id;
const timeline_title = t.string;
exports.timeline_title = timeline_title;
const throttle = t.string;
exports.throttle = throttle;
const anomaly_threshold = _positive_integer.PositiveInteger;
exports.anomaly_threshold = anomaly_threshold;
const machine_learning_job_id = t.string;
/**
 * Note that this is a plain unknown object because we allow the UI
 * to send us extra additional information as "meta" which can be anything.
 *
 * TODO: Strip away extra information and possibly even "freeze" this object
 * so we have tighter control over 3rd party data structures.
 */

exports.machine_learning_job_id = machine_learning_job_id;
const meta = t.object;
exports.meta = meta;
const max_signals = _positive_integer_greater_than_zero.PositiveIntegerGreaterThanZero;
exports.max_signals = max_signals;
const name = t.string;
exports.name = name;
const risk_score = _risk_score.RiskScore;
exports.risk_score = risk_score;
const severity = t.keyof({
  low: null,
  medium: null,
  high: null,
  critical: null
});
exports.severity = severity;
const status = t.keyof({
  open: null,
  closed: null
});
exports.status = status;
const job_status = t.keyof({
  succeeded: null,
  failed: null,
  'going to run': null
}); // TODO: Create a regular expression type or custom date math part type here

exports.job_status = job_status;
const to = t.string;
exports.to = to;
const type = t.keyof({
  machine_learning: null,
  query: null,
  saved_query: null
});
exports.type = type;
const queryFilter = t.string;
exports.queryFilter = queryFilter;
const references = t.array(t.string);
exports.references = references;
const per_page = _positive_integer.PositiveInteger;
exports.per_page = per_page;
const page = _positive_integer_greater_than_zero.PositiveIntegerGreaterThanZero;
exports.page = page;
const signal_ids = t.array(t.string); // TODO: Can this be more strict or is this is the set of all Elastic Queries?

exports.signal_ids = signal_ids;
const signal_status_query = t.object;
exports.signal_status_query = signal_status_query;
const sort_field = t.string;
exports.sort_field = sort_field;
const sort_order = t.keyof({
  asc: null,
  desc: null
});
exports.sort_order = sort_order;
const tags = t.array(t.string);
exports.tags = tags;
const fields = t.array(t.string);
exports.fields = fields;
const threat_framework = t.string;
exports.threat_framework = threat_framework;
const threat_tactic_id = t.string;
exports.threat_tactic_id = threat_tactic_id;
const threat_tactic_name = t.string;
exports.threat_tactic_name = threat_tactic_name;
const threat_tactic_reference = t.string;
exports.threat_tactic_reference = threat_tactic_reference;
const threat_tactic = t.type({
  id: threat_tactic_id,
  name: threat_tactic_name,
  reference: threat_tactic_reference
});
exports.threat_tactic = threat_tactic;
const threat_technique_id = t.string;
exports.threat_technique_id = threat_technique_id;
const threat_technique_name = t.string;
exports.threat_technique_name = threat_technique_name;
const threat_technique_reference = t.string;
exports.threat_technique_reference = threat_technique_reference;
const threat_technique = t.exact(t.type({
  id: threat_technique_id,
  name: threat_technique_name,
  reference: threat_technique_reference
}));
exports.threat_technique = threat_technique;
const threat_techniques = t.array(threat_technique);
exports.threat_techniques = threat_techniques;
const threat = t.array(t.exact(t.type({
  framework: threat_framework,
  tactic: threat_tactic,
  technique: threat_techniques
})));
exports.threat = threat;
const created_at = _iso_date_string.IsoDateString;
exports.created_at = created_at;
const updated_at = _iso_date_string.IsoDateString;
exports.updated_at = updated_at;
const updated_by = t.string;
exports.updated_by = updated_by;
const created_by = t.string;
exports.created_by = created_by;
const version = _positive_integer_greater_than_zero.PositiveIntegerGreaterThanZero;
exports.version = version;
const last_success_at = _iso_date_string.IsoDateString;
exports.last_success_at = last_success_at;
const last_success_message = t.string;
exports.last_success_message = last_success_message;
const last_failure_at = _iso_date_string.IsoDateString;
exports.last_failure_at = last_failure_at;
const last_failure_message = t.string;
exports.last_failure_message = last_failure_message;
const status_date = _iso_date_string.IsoDateString;
exports.status_date = status_date;
const rules_installed = _positive_integer.PositiveInteger;
exports.rules_installed = rules_installed;
const rules_updated = _positive_integer.PositiveInteger;
exports.rules_updated = rules_updated;
const status_code = _positive_integer.PositiveInteger;
exports.status_code = status_code;
const message = t.string;
exports.message = message;
const perPage = _positive_integer.PositiveInteger;
exports.perPage = perPage;
const total = _positive_integer.PositiveInteger;
exports.total = total;
const success = t.boolean;
exports.success = success;
const success_count = _positive_integer.PositiveInteger;
exports.success_count = success_count;
const rules_custom_installed = _positive_integer.PositiveInteger;
exports.rules_custom_installed = rules_custom_installed;
const rules_not_installed = _positive_integer.PositiveInteger;
exports.rules_not_installed = rules_not_installed;
const rules_not_updated = _positive_integer.PositiveInteger;
exports.rules_not_updated = rules_not_updated;
const note = t.string; // NOTE: Experimental list support not being shipped currently and behind a feature flag
// TODO: Remove this comment once we lists have passed testing and is ready for the release

exports.note = note;
const boolean_operator = t.keyof({
  and: null,
  'and not': null
});
exports.boolean_operator = boolean_operator;
const list_type = t.keyof({
  value: null
}); // TODO: (LIST-FEATURE) Eventually this can include "list" when we support lists CRUD

exports.list_type = list_type;
const list_value = t.exact(t.type({
  name: t.string,
  type: list_type
}));
exports.list_value = list_value;
const list = t.exact(t.type({
  field: t.string,
  boolean_operator,
  values: t.array(list_value)
}));
exports.list = list;