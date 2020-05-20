"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMlSignals = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _machine_learning = require("../../machine_learning");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const findMlSignals = async (jobId, anomalyThreshold, from, to, callCluster) => {
  var _ref, _dateMath$parse, _ref2, _dateMath$parse2;

  const params = {
    jobIds: [jobId],
    threshold: anomalyThreshold,
    earliestMs: (_ref = (_dateMath$parse = _datemath.default.parse(from)) === null || _dateMath$parse === void 0 ? void 0 : _dateMath$parse.valueOf()) !== null && _ref !== void 0 ? _ref : 0,
    latestMs: (_ref2 = (_dateMath$parse2 = _datemath.default.parse(to)) === null || _dateMath$parse2 === void 0 ? void 0 : _dateMath$parse2.valueOf()) !== null && _ref2 !== void 0 ? _ref2 : 0
  };
  const relevantAnomalies = await (0, _machine_learning.getAnomalies)(params, callCluster);
  return relevantAnomalies;
};

exports.findMlSignals = findMlSignals;