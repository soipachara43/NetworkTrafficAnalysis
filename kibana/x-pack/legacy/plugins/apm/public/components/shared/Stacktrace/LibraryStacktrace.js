"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LibraryStacktrace = LibraryStacktrace;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Stackframe = require("./Stackframe");

var _variables = require("../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FramesContainer = (0, _styledComponents.default)('div').withConfig({
  displayName: "FramesContainer",
  componentId: "sc-15kutgr-0"
})(["padding-left:", ";"], (0, _variables.px)(_variables.unit));

function LibraryStacktrace(_ref) {
  var codeLanguage = _ref.codeLanguage,
      id = _ref.id,
      stackframes = _ref.stackframes;

  if (stackframes.length === 0) {
    return null;
  }

  return _react.default.createElement(_eui.EuiAccordion, {
    buttonContent: _i18n.i18n.translate('xpack.apm.stacktraceTab.libraryFramesToogleButtonLabel', {
      defaultMessage: '{count, plural, one {# library frame} other {# library frames}}',
      values: {
        count: stackframes.length
      }
    }),
    id: id
  }, _react.default.createElement(FramesContainer, null, stackframes.map(function (stackframe, i) {
    return _react.default.createElement(_Stackframe.Stackframe, {
      key: i,
      id: i.toString(10),
      isLibraryFrame: true,
      codeLanguage: codeLanguage,
      stackframe: stackframe
    });
  })));
}