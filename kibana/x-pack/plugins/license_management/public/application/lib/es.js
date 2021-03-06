"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putLicense = putLicense;
exports.startBasic = startBasic;
exports.startTrial = startTrial;
exports.canStartTrial = canStartTrial;
exports.getPermissions = getPermissions;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function putLicense(http, license, acknowledge) {
  return http.put(_constants.API_BASE_PATH, {
    query: {
      acknowledge: acknowledge ? 'true' : ''
    },
    body: license,
    headers: {
      contentType: 'application/json'
    },
    cache: 'no-cache'
  });
}

function startBasic(http, acknowledge) {
  return http.post("".concat(_constants.API_BASE_PATH, "/start_basic"), {
    query: {
      acknowledge: acknowledge ? 'true' : ''
    },
    headers: {
      contentType: 'application/json'
    },
    body: null,
    cache: 'no-cache'
  });
}

function startTrial(http) {
  return http.post("".concat(_constants.API_BASE_PATH, "/start_trial"), {
    headers: {
      contentType: 'application/json'
    },
    cache: 'no-cache'
  });
}

function canStartTrial(http) {
  return http.get("".concat(_constants.API_BASE_PATH, "/start_trial"), {
    headers: {
      contentType: 'application/json'
    },
    cache: 'no-cache'
  });
}

function getPermissions(http) {
  return http.post("".concat(_constants.API_BASE_PATH, "/permissions"), {
    headers: {
      contentType: 'application/json'
    },
    cache: 'no-cache'
  });
}