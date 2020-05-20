"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplayValueFromFilter = getDisplayValueFromFilter;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _get_index_pattern_from_filter = require("./get_index_pattern_from_filter");

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
function getValueFormatter(indexPattern, key) {
  if (!indexPattern || !key) return;
  let format = (0, _lodash.get)(indexPattern, ['fields', 'byName', key, 'format']);

  if (!format && indexPattern.fields.getByName) {
    // TODO: Why is indexPatterns sometimes a map and sometimes an array?
    const field = indexPattern.fields.getByName(key);

    if (!field) {
      throw new Error(_i18n.i18n.translate('data.filter.filterBar.fieldNotFound', {
        defaultMessage: 'Field {key} not found in index pattern {indexPattern}',
        values: {
          key,
          indexPattern: indexPattern.title
        }
      }));
    }

    format = field.format;
  }

  return format;
}

function getDisplayValueFromFilter(filter, indexPatterns) {
  const indexPattern = (0, _get_index_pattern_from_filter.getIndexPatternFromFilter)(filter, indexPatterns);

  if (typeof filter.meta.value === 'function') {
    const valueFormatter = getValueFormatter(indexPattern, filter.meta.key);
    return filter.meta.value(valueFormatter);
  } else {
    return filter.meta.value || '';
  }
}