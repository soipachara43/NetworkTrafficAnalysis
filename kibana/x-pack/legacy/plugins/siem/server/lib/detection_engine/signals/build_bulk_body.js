"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildBulkBody = void 0;

var _build_rule = require("./build_rule");

var _build_signal = require("./build_signal");

var _build_event_type_signal = require("./build_event_type_signal");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// format search_after result for signals index.
const buildBulkBody = ({
  doc,
  ruleParams,
  id,
  name,
  actions,
  createdAt,
  createdBy,
  updatedAt,
  updatedBy,
  interval,
  enabled,
  tags,
  throttle
}) => {
  const rule = (0, _build_rule.buildRule)({
    actions,
    ruleParams,
    id,
    name,
    enabled,
    createdAt,
    createdBy,
    updatedAt,
    updatedBy,
    interval,
    tags,
    throttle
  });
  const signal = (0, _build_signal.buildSignal)(doc, rule);
  const event = (0, _build_event_type_signal.buildEventTypeSignal)(doc);
  const signalHit = { ...doc._source,
    '@timestamp': new Date().toISOString(),
    event,
    signal
  };
  return signalHit;
};

exports.buildBulkBody = buildBulkBody;