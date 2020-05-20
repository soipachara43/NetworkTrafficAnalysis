"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTablePaginationOptions = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var generateTablePaginationOptions = function generateTablePaginationOptions(activePage, limit) {
  var cursorStart = activePage * limit;
  return {
    activePage: activePage,
    cursorStart: cursorStart,
    fakePossibleCount: 4 <= activePage && activePage > 0 ? limit * (activePage + 2) : limit * 5,
    querySize: limit + cursorStart
  };
};

exports.generateTablePaginationOptions = generateTablePaginationOptions;