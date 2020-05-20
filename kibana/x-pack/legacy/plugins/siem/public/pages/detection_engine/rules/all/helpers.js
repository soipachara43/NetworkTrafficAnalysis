"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showRulesTable = exports.bucketRulesResponse = void 0;

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
 * Separates rules/errors from bulk rules API response (create/update/delete)
 *
 * @param response BulkRuleResponse from bulk rules API
 */
var bucketRulesResponse = function bucketRulesResponse(response) {
  return response.reduce(function (acc, cv) {
    return 'error' in cv ? {
      rules: _toConsumableArray(acc.rules),
      errors: [].concat(_toConsumableArray(acc.errors), [cv])
    } : {
      rules: [].concat(_toConsumableArray(acc.rules), [cv]),
      errors: _toConsumableArray(acc.errors)
    };
  }, {
    rules: [],
    errors: []
  });
};

exports.bucketRulesResponse = bucketRulesResponse;

var showRulesTable = function showRulesTable(_ref) {
  var rulesCustomInstalled = _ref.rulesCustomInstalled,
      rulesInstalled = _ref.rulesInstalled;
  return rulesCustomInstalled != null && rulesCustomInstalled > 0 || rulesInstalled != null && rulesInstalled > 0;
};

exports.showRulesTable = showRulesTable;