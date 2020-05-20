"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizeUI = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _CustomLink = require("./CustomLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CustomizeUI = function CustomizeUI() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, _i18n.i18n.translate('xpack.apm.settings.customizeApp', {
    defaultMessage: 'Customize app'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_CustomLink.CustomLinkOverview, null));
};

exports.CustomizeUI = CustomizeUI;