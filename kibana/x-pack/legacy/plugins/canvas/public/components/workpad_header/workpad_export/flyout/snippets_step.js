"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnippetsStep = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _components = require("../../../../../i18n/components");

var _clipboard = require("../../../clipboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _components.ComponentStrings.ShareWebsiteSnippetsStep;
var HTML = "<!-- ".concat(strings.getIncludeRuntimeLabel(), " -->\n<script src=\"kbn_canvas.js\"></script>\n\n<!-- ").concat(strings.getPlaceholderLabel(), " -->\n<div kbn-canvas-shareable=\"canvas\" kbn-canvas-url=\"workpad.json\" />\n\n<!-- ").concat(strings.getCallRuntimeLabel(), " -->\n<script type=\"text/javascript\">\n  KbnCanvas.share();\n</script>");

var SnippetsStep = function SnippetsStep(_ref) {
  var onCopy = _ref.onCopy;
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, strings.getSnippetsStepDescription())), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_clipboard.Clipboard, {
    content: HTML,
    onCopy: onCopy
  }, _react.default.createElement(_eui.EuiCodeBlock, {
    className: "canvasWorkpadExport__reportingConfig",
    paddingSize: "s",
    fontSize: "s",
    language: "html"
  }, HTML)), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h4", null, strings.getParametersTitle()), _react.default.createElement("p", null, strings.getParametersDescription())), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiDescriptionList, null, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_eui.EuiCode, null, "kbn-canvas-shareable=\"canvas\""), " (", strings.getRequiredLabel(), ")"), _react.default.createElement(_eui.EuiDescriptionListDescription, null, strings.getShareableParameterDescription()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_eui.EuiCode, null, "kbn-canvas-url"), " (", strings.getRequiredLabel(), ")"), _react.default.createElement(_eui.EuiDescriptionListDescription, null, strings.getUrlParameterDescription()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_eui.EuiCode, null, "kbn-canvas-height")), _react.default.createElement(_eui.EuiDescriptionListDescription, null, strings.getHeightParameterDescription()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_eui.EuiCode, null, "kbn-canvas-width")), _react.default.createElement(_eui.EuiDescriptionListDescription, null, strings.getWidthParameterDescription()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_eui.EuiCode, null, "kbn-canvas-page")), _react.default.createElement(_eui.EuiDescriptionListDescription, null, strings.getPageParameterDescription()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_eui.EuiCode, null, "kbn-canvas-autoplay")), _react.default.createElement(_eui.EuiDescriptionListDescription, null, strings.getAutoplayParameterDescription()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_eui.EuiCode, null, "kbn-canvas-interval")), _react.default.createElement(_eui.EuiDescriptionListDescription, null, strings.getIntervalParameterDescription()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_eui.EuiCode, null, "kbn-canvas-toolbar")), _react.default.createElement(_eui.EuiDescriptionListDescription, null, strings.getToolbarParameterDescription())));
};

exports.SnippetsStep = SnippetsStep;