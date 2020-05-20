"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _clipboard = require("../../clipboard");

var _components = require("../../../../i18n/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _components.ComponentStrings.WorkpadHeaderWorkpadExport;

/**
 * A panel displayed in the Export Menu with options in which to generate PDF Reports.
 */
var PDFPanel = function PDFPanel(_ref) {
  var pdfURL = _ref.pdfURL,
      onExport = _ref.onExport,
      onCopy = _ref.onCopy;
  return _react.default.createElement("div", {
    className: "canvasWorkpadExport__panelContent"
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, strings.getPDFPanelGenerateDescription())), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiButton, {
    fill: true,
    onClick: onExport,
    size: "s",
    style: {
      width: '100%'
    }
  }, strings.getPDFPanelGenerateButtonLabel()), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, strings.getPDFPanelCopyDescription())), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_clipboard.Clipboard, {
    content: pdfURL,
    onCopy: onCopy
  }, _react.default.createElement(_eui.EuiButton, {
    iconType: "copy",
    size: "s",
    style: {
      width: '100%'
    },
    "aria-label": strings.getPDFPanelCopyAriaLabel()
  }, strings.getPDFPanelCopyButtonLabel())));
};

exports.PDFPanel = PDFPanel;