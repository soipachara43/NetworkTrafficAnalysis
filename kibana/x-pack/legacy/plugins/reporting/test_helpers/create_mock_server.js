"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockServer = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createMockServer = ({
  settings = {}
}) => {
  const mockServer = {
    config: (0, _lodash.memoize)(() => ({
      get: jest.fn()
    })),
    info: {
      protocol: 'http'
    },
    plugins: {
      elasticsearch: {
        getCluster: (0, _lodash.memoize)(() => {
          return {
            callWithRequest: jest.fn()
          };
        })
      }
    }
  };
  const defaultSettings = {
    'xpack.reporting.encryptionKey': 'testencryptionkey',
    'server.basePath': '/sbp',
    'server.host': 'localhost',
    'server.port': 5601,
    'xpack.reporting.kibanaServer': {}
  };
  mockServer.config().get.mockImplementation(key => {
    return key in settings ? settings[key] : defaultSettings[key];
  });
  return mockServer;
};

exports.createMockServer = createMockServer;