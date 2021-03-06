"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockDataProviders = exports.getEventCount = exports.mockDataProviderNames = void 0;

var _data_provider = require("../data_provider");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * A map of mock data provider name to a count of events for
 * that mock data provider
 */
var mockSourceNameToEventCount = {
  'Provider 1': 64,
  'Provider 2': 158,
  'Provider 3': 381,
  'Provider 4': 237,
  'Provider 5': 310,
  'Provider 6': 1052,
  'Provider 7': 533,
  'Provider 8': 429,
  'Provider 9': 706,
  'Provider 10': 863
};
/** Returns a collection of mock data provider names */

var mockDataProviderNames = function mockDataProviderNames() {
  return Object.keys(mockSourceNameToEventCount);
};
/** Returns a count of the events for a mock data provider */


exports.mockDataProviderNames = mockDataProviderNames;

var getEventCount = function getEventCount(dataProviderName) {
  return mockSourceNameToEventCount[dataProviderName] || 0;
};
/**
 * A collection of mock data providers, that can both be rendered
 * in the browser, and also used as mocks in unit and functional tests.
 */


exports.getEventCount = getEventCount;
var mockDataProviders = Object.keys(mockSourceNameToEventCount).map(function (name) {
  return {
    id: "id-".concat(name),
    name: name,
    enabled: true,
    excluded: false,
    kqlQuery: '',
    queryMatch: {
      field: 'name',
      value: name,
      operator: _data_provider.IS_OPERATOR
    },
    and: []
  };
});
exports.mockDataProviders = mockDataProviders;