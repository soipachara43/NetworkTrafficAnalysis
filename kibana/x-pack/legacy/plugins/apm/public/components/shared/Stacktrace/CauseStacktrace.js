"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CauseStacktrace = CauseStacktrace;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _variables = require("../../../style/variables");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore Styled Components has trouble inferring the types of the default props here.
var Accordion = (0, _styledComponents.default)(_eui.EuiAccordion).withConfig({
  displayName: "Accordion",
  componentId: "sc-1gvaaxc-0"
})(["border-top:", ";"], _eui_theme_light.default.euiBorderThin);
var CausedByContainer = (0, _styledComponents.default)('h5').withConfig({
  displayName: "CausedByContainer",
  componentId: "sc-1gvaaxc-1"
})(["padding:", " 0;"], _eui_theme_light.default.spacerSizes.s);
var CausedByHeading = (0, _styledComponents.default)('span').withConfig({
  displayName: "CausedByHeading",
  componentId: "sc-1gvaaxc-2"
})(["color:", ";display:block;font-size:", ";font-weight:", ";text-transform:uppercase;"], _eui_theme_light.default.textColors.subdued, _eui_theme_light.default.euiFontSizeXS, _eui_theme_light.default.euiFontWeightBold);
var FramesContainer = (0, _styledComponents.default)('div').withConfig({
  displayName: "FramesContainer",
  componentId: "sc-1gvaaxc-3"
})(["padding-left:", ";"], (0, _variables.px)(_variables.unit));

function CausedBy(_ref) {
  var message = _ref.message;
  return _react.default.createElement(CausedByContainer, null, _react.default.createElement(CausedByHeading, null, _i18n.i18n.translate('xpack.apm.stacktraceTab.causedByFramesToogleButtonLabel', {
    defaultMessage: 'Caused By'
  })), _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("span", null, message)));
}

function CauseStacktrace(_ref2) {
  var codeLanguage = _ref2.codeLanguage,
      id = _ref2.id,
      _ref2$message = _ref2.message,
      message = _ref2$message === void 0 ? '…' : _ref2$message,
      _ref2$stackframes = _ref2.stackframes,
      stackframes = _ref2$stackframes === void 0 ? [] : _ref2$stackframes;

  if (stackframes.length === 0) {
    return _react.default.createElement(CausedBy, {
      message: message
    });
  }

  return _react.default.createElement(Accordion, {
    buttonContent: _react.default.createElement(CausedBy, {
      message: message
    }),
    id: id
  }, _react.default.createElement(FramesContainer, null, _react.default.createElement(_.Stacktrace, {
    stackframes: stackframes,
    codeLanguage: codeLanguage
  })));
}