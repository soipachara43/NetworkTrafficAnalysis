"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmDeleteCaseModal = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ConfirmDeleteCaseModalComp = function ConfirmDeleteCaseModalComp(_ref) {
  var caseTitle = _ref.caseTitle,
      isModalVisible = _ref.isModalVisible,
      isPlural = _ref.isPlural,
      onCancel = _ref.onCancel,
      onConfirm = _ref.onConfirm;

  if (!isModalVisible) {
    return null;
  }

  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    buttonColor: "danger",
    cancelButtonText: i18n.CANCEL,
    confirmButtonText: isPlural ? i18n.DELETE_CASES : i18n.DELETE_CASE,
    "data-test-subj": "confirm-delete-case-modal",
    defaultFocusedButton: "confirm",
    onCancel: onCancel,
    onConfirm: onConfirm,
    title: isPlural ? i18n.DELETE_SELECTED_CASES : i18n.DELETE_TITLE(caseTitle)
  }, isPlural ? i18n.CONFIRM_QUESTION_PLURAL : i18n.CONFIRM_QUESTION));
};

var ConfirmDeleteCaseModal = _react.default.memo(ConfirmDeleteCaseModalComp);

exports.ConfirmDeleteCaseModal = ConfirmDeleteCaseModal;