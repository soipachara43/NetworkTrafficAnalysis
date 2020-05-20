"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../../src/plugins/kibana_react/public");

var _mocks = require("../../../../../../../src/core/public/mocks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const startMock = _mocks.coreMock.createStart();

const services = {
  setBreadcrumbs: startMock.chrome.setBreadcrumbs
};

const wrapComponent = Component => props => _react.default.createElement(_public.KibanaContextProvider, {
  services: services
}, _react.default.createElement(Component, props));

exports.wrapComponent = wrapComponent;