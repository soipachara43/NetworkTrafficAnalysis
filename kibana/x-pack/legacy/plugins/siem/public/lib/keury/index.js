"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToBuildEsQuery = exports.escapeKuery = exports.isFromKueryExpressionValid = exports.escapeQueryValue = exports.convertKueryToDslFilter = exports.convertKueryToElasticSearchQuery = void 0;

var _fp = require("lodash/fp");

var _public = require("../../../../../../../src/plugins/data/public");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var convertKueryToElasticSearchQuery = function convertKueryToElasticSearchQuery(kueryExpression, indexPattern) {
  try {
    return kueryExpression ? JSON.stringify(_public.esKuery.toElasticsearchQuery(_public.esKuery.fromKueryExpression(kueryExpression), indexPattern)) : '';
  } catch (err) {
    return '';
  }
};

exports.convertKueryToElasticSearchQuery = convertKueryToElasticSearchQuery;

var convertKueryToDslFilter = function convertKueryToDslFilter(kueryExpression, indexPattern) {
  try {
    return kueryExpression ? _public.esKuery.toElasticsearchQuery(_public.esKuery.fromKueryExpression(kueryExpression), indexPattern) : {};
  } catch (err) {
    return {};
  }
};

exports.convertKueryToDslFilter = convertKueryToDslFilter;

var escapeQueryValue = function escapeQueryValue() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if ((0, _fp.isString)(val)) {
    if ((0, _fp.isEmpty)(val)) {
      return '""';
    }

    return "\"".concat(escapeKuery(val), "\"");
  }

  return val;
};

exports.escapeQueryValue = escapeQueryValue;

var isFromKueryExpressionValid = function isFromKueryExpressionValid(kqlFilterQuery) {
  if (kqlFilterQuery && kqlFilterQuery.kind === 'kuery') {
    try {
      _public.esKuery.fromKueryExpression(kqlFilterQuery.expression);
    } catch (err) {
      return false;
    }
  }

  return true;
};

exports.isFromKueryExpressionValid = isFromKueryExpressionValid;

var escapeWhitespace = function escapeWhitespace(val) {
  return val.replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/\n/g, '\\n');
}; // See the SpecialCharacter rule in kuery.peg


var escapeSpecialCharacters = function escapeSpecialCharacters(val) {
  return val.replace(/["]/g, '\\$&');
}; // $& means the whole matched string
// See the Keyword rule in kuery.peg


var escapeAndOr = function escapeAndOr(val) {
  return val.replace(/(\s+)(and|or)(\s+)/gi, '$1\\$2$3');
};

var escapeNot = function escapeNot(val) {
  return val.replace(/not(\s+)/gi, '\\$&');
};

var escapeKuery = (0, _fp.flow)(escapeSpecialCharacters, escapeAndOr, escapeNot, escapeWhitespace);
exports.escapeKuery = escapeKuery;

var convertToBuildEsQuery = function convertToBuildEsQuery(_ref) {
  var config = _ref.config,
      indexPattern = _ref.indexPattern,
      queries = _ref.queries,
      filters = _ref.filters;

  try {
    return JSON.stringify(_public.esQuery.buildEsQuery(indexPattern, queries, filters.filter(function (f) {
      return f.meta.disabled === false;
    }), _objectSpread({}, config, {
      dateFormatTZ: undefined
    })));
  } catch (exp) {
    return '';
  }
};

exports.convertToBuildEsQuery = convertToBuildEsQuery;