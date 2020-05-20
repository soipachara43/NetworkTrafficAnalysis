"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeFilterButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UptimeFilterButton = function UptimeFilterButton(_ref) {
  var isDisabled = _ref.isDisabled,
      isSelected = _ref.isSelected,
      numFilters = _ref.numFilters,
      numActiveFilters = _ref.numActiveFilters,
      onClick = _ref.onClick,
      title = _ref.title;
  return _react.default.createElement(_eui.EuiFilterButton, {
    hasActiveFilters: numActiveFilters !== 0,
    iconType: "arrowDown",
    isDisabled: isDisabled,
    isSelected: isSelected,
    numActiveFilters: numActiveFilters,
    numFilters: numFilters,
    onClick: onClick
  }, title);
};

exports.UptimeFilterButton = UptimeFilterButton;