"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _text_filter = require("../text_filter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** Renders a header's filter, based on the `columnHeaderType` */
var Filter = _react.default.memo(function (_ref) {
  var header = _ref.header,
      _ref$onFilterChange = _ref.onFilterChange,
      onFilterChange = _ref$onFilterChange === void 0 ? _fp.noop : _ref$onFilterChange;

  switch (header.columnHeaderType) {
    case 'text-filter':
      return _react.default.createElement(_text_filter.TextFilter, {
        columnId: header.id,
        minWidth: header.width,
        onFilterChange: onFilterChange,
        placeholder: header.placeholder
      });

    case 'not-filtered': // fall through

    default:
      return null;
  }
});

exports.Filter = Filter;
Filter.displayName = 'Filter';