"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterSectionsByTerm = exports.getSectionsWithRows = void 0;

var _lodash = require("lodash");

var _flattenObject = require("../../../utils/flattenObject");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSectionsWithRows = function getSectionsWithRows(sections, apmDoc) {
  return sections.map(function (section) {
    var sectionData = (0, _lodash.get)(apmDoc, section.key);
    var filteredData = section.properties ? (0, _lodash.pick)(sectionData, section.properties) : sectionData;
    var rows = (0, _flattenObject.flattenObject)(filteredData, section.key);
    return _objectSpread({}, section, {
      rows: rows
    });
  }).filter(function (_ref) {
    var required = _ref.required,
        rows = _ref.rows;
    return required || !(0, _lodash.isEmpty)(rows);
  });
};

exports.getSectionsWithRows = getSectionsWithRows;

var filterSectionsByTerm = function filterSectionsByTerm(sections, searchTerm) {
  if (!searchTerm) {
    return sections;
  }

  return sections.map(function (section) {
    var _section$rows = section.rows,
        rows = _section$rows === void 0 ? [] : _section$rows;
    var filteredRows = rows.filter(function (_ref2) {
      var key = _ref2.key,
          value = _ref2.value;
      var valueAsString = String(value).toLowerCase();
      return key.toLowerCase().includes(searchTerm) || valueAsString.includes(searchTerm);
    });
    return _objectSpread({}, section, {
      rows: filteredRows
    });
  }).filter(function (_ref3) {
    var rows = _ref3.rows;
    return !(0, _lodash.isEmpty)(rows);
  });
};

exports.filterSectionsByTerm = filterSectionsByTerm;