"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationProvider = exports.LocationContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initialLocation = {};
var LocationContext = (0, _react.createContext)(initialLocation);
exports.LocationContext = LocationContext;
var LocationProvider = (0, _reactRouterDom.withRouter)(function (_ref) {
  var location = _ref.location,
      children = _ref.children;
  return _react.default.createElement(LocationContext.Provider, {
    children: children,
    value: location
  });
});
exports.LocationProvider = LocationProvider;