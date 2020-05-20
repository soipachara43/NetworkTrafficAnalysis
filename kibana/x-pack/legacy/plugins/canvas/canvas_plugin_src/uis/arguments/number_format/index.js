"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberFormat = exports.NumberFormatArgInput = void 0;

var _recompose = require("recompose");

var _number_format = require("./number_format");

var _kibana_advanced_settings = require("../../../../public/lib/kibana_advanced_settings");

var _template_from_react_component = require("../../../../public/lib/template_from_react_component");

var _i18n = require("../../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local lib
const {
  NumberFormat: strings
} = _i18n.ArgumentStrings;
const formatMap = {
  NUMBER: _kibana_advanced_settings.AdvancedSettings.get('format:number:defaultPattern'),
  PERCENT: _kibana_advanced_settings.AdvancedSettings.get('format:percent:defaultPattern'),
  CURRENCY: _kibana_advanced_settings.AdvancedSettings.get('format:currency:defaultPattern'),
  DURATION: '00:00:00',
  BYTES: _kibana_advanced_settings.AdvancedSettings.get('format:bytes:defaultPattern')
};
const numberFormats = [{
  value: formatMap.NUMBER,
  text: strings.getFormatNumber()
}, {
  value: formatMap.PERCENT,
  text: strings.getFormatPercent()
}, {
  value: formatMap.CURRENCY,
  text: strings.getFormatCurrency()
}, {
  value: formatMap.DURATION,
  text: strings.getFormatDuration()
}, {
  value: formatMap.BYTES,
  text: strings.getFormatBytes()
}];
const NumberFormatArgInput = (0, _recompose.compose)((0, _recompose.withProps)({
  numberFormats
}))(_number_format.NumberFormatArgInput);
exports.NumberFormatArgInput = NumberFormatArgInput;

const numberFormat = () => ({
  name: 'numberFormat',
  displayName: strings.getDisplayName(),
  help: strings.getHelp(),
  simpleTemplate: (0, _template_from_react_component.templateFromReactComponent)(NumberFormatArgInput)
});

exports.numberFormat = numberFormat;