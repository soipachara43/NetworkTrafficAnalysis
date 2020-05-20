"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMockVisualization = createMockVisualization;
exports.createMockDatasource = createMockDatasource;
exports.createMockFramePublicAPI = createMockFramePublicAPI;
exports.createExpressionRendererMock = createExpressionRendererMock;
exports.createMockSetupDependencies = createMockSetupDependencies;
exports.createMockStartDependencies = createMockStartDependencies;

var _react = _interopRequireDefault(require("react"));

var _mocks = require("../../../../../../src/plugins/embeddable/public/mocks");

var _mocks2 = require("../../../../../../src/plugins/expressions/public/mocks");

var _mocks3 = require("../../../../../../src/plugins/data/public/mocks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createMockVisualization() {
  return {
    id: 'TEST_VIS',
    clearLayer: jest.fn(function (state, _layerId) {
      return state;
    }),
    getLayerIds: jest.fn(function (_state) {
      return ['layer1'];
    }),
    visualizationTypes: [{
      icon: 'empty',
      id: 'TEST_VIS',
      label: 'TEST'
    }],
    getDescription: jest.fn(function (_state) {
      return {
        label: ''
      };
    }),
    switchVisualizationType: jest.fn(function (_, x) {
      return x;
    }),
    getPersistableState: jest.fn(function (_state) {
      return _state;
    }),
    getSuggestions: jest.fn(function (_options) {
      return [];
    }),
    initialize: jest.fn(function (_frame, _state) {
      return {};
    }),
    getConfiguration: jest.fn(function (props) {
      return {
        groups: [{
          groupId: 'a',
          groupLabel: 'a',
          layerId: 'layer1',
          supportsMoreColumns: true,
          accessors: [],
          filterOperations: jest.fn(function () {
            return true;
          }),
          dataTestSubj: 'mockVisA'
        }]
      };
    }),
    toExpression: jest.fn(function (_state, _frame) {
      return null;
    }),
    toPreviewExpression: jest.fn(function (_state, _frame) {
      return null;
    }),
    setDimension: jest.fn(),
    removeDimension: jest.fn()
  };
}

function createMockDatasource(id) {
  var publicAPIMock = {
    datasourceId: id,
    getTableSpec: jest.fn(function () {
      return [];
    }),
    getOperationForColumnId: jest.fn()
  };
  return {
    id: 'mockindexpattern',
    clearLayer: jest.fn(function (state, _layerId) {
      return state;
    }),
    getDatasourceSuggestionsForField: jest.fn(function (_state, _item) {
      return [];
    }),
    getDatasourceSuggestionsFromCurrentState: jest.fn(function (_state) {
      return [];
    }),
    getPersistableState: jest.fn(),
    getPublicAPI: jest.fn().mockReturnValue(publicAPIMock),
    initialize: jest.fn(function (_state) {
      return Promise.resolve();
    }),
    renderDataPanel: jest.fn(),
    renderLayerPanel: jest.fn(),
    toExpression: jest.fn(function (_frame, _state) {
      return null;
    }),
    insertLayer: jest.fn(function (_state, _newLayerId) {}),
    removeLayer: jest.fn(function (_state, _layerId) {}),
    removeColumn: jest.fn(function (props) {}),
    getLayers: jest.fn(function (_state) {
      return [];
    }),
    getMetaData: jest.fn(function (_state) {
      return {
        filterableIndexPatterns: []
      };
    }),
    renderDimensionTrigger: jest.fn(),
    renderDimensionEditor: jest.fn(),
    canHandleDrop: jest.fn(),
    onDrop: jest.fn(),
    // this is an additional property which doesn't exist on real datasources
    // but can be used to validate whether specific API mock functions are called
    publicAPIMock: publicAPIMock
  };
}

function createMockFramePublicAPI() {
  return {
    datasourceLayers: {},
    addNewLayer: jest.fn(function () {
      return '';
    }),
    removeLayers: jest.fn(),
    dateRange: {
      fromDate: 'now-7d',
      toDate: 'now'
    },
    query: {
      query: '',
      language: 'lucene'
    },
    filters: []
  };
}

function createExpressionRendererMock() {
  return jest.fn(function (_) {
    return _react.default.createElement("span", null);
  });
}

function createMockSetupDependencies() {
  return {
    data: _mocks3.dataPluginMock.createSetupContract(),
    embeddable: _mocks.embeddablePluginMock.createSetupContract(),
    expressions: _mocks2.expressionsPluginMock.createSetupContract()
  };
}

function createMockStartDependencies() {
  return {
    data: _mocks3.dataPluginMock.createSetupContract(),
    embeddable: _mocks.embeddablePluginMock.createStartContract(),
    expressions: _mocks2.expressionsPluginMock.createStartContract()
  };
}