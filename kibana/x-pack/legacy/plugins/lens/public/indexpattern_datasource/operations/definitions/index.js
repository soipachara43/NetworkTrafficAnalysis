"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "termsOperation", {
  enumerable: true,
  get: function get() {
    return _terms.termsOperation;
  }
});
Object.defineProperty(exports, "minOperation", {
  enumerable: true,
  get: function get() {
    return _metrics.minOperation;
  }
});
Object.defineProperty(exports, "averageOperation", {
  enumerable: true,
  get: function get() {
    return _metrics.averageOperation;
  }
});
Object.defineProperty(exports, "sumOperation", {
  enumerable: true,
  get: function get() {
    return _metrics.sumOperation;
  }
});
Object.defineProperty(exports, "maxOperation", {
  enumerable: true,
  get: function get() {
    return _metrics.maxOperation;
  }
});
Object.defineProperty(exports, "dateHistogramOperation", {
  enumerable: true,
  get: function get() {
    return _date_histogram.dateHistogramOperation;
  }
});
Object.defineProperty(exports, "countOperation", {
  enumerable: true,
  get: function get() {
    return _count.countOperation;
  }
});
exports.operationDefinitionMap = exports.operationDefinitions = void 0;

var _terms = require("./terms");

var _cardinality = require("./cardinality");

var _metrics = require("./metrics");

var _date_histogram = require("./date_histogram");

var _count = require("./count");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// List of all operation definitions registered to this data source.
// If you want to implement a new operation, add it to this array and
// its type will get propagated to everything else
var internalOperationDefinitions = [_terms.termsOperation, _date_histogram.dateHistogramOperation, _metrics.minOperation, _metrics.maxOperation, _metrics.averageOperation, _cardinality.cardinalityOperation, _metrics.sumOperation, _count.countOperation];

/**
 * List of all available operation definitions
 */
var operationDefinitions = internalOperationDefinitions;
/**
 * Map of all operation visible to consumers (e.g. the dimension panel).
 * This simplifies the type of the map and makes it a simple list of unspecified
 * operations definitions, because typescript can't infer the type correctly in most
 * situations.
 *
 * If you need a specifically typed version of an operation (e.g. explicitly working with terms),
 * you should import the definition directly from this file
 * (e.g. `import { termsOperation } from './operations/definitions'`). This map is
 * intended to be used in situations where the operation type is not known during compile time.
 */

exports.operationDefinitions = operationDefinitions;
var operationDefinitionMap = internalOperationDefinitions.reduce(function (definitionMap, definition) {
  return _objectSpread({}, definitionMap, _defineProperty({}, definition.type, definition));
}, {});
exports.operationDefinitionMap = operationDefinitionMap;