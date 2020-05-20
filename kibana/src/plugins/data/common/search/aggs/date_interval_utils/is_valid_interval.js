"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidInterval = isValidInterval;

var _is_valid_es_interval = require("./is_valid_es_interval");

var _least_common_interval = require("./least_common_interval");

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
// When base interval is set, check for least common interval and allow
// input the value is the same. This means that the input interval is a
// multiple of the base interval.
function _parseWithBase(value, baseInterval) {
  try {
    const interval = (0, _least_common_interval.leastCommonInterval)(baseInterval, value);
    return interval === value.replace(/\s/g, '');
  } catch (e) {
    return false;
  }
}

function isValidInterval(value, baseInterval) {
  if (baseInterval) {
    return _parseWithBase(value, baseInterval);
  } else {
    return (0, _is_valid_es_interval.isValidEsInterval)(value);
  }
}