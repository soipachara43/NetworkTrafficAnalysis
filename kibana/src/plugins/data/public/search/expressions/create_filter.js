"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilter = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var getOtherBucketFilterTerms = function getOtherBucketFilterTerms(table, columnIndex, rowIndex) {
  if (rowIndex === -1) {
    return [];
  } // get only rows where cell value matches current row for all the fields before columnIndex


  var rows = table.rows.filter(function (row) {
    return table.columns.every(function (column, i) {
      return row[column.id] === table.rows[rowIndex][column.id] || i >= columnIndex;
    });
  });
  var terms = rows.map(function (row) {
    return row[table.columns[columnIndex].id];
  });
  return _toConsumableArray(new Set(terms.filter(function (term) {
    var notOther = term !== '__other__';
    var notMissing = term !== '__missing__';
    return notOther && notMissing;
  })));
};

var createFilter = function createFilter(aggConfigs, table, columnIndex, rowIndex, cellValue) {
  var column = table.columns[columnIndex];
  var aggConfig = aggConfigs[columnIndex];
  var filter = [];
  var value = rowIndex > -1 ? table.rows[rowIndex][column.id] : cellValue;

  if (value === null || value === undefined || !aggConfig.isFilterable()) {
    return;
  }

  if (aggConfig.type.name === 'terms' && aggConfig.params.otherBucket) {
    var terms = getOtherBucketFilterTerms(table, columnIndex, rowIndex);
    filter = aggConfig.createFilter(value, {
      terms: terms
    });
  } else {
    filter = aggConfig.createFilter(value);
  }

  if (!filter) {
    return;
  }

  if (!Array.isArray(filter)) {
    filter = [filter];
  }

  return filter;
};

exports.createFilter = createFilter;