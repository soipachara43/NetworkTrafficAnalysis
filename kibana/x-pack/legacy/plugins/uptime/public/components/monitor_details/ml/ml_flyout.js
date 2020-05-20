"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLFlyoutView = MLFlyoutView;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var labels = _interopRequireWildcard(require("./translations"));

var _contexts = require("../../../contexts");

var _license_info = require("./license_info");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function MLFlyoutView(_ref) {
  var _license$getFeature;

  var isCreatingJob = _ref.isCreatingJob,
      onClickCreate = _ref.onClickCreate,
      onClose = _ref.onClose,
      canCreateMLJob = _ref.canCreateMLJob;

  var _useContext = (0, _react.useContext)(_contexts.UptimeSettingsContext),
      basePath = _useContext.basePath,
      license = _useContext.license;

  var isLoadingMLJob = false;
  var hasPlatinumLicense = license === null || license === void 0 ? void 0 : (_license$getFeature = license.getFeature('ml')) === null || _license$getFeature === void 0 ? void 0 : _license$getFeature.isAvailable;
  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: onClose,
    size: "s"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, labels.ENABLE_ANOMALY_DETECTION)), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), _react.default.createElement(_eui.EuiFlyoutBody, null, !hasPlatinumLicense && _react.default.createElement(_license_info.ShowLicenseInfo, null), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, labels.CREAT_ML_JOB_DESC), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.ml.enableAnomalyDetectionPanel.manageMLJobDescription",
    defaultMessage: "Once a job is created, you can manage it and see more details in the {mlJobsPageLink}.",
    values: {
      mlJobsPageLink: _react.default.createElement(_eui.EuiLink, {
        href: basePath + '/app/ml'
      }, labels.ML_MANAGEMENT_PAGE)
    }
  })), _react.default.createElement("p", null, _react.default.createElement("em", null, labels.TAKE_SOME_TIME_TEXT))), _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: function onClick() {
      return onClose();
    },
    disabled: isCreatingJob || isLoadingMLJob
  }, labels.CANCEL_LABEL)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      return onClickCreate();
    },
    fill: true,
    isLoading: isCreatingJob,
    disabled: isCreatingJob || isLoadingMLJob || !hasPlatinumLicense || !canCreateMLJob
  }, labels.CREATE_NEW_JOB)))));
}