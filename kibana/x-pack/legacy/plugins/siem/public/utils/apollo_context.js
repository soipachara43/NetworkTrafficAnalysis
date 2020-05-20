"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useApolloClient = exports.ApolloClientContext = void 0;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * This is a temporary provider and hook for use with hooks until react-apollo
 * has upgraded to the new-style `createContext` api.
 */
var ApolloClientContext = (0, _react.createContext)(undefined);
exports.ApolloClientContext = ApolloClientContext;

var useApolloClient = function useApolloClient() {
  return (0, _react.useContext)(ApolloClientContext);
};

exports.useApolloClient = useApolloClient;