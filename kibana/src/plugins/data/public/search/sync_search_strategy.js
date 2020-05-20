"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncSearchStrategyProvider = exports.SYNC_SEARCH_STRATEGY = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

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
var SYNC_SEARCH_STRATEGY = 'SYNC_SEARCH_STRATEGY';
exports.SYNC_SEARCH_STRATEGY = SYNC_SEARCH_STRATEGY;

var syncSearchStrategyProvider = function syncSearchStrategyProvider(context) {
  var loadingCount$ = new _rxjs.BehaviorSubject(0);
  context.core.http.addLoadingCountSource(loadingCount$);

  var search = function search(request) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    loadingCount$.next(loadingCount$.getValue() + 1);
    return (0, _rxjs.from)(context.core.http.fetch({
      path: "/internal/search/".concat(request.serverStrategy),
      method: 'POST',
      body: JSON.stringify(request),
      signal: options.signal
    })).pipe((0, _operators.finalize)(function () {
      return loadingCount$.next(loadingCount$.getValue() - 1);
    }));
  };

  return {
    search: search
  };
};

exports.syncSearchStrategyProvider = syncSearchStrategyProvider;