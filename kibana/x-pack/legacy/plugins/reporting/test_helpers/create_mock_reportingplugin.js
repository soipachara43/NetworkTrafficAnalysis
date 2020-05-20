"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockReportingCore = exports.createMockStartDeps = exports.createMockSetupDeps = void 0;

var _events = require("events");

var _mocks = require("src/core/server/mocks");

var _server = require("../server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
jest.mock('../server/routes');
jest.mock('../server/usage');
jest.mock('../server/browsers');
jest.mock('../server/browsers');
jest.mock('../server/lib/create_queue');
jest.mock('../server/lib/enqueue_job');
jest.mock('../server/lib/validate');
jest.mock('../log_configuration');

const createMockSetupDeps = setupMock => ({
  elasticsearch: setupMock.elasticsearch,
  security: setupMock.security,
  usageCollection: {},
  __LEGACY: {
    plugins: {
      xpack_main: {
        status: new _events.EventEmitter()
      }
    }
  }
});

exports.createMockSetupDeps = createMockSetupDeps;

const createMockStartDeps = startMock => ({
  data: startMock.data,
  elasticsearch: startMock.elasticsearch,
  __LEGACY: {}
});

exports.createMockStartDeps = createMockStartDeps;

const createMockReportingPlugin = async (config = {}) => {
  const plugin = new _server.ReportingPlugin(_mocks.coreMock.createPluginInitializerContext(config));

  const setupMock = _mocks.coreMock.createSetup();

  const coreStartMock = _mocks.coreMock.createStart();

  const startMock = { ...coreStartMock,
    data: {
      fieldFormats: {}
    }
  };
  await plugin.setup(setupMock, createMockSetupDeps(setupMock));
  await plugin.start(startMock, createMockStartDeps(startMock));
  return plugin;
};

const createMockReportingCore = async (config = {}) => {
  const plugin = await createMockReportingPlugin(config);
  return plugin.getReportingCore();
};

exports.createMockReportingCore = createMockReportingCore;