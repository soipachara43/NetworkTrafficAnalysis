"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEsClient = getEsClient;

var _elasticsearch = _interopRequireDefault(require("elasticsearch-browser/elasticsearch"));

var _rxjs = require("rxjs");

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
// @ts-ignore
function getEsClient(injectedMetadata, http, packageInfo) {
  var esRequestTimeout = injectedMetadata.getInjectedVar('esRequestTimeout');
  var esApiVersion = injectedMetadata.getInjectedVar('esApiVersion'); // Use legacy es client for msearch.

  var client = _elasticsearch.default.Client({
    host: getEsUrl(http, packageInfo),
    log: 'info',
    requestTimeout: esRequestTimeout,
    apiVersion: esApiVersion
  });

  var loadingCount$ = new _rxjs.BehaviorSubject(0);
  http.addLoadingCountSource(loadingCount$);
  return {
    search: wrapEsClientMethod(client, 'search', loadingCount$),
    msearch: wrapEsClientMethod(client, 'msearch', loadingCount$),
    create: wrapEsClientMethod(client, 'create', loadingCount$)
  };
}

function wrapEsClientMethod(esClient, method, loadingCount$) {
  return function (args) {
    // esClient returns a promise, with an additional abort handler
    // To tap into the abort handling, we have to override that abort handler.
    var customPromiseThingy = esClient[method](args);
    var abort = customPromiseThingy.abort;
    var resolved = false; // Start LoadingIndicator

    loadingCount$.next(loadingCount$.getValue() + 1); // Stop LoadingIndicator when user aborts

    customPromiseThingy.abort = function () {
      abort();

      if (!resolved) {
        resolved = true;
        loadingCount$.next(loadingCount$.getValue() - 1);
      }
    }; // Stop LoadingIndicator when promise finishes


    customPromiseThingy.finally(function () {
      resolved = true;
      loadingCount$.next(loadingCount$.getValue() - 1);
    });
    return customPromiseThingy;
  };
}

function getEsUrl(http, packageInfo) {
  var a = document.createElement('a');
  a.href = http.basePath.prepend('/elasticsearch');
  var protocolPort = /https/.test(a.protocol) ? 443 : 80;
  var port = a.port || protocolPort;
  return {
    host: a.hostname,
    port: port,
    protocol: a.protocol,
    pathname: a.pathname,
    headers: {
      'kbn-version': packageInfo.version
    }
  };
}