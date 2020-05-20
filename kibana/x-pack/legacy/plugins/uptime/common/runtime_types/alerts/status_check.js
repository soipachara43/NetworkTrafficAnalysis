"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusCheckExecutorParamsType = exports.StatusCheckAlertStateType = void 0;

var t = _interopRequireWildcard(require("io-ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const StatusCheckAlertStateType = t.intersection([t.partial({
  currentTriggerStarted: t.string,
  firstTriggeredAt: t.string,
  lastTriggeredAt: t.string,
  lastResolvedAt: t.string
}), t.type({
  firstCheckedAt: t.string,
  lastCheckedAt: t.string,
  isTriggered: t.boolean
})]);
exports.StatusCheckAlertStateType = StatusCheckAlertStateType;
const StatusCheckExecutorParamsType = t.intersection([t.partial({
  filters: t.string
}), t.type({
  locations: t.array(t.string),
  numTimes: t.number,
  timerange: t.type({
    from: t.string,
    to: t.string
  })
})]);
exports.StatusCheckExecutorParamsType = StatusCheckExecutorParamsType;