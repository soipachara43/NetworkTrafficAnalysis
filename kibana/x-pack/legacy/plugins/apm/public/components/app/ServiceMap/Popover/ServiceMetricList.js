"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceMetricList = ServiceMetricList;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _formatters = require("../../../../utils/formatters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function LoadingSpinner() {
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceAround",
    style: {
      height: 170
    }
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  }));
}

var BadgeRow = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "BadgeRow",
  componentId: "sc-1d6njb0-0"
})(["padding-bottom:", ";"], _eui_theme_light.default.gutterTypes.gutterSmall);
var ItemRow = (0, _styledComponents.default)('tr').withConfig({
  displayName: "ItemRow",
  componentId: "sc-1d6njb0-1"
})(["line-height:2;"]);
var ItemTitle = (0, _styledComponents.default)('td').withConfig({
  displayName: "ItemTitle",
  componentId: "sc-1d6njb0-2"
})(["color:", ";padding-right:1rem;"], _eui_theme_light.default.textColors.subdued);
var ItemDescription = (0, _styledComponents.default)('td').withConfig({
  displayName: "ItemDescription",
  componentId: "sc-1d6njb0-3"
})(["text-align:right;"]);

function ServiceMetricList(_ref) {
  var avgTransactionDuration = _ref.avgTransactionDuration,
      avgRequestsPerMinute = _ref.avgRequestsPerMinute,
      avgErrorsPerMinute = _ref.avgErrorsPerMinute,
      avgCpuUsage = _ref.avgCpuUsage,
      avgMemoryUsage = _ref.avgMemoryUsage,
      frameworkName = _ref.frameworkName,
      numInstances = _ref.numInstances,
      isLoading = _ref.isLoading;
  var listItems = [{
    title: _i18n.i18n.translate('xpack.apm.serviceMap.avgTransDurationPopoverMetric', {
      defaultMessage: 'Trans. duration (avg.)'
    }),
    description: (0, _lodash.isNumber)(avgTransactionDuration) ? (0, _formatters.asDuration)(avgTransactionDuration) : null
  }, {
    title: _i18n.i18n.translate('xpack.apm.serviceMap.avgReqPerMinutePopoverMetric', {
      defaultMessage: 'Req. per minute (avg.)'
    }),
    description: (0, _lodash.isNumber)(avgRequestsPerMinute) ? "".concat(avgRequestsPerMinute.toFixed(2), " ").concat((0, _formatters.tpmUnit)('request')) : null
  }, {
    title: _i18n.i18n.translate('xpack.apm.serviceMap.avgErrorsPerMinutePopoverMetric', {
      defaultMessage: 'Errors per minute (avg.)'
    }),
    description: avgErrorsPerMinute === null || avgErrorsPerMinute === void 0 ? void 0 : avgErrorsPerMinute.toFixed(2)
  }, {
    title: _i18n.i18n.translate('xpack.apm.serviceMap.avgCpuUsagePopoverMetric', {
      defaultMessage: 'CPU usage (avg.)'
    }),
    description: (0, _lodash.isNumber)(avgCpuUsage) ? (0, _formatters.asPercent)(avgCpuUsage, 1) : null
  }, {
    title: _i18n.i18n.translate('xpack.apm.serviceMap.avgMemoryUsagePopoverMetric', {
      defaultMessage: 'Memory usage (avg.)'
    }),
    description: (0, _lodash.isNumber)(avgMemoryUsage) ? (0, _formatters.asPercent)(avgMemoryUsage, 1) : null
  }];
  var showBadgeRow = frameworkName || numInstances > 1;
  return isLoading ? _react.default.createElement(LoadingSpinner, null) : _react.default.createElement(_react.default.Fragment, null, showBadgeRow && _react.default.createElement(BadgeRow, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, frameworkName && _react.default.createElement(_eui.EuiBadge, null, frameworkName), numInstances > 1 && _react.default.createElement(_eui.EuiBadge, {
    iconType: "apps",
    color: "hollow"
  }, _i18n.i18n.translate('xpack.apm.serviceMap.numInstancesMetric', {
    values: {
      numInstances: numInstances
    },
    defaultMessage: '{numInstances} instances'
  })))), _react.default.createElement("table", null, _react.default.createElement("tbody", null, listItems.map(function (_ref2) {
    var title = _ref2.title,
        description = _ref2.description;
    return description && _react.default.createElement(ItemRow, {
      key: title
    }, _react.default.createElement(ItemTitle, null, title), _react.default.createElement(ItemDescription, null, description));
  }))));
}