"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addColumn = addColumn;
exports.removeColumn = removeColumn;
exports.moveColumn = moveColumn;

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

/**
 * Helper function to provide a fallback to a single _source column if the given array of columns
 * is empty, and removes _source if there are more than 1 columns given
 * @param columns
 */
function buildColumns(columns) {
  if (columns.length > 1 && columns.indexOf('_source') !== -1) {
    return columns.filter(function (col) {
      return col !== '_source';
    });
  } else if (columns.length !== 0) {
    return columns;
  }

  return ['_source'];
}

function addColumn(columns, columnName) {
  if (columns.includes(columnName)) {
    return columns;
  }

  return buildColumns([].concat(_toConsumableArray(columns), [columnName]));
}

function removeColumn(columns, columnName) {
  if (!columns.includes(columnName)) {
    return columns;
  }

  return buildColumns(columns.filter(function (col) {
    return col !== columnName;
  }));
}

function moveColumn(columns, columnName, newIndex) {
  if (newIndex < 0 || newIndex >= columns.length || !columns.includes(columnName)) {
    return columns;
  }

  var modifiedColumns = _toConsumableArray(columns);

  modifiedColumns.splice(modifiedColumns.indexOf(columnName), 1); // remove at old index

  modifiedColumns.splice(newIndex, 0, columnName); // insert before new index

  return modifiedColumns;
}