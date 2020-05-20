"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyKueries = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Extract a map's keys to an array, then map those keys to a string per key.
 * The strings contain all of the values chosen for the given field (which is also the key value).
 * Reduce the list of query strings to a singular string, with AND operators between.
 */
var stringifyKueries = function stringifyKueries(kueries) {
  return Array.from(kueries.keys()).map(function (key) {
    var value = kueries.get(key);
    if (!value || value.length === 0) return '';
    return value.reduce(function (prev, cur, index, array) {
      var expression = "".concat(key, ":").concat(cur);

      if (typeof cur !== 'number' && (cur.indexOf(' ') >= 0 || cur.indexOf(':') >= 0)) {
        expression = "".concat(key, ":\"").concat(cur, "\"");
      }

      if (array.length === 1) {
        return expression;
      } else if (array.length > 1 && index === 0) {
        return "(".concat(expression);
      } else if (index + 1 === array.length) {
        return "".concat(prev, " or ").concat(expression, ")");
      }

      return "".concat(prev, " or ").concat(expression);
    }, '');
  }).reduce(function (prev, cur, index, array) {
    if (array.length === 1 || index === 0) {
      return cur;
    }

    return "".concat(prev, " and ").concat(cur);
  }, '');
};

exports.stringifyKueries = stringifyKueries;