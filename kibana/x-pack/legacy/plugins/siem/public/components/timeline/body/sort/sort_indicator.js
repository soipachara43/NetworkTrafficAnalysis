"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortIndicator = exports.getDirection = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _types = require("../../../../graphql/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SortDirectionIndicatorEnum;

(function (SortDirectionIndicatorEnum) {
  SortDirectionIndicatorEnum["SORT_UP"] = "sortUp";
  SortDirectionIndicatorEnum["SORT_DOWN"] = "sortDown";
})(SortDirectionIndicatorEnum || (SortDirectionIndicatorEnum = {}));

/** Returns the symbol that corresponds to the specified `SortDirection` */
var getDirection = function getDirection(sortDirection) {
  switch (sortDirection) {
    case _types.Direction.asc:
      return SortDirectionIndicatorEnum.SORT_UP;

    case _types.Direction.desc:
      return SortDirectionIndicatorEnum.SORT_DOWN;

    case 'none':
      return undefined;

    default:
      throw new Error('Unhandled sort direction');
  }
};

exports.getDirection = getDirection;

/** Renders a sort indicator */
var SortIndicator = _react.default.memo(function (_ref) {
  var sortDirection = _ref.sortDirection;
  return _react.default.createElement(_eui.EuiIcon, {
    "data-test-subj": "sortIndicator",
    type: getDirection(sortDirection) || 'empty'
  });
});

exports.SortIndicator = SortIndicator;
SortIndicator.displayName = 'SortIndicator';