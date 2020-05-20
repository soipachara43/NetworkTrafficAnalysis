"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.getPolicyPath = exports.goToPolicyList = void 0;

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// This depends upon Angular, which is why we use this provider pattern to access it within
// our React app.
var _redirect;

function init(redirect) {
  _redirect = redirect;
}

var goToPolicyList = function goToPolicyList() {
  _redirect("".concat(_constants.BASE_PATH, "policies"));
};

exports.goToPolicyList = goToPolicyList;

var getPolicyPath = function getPolicyPath(policyName) {
  return encodeURI("#".concat(_constants.BASE_PATH, "policies/edit/").concat(encodeURIComponent(policyName)));
};

exports.getPolicyPath = getPolicyPath;