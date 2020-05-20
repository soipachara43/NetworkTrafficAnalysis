"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageRouter = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _overview_container = require("./components/connected/pages/overview_container");

var _constants = require("../common/constants");

var _pages = require("./pages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PageRouter = function PageRouter(_ref) {
  var autocomplete = _ref.autocomplete;
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: _constants.MONITOR_ROUTE
  }, _react.default.createElement(_pages.MonitorPage, null)), _react.default.createElement(_reactRouterDom.Route, {
    path: _constants.SETTINGS_ROUTE
  }, _react.default.createElement(_pages.SettingsPage, null)), _react.default.createElement(_reactRouterDom.Route, {
    path: _constants.OVERVIEW_ROUTE
  }, _react.default.createElement(_overview_container.OverviewPage, {
    autocomplete: autocomplete
  })), _react.default.createElement(_reactRouterDom.Route, {
    component: _pages.NotFoundPage
  }));
};

exports.PageRouter = PageRouter;