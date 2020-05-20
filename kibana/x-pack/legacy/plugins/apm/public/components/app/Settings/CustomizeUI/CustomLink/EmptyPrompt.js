"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyPrompt = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _CreateCustomLinkButton = require("./CreateCustomLinkButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyPrompt = function EmptyPrompt(_ref) {
  var onCreateCustomLinkClick = _ref.onCreateCustomLinkClick;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "link",
    iconColor: "",
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.emptyPromptTitle', {
      defaultMessage: 'No links found.'
    })),
    body: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.apm.settings.customizeUI.customLink.emptyPromptText', {
      defaultMessage: "Let's change that! You can add custom links to the Actions context menu by the transaction details for each service. Create a helpful link to your company's support portal or open a new bug report. Learn more about it in our docs."
    }))),
    actions: _react.default.createElement(_CreateCustomLinkButton.CreateCustomLinkButton, {
      onClick: onCreateCustomLinkClick
    })
  });
};

exports.EmptyPrompt = EmptyPrompt;