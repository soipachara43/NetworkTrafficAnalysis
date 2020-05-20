"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomalyThresholdSlider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AnomalyThresholdSlider = function AnomalyThresholdSlider(_ref) {
  var _ref$describedByIds = _ref.describedByIds,
      describedByIds = _ref$describedByIds === void 0 ? [] : _ref$describedByIds,
      field = _ref.field;
  var threshold = field.value;
  var onThresholdChange = (0, _react.useCallback)(function (event) {
    var thresholdValue = Number(event.target.value);
    field.setValue(thresholdValue);
  }, [field]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: field.label,
    "data-test-subj": "anomalyThresholdSlider",
    describedByIds: describedByIds
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiRange, {
    value: threshold,
    onChange: onThresholdChange,
    fullWidth: true,
    showInput: true,
    showRange: true,
    showTicks: true,
    tickInterval: 25
  }))));
};

exports.AnomalyThresholdSlider = AnomalyThresholdSlider;