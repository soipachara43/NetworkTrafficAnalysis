"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorStatePrompt = ErrorStatePrompt;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function ErrorStatePrompt() {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement("div", null, _i18n.i18n.translate('xpack.apm.error.prompt.title', {
      defaultMessage: "Sorry, an error occured :("
    })),
    body: _i18n.i18n.translate('xpack.apm.error.prompt.body', {
      defaultMessage: "Please inspect your browser's developer console for details."
    }),
    titleSize: "s"
  });
}