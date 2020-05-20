"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartPlaceHolder = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _common = require("./common");

var i18n = _interopRequireWildcard(require("./translation"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FlexGroup",
  componentId: "sc-133tipc-0"
})(["height:", ";width:", ";position:relative;margin:0;"], function (_ref) {
  var height = _ref.height;
  return height ? height : '100%';
}, function (_ref2) {
  var width = _ref2.width;
  return width ? width : '100%';
});
FlexGroup.displayName = 'FlexGroup';

var ChartPlaceHolder = function ChartPlaceHolder(_ref3) {
  var _ref3$height = _ref3.height,
      height = _ref3$height === void 0 ? '100%' : _ref3$height,
      _ref3$width = _ref3.width,
      width = _ref3$width === void 0 ? '100%' : _ref3$width,
      data = _ref3.data;
  return _react.default.createElement(FlexGroup, {
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    textAlign: "center",
    color: "subdued",
    "data-test-subj": "chartHolderText"
  }, (0, _common.checkIfAllValuesAreZero)(data) ? i18n.ALL_VALUES_ZEROS_TITLE : i18n.DATA_NOT_AVAILABLE_TITLE)));
};

exports.ChartPlaceHolder = ChartPlaceHolder;