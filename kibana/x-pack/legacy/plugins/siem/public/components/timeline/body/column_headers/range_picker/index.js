"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangePicker = exports.rangePickerWidth = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ranges = require("./ranges");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var rangePickerWidth = 120; // TODO: Upgrade Eui library and use EuiSuperSelect

exports.rangePickerWidth = rangePickerWidth;

var SelectContainer = _styledComponents.default.div.withConfig({
  displayName: "SelectContainer",
  componentId: "pdiux0-0"
})(["cursor:pointer;width:", "px;"], rangePickerWidth);

SelectContainer.displayName = 'SelectContainer';
/** Renders a time range picker for the MiniMap (e.g. 1 Day, 1 Week...) */

var RangePicker = _react.default.memo(function (_ref) {
  var selected = _ref.selected,
      onRangeSelected = _ref.onRangeSelected;

  var onChange = function onChange(event) {
    onRangeSelected(event.target.value);
  };

  return _react.default.createElement(SelectContainer, null, _react.default.createElement(_eui.EuiSelect, {
    "data-test-subj": "rangePicker",
    value: selected,
    options: _ranges.Ranges.map(function (range) {
      return {
        text: range
      };
    }),
    onChange: onChange
  }));
});

exports.RangePicker = RangePicker;
RangePicker.displayName = 'RangePicker';