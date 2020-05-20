"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageRouter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("./pages/404");

var _home = require("./pages/home");

var _manage_spy_routes = require("./utils/route/manage_spy_routes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PageRouterComponent = function PageRouterComponent(_ref) {
  var history = _ref.history;
  return _react.default.createElement(_manage_spy_routes.ManageRoutesSpy, null, _react.default.createElement(_reactRouterDom.Router, {
    history: history
  }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: "/"
  }, _react.default.createElement(_home.HomePage, null)), _react.default.createElement(_reactRouterDom.Route, null, _react.default.createElement(_.NotFoundPage, null)))));
};

var PageRouter = (0, _react.memo)(PageRouterComponent);
exports.PageRouter = PageRouter;