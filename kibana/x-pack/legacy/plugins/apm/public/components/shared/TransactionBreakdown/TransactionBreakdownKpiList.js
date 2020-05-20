"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionBreakdownKpiList = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _public = require("../../../../../../../plugins/infra/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Description = _styledComponents.default.span.withConfig({
  displayName: "Description",
  componentId: "sc-6o4j5i-0"
})(["{white-space:nowrap;}"]);

var KpiDescription = function KpiDescription(_ref) {
  var name = _ref.name,
      color = _ref.color;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    direction: "row",
    wrap: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "dot",
    color: color
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, _react.default.createElement(Description, null, name))));
};

var TransactionBreakdownKpiList = function TransactionBreakdownKpiList(_ref2) {
  var kpis = _ref2.kpis;
  return _react.default.createElement(_eui.EuiFlexGrid, null, kpis.map(function (kpi) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: kpi.name,
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      direction: "column",
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(KpiDescription, {
      name: kpi.name,
      color: kpi.color
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("span", null, _public.FORMATTERS[_public.InfraFormatterType.percent](kpi.percentage))))));
  }));
};

exports.TransactionBreakdownKpiList = TransactionBreakdownKpiList;