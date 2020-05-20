"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KpiNetworkComponent = exports.KpiNetworkBaseComponent = exports.fieldTitleChartMapping = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fp = require("lodash/fp");

var _stat_items = require("../../../../components/stat_items");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var kipsPerRow = 2;
var kpiWidgetHeight = 228;
var euiVisColorPalette = (0, _eui.euiPaletteColorBlind)();
var euiColorVis1 = euiVisColorPalette[1];
var euiColorVis2 = euiVisColorPalette[2];
var euiColorVis3 = euiVisColorPalette[3];
var fieldTitleChartMapping = [{
  key: 'UniqueIps',
  index: 2,
  fields: [{
    key: 'uniqueSourcePrivateIps',
    value: null,
    name: i18n.SOURCE_CHART_LABEL,
    description: i18n.SOURCE_UNIT_LABEL,
    color: euiColorVis2,
    icon: 'visMapCoordinate'
  }, {
    key: 'uniqueDestinationPrivateIps',
    value: null,
    name: i18n.DESTINATION_CHART_LABEL,
    description: i18n.DESTINATION_UNIT_LABEL,
    color: euiColorVis3,
    icon: 'visMapCoordinate'
  }],
  description: i18n.UNIQUE_PRIVATE_IPS,
  enableAreaChart: true,
  enableBarChart: true,
  grow: 2
}];
exports.fieldTitleChartMapping = fieldTitleChartMapping;
var fieldTitleMatrixMapping = [{
  key: 'networkEvents',
  index: 0,
  fields: [{
    key: 'networkEvents',
    value: null,
    color: euiColorVis1
  }],
  description: i18n.NETWORK_EVENTS,
  grow: 1
}, {
  key: 'dnsQueries',
  index: 1,
  fields: [{
    key: 'dnsQueries',
    value: null
  }],
  description: i18n.DNS_QUERIES
}, {
  key: 'uniqueFlowId',
  index: 3,
  fields: [{
    key: 'uniqueFlowId',
    value: null
  }],
  description: i18n.UNIQUE_FLOW_IDS
}, {
  key: 'tlsHandshakes',
  index: 4,
  fields: [{
    key: 'tlsHandshakes',
    value: null
  }],
  description: i18n.TLS_HANDSHAKES
}];
var FlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FlexGroup",
  componentId: "sc-1lemho0-0"
})(["min-height:", "px;"], kpiWidgetHeight);
FlexGroup.displayName = 'FlexGroup';

var KpiNetworkBaseComponent = _react.default.memo(function (_ref) {
  var fieldsMapping = _ref.fieldsMapping,
      data = _ref.data,
      id = _ref.id,
      from = _ref.from,
      to = _ref.to,
      narrowDateRange = _ref.narrowDateRange;
  var statItemsProps = (0, _stat_items.useKpiMatrixStatus)(fieldsMapping, data, id, from, to, narrowDateRange);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true
  }, statItemsProps.map(function (mappedStatItemProps, idx) {
    return _react.default.createElement(_stat_items.StatItemsComponent, mappedStatItemProps);
  }));
});

exports.KpiNetworkBaseComponent = KpiNetworkBaseComponent;
KpiNetworkBaseComponent.displayName = 'KpiNetworkBaseComponent';

var KpiNetworkComponent = _react.default.memo(function (_ref2) {
  var data = _ref2.data,
      from = _ref2.from,
      id = _ref2.id,
      loading = _ref2.loading,
      to = _ref2.to,
      narrowDateRange = _ref2.narrowDateRange;
  return loading ? _react.default.createElement(FlexGroup, {
    justifyContent: "center",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  }))) : _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, (0, _fp.chunk)(kipsPerRow, fieldTitleMatrixMapping).map(function (mappingsPerLine, idx) {
    return _react.default.createElement(_react.default.Fragment, {
      key: "kpi-network-row-".concat(idx)
    }, idx % kipsPerRow === 1 && _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), _react.default.createElement(KpiNetworkBaseComponent, {
      data: data,
      id: id,
      fieldsMapping: mappingsPerLine,
      from: from,
      to: to,
      narrowDateRange: narrowDateRange
    }));
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(KpiNetworkBaseComponent, {
    data: data,
    id: id,
    fieldsMapping: fieldTitleChartMapping,
    from: from,
    to: to,
    narrowDateRange: narrowDateRange
  })));
});

exports.KpiNetworkComponent = KpiNetworkComponent;
KpiNetworkComponent.displayName = 'KpiNetworkComponent';