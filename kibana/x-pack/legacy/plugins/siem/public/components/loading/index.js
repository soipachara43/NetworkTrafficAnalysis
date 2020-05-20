"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingStaticContentPanel = exports.LoadingStaticPanel = exports.LoadingPanel = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SpinnerFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "SpinnerFlexItem",
  componentId: "sc-14n4t96-0"
})(["margin-right:5px;"]);
SpinnerFlexItem.displayName = 'SpinnerFlexItem';

var LoadingPanel = _react.default.memo(function (_ref) {
  var _ref$height = _ref.height,
      height = _ref$height === void 0 ? 'auto' : _ref$height,
      _ref$showBorder = _ref.showBorder,
      showBorder = _ref$showBorder === void 0 ? true : _ref$showBorder,
      text = _ref.text,
      width = _ref.width,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'relative' : _ref$position,
      _ref$zIndex = _ref.zIndex,
      zIndex = _ref$zIndex === void 0 ? 'inherit' : _ref$zIndex;
  return _react.default.createElement(LoadingStaticPanel, {
    className: "app-loading",
    height: height,
    width: width,
    position: position,
    zIndex: zIndex
  }, _react.default.createElement(LoadingStaticContentPanel, null, _react.default.createElement(_eui.EuiPanel, {
    className: showBorder ? '' : 'euiPanel-loading-hide-border'
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    direction: "row",
    gutterSize: "none"
  }, _react.default.createElement(SpinnerFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, null, text))))));
});

exports.LoadingPanel = LoadingPanel;
LoadingPanel.displayName = 'LoadingPanel';

var LoadingStaticPanel = _styledComponents.default.div.withConfig({
  displayName: "LoadingStaticPanel",
  componentId: "sc-14n4t96-1"
})(["height:", ";position:", ";width:", ";overflow:hidden;display:flex;flex-direction:column;justify-content:center;z-index:", ";"], function (_ref2) {
  var height = _ref2.height;
  return height;
}, function (_ref3) {
  var position = _ref3.position;
  return position;
}, function (_ref4) {
  var width = _ref4.width;
  return width;
}, function (_ref5) {
  var zIndex = _ref5.zIndex;
  return zIndex;
});

exports.LoadingStaticPanel = LoadingStaticPanel;
LoadingStaticPanel.displayName = 'LoadingStaticPanel';

var LoadingStaticContentPanel = _styledComponents.default.div.withConfig({
  displayName: "LoadingStaticContentPanel",
  componentId: "sc-14n4t96-2"
})(["flex:0 0 auto;align-self:center;text-align:center;height:fit-content;.euiPanel.euiPanel--paddingMedium{padding:10px;}"]);

exports.LoadingStaticContentPanel = LoadingStaticContentPanel;
LoadingStaticContentPanel.displayName = 'LoadingStaticContentPanel';