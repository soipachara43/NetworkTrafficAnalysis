"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorLocationsType = exports.MonitorLocationType = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _common = require("../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// IO type for validation
const MonitorLocationType = t.partial({
  summary: _common.SummaryType,
  geo: _common.CheckGeoType,
  timestamp: t.string
}); // Typescript type for type checking

exports.MonitorLocationType = MonitorLocationType;
const MonitorLocationsType = t.intersection([t.type({
  monitorId: t.string
}), t.partial({
  locations: t.array(MonitorLocationType)
})]);
exports.MonitorLocationsType = MonitorLocationsType;