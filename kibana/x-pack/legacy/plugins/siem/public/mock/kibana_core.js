"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKibanaPluginsStartMock = exports.createKibanaCoreStartMock = exports.createKibanaPluginsSetupMock = exports.createKibanaCoreSetupMock = void 0;

var _helpers = require("ui/new_platform/__mocks__/helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createKibanaCoreSetupMock = function createKibanaCoreSetupMock() {
  return (0, _helpers.createUiNewPlatformMock)().npSetup.core;
};

exports.createKibanaCoreSetupMock = createKibanaCoreSetupMock;

var createKibanaPluginsSetupMock = function createKibanaPluginsSetupMock() {
  return (0, _helpers.createUiNewPlatformMock)().npSetup.plugins;
};

exports.createKibanaPluginsSetupMock = createKibanaPluginsSetupMock;

var createKibanaCoreStartMock = function createKibanaCoreStartMock() {
  return (0, _helpers.createUiNewPlatformMock)().npStart.core;
};

exports.createKibanaCoreStartMock = createKibanaCoreStartMock;

var createKibanaPluginsStartMock = function createKibanaPluginsStartMock() {
  return (0, _helpers.createUiNewPlatformMock)().npStart.plugins;
};

exports.createKibanaPluginsStartMock = createKibanaPluginsStartMock;