"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortFilters = void 0;

var _common = require("../../../../common");

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
 * Sort filters according to their store - global filters go first
 *
 * @param {object} first The first filter to compare
 * @param {object} second The second filter to compare
 *
 * @returns {number} Sorting order of filters
 */
var sortFilters = function sortFilters(_ref, _ref2) {
  var a = _ref.$state;
  var b = _ref2.$state;

  if (a.store === b.store) {
    return 0;
  } else {
    return a.store === _common.FilterStateStore.GLOBAL_STATE && b.store !== _common.FilterStateStore.GLOBAL_STATE ? -1 : 1;
  }
};

exports.sortFilters = sortFilters;