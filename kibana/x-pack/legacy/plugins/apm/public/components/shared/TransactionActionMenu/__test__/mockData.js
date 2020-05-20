"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.location = exports.transactionWithAllData = exports.transactionWithUrlAndDomain = exports.transactionWithUrlWithoutDomain = exports.transactionWithHostData = exports.transactionWithContainerData = exports.transactionWithKubernetesData = exports.transactionWithMinimalData = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var bareTransaction = {
  '@metadata': 'whatever',
  observer: {
    version: '8.0.0',
    version_major: 8
  },
  agent: {
    name: 'java',
    version: '7.0.0'
  },
  processor: {
    name: 'transaction',
    event: 'transaction'
  },
  '@timestamp': '2018-12-18T00:14:30.952Z',
  service: {
    framework: {
      name: 'gin',
      version: 'v1.4.0-dev'
    },
    name: 'opbeans-go',
    runtime: {
      name: 'gc',
      version: 'go1.10.6'
    },
    language: {
      name: 'go',
      version: 'go1.10.6'
    }
  },
  process: {
    pid: 1,
    title: 'opbeans-go',
    args: ['/opbeans-go', '-listen=:3000', '-frontend=/opbeans-frontend', '-db=postgres:', '-cache=redis://redis:6379'],
    ppid: 0
  },
  trace: {
    id: '8b60bd32ecc6e1506735a8b6cfcf175c'
  },
  transaction: {
    result: 'HTTP 2xx',
    duration: {
      us: 14586403
    },
    name: 'GET /api/products/:id/customers',
    span_count: {
      dropped: 0,
      started: 1
    },
    id: '8b60bd32ecc6e150',
    type: 'request',
    sampled: true
  },
  timestamp: {
    us: 1545092070952472
  }
};
var transactionWithMinimalData = bareTransaction;
exports.transactionWithMinimalData = transactionWithMinimalData;

var transactionWithKubernetesData = _objectSpread({}, bareTransaction, {
  kubernetes: {
    pod: {
      uid: 'pod123456abcdef'
    }
  }
});

exports.transactionWithKubernetesData = transactionWithKubernetesData;

var transactionWithContainerData = _objectSpread({}, bareTransaction, {
  container: {
    id: 'container123456abcdef'
  }
});

exports.transactionWithContainerData = transactionWithContainerData;

var transactionWithHostData = _objectSpread({}, bareTransaction, {
  host: {
    hostname: '227453131a17'
  }
});

exports.transactionWithHostData = transactionWithHostData;

var transactionWithUrlWithoutDomain = _objectSpread({}, bareTransaction, {
  url: {
    full: 'http://opbeans-go'
  }
});

exports.transactionWithUrlWithoutDomain = transactionWithUrlWithoutDomain;

var transactionWithUrlAndDomain = _objectSpread({}, bareTransaction, {
  url: {
    full: 'http://example.com',
    domain: 'example.com'
  }
});

exports.transactionWithUrlAndDomain = transactionWithUrlAndDomain;

var transactionWithAllData = _objectSpread({}, bareTransaction, {}, transactionWithKubernetesData, {}, transactionWithHostData, {}, transactionWithUrlWithoutDomain, {}, transactionWithUrlAndDomain);

exports.transactionWithAllData = transactionWithAllData;
var location = {
  state: '',
  pathname: '/opbeans-go/transactions/request/GET~20~2Fapi~2Fproducts~2F~3Aid~2Fcustomers',
  search: '?_g=()&flyoutDetailTab=undefined&waterfallItemId=8b60bd32ecc6e150',
  hash: ''
};
exports.location = location;