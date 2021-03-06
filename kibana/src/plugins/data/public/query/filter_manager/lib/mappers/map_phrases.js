"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapPhrases = void 0;

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
var mapPhrases = function mapPhrases(filter) {
  if (!(0, _common.isPhrasesFilter)(filter)) {
    throw filter;
  }

  var _filter$meta = filter.meta,
      type = _filter$meta.type,
      key = _filter$meta.key,
      value = _filter$meta.value,
      params = _filter$meta.params;
  return {
    type: type,
    key: key,
    value: value,
    params: params
  };
};

exports.mapPhrases = mapPhrases;