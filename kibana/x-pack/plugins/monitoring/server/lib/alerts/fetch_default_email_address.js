"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDefaultEmailAddress = fetchDefaultEmailAddress;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function fetchDefaultEmailAddress(uiSettingsClient) {
  return await uiSettingsClient.get(_constants.MONITORING_CONFIG_ALERTING_EMAIL_ADDRESS);
}