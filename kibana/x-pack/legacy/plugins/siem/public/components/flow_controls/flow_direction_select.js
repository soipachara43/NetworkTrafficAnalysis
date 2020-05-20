"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowDirectionSelect = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _types = require("../../graphql/types");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FlowDirectionSelect = _react.default.memo(function (_ref) {
  var onChangeDirection = _ref.onChangeDirection,
      selectedDirection = _ref.selectedDirection;
  return _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiFilterButton, {
    withNext: true,
    hasActiveFilters: selectedDirection === _types.FlowDirection.uniDirectional,
    onClick: function onClick() {
      return onChangeDirection(_types.FlowDirection.uniDirectional);
    },
    "data-test-subj": _types.FlowDirection.uniDirectional
  }, i18n.UNIDIRECTIONAL), _react.default.createElement(_eui.EuiFilterButton, {
    hasActiveFilters: selectedDirection === _types.FlowDirection.biDirectional,
    onClick: function onClick() {
      return onChangeDirection(_types.FlowDirection.biDirectional);
    },
    "data-test-subj": _types.FlowDirection.biDirectional
  }, i18n.BIDIRECTIONAL));
});

exports.FlowDirectionSelect = FlowDirectionSelect;
FlowDirectionSelect.displayName = 'FlowDirectionSelect';