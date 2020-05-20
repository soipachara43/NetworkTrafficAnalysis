"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountWithRouter = exports.shallowWithRouter = exports.renderWithRouter = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _history = require("history");

var _enzyme_helpers = require("test_utils/enzyme_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var helperWithRouter = function helperWithRouter(helper, component, customHistory) {
  if (customHistory) {
    customHistory.location.key = 'TestKeyForTesting';
    return helper(_react.default.createElement(_reactRouterDom.Router, {
      history: customHistory
    }, component));
  }

  var history = (0, _history.createMemoryHistory)();
  history.location.key = 'TestKeyForTesting';
  return helper(_react.default.createElement(_reactRouterDom.Router, {
    history: history
  }, component));
};

var renderWithRouter = function renderWithRouter(component, customHistory) {
  return helperWithRouter(_enzyme_helpers.renderWithIntl, component, customHistory);
};

exports.renderWithRouter = renderWithRouter;

var shallowWithRouter = function shallowWithRouter(component, customHistory) {
  return helperWithRouter(_enzyme_helpers.shallowWithIntl, component, customHistory);
};

exports.shallowWithRouter = shallowWithRouter;

var mountWithRouter = function mountWithRouter(component, customHistory) {
  return helperWithRouter(_enzyme_helpers.mountWithIntl, component, customHistory);
};

exports.mountWithRouter = mountWithRouter;