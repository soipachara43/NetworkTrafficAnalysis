"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyApiAccess = verifyApiAccess;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function verifyApiAccess(licenseState) {
  const licenseCheckResults = licenseState.getLicenseInformation();

  if (licenseCheckResults.showAppLink && licenseCheckResults.enableAppLink) {
    return null;
  }

  throw _boom.default.forbidden(licenseCheckResults.message);
}