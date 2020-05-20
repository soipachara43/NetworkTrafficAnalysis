"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceKqlCommasWithOr = exports.replaceKqlCommasWithOrUsingRegex = exports.replacement = void 0;

var _risonNode = require("rison-node");

var _rison_helpers = require("./rison_helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var replacement = function replacement(match, p1, p2) {
  var split = p2.split(',');
  var newQuery = split.reduce(function (accum, item, index) {
    if (index === 0) {
      return "".concat(p1, ": \"").concat(item, "\"");
    } else {
      return "".concat(accum, " or ").concat(p1, ": \"").concat(item, "\"");
    }
  }, '');
  return "(".concat(newQuery, ")");
};

exports.replacement = replacement;

var replaceKqlCommasWithOrUsingRegex = function replaceKqlCommasWithOrUsingRegex(expression) {
  var myRegexp = /([\w\.\-\[\]]+)\s*:\s*"(([\w\.\-\(\)\[\]]+,[\w\.\-\(\)\[\]]+){1,})"/g;
  return expression.replace(myRegexp, replacement);
};

exports.replaceKqlCommasWithOrUsingRegex = replaceKqlCommasWithOrUsingRegex;

var replaceKqlCommasWithOr = function replaceKqlCommasWithOr(kqlQuery) {
  var value = (0, _rison_helpers.decodeRison)(kqlQuery);

  if ((0, _rison_helpers.isRisonObject)(value)) {
    var appQuery = value;

    if ((0, _rison_helpers.isRisonObject)(appQuery)) {
      if ((0, _rison_helpers.isRegularString)(appQuery.query)) {
        appQuery.query = replaceKqlCommasWithOrUsingRegex(appQuery.query);
        return (0, _risonNode.encode)(value);
      }
    }
  }

  return kqlQuery;
};

exports.replaceKqlCommasWithOr = replaceKqlCommasWithOr;