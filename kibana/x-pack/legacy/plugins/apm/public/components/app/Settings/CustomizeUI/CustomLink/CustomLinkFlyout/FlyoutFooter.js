"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutFooter = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _DeleteButton = require("./DeleteButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FlyoutFooter = function FlyoutFooter(_ref) {
  var onClose = _ref.onClose,
      isSaving = _ref.isSaving,
      onDelete = _ref.onDelete,
      customLinkId = _ref.customLinkId,
      isSaveButtonEnabled = _ref.isSaveButtonEnabled;
  return _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: onClose,
    flush: "left"
  }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.close', {
    defaultMessage: 'Close'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      display: 'block'
    }
  }, customLinkId && _react.default.createElement(_DeleteButton.DeleteButton, {
    customLinkId: customLinkId,
    onDelete: onDelete
  }), _react.default.createElement(_eui.EuiButton, {
    fill: true,
    type: "submit",
    isLoading: isSaving,
    isDisabled: !isSaveButtonEnabled
  }, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.flyout.save', {
    defaultMessage: 'Save'
  })))));
};

exports.FlyoutFooter = FlyoutFooter;