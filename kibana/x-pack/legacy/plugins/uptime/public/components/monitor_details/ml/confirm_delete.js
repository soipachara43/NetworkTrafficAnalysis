"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmJobDeletion = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var labels = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ConfirmJobDeletion = function ConfirmJobDeletion(_ref) {
  var loading = _ref.loading,
      onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel;
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: labels.JOB_DELETION_CONFIRMATION,
    onCancel: onCancel,
    onConfirm: onConfirm,
    cancelButtonText: "Cancel",
    confirmButtonText: "Delete",
    buttonColor: "danger",
    defaultFocusedButton: "confirm"
  }, !loading ? _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorDetails.ml.confirmDeleteMessage",
    defaultMessage: "Are you sure you want to delete this job?"
  })) : _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorDetails.ml.deleteMessage",
    defaultMessage: "Deleting jobs..."
  }), ")"), !loading ? _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorDetails.ml.deleteJobWarning",
    defaultMessage: "Deleting a job can be time consuming. It will be deleted in the background and data may not disappear instantly."
  })) : _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  })));
};

exports.ConfirmJobDeletion = ConfirmJobDeletion;