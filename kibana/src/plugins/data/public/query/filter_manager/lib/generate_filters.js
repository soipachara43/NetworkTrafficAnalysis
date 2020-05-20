"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateFilters = generateFilters;

var _lodash = _interopRequireDefault(require("lodash"));

var _common = require("../../../../common");

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
function getExistingFilter(appFilters, fieldName, value) {
  // TODO: On array fields, negating does not negate the combination, rather all terms
  return _lodash.default.find(appFilters, function (filter) {
    if (!filter) return;

    if (fieldName === '_exists_' && (0, _common.isExistsFilter)(filter)) {
      return filter.exists.field === value;
    }

    if ((0, _common.isPhraseFilter)(filter)) {
      return (0, _common.getPhraseFilterField)(filter) === fieldName && (0, _common.getPhraseFilterValue)(filter) === value;
    }

    if ((0, _common.isScriptedPhraseFilter)(filter)) {
      return filter.meta.field === fieldName && filter.script.script.params.value === value;
    }
  });
}

function updateExistingFilter(existingFilter, negate) {
  existingFilter.meta.disabled = false;

  if (existingFilter.meta.negate !== negate) {
    existingFilter.meta.negate = !existingFilter.meta.negate;
  }
}
/**
 * Generate filter objects, as a result of triggering a filter action on a
 * specific index pattern field.
 *
 * @param {FilterManager} filterManager - The active filter manager to lookup for existing filters
 * @param {Field | string} field - The field for which filters should be generated
 * @param {any} values - One or more values to filter for.
 * @param {string} operation - "-" to create a negated filter
 * @param {string} index - Index string to generate filters for
 *
 * @returns {object} An array of filters to be added back to filterManager
 */


function generateFilters(filterManager, field, values, operation, index) {
  values = Array.isArray(values) ? values : [values];
  var fieldObj = _lodash.default.isObject(field) ? field : {
    name: field
  };
  var fieldName = fieldObj.name;
  var newFilters = [];
  var appFilters = filterManager.getAppFilters();
  var negate = operation === '-';
  var filter;

  _lodash.default.each(values, function (value) {
    var existing = getExistingFilter(appFilters, fieldName, value);

    if (existing) {
      updateExistingFilter(existing, negate);
      filter = existing;
    } else {
      var tmpIndexPattern = {
        id: index
      }; // exists filter special case:  fieldname = '_exists' and value = fieldname

      var filterType = fieldName === '_exists_' ? _common.FILTERS.EXISTS : _common.FILTERS.PHRASE;
      var actualFieldObj = fieldName === '_exists_' ? {
        name: value
      } : fieldObj;
      filter = (0, _common.buildFilter)(tmpIndexPattern, actualFieldObj, filterType, negate, false, value, null, _common.FilterStateStore.APP_STATE);
    }

    newFilters.push(filter);
  });

  return newFilters;
}