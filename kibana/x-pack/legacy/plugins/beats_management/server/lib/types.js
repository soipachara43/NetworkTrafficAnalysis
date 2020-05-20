"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeatEnrollmentStatus = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let BeatEnrollmentStatus;
exports.BeatEnrollmentStatus = BeatEnrollmentStatus;

(function (BeatEnrollmentStatus) {
  BeatEnrollmentStatus["Success"] = "Success";
  BeatEnrollmentStatus["ExpiredEnrollmentToken"] = "Expired enrollment token";
  BeatEnrollmentStatus["InvalidEnrollmentToken"] = "Invalid enrollment token";
})(BeatEnrollmentStatus || (exports.BeatEnrollmentStatus = BeatEnrollmentStatus = {}));