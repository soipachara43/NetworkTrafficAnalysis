"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kpiHostsMapping = void 0;

var i18n = _interopRequireWildcard(require("./translations"));

var _types = require("./types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var kpiHostsMapping = [{
  key: 'hosts',
  index: 0,
  fields: [{
    key: 'hosts',
    value: null,
    color: _types.KpiHostsChartColors.hosts,
    icon: 'storage'
  }],
  enableAreaChart: true,
  grow: 2,
  description: i18n.HOSTS
}, {
  key: 'authentication',
  index: 1,
  fields: [{
    key: 'authSuccess',
    name: i18n.SUCCESS_CHART_LABEL,
    description: i18n.SUCCESS_UNIT_LABEL,
    value: null,
    color: _types.KpiHostsChartColors.authSuccess,
    icon: 'check'
  }, {
    key: 'authFailure',
    name: i18n.FAIL_CHART_LABEL,
    description: i18n.FAIL_UNIT_LABEL,
    value: null,
    color: _types.KpiHostsChartColors.authFailure,
    icon: 'cross'
  }],
  enableAreaChart: true,
  enableBarChart: true,
  grow: 4,
  description: i18n.USER_AUTHENTICATIONS
}, {
  key: 'uniqueIps',
  index: 2,
  fields: [{
    key: 'uniqueSourceIps',
    name: i18n.SOURCE_CHART_LABEL,
    description: i18n.SOURCE_UNIT_LABEL,
    value: null,
    color: _types.KpiHostsChartColors.uniqueSourceIps,
    icon: 'visMapCoordinate'
  }, {
    key: 'uniqueDestinationIps',
    name: i18n.DESTINATION_CHART_LABEL,
    description: i18n.DESTINATION_UNIT_LABEL,
    value: null,
    color: _types.KpiHostsChartColors.uniqueDestinationIps,
    icon: 'visMapCoordinate'
  }],
  enableAreaChart: true,
  enableBarChart: true,
  grow: 4,
  description: i18n.UNIQUE_IPS
}];
exports.kpiHostsMapping = kpiHostsMapping;