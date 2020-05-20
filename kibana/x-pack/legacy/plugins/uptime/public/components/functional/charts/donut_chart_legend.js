"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonutChartLegend = void 0;

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _donut_chart_legend_row = require("./donut_chart_legend_row");

var _contexts = require("../../../contexts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LegendContainer = _styledComponents.default.div.withConfig({
  displayName: "LegendContainer",
  componentId: "sc-10xovf0-0"
})(["max-width:260px;min-width:100px;@media (max-width:767px){min-width:0px;max-width:100px;}"]);

var DonutChartLegend = function DonutChartLegend(_ref) {
  var down = _ref.down,
      up = _ref.up;

  var _useContext = (0, _react.useContext)(_contexts.UptimeThemeContext),
      _useContext$colors = _useContext.colors,
      gray = _useContext$colors.gray,
      danger = _useContext$colors.danger;

  return _react.default.createElement(LegendContainer, null, _react.default.createElement(_donut_chart_legend_row.DonutChartLegendRow, {
    color: danger,
    content: down,
    message: _i18n.i18n.translate('xpack.uptime.snapshot.donutChart.legend.downRowLabel', {
      defaultMessage: 'Down'
    }),
    "data-test-subj": 'xpack.uptime.snapshot.donutChart.down'
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_donut_chart_legend_row.DonutChartLegendRow, {
    color: gray,
    content: up,
    message: _i18n.i18n.translate('xpack.uptime.snapshot.donutChart.legend.upRowLabel', {
      defaultMessage: 'Up'
    }),
    "data-test-subj": 'xpack.uptime.snapshot.donutChart.up'
  }));
};

exports.DonutChartLegend = DonutChartLegend;