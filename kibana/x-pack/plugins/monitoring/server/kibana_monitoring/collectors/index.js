"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCollectors = registerCollectors;

var _get_settings_collector = require("./get_settings_collector");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerCollectors(usageCollection, config) {
  usageCollection.registerCollector((0, _get_settings_collector.getSettingsCollector)(usageCollection, config));
}