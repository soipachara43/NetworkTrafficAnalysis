"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadStep = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _components = require("../../../../../i18n/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _components.ComponentStrings.ShareWebsiteWorkpadStep;

var WorkpadStep = function WorkpadStep(_ref) {
  var onDownload = _ref.onDownload;
  return _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, strings.getStepDescription()), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      onDownload('share');
    },
    size: "s"
  }, strings.getDownloadLabel()));
};

exports.WorkpadStep = WorkpadStep;