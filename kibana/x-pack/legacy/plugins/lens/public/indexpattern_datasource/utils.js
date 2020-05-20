"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeOperationDataType = normalizeOperationDataType;
exports.hasField = hasField;
exports.sortByField = sortByField;
exports.isDraggedField = isDraggedField;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Normalizes the specified operation type. (e.g. document operations
 * produce 'number')
 */
function normalizeOperationDataType(type) {
  return type === 'document' ? 'number' : type;
}

function hasField(column) {
  return 'sourceField' in column;
}

function sortByField(columns) {
  return _toConsumableArray(columns).sort(function (column1, column2) {
    if (hasField(column1) && hasField(column2)) {
      return column1.sourceField.localeCompare(column2.sourceField);
    }

    return column1.operationType.localeCompare(column2.operationType);
  });
}

function isDraggedField(fieldCandidate) {
  return _typeof(fieldCandidate) === 'object' && fieldCandidate !== null && 'field' in fieldCandidate && 'indexPatternId' in fieldCandidate;
}