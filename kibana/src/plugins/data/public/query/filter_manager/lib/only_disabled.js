"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyDisabledFiltersChanged = void 0;

var _lodash = require("lodash");

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
var isEnabled = function isEnabled(f) {
  return f && f.meta && !f.meta.disabled;
};
/**
 * Checks to see if only disabled filters have been changed
 *
 * @returns {bool} Only disabled filters
 */


var onlyDisabledFiltersChanged = function onlyDisabledFiltersChanged(newFilters, oldFilters) {
  // If it's the same - compare only enabled filters
  var newEnabledFilters = (0, _lodash.filter)(newFilters || [], isEnabled);
  var oldEnabledFilters = (0, _lodash.filter)(oldFilters || [], isEnabled);
  return (0, _common.compareFilters)(oldEnabledFilters, newEnabledFilters, _common.COMPARE_ALL_OPTIONS);
};

exports.onlyDisabledFiltersChanged = onlyDisabledFiltersChanged;