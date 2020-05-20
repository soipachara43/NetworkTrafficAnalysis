"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatListAsProse = formatListAsProse;

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

/**
 *  Converts an array of items into a sentence-ready string.
 *
 *  @param {Array<string>} list
 *  @param {Object} [options={}]
 *  @property {Boolean} [options.inclusive=true] Creates an inclusive list using "and"
 *                                               when `true` (default), otherwise uses "or"
 *  @return {String}
 */
function formatListAsProse(list) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$inclusive = options.inclusive,
      inclusive = _options$inclusive === void 0 ? true : _options$inclusive;
  var count = list.length;
  var conjunction = inclusive ? 'and' : 'or';

  if (count <= 2) {
    return list.join(" ".concat(conjunction, " "));
  }

  return list.slice(0, -1).concat("".concat(conjunction, " ").concat(list[count - 1])).join(', ');
}