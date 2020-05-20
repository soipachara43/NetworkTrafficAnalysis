"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _apolloClient = _interopRequireDefault(require("apollo-client"));

var _apolloLink = require("apollo-link");

var _introspection = _interopRequireDefault(require("../../graphql/introspection.json"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function compose(core) {
  var cache = new _apolloCacheInmemory.InMemoryCache({
    dataIdFromObject: function dataIdFromObject() {
      return null;
    },
    fragmentMatcher: new _apolloCacheInmemory.IntrospectionFragmentMatcher({
      introspectionQueryResultData: _introspection.default
    })
  });
  var basePath = core.http.basePath.get();
  var apolloClient = new _apolloClient.default({
    connectToDevTools: process.env.NODE_ENV !== 'production',
    cache: cache,
    link: _apolloLink.ApolloLink.from((0, _helpers.getLinks)(cache, basePath))
  });
  var libs = {
    apolloClient: apolloClient
  };
  return libs;
}