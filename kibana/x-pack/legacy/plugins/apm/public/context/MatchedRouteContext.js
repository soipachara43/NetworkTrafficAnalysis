"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatchedRouteProvider = MatchedRouteProvider;
exports.MatchedRouteContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _useLocation2 = require("../hooks/useLocation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MatchedRouteContext = _react.default.createContext([]);

exports.MatchedRouteContext = MatchedRouteContext;

function MatchedRouteProvider(_ref) {
  var children = _ref.children,
      routes = _ref.routes;

  var _useLocation = (0, _useLocation2.useLocation)(),
      pathname = _useLocation.pathname;

  var contextValue = (0, _react.useMemo)(function () {
    return routes.filter(function (route) {
      return (0, _reactRouterDom.matchPath)(pathname, {
        path: route.path
      });
    });
  }, [pathname, routes]);
  return _react.default.createElement(MatchedRouteContext.Provider, {
    value: contextValue,
    children: children
  });
}