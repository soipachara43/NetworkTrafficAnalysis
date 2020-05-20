"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.sendPost = sendPost;
exports.sendGet = sendGet;
exports.sendDelete = sendDelete;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var _httpClient;

function init(httpClient) {
  _httpClient = httpClient;
}

function getFullPath(path) {
  var apiPrefix = '/api/index_lifecycle_management';

  if (path) {
    return "".concat(apiPrefix, "/").concat(path);
  }

  return apiPrefix;
} // The extend_index_management module requires that we support an injected httpClient here.


function sendPost(path, payload) {
  var httpClient = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _httpClient;
  return httpClient.post(getFullPath(path), {
    body: JSON.stringify(payload)
  });
}

function sendGet(path, query) {
  var httpClient = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _httpClient;
  return httpClient.get(getFullPath(path), {
    query: query
  });
}

function sendDelete(path) {
  var httpClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _httpClient;
  return httpClient.delete(getFullPath(path));
}