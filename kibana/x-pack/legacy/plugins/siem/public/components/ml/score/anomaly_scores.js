"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomalyScores = exports.AnomalyScoresComponent = exports.createJobKey = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _empty_value = require("../../empty_value");

var _get_top_severity = require("./get_top_severity");

var _anomaly_score = require("./anomaly_score");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createJobKey = function createJobKey(score) {
  return "".concat(score.jobId, "-").concat(score.severity, "-").concat(score.entityName, "-").concat(score.entityValue);
};

exports.createJobKey = createJobKey;

var AnomalyScoresComponent = function AnomalyScoresComponent(_ref) {
  var anomalies = _ref.anomalies,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      isLoading = _ref.isLoading,
      narrowDateRange = _ref.narrowDateRange,
      limit = _ref.limit;

  if (isLoading) {
    return _react.default.createElement(_eui.EuiLoadingSpinner, {
      "data-test-subj": "anomaly-score-spinner",
      size: "m"
    });
  } else if (anomalies == null || anomalies.anomalies.length === 0) {
    return (0, _empty_value.getEmptyTagValue)();
  } else {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "none",
      responsive: false
    }, (0, _get_top_severity.getTopSeverityJobs)(anomalies.anomalies, limit).map(function (score, index) {
      var jobKey = createJobKey(score);
      return _react.default.createElement(_anomaly_score.AnomalyScore, {
        key: jobKey,
        jobKey: jobKey,
        startDate: startDate,
        endDate: endDate,
        index: index,
        score: score,
        interval: anomalies.interval,
        narrowDateRange: narrowDateRange
      });
    })));
  }
};

exports.AnomalyScoresComponent = AnomalyScoresComponent;
AnomalyScoresComponent.displayName = 'AnomalyScoresComponent';

var AnomalyScores = _react.default.memo(AnomalyScoresComponent);

exports.AnomalyScores = AnomalyScores;
AnomalyScores.displayName = 'AnomalyScores';