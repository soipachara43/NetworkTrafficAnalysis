"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildHref = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Builds URLs to the designated features by extracting values from the provided
 * monitor object on a given path. Then returns the result of a provided function
 * to place the value in its rightful place on the URI string.
 * @param checks array of summary checks containing the data to extract
 * @param path the location on the object of the desired data
 * @param getHref a function that returns the full URL
 */
var buildHref = function buildHref(checks, path, getHref) {
  var queryValue = checks.map(function (check) {
    return (0, _lodash.get)(check, path, undefined);
  }).filter(function (value) {
    return value !== undefined;
  });

  if (queryValue.length === 0) {
    return getHref(undefined);
  } // @ts-ignore the values will all be defined


  return queryValue.length === 1 ? getHref(queryValue[0]) : getHref(queryValue);
};

exports.buildHref = buildHref;