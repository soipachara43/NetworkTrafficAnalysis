"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "endSelector", {
  enumerable: true,
  get: function get() {
    return _selectors.endSelector;
  }
});
Object.defineProperty(exports, "fromStrSelector", {
  enumerable: true,
  get: function get() {
    return _selectors.fromStrSelector;
  }
});
Object.defineProperty(exports, "isLoadingSelector", {
  enumerable: true,
  get: function get() {
    return _selectors.isLoadingSelector;
  }
});
Object.defineProperty(exports, "kindSelector", {
  enumerable: true,
  get: function get() {
    return _selectors.kindSelector;
  }
});
Object.defineProperty(exports, "queriesSelector", {
  enumerable: true,
  get: function get() {
    return _selectors.queriesSelector;
  }
});
Object.defineProperty(exports, "startSelector", {
  enumerable: true,
  get: function get() {
    return _selectors.startSelector;
  }
});
Object.defineProperty(exports, "toStrSelector", {
  enumerable: true,
  get: function get() {
    return _selectors.toStrSelector;
  }
});
exports.savedQuerySelector = exports.filterQuerySelector = exports.getSavedQuery = exports.getFilterQuery = void 0;

var _reselect = require("reselect");

var _selectors = require("../super_date_picker/selectors");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getFilterQuery = function getFilterQuery(inputState) {
  return inputState.query;
};

exports.getFilterQuery = getFilterQuery;

var getSavedQuery = function getSavedQuery(inputState) {
  return inputState.savedQuery;
};

exports.getSavedQuery = getSavedQuery;

var filterQuerySelector = function filterQuerySelector() {
  return (0, _reselect.createSelector)(getFilterQuery, function (filterQuery) {
    return filterQuery;
  });
};

exports.filterQuerySelector = filterQuerySelector;

var savedQuerySelector = function savedQuerySelector() {
  return (0, _reselect.createSelector)(getSavedQuery, function (savedQuery) {
    return savedQuery;
  });
};

exports.savedQuerySelector = savedQuerySelector;