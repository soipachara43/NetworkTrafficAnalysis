"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSortForSearchSource = getSortForSearchSource;

var _get_sort = require("./get_sort");

var _get_default_sort = require("./get_default_sort");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Prepares sort for search source, that's sending the request to ES
 * - Adds default sort if necessary
 * - Handles the special case when there's sorting by date_nanos typed fields
 *   the addon of the numeric_type guarantees the right sort order
 *   when there are indices with date and indices with date_nanos field
 */
function getSortForSearchSource(sort, indexPattern) {
  var defaultDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'desc';

  if (!sort || !indexPattern) {
    return [];
  } else if (Array.isArray(sort) && sort.length === 0) {
    sort = (0, _get_default_sort.getDefaultSort)(indexPattern, defaultDirection);
  }

  var timeFieldName = indexPattern.timeFieldName;
  return (0, _get_sort.getSort)(sort, indexPattern).map(function (sortPair) {
    if (indexPattern.isTimeNanosBased() && timeFieldName && sortPair[timeFieldName]) {
      return _defineProperty({}, timeFieldName, {
        order: sortPair[timeFieldName],
        numeric_type: 'date_nanos'
      });
    }

    return sortPair;
  });
}