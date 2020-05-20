"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildMlJobDescription = exports.MlJobDescription = exports.JobStatusBadge = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _kibana = require("../../../../../lib/kibana");

var _translations = require("./translations");

var _ml_helpers = require("../../../../../../common/detection_engine/ml_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MessageLevels;

(function (MessageLevels) {
  MessageLevels["info"] = "info";
  MessageLevels["warning"] = "warning";
  MessageLevels["error"] = "error";
})(MessageLevels || (MessageLevels = {}));

var AuditIcon = function AuditIcon(_ref) {
  var message = _ref.message;

  if (!message) {
    return null;
  }

  var color = 'primary';
  var icon = 'alert';

  if (message.level === MessageLevels.info) {
    icon = 'iInCircle';
  } else if (message.level === MessageLevels.warning) {
    color = 'warning';
  } else if (message.level === MessageLevels.error) {
    color = 'danger';
  }

  return _react.default.createElement(_eui.EuiToolTip, {
    content: message.text
  }, _react.default.createElement(_eui.EuiIcon, {
    type: icon,
    color: color
  }));
};

var JobStatusBadge = function JobStatusBadge(_ref2) {
  var job = _ref2.job;
  var isStarted = (0, _ml_helpers.isJobStarted)(job.jobState, job.datafeedState);
  var color = isStarted ? 'secondary' : 'danger';
  var text = isStarted ? _translations.ML_JOB_STARTED : _translations.ML_JOB_STOPPED;
  return _react.default.createElement(_eui.EuiBadge, {
    "data-test-subj": "machineLearningJobStatus",
    color: color
  }, text);
};

exports.JobStatusBadge = JobStatusBadge;
var JobLink = (0, _styledComponents.default)(_eui.EuiLink).withConfig({
  displayName: "JobLink",
  componentId: "sc-6fkkhn-0"
})(["margin-right:", ";"], function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiSizeS;
});

var Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Wrapper",
  componentId: "sc-6fkkhn-1"
})(["overflow:hidden;"]);

var MlJobDescription = function MlJobDescription(_ref4) {
  var job = _ref4.job;
  var jobUrl = (0, _kibana.useKibana)().services.application.getUrlForApp("ml#/jobs?mlManagement=(jobId:".concat(encodeURI(job.id), ")"));
  return _react.default.createElement(Wrapper, null, _react.default.createElement("div", null, _react.default.createElement(JobLink, {
    "data-test-subj": "machineLearningJobId",
    href: jobUrl,
    target: "_blank"
  }, job.id), _react.default.createElement(AuditIcon, {
    message: job.auditMessage
  })), _react.default.createElement(JobStatusBadge, {
    job: job
  }));
};

exports.MlJobDescription = MlJobDescription;

var buildMlJobDescription = function buildMlJobDescription(jobId, label, siemJobs) {
  var siemJob = siemJobs.find(function (job) {
    return job.id === jobId;
  });
  return {
    title: label,
    description: siemJob ? _react.default.createElement(MlJobDescription, {
      job: siemJob
    }) : jobId
  };
};

exports.buildMlJobDescription = buildMlJobDescription;