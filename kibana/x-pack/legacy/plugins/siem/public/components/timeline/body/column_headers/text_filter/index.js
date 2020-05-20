"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFilter = exports.DEFAULT_PLACEHOLDER = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_PLACEHOLDER = 'Filter';
exports.DEFAULT_PLACEHOLDER = DEFAULT_PLACEHOLDER;
var FieldText = (0, _styledComponents.default)(_eui.EuiFieldText).withConfig({
  displayName: "FieldText",
  componentId: "sc-16p8knq-0"
})(["min-width:", ";"], function (props) {
  return props.minwidth;
});
FieldText.displayName = 'FieldText';
/** Renders a text-based column filter */

var TextFilter = _react.default.memo(function (_ref) {
  var columnId = _ref.columnId,
      minWidth = _ref.minWidth,
      _ref$filter = _ref.filter,
      filter = _ref$filter === void 0 ? '' : _ref$filter,
      _ref$onFilterChange = _ref.onFilterChange,
      onFilterChange = _ref$onFilterChange === void 0 ? _fp.noop : _ref$onFilterChange,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? DEFAULT_PLACEHOLDER : _ref$placeholder;

  var onChange = function onChange(event) {
    onFilterChange({
      columnId: columnId,
      filter: event.target.value
    });
  };

  return _react.default.createElement(FieldText, {
    "data-test-subj": "textFilter",
    minwidth: "".concat(minWidth, "px"),
    placeholder: placeholder,
    value: filter,
    onChange: onChange
  });
});

exports.TextFilter = TextFilter;
TextFilter.displayName = 'TextFilter';