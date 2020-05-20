"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChoroplethToolTip = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _formatters = require("../../../../../utils/formatters");

var _variables = require("../../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ChoroplethToolTip = function ChoroplethToolTip(_ref) {
  var name = _ref.name,
      value = _ref.value,
      docCount = _ref.docCount;
  return _react.default.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, _react.default.createElement("div", {
    style: {
      fontSize: _variables.fontSizes.large
    }
  }, name), _react.default.createElement("div", null, _i18n.i18n.translate('xpack.apm.metrics.durationByCountryMap.RegionMapChart.ToolTip.avgPageLoadDuration', {
    defaultMessage: 'Avg. page load duration:'
  })), _react.default.createElement("div", {
    style: {
      fontWeight: 'bold',
      fontSize: _variables.fontSizes.large
    }
  }, (0, _formatters.asDuration)(value)), _react.default.createElement("div", null, "(", _i18n.i18n.translate('xpack.apm.metrics.durationByCountryMap.RegionMapChart.ToolTip.countPageLoads', {
    values: {
      docCount: (0, _formatters.asInteger)(docCount)
    },
    defaultMessage: '{docCount} page loads'
  }), ")"));
};

exports.ChoroplethToolTip = ChoroplethToolTip;