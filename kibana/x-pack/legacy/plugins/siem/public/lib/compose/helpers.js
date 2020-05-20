"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinks = void 0;

var _apolloLinkHttp = require("apollo-link-http");

var _apolloLinkState = require("apollo-link-state");

var _errors = require("../../containers/errors");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getLinks = function getLinks(cache, basePath) {
  return [_errors.errorLink, _errors.reTryOneTimeOnErrorLink, (0, _apolloLinkState.withClientState)({
    cache: cache,
    resolvers: {}
  }), (0, _apolloLinkHttp.createHttpLink)({
    credentials: 'same-origin',
    headers: {
      'kbn-xsrf': 'true'
    },
    uri: "".concat(basePath, "/api/siem/graphql")
  })];
};

exports.getLinks = getLinks;