"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationByCountryMap = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _useAvgDurationByCountry = require("../../../../../hooks/useAvgDurationByCountry");

var _ChoroplethMap = require("../ChoroplethMap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DurationByCountryMap = function DurationByCountryMap() {
  var _useAvgDurationByCoun = (0, _useAvgDurationByCountry.useAvgDurationByCountry)(),
      data = _useAvgDurationByCoun.data;

  return _react.default.createElement(_react.default.Fragment, null, ' ', _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.apm.metrics.durationByCountryMap.avgPageLoadByCountryLabel', {
    defaultMessage: 'Avg. page load duration distribution by country'
  }))), _react.default.createElement(_ChoroplethMap.ChoroplethMap, {
    items: data
  }));
};

exports.DurationByCountryMap = DurationByCountryMap;