"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSortable = isSortable;
exports.getSort = getSort;
exports.getSortArray = getSortArray;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isSortable(fieldName, indexPattern) {
  var field = indexPattern.getFieldByName(fieldName);
  return field && field.sortable;
}

function createSortObject(sortPair, indexPattern) {
  if (Array.isArray(sortPair) && sortPair.length === 2 && isSortable(String(sortPair[0]), indexPattern)) {
    var _ref = sortPair,
        _ref2 = _slicedToArray(_ref, 2),
        field = _ref2[0],
        direction = _ref2[1];

    return _defineProperty({}, field, direction);
  } else if (_lodash.default.isPlainObject(sortPair) && isSortable(Object.keys(sortPair)[0], indexPattern)) {
    return sortPair;
  }
}
/**
 * Take a sorting array and make it into an object
 * @param {array} sort two dimensional array [[fieldToSort, directionToSort]]
 *  or an array of objects [{fieldToSort: directionToSort}]
 * @param {object} indexPattern used for determining default sort
 * @returns Array<{object}> an array of sort objects
 */


function getSort(sort, indexPattern) {
  if (Array.isArray(sort)) {
    return sort.map(function (sortPair) {
      return createSortObject(sortPair, indexPattern);
    }).filter(function (sortPairObj) {
      return _typeof(sortPairObj) === 'object';
    });
  }

  return [];
}
/**
 * compared to getSort it doesn't return an array of objects, it returns an array of arrays
 * [[fieldToSort: directionToSort]]
 */


function getSortArray(sort, indexPattern) {
  return getSort(sort, indexPattern).map(function (sortPair) {
    return Object.entries(sortPair).pop();
  });
}