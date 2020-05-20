"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineFiltersAndUserSearch = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var combineFiltersAndUserSearch = function combineFiltersAndUserSearch(filters, search) {
  if (!filters && !search) {
    return '';
  }

  if (!filters) return search;
  if (!search) return filters;
  return "(".concat(filters, ") and (").concat(search, ")");
};

exports.combineFiltersAndUserSearch = combineFiltersAndUserSearch;