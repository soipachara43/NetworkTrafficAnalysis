"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUpload = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore (elastic/eui#1262) EuiFilePicker is not exported yet
var FileUpload = function FileUpload(props) {
  return _react.default.createElement(_eui.EuiFilePicker, {
    compressed: true,
    id: props.id,
    className: props.className,
    onChange: props.onUpload
  });
};

exports.FileUpload = FileUpload;
FileUpload.defaultProps = {
  id: '',
  className: 'canvasFileUpload'
};
FileUpload.propTypes = {
  /** Optional ID of the component */
  id: _propTypes.default.string,

  /** Optional className of the component */
  className: _propTypes.default.string,

  /** Function to invoke when the file is successfully uploaded */
  onUpload: _propTypes.default.func.isRequired
};
FileUpload.displayName = 'FileUpload';