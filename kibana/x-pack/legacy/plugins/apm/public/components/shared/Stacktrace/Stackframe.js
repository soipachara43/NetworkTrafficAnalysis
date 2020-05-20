"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stackframe = Stackframe;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _variables = require("../../../style/variables");

var _FrameHeading = require("./FrameHeading");

var _Context = require("./Context");

var _Variables = require("./Variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ContextContainer = _styledComponents.default.div.withConfig({
  displayName: "ContextContainer",
  componentId: "rraigy-0"
})(["position:relative;font-family:", ";font-size:", ";border:1px solid ", ";border-radius:", ";background:", ";"], _variables.fontFamilyCode, _variables.fontSize, _eui_theme_light.default.euiColorLightShade, _variables.borderRadius, function (props) {
  return props.isLibraryFrame ? _eui_theme_light.default.euiColorEmptyShade : _eui_theme_light.default.euiColorLightestShade;
});

function Stackframe(_ref) {
  var stackframe = _ref.stackframe,
      codeLanguage = _ref.codeLanguage,
      id = _ref.id,
      _ref$initialIsOpen = _ref.initialIsOpen,
      initialIsOpen = _ref$initialIsOpen === void 0 ? false : _ref$initialIsOpen,
      _ref$isLibraryFrame = _ref.isLibraryFrame,
      isLibraryFrame = _ref$isLibraryFrame === void 0 ? false : _ref$isLibraryFrame;

  if (!hasLineContext(stackframe)) {
    return _react.default.createElement(_FrameHeading.FrameHeading, {
      stackframe: stackframe,
      isLibraryFrame: isLibraryFrame
    });
  }

  return _react.default.createElement(_eui.EuiAccordion, {
    buttonContent: _react.default.createElement(_FrameHeading.FrameHeading, {
      stackframe: stackframe,
      isLibraryFrame: isLibraryFrame
    }),
    id: id,
    initialIsOpen: initialIsOpen
  }, _react.default.createElement(ContextContainer, {
    isLibraryFrame: isLibraryFrame
  }, _react.default.createElement(_Context.Context, {
    stackframe: stackframe,
    codeLanguage: codeLanguage,
    isLibraryFrame: isLibraryFrame
  })), _react.default.createElement(_Variables.Variables, {
    vars: stackframe.vars
  }));
}

function hasLineContext(stackframe) {
  var _stackframe$line;

  return ((_stackframe$line = stackframe.line) === null || _stackframe$line === void 0 ? void 0 : _stackframe$line.hasOwnProperty('context')) || false;
}