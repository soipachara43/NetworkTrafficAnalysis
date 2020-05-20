"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featuresPluginMock = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createStart = function createStart() {
  return {
    getFeatures: jest.fn()
  };
};

var featuresPluginMock = {
  createStart: createStart
};
exports.featuresPluginMock = featuresPluginMock;