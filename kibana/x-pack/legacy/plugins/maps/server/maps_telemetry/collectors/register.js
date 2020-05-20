"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerMapsUsageCollector = registerMapsUsageCollector;

var _maps_telemetry = require("../maps_telemetry");

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
function registerMapsUsageCollector(usageCollection, savedObjectsClient, config) {
  if (!usageCollection) {
    return;
  }

  const mapsUsageCollector = usageCollection.makeUsageCollector({
    type: _constants.TELEMETRY_TYPE,
    isReady: () => true,
    fetch: async () => await (0, _maps_telemetry.getMapsTelemetry)(savedObjectsClient, config)
  });
  usageCollection.registerCollector(mapsUsageCollector);
}