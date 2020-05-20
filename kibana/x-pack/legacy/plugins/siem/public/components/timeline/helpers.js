"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATEFUL_EVENT_CSS_CLASS_NAME = exports.combineQueries = exports.buildGlobalQuery = void 0;

var _fp = require("lodash/fp");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _keury = require("../../lib/keury");

var _data_provider = require("./data_providers/data_provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var convertDateFieldToQuery = function convertDateFieldToQuery(field, value) {
  return "".concat(field, ": ").concat((0, _fp.isNumber)(value) ? value : new Date(value).valueOf());
};

var getBaseFields = (0, _memoizeOne.default)(function (browserFields) {
  var baseFields = (0, _fp.get)('base', browserFields);

  if (baseFields != null && baseFields.fields != null) {
    return Object.keys(baseFields.fields);
  }

  return [];
});

var getBrowserFieldPath = function getBrowserFieldPath(field, browserFields) {
  var splitFields = field.split('.');
  var baseFields = getBaseFields(browserFields);

  if (baseFields.includes(field)) {
    return ['base', 'fields', field];
  }

  return [splitFields[0], 'fields', field];
};

var checkIfFieldTypeIsDate = function checkIfFieldTypeIsDate(field, browserFields) {
  var pathBrowserField = getBrowserFieldPath(field, browserFields);
  var browserField = (0, _fp.get)(pathBrowserField, browserFields);

  if (browserField != null && browserField.type === 'date') {
    return true;
  }

  return false;
};

var buildQueryMatch = function buildQueryMatch(dataProvider, browserFields) {
  return "".concat(dataProvider.excluded ? 'NOT ' : '').concat(dataProvider.queryMatch.operator !== _data_provider.EXISTS_OPERATOR ? checkIfFieldTypeIsDate(dataProvider.queryMatch.field, browserFields) ? convertDateFieldToQuery(dataProvider.queryMatch.field, dataProvider.queryMatch.value) : "".concat(dataProvider.queryMatch.field, " : ").concat((0, _fp.isNumber)(dataProvider.queryMatch.value) ? dataProvider.queryMatch.value : (0, _keury.escapeQueryValue)(dataProvider.queryMatch.value)) : "".concat(dataProvider.queryMatch.field, " ").concat(_data_provider.EXISTS_OPERATOR)).trim();
};

var buildQueryForAndProvider = function buildQueryForAndProvider(dataAndProviders, browserFields) {
  return dataAndProviders.reduce(function (andQuery, andDataProvider) {
    var prepend = function prepend(q) {
      return "".concat(q !== '' ? "".concat(q, " and ") : '');
    };

    return andDataProvider.enabled ? "".concat(prepend(andQuery), " ").concat(buildQueryMatch(andDataProvider, browserFields)) : andQuery;
  }, '').trim();
};

var buildGlobalQuery = function buildGlobalQuery(dataProviders, browserFields) {
  return dataProviders.reduce(function (query, dataProvider, i) {
    var prepend = function prepend(q) {
      return "".concat(q !== '' ? "(".concat(q, ") or ") : '');
    };

    var openParen = i > 0 ? '(' : '';
    var closeParen = i > 0 ? ')' : '';
    return dataProvider.enabled ? "".concat(prepend(query)).concat(openParen).concat(buildQueryMatch(dataProvider, browserFields), "\n        ").concat(dataProvider.and.length > 0 ? " and ".concat(buildQueryForAndProvider(dataProvider.and, browserFields)) : '').concat(closeParen).trim() : query;
  }, '').trim();
};

exports.buildGlobalQuery = buildGlobalQuery;

var combineQueries = function combineQueries(_ref) {
  var config = _ref.config,
      dataProviders = _ref.dataProviders,
      indexPattern = _ref.indexPattern,
      browserFields = _ref.browserFields,
      _ref$filters = _ref.filters,
      filters = _ref$filters === void 0 ? [] : _ref$filters,
      kqlQuery = _ref.kqlQuery,
      kqlMode = _ref.kqlMode,
      start = _ref.start,
      end = _ref.end,
      isEventViewer = _ref.isEventViewer;
  var kuery = {
    query: '',
    language: kqlQuery.language
  };

  if ((0, _fp.isEmpty)(dataProviders) && (0, _fp.isEmpty)(kqlQuery.query) && (0, _fp.isEmpty)(filters) && !isEventViewer) {
    return null;
  } else if ((0, _fp.isEmpty)(dataProviders) && (0, _fp.isEmpty)(kqlQuery.query) && isEventViewer) {
    kuery.query = "@timestamp >= ".concat(start, " and @timestamp <= ").concat(end);
    return {
      filterQuery: (0, _keury.convertToBuildEsQuery)({
        config: config,
        queries: [kuery],
        indexPattern: indexPattern,
        filters: filters
      })
    };
  } else if ((0, _fp.isEmpty)(dataProviders) && (0, _fp.isEmpty)(kqlQuery.query) && !(0, _fp.isEmpty)(filters)) {
    kuery.query = "@timestamp >= ".concat(start, " and @timestamp <= ").concat(end);
    return {
      filterQuery: (0, _keury.convertToBuildEsQuery)({
        config: config,
        queries: [kuery],
        indexPattern: indexPattern,
        filters: filters
      })
    };
  } else if ((0, _fp.isEmpty)(dataProviders) && !(0, _fp.isEmpty)(kqlQuery.query)) {
    kuery.query = "(".concat(kqlQuery.query, ") and @timestamp >= ").concat(start, " and @timestamp <= ").concat(end);
    return {
      filterQuery: (0, _keury.convertToBuildEsQuery)({
        config: config,
        queries: [kuery],
        indexPattern: indexPattern,
        filters: filters
      })
    };
  } else if (!(0, _fp.isEmpty)(dataProviders) && (0, _fp.isEmpty)(kqlQuery)) {
    kuery.query = "(".concat(buildGlobalQuery(dataProviders, browserFields), ") and @timestamp >= ").concat(start, " and @timestamp <= ").concat(end);
    return {
      filterQuery: (0, _keury.convertToBuildEsQuery)({
        config: config,
        queries: [kuery],
        indexPattern: indexPattern,
        filters: filters
      })
    };
  }

  var operatorKqlQuery = kqlMode === 'filter' ? 'and' : 'or';

  var postpend = function postpend(q) {
    return "".concat(!(0, _fp.isEmpty)(q) ? " ".concat(operatorKqlQuery, " (").concat(q, ")") : '');
  };

  kuery.query = "((".concat(buildGlobalQuery(dataProviders, browserFields), ")").concat(postpend(kqlQuery.query), ") and @timestamp >= ").concat(start, " and @timestamp <= ").concat(end);
  return {
    filterQuery: (0, _keury.convertToBuildEsQuery)({
      config: config,
      queries: [kuery],
      indexPattern: indexPattern,
      filters: filters
    })
  };
};
/**
 * The CSS class name of a "stateful event", which appears in both
 * the `Timeline` and the `Events Viewer` widget
 */


exports.combineQueries = combineQueries;
var STATEFUL_EVENT_CSS_CLASS_NAME = 'event-column-view';
exports.STATEFUL_EVENT_CSS_CLASS_NAME = STATEFUL_EVENT_CSS_CLASS_NAME;