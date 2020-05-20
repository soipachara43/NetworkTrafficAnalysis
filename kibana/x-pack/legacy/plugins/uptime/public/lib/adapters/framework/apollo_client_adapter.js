"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApolloClient = void 0;

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _apolloClient = require("apollo-client");

var _apolloLinkHttp = require("apollo-link-http");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createApolloClient = function createApolloClient(uri, xsrfHeader) {
  return new _apolloClient.ApolloClient({
    link: new _apolloLinkHttp.HttpLink({
      uri: uri,
      credentials: 'same-origin',
      headers: {
        'kbn-xsrf': xsrfHeader
      }
    }),
    cache: new _apolloCacheInmemory.InMemoryCache({
      dataIdFromObject: function dataIdFromObject() {
        return undefined;
      }
    })
  });
};

exports.createApolloClient = createApolloClient;