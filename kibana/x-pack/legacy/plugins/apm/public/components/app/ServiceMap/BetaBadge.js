"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BetaBadge = BetaBadge;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BetaBadgeContainer = _styledComponents.default.div.withConfig({
  displayName: "BetaBadgeContainer",
  componentId: "sc-1p2g2w1-0"
})(["right:", ";position:absolute;top:", ";z-index:1;"], _eui_theme_light.default.gutterTypes.gutterMedium, _eui_theme_light.default.gutterTypes.gutterSmall);

function BetaBadge() {
  return _react.default.createElement(BetaBadgeContainer, null, _react.default.createElement(_eui.EuiBetaBadge, {
    label: _i18n.i18n.translate('xpack.apm.serviceMap.betaBadge', {
      defaultMessage: 'Beta'
    }),
    tooltipContent: _i18n.i18n.translate('xpack.apm.serviceMap.betaTooltipMessage', {
      defaultMessage: 'This feature is currently in beta. If you encounter any bugs or have feedback, please open an issue or visit our discussion forum.'
    })
  }));
}