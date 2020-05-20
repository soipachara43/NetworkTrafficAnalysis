"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapPhrase = exports.isMapPhraseFilter = void 0;

var _lodash = require("lodash");

var _common = require("../../../../../common");

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
var getScriptedPhraseValue = function getScriptedPhraseValue(filter) {
  return (0, _lodash.get)(filter, ['script', 'script', 'params', 'value']);
};

var getFormattedValueFn = function getFormattedValueFn(value) {
  return function (formatter) {
    return formatter ? formatter.convert(value) : value;
  };
};

var getParams = function getParams(filter) {
  var scriptedPhraseValue = getScriptedPhraseValue(filter);
  var isScriptedFilter = Boolean(scriptedPhraseValue);
  var key = isScriptedFilter ? filter.meta.field || '' : (0, _common.getPhraseFilterField)(filter);
  var query = scriptedPhraseValue || (0, _common.getPhraseFilterValue)(filter);
  var params = {
    query: query
  };
  return {
    key: key,
    params: params,
    type: _common.FILTERS.PHRASE,
    value: getFormattedValueFn(query)
  };
};

var isMapPhraseFilter = function isMapPhraseFilter(filter) {
  return (0, _common.isPhraseFilter)(filter) || (0, _common.isScriptedPhraseFilter)(filter);
};

exports.isMapPhraseFilter = isMapPhraseFilter;

var mapPhrase = function mapPhrase(filter) {
  if (!isMapPhraseFilter(filter)) {
    throw filter;
  }

  return getParams(filter);
};

exports.mapPhrase = mapPhrase;