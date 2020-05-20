"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.Provider = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* istanbul ignore next */
var defaultContext = {
  breadcrumbs: [],
  addCrumb: function addCrumb(crumb) {
    return null;
  },
  removeCrumb: function removeCrumb(crumb) {
    return null;
  }
};

var _React$createContext = _react.default.createContext(defaultContext),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

exports.Consumer = Consumer;
exports.Provider = Provider;