"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimezoneOffsetInMs = getTimezoneOffsetInMs;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getTimezoneOffsetInMs(time) {
  // @ts-ignore moment types don't define defaultZone but it's there
  var zone = _momentTimezone.default.defaultZone ? _momentTimezone.default.defaultZone.name : _momentTimezone.default.tz.guess(); // @ts-ignore

  return _momentTimezone.default.tz.zone(zone).parse(time) * 60000;
}