"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownEditorForm = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _shared_imports = require("../../shared_imports");

var _ = require(".");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MarkdownEditorForm = function MarkdownEditorForm(_ref) {
  var bottomRightContent = _ref.bottomRightContent,
      dataTestSubj = _ref.dataTestSubj,
      field = _ref.field,
      idAria = _ref.idAria,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled,
      onCursorPositionUpdate = _ref.onCursorPositionUpdate,
      placeholder = _ref.placeholder,
      topRightContent = _ref.topRightContent;

  var _getFieldValidityAndE = (0, _shared_imports.getFieldValidityAndErrorMessage)(field),
      isInvalid = _getFieldValidityAndE.isInvalid,
      errorMessage = _getFieldValidityAndE.errorMessage;

  var handleContentChange = (0, _react.useCallback)(function (newContent) {
    field.setValue(newContent);
  }, [field]);
  return _react.default.createElement(_eui.EuiFormRow, {
    "data-test-subj": dataTestSubj,
    describedByIds: idAria ? [idAria] : undefined,
    error: errorMessage,
    fullWidth: true,
    helpText: field.helpText,
    isInvalid: isInvalid,
    label: field.label,
    labelAppend: field.labelAppend
  }, _react.default.createElement(_.MarkdownEditor, {
    bottomRightContent: bottomRightContent,
    content: field.value,
    isDisabled: isDisabled,
    onChange: handleContentChange,
    onCursorPositionUpdate: onCursorPositionUpdate,
    placeholder: placeholder,
    topRightContent: topRightContent
  }));
};

exports.MarkdownEditorForm = MarkdownEditorForm;