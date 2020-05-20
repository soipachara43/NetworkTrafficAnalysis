"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSeverityColor = exports.ScoreHealth = exports.getScoreString = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getScoreString = function getScoreString(score) {
  return String(Math.ceil(score));
};

exports.getScoreString = getScoreString;

var ScoreHealth = _react.default.memo(function (_ref) {
  var score = _ref.score;
  var scoreCeiling = getScoreString(score);
  var color = getSeverityColor(score);
  return _react.default.createElement(_eui.EuiHealth, {
    color: color
  }, scoreCeiling);
});

exports.ScoreHealth = ScoreHealth;
ScoreHealth.displayName = 'ScoreHealth'; // ಠ_ಠ A hard-fork of the `ml` ml/common/util/anomaly_utils.js#getSeverityColor ಠ_ಠ
//
// Returns a severity label (one of critical, major, minor, warning, low or unknown)
// for the supplied normalized anomaly score (a value between 0 and 100), where scores
// less than 3 are assigned a severity of 'low'.

var getSeverityColor = function getSeverityColor(normalizedScore) {
  if (normalizedScore >= 75) {
    return '#fe5050';
  } else if (normalizedScore >= 50) {
    return '#fba740';
  } else if (normalizedScore >= 25) {
    return '#fdec25';
  } else if (normalizedScore >= 3) {
    return '#8bc8fb';
  } else if (normalizedScore >= 0) {
    return '#d2e9f7';
  } else {
    return '#ffffff';
  }
};

exports.getSeverityColor = getSeverityColor;