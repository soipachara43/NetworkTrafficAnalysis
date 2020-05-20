"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _app = require("./app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var renderApp = function renderApp(core, plugins, _ref) {
  var element = _ref.element;
  (0, _reactDom.render)(_react.default.createElement(_app.SiemApp, {
    core: core,
    plugins: plugins
  }), element);
  return function () {
    return (0, _reactDom.unmountComponentAtNode)(element);
  };
};

exports.renderApp = renderApp;