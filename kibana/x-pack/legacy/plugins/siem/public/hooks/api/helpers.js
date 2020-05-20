"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPatternTitleIdMapping = exports.getIndexPatternTitles = void 0;

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
 * Returns a string array of Index Pattern Titles
 *
 * @param indexPatterns IndexPatternSavedObject[] as provided from the useIndexPatterns() hook
 */
var getIndexPatternTitles = function getIndexPatternTitles(indexPatterns) {
  return indexPatterns.reduce(function (acc, v) {
    return [].concat(_toConsumableArray(acc), [v.attributes.title]);
  }, []);
};
/**
 * Returns a mapping of indexPatternTitle to indexPatternId
 *
 * @param indexPatterns IndexPatternSavedObject[] as provided from the useIndexPatterns() hook
 */


exports.getIndexPatternTitles = getIndexPatternTitles;

var getIndexPatternTitleIdMapping = function getIndexPatternTitleIdMapping(indexPatterns) {
  return indexPatterns.reduce(function (acc, v) {
    if (v.attributes && v.attributes.title) {
      return [].concat(_toConsumableArray(acc), [{
        title: v.attributes.title,
        id: v.id
      }]);
    } else {
      return acc;
    }
  }, []);
};

exports.getIndexPatternTitleIdMapping = getIndexPatternTitleIdMapping;