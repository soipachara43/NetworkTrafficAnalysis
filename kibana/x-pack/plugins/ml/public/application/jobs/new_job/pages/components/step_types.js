"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WIZARD_STEPS = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WIZARD_STEPS;
exports.WIZARD_STEPS = WIZARD_STEPS;

(function (WIZARD_STEPS) {
  WIZARD_STEPS[WIZARD_STEPS["TIME_RANGE"] = 0] = "TIME_RANGE";
  WIZARD_STEPS[WIZARD_STEPS["ADVANCED_CONFIGURE_DATAFEED"] = 1] = "ADVANCED_CONFIGURE_DATAFEED";
  WIZARD_STEPS[WIZARD_STEPS["PICK_FIELDS"] = 2] = "PICK_FIELDS";
  WIZARD_STEPS[WIZARD_STEPS["JOB_DETAILS"] = 3] = "JOB_DETAILS";
  WIZARD_STEPS[WIZARD_STEPS["VALIDATION"] = 4] = "VALIDATION";
  WIZARD_STEPS[WIZARD_STEPS["SUMMARY"] = 5] = "SUMMARY";
})(WIZARD_STEPS || (exports.WIZARD_STEPS = WIZARD_STEPS = {}));