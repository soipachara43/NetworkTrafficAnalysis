"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenObject = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var flattenObject = function flattenObject(item, parentKey) {
  if (item) {
    var isArrayWithSingleValue = Array.isArray(item) && item.length === 1;
    return Object.keys(item).sort().reduce(function (acc, key) {
      var childKey = isArrayWithSingleValue ? '' : key;
      var currentKey = (0, _lodash.compact)([parentKey, childKey]).join('.'); // item[key] can be a primitive (string, number, boolean, null, undefined) or Object or Array

      if ((0, _lodash.isObject)(item[key])) {
        return acc.concat(flattenObject(item[key], currentKey));
      } else {
        acc.push({
          key: currentKey,
          value: item[key]
        });
        return acc;
      }
    }, []);
  }

  return [];
};

exports.flattenObject = flattenObject;