"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getField = getField;
exports.addFieldToDSL = addFieldToDSL;
exports.extractPropertiesFromBucket = extractPropertiesFromBucket;

var _i18n = require("@kbn/i18n");

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getField(indexPattern, fieldName) {
  var field = indexPattern.fields.getByName(fieldName);

  if (!field) {
    throw new Error(_i18n.i18n.translate('xpack.maps.source.esSearch.fieldNotFoundMsg', {
      defaultMessage: "Unable to find '{fieldName}' in index-pattern '{indexPatternTitle}'.",
      values: {
        fieldName: fieldName,
        indexPatternTitle: indexPattern.title
      }
    }));
  }

  return field;
}

function addFieldToDSL(dsl, field) {
  return !field.scripted ? _objectSpread({}, dsl, {
    field: field.name
  }) : _objectSpread({}, dsl, {
    script: {
      source: field.script,
      lang: field.lang
    }
  });
}

function extractPropertiesFromBucket(bucket) {
  var ignoreKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var properties = {};

  for (var key in bucket) {
    if (ignoreKeys.includes(key) || !bucket.hasOwnProperty(key)) {
      continue;
    }

    if (_lodash.default.has(bucket[key], 'value')) {
      properties[key] = bucket[key].value;
    } else if (_lodash.default.has(bucket[key], 'buckets')) {
      if (bucket[key].buckets.length === 0) {
        // No top term
        continue;
      }

      properties[key] = _lodash.default.get(bucket[key], 'buckets[0].key');
      var topBucketCount = bucket[key].buckets[0].doc_count;
      var totalCount = bucket.doc_count;

      if (totalCount && topBucketCount) {
        properties["".concat(key).concat(_constants.TOP_TERM_PERCENTAGE_SUFFIX)] = Math.round(topBucketCount / totalCount * 100);
      }
    } else {
      properties[key] = bucket[key];
    }
  }

  return properties;
}