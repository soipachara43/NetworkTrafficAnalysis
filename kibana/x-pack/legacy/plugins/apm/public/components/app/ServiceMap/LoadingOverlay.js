"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingOverlay = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Container = _styledComponents.default.div.withConfig({
  displayName: "Container",
  componentId: "sc-4lr3lw-0"
})(["position:relative;"]);

var Overlay = _styledComponents.default.div.withConfig({
  displayName: "Overlay",
  componentId: "sc-4lr3lw-1"
})(["position:absolute;top:0;z-index:1;display:flex;flex-direction:column;align-items:center;width:100%;padding:", ";"], _eui_theme_light.default.gutterTypes.gutterMedium);

var ProgressBarContainer = _styledComponents.default.div.withConfig({
  displayName: "ProgressBarContainer",
  componentId: "sc-4lr3lw-2"
})(["width:50%;max-width:600px;"]);

var LoadingOverlay = function LoadingOverlay(_ref) {
  var isLoading = _ref.isLoading,
      percentageLoaded = _ref.percentageLoaded;
  return _react.default.createElement(Container, null, isLoading && _react.default.createElement(Overlay, null, _react.default.createElement(ProgressBarContainer, null, _react.default.createElement(_eui.EuiProgress, {
    value: percentageLoaded,
    max: 100,
    color: "primary",
    size: "m"
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s",
    textAlign: "center"
  }, _i18n.i18n.translate('xpack.apm.loadingServiceMap', {
    defaultMessage: 'Loading service map... This might take a short while.'
  }))));
};

exports.LoadingOverlay = LoadingOverlay;