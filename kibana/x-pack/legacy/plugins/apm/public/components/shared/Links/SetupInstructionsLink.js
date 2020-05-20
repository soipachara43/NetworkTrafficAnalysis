"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupInstructionsLink = SetupInstructionsLink;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _KibanaLink = require("./KibanaLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SETUP_INSTRUCTIONS_LABEL = _i18n.i18n.translate('xpack.apm.setupInstructionsButtonLabel', {
  defaultMessage: 'Setup Instructions'
}); // renders a filled button or a link as a kibana link to setup instructions


function SetupInstructionsLink(_ref) {
  var _ref$buttonFill = _ref.buttonFill,
      buttonFill = _ref$buttonFill === void 0 ? false : _ref$buttonFill;
  return _react.default.createElement(_KibanaLink.KibanaLink, {
    path: '/home/tutorial/apm'
  }, buttonFill ? _react.default.createElement(_eui.EuiButton, {
    size: "s",
    color: "primary",
    fill: buttonFill,
    iconType: "help"
  }, SETUP_INSTRUCTIONS_LABEL) : _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    color: "primary",
    iconType: "help"
  }, SETUP_INSTRUCTIONS_LABEL));
}