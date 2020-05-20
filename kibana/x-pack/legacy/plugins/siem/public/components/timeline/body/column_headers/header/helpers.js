"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSortDirection = exports.getNextSortDirection = exports.getNewSortDirectionOnClick = void 0;

var _types = require("../../../../../graphql/types");

var _helpers = require("../../../../../lib/helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** Given a `header`, returns the `SortDirection` applicable to it */
var getNewSortDirectionOnClick = function getNewSortDirectionOnClick(_ref) {
  var clickedHeader = _ref.clickedHeader,
      currentSort = _ref.currentSort;
  return clickedHeader.id === currentSort.columnId ? getNextSortDirection(currentSort) : _types.Direction.desc;
};
/** Given a current sort direction, it returns the next sort direction */


exports.getNewSortDirectionOnClick = getNewSortDirectionOnClick;

var getNextSortDirection = function getNextSortDirection(currentSort) {
  switch (currentSort.sortDirection) {
    case _types.Direction.desc:
      return _types.Direction.asc;

    case _types.Direction.asc:
      return _types.Direction.desc;

    case 'none':
      return _types.Direction.desc;

    default:
      return (0, _helpers.assertUnreachable)(currentSort.sortDirection, 'Unhandled sort direction');
  }
};

exports.getNextSortDirection = getNextSortDirection;

var getSortDirection = function getSortDirection(_ref2) {
  var header = _ref2.header,
      sort = _ref2.sort;
  return header.id === sort.columnId ? sort.sortDirection : 'none';
};

exports.getSortDirection = getSortDirection;