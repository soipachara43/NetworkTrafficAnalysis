"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryRateSetupContent = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _beta_badge = require("../../../components/beta_badge");

var _log_analysis_setup = require("../../../components/logging/log_analysis_setup");

var _public = require("../../../../../observability/public");

var _use_log_entry_rate_setup = require("./use_log_entry_rate_setup");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogEntryRateSetupContent = function LogEntryRateSetupContent() {
  (0, _public.useTrackPageview)({
    app: 'infra_logs',
    path: 'log_entry_rate_setup'
  });
  (0, _public.useTrackPageview)({
    app: 'infra_logs',
    path: 'log_entry_rate_setup',
    delay: 15000
  });

  var _useLogEntryRateSetup = (0, _use_log_entry_rate_setup.useLogEntryRateSetup)(),
      cleanUpAndSetUp = _useLogEntryRateSetup.cleanUpAndSetUp,
      endTime = _useLogEntryRateSetup.endTime,
      isValidating = _useLogEntryRateSetup.isValidating,
      lastSetupErrorMessages = _useLogEntryRateSetup.lastSetupErrorMessages,
      setEndTime = _useLogEntryRateSetup.setEndTime,
      setStartTime = _useLogEntryRateSetup.setStartTime,
      setValidatedIndices = _useLogEntryRateSetup.setValidatedIndices,
      setUp = _useLogEntryRateSetup.setUp,
      setupStatus = _useLogEntryRateSetup.setupStatus,
      startTime = _useLogEntryRateSetup.startTime,
      validatedIndices = _useLogEntryRateSetup.validatedIndices,
      validationErrors = _useLogEntryRateSetup.validationErrors,
      viewResults = _useLogEntryRateSetup.viewResults;

  var steps = (0, _react2.useMemo)(function () {
    return [(0, _log_analysis_setup.createInitialConfigurationStep)({
      setStartTime: setStartTime,
      setEndTime: setEndTime,
      startTime: startTime,
      endTime: endTime,
      isValidating: isValidating,
      validatedIndices: validatedIndices,
      setupStatus: setupStatus,
      setValidatedIndices: setValidatedIndices,
      validationErrors: validationErrors
    }), (0, _log_analysis_setup.createProcessStep)({
      cleanUpAndSetUp: cleanUpAndSetUp,
      errorMessages: lastSetupErrorMessages,
      isConfigurationValid: validationErrors.length <= 0,
      setUp: setUp,
      setupStatus: setupStatus,
      viewResults: viewResults
    })];
  }, [cleanUpAndSetUp, endTime, isValidating, lastSetupErrorMessages, setEndTime, setStartTime, setUp, setValidatedIndices, setupStatus, startTime, validatedIndices, validationErrors, viewResults]);
  return _react2.default.createElement(_log_analysis_setup.LogAnalysisSetupPage, {
    "data-test-subj": "logEntryRateSetupPage"
  }, _react2.default.createElement(_log_analysis_setup.LogAnalysisSetupPageHeader, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.analysisSetup.analysisSetupTitle",
    defaultMessage: "Enable Machine Learning analysis"
  }), ' ', _react2.default.createElement(_beta_badge.BetaBadge, null)), _react2.default.createElement(_log_analysis_setup.LogAnalysisSetupPageContent, null, _react2.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.analysisSetup.analysisSetupDescription",
    defaultMessage: "Use Machine Learning to automatically detect anomalous log rate counts."
  })), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiSteps, {
    steps: steps
  })));
};

exports.LogEntryRateSetupContent = LogEntryRateSetupContent;