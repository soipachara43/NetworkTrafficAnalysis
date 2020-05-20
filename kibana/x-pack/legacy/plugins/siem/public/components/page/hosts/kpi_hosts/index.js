"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KpiHostsComponent = exports.KpiHostsComponentBase = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _stat_items = require("../../../stat_items");

var _kpi_hosts_mapping = require("./kpi_hosts_mapping");

var _kpi_host_details_mapping = require("./kpi_host_details_mapping");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var kpiWidgetHeight = 247;
var FlexGroupSpinner = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FlexGroupSpinner",
  componentId: "ifcxib-0"
})(["{min-height:", "px;}"], kpiWidgetHeight);
FlexGroupSpinner.displayName = 'FlexGroupSpinner';

var KpiHostsComponentBase = function KpiHostsComponentBase(_ref) {
  var data = _ref.data,
      from = _ref.from,
      loading = _ref.loading,
      id = _ref.id,
      to = _ref.to,
      narrowDateRange = _ref.narrowDateRange;
  var mappings = data.hosts !== undefined ? _kpi_hosts_mapping.kpiHostsMapping : _kpi_host_details_mapping.kpiHostDetailsMapping;
  var statItemsProps = (0, _stat_items.useKpiMatrixStatus)(mappings, data, id, from, to, narrowDateRange);
  return loading ? _react.default.createElement(FlexGroupSpinner, {
    justifyContent: "center",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  }))) : _react.default.createElement(_eui.EuiFlexGroup, null, statItemsProps.map(function (mappedStatItemProps, idx) {
    return _react.default.createElement(_stat_items.StatItemsComponent, mappedStatItemProps);
  }));
};

exports.KpiHostsComponentBase = KpiHostsComponentBase;
KpiHostsComponentBase.displayName = 'KpiHostsComponentBase';

var KpiHostsComponent = _react.default.memo(KpiHostsComponentBase);

exports.KpiHostsComponent = KpiHostsComponent;
KpiHostsComponent.displayName = 'KpiHostsComponent';