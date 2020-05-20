"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metric = void 0;

var _fonts = require("../../../common/lib/fonts");

var _header = _interopRequireDefault(require("./header.png"));

var _kibana_advanced_settings = require("../../../public/lib/kibana_advanced_settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const metric = () => ({
  name: 'metric',
  displayName: 'Metric',
  tags: ['text'],
  help: 'A number with a label',
  width: 200,
  height: 100,
  image: _header.default,
  expression: `filters
| demodata
| math "unique(country)"
| metric "Countries" 
  metricFont={font size=48 family="${_fonts.openSans.value}" color="#000000" align="center" lHeight=48} 
  labelFont={font size=14 family="${_fonts.openSans.value}" color="#000000" align="center"}
  metricFormat="${_kibana_advanced_settings.AdvancedSettings.get('format:number:defaultPattern')}"
| render`
});

exports.metric = metric;