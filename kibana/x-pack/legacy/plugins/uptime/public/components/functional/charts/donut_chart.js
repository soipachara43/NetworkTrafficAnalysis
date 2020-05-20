"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonutChart = exports.GreenCheckIcon = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var d3 = _interopRequireWildcard(require("d3"));

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _donut_chart_legend = require("./donut_chart_legend");

var _contexts = require("../../../contexts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var GreenCheckIcon = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "GreenCheckIcon",
  componentId: "az6th8-0"
})(["height:42px;width:42px;color:#017d73;top:51px;left:51px;position:absolute;"]);
exports.GreenCheckIcon = GreenCheckIcon;

var DonutChart = function DonutChart(_ref) {
  var height = _ref.height,
      down = _ref.down,
      up = _ref.up,
      width = _ref.width;
  var chartElement = (0, _react.useRef)(null);

  var _useContext = (0, _react.useContext)(_contexts.UptimeThemeContext),
      _useContext$colors = _useContext.colors,
      danger = _useContext$colors.danger,
      gray = _useContext$colors.gray;

  var upCount = up;

  if (up === 0 && down === 0) {
    upCount = 1;
  }

  (0, _react.useEffect)(function () {
    if (chartElement.current !== null) {
      // we must remove any existing paths before painting
      d3.select(chartElement.current).selectAll('g').remove();
      var svgElement = d3.select(chartElement.current).append('g').attr('transform', "translate(".concat(width / 2, ", ").concat(height / 2, ")"));
      var color = d3.scale.ordinal().domain(['up', 'down']).range([gray, danger]);
      var pieGenerator = d3.layout.pie().value(function (_ref2) {
        var value = _ref2.value;
        return value;
      }) // these start/end angles will reverse the direction of the pie,
      // which matches our design
      .startAngle(2 * Math.PI).endAngle(0);
      svgElement.selectAll('g').data( // @ts-ignore pie generator expects param of type number[], but only works with
      // output of d3.entries, which is like Array<{ key: string, value: number }>
      pieGenerator(d3.entries({
        up: upCount,
        down: down
      }))).enter().append('path').attr('d', // @ts-ignore attr does not expect a param of type Arc<Arc> but it behaves as desired
      d3.svg.arc().innerRadius(width * 0.28).outerRadius(Math.min(width, height) / 2 - 10)).attr('fill', function (d) {
        return color(d.data.key);
      });
    }
  }, [danger, down, gray, height, upCount, width]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      position: 'relative'
    }
  }, _react.default.createElement("svg", {
    "aria-label": _i18n.i18n.translate('xpack.uptime.snapshot.donutChart.ariaLabel', {
      defaultMessage: 'Pie chart showing the current status. {down} of {total} monitors are down.',
      values: {
        down: down,
        total: up + down
      }
    }),
    ref: chartElement,
    width: width,
    height: height
  }), down === 0 && _react.default.createElement(GreenCheckIcon, {
    className: "greenCheckIcon",
    type: "checkInCircleFilled"
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_donut_chart_legend.DonutChartLegend, {
    down: down,
    up: up
  })));
};

exports.DonutChart = DonutChart;