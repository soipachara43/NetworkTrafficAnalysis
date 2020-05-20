"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockEnableChartsData = exports.mockEnableChartsInitialData = exports.mockDisableChartsInitialData = exports.mockNoChartMappings = exports.mockData = exports.mockNarrowDateRange = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mockNarrowDateRange = jest.fn();
exports.mockNarrowDateRange = mockNarrowDateRange;
var mockData = {
  KpiNetwork: {
    networkEvents: 16,
    uniqueFlowId: 10277307,
    uniqueSourcePrivateIps: 383,
    uniqueSourcePrivateIpsHistogram: [{
      x: new Date('2019-02-09T16:00:00.000Z').valueOf(),
      y: 8
    }, {
      x: new Date('2019-02-09T19:00:00.000Z').valueOf(),
      y: 0
    }],
    uniqueDestinationPrivateIps: 18,
    uniqueDestinationPrivateIpsHistogram: [{
      x: new Date('2019-02-09T16:00:00.000Z').valueOf(),
      y: 8
    }, {
      x: new Date('2019-02-09T19:00:00.000Z').valueOf(),
      y: 0
    }],
    dnsQueries: 278,
    tlsHandshakes: 10000
  }
};
exports.mockData = mockData;
var mockMappingItems = {
  key: 'UniqueIps',
  index: 0,
  fields: [{
    key: 'uniqueSourcePrivateIps',
    value: null,
    name: 'Src.',
    description: 'source',
    color: '#D36086',
    icon: 'visMapCoordinate'
  }, {
    key: 'uniqueDestinationPrivateIps',
    value: null,
    name: 'Dest.',
    description: 'destination',
    color: '#9170B8',
    icon: 'visMapCoordinate'
  }],
  description: 'Unique private IPs',
  enableAreaChart: true,
  enableBarChart: true,
  grow: 2
};
var mockNoChartMappings = [_objectSpread({}, mockMappingItems, {
  enableAreaChart: false,
  enableBarChart: false
})];
exports.mockNoChartMappings = mockNoChartMappings;
var mockDisableChartsInitialData = {
  fields: [{
    key: 'uniqueSourcePrivateIps',
    value: undefined,
    name: 'Src.',
    description: 'source',
    color: '#D36086',
    icon: 'visMapCoordinate'
  }, {
    key: 'uniqueDestinationPrivateIps',
    value: undefined,
    name: 'Dest.',
    description: 'destination',
    color: '#9170B8',
    icon: 'visMapCoordinate'
  }],
  description: 'Unique private IPs',
  enableAreaChart: false,
  enableBarChart: false,
  grow: 2,
  areaChart: undefined,
  barChart: undefined
};
exports.mockDisableChartsInitialData = mockDisableChartsInitialData;
var mockEnableChartsInitialData = {
  fields: [{
    key: 'uniqueSourcePrivateIps',
    value: undefined,
    name: 'Src.',
    description: 'source',
    color: '#D36086',
    icon: 'visMapCoordinate'
  }, {
    key: 'uniqueDestinationPrivateIps',
    value: undefined,
    name: 'Dest.',
    description: 'destination',
    color: '#9170B8',
    icon: 'visMapCoordinate'
  }],
  description: 'Unique private IPs',
  enableAreaChart: true,
  enableBarChart: true,
  grow: 2,
  areaChart: [],
  barChart: [{
    color: '#D36086',
    key: 'uniqueSourcePrivateIps',
    value: [{
      g: 'uniqueSourcePrivateIps',
      x: 'Src.',
      y: null
    }]
  }, {
    color: '#9170B8',
    key: 'uniqueDestinationPrivateIps',
    value: [{
      g: 'uniqueDestinationPrivateIps',
      x: 'Dest.',
      y: null
    }]
  }]
};
exports.mockEnableChartsInitialData = mockEnableChartsInitialData;
var mockEnableChartsData = {
  areaChart: [{
    key: 'uniqueSourcePrivateIpsHistogram',
    value: [{
      x: new Date('2019-02-09T16:00:00.000Z').valueOf(),
      y: 8
    }, {
      x: new Date('2019-02-09T19:00:00.000Z').valueOf(),
      y: 0
    }],
    name: 'Src.',
    description: 'source',
    color: '#D36086',
    icon: 'visMapCoordinate'
  }, {
    key: 'uniqueDestinationPrivateIpsHistogram',
    value: [{
      x: new Date('2019-02-09T16:00:00.000Z').valueOf(),
      y: 8
    }, {
      x: new Date('2019-02-09T19:00:00.000Z').valueOf(),
      y: 0
    }],
    name: 'Dest.',
    description: 'destination',
    color: '#9170B8',
    icon: 'visMapCoordinate'
  }],
  barChart: [{
    key: 'uniqueSourcePrivateIps',
    color: '#D36086',
    value: [{
      x: 'Src.',
      y: 383,
      g: 'uniqueSourcePrivateIps',
      y0: 0
    }]
  }, {
    key: 'uniqueDestinationPrivateIps',
    color: '#9170B8',
    value: [{
      x: 'Dest.',
      y: 18,
      g: 'uniqueDestinationPrivateIps',
      y0: 0
    }]
  }],
  description: 'Unique private IPs',
  enableAreaChart: true,
  enableBarChart: true,
  fields: [{
    key: 'uniqueSourcePrivateIps',
    value: 383,
    name: 'Src.',
    description: 'source',
    color: '#D36086',
    icon: 'visMapCoordinate'
  }, {
    key: 'uniqueDestinationPrivateIps',
    value: 18,
    name: 'Dest.',
    description: 'destination',
    color: '#9170B8',
    icon: 'visMapCoordinate'
  }],
  from: 1560578400000,
  grow: 2,
  id: 'statItem',
  index: 2,
  statKey: 'UniqueIps',
  to: 1560837600000,
  narrowDateRange: mockNarrowDateRange
};
exports.mockEnableChartsData = mockEnableChartsData;