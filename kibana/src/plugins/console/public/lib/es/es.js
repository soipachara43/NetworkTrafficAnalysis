"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersion = getVersion;
exports.getContentType = getContentType;
exports.send = send;
exports.constructESUrl = constructESUrl;

var _jquery = _interopRequireDefault(require("jquery"));

var _queryString = require("query-string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var esVersion = [];

function getVersion() {
  return esVersion;
}

function getContentType(body) {
  if (!body) return;
  return 'application/json';
}

function send(method, path, data) {
  var wrappedDfd = _jquery.default.Deferred(); // eslint-disable-line new-cap


  var options = {
    url: '../api/console/proxy?' + (0, _queryString.stringify)({
      path: path,
      method: method
    }, {
      sort: false
    }),
    data: data,
    contentType: getContentType(data),
    cache: false,
    crossDomain: true,
    type: 'POST',
    dataType: 'text' // disable automatic guessing

  };

  _jquery.default.ajax(options).then(function (responseData, textStatus, jqXHR) {
    wrappedDfd.resolveWith({}, [responseData, textStatus, jqXHR]);
  }, function (jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 0) {
      jqXHR.responseText = "\n\nFailed to connect to Console's backend.\nPlease check the Kibana server is up and running";
    }

    wrappedDfd.rejectWith({}, [jqXHR, textStatus, errorThrown]);
  });

  return wrappedDfd;
}

function constructESUrl(baseUri, path) {
  baseUri = baseUri.replace(/\/+$/, '');
  path = path.replace(/^\/+/, '');
  return baseUri + '/' + path;
}