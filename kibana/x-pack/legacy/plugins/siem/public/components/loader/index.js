"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = void 0;

var _eui = require("@elastic/eui");

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Aside = _styledComponents.default.aside.withConfig({
  displayName: "Aside",
  componentId: "sc-1uzak2q-0"
})(["padding:", ";", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.paddingSizes.m;
}, function (_ref2) {
  var overlay = _ref2.overlay,
      overlayBackground = _ref2.overlayBackground,
      theme = _ref2.theme;
  return overlay && (0, _styledComponents.css)(["background:", ";bottom:0;left:0;position:absolute;right:0;top:0;z-index:", ";"], overlayBackground ? (0, _polished.rgba)(overlayBackground, 0.9) : (0, _polished.rgba)(theme.eui.euiColorEmptyShade, 0.9), theme.eui.euiZLevel1);
});

Aside.displayName = 'Aside';
var FlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).attrs(function () {
  return {
    alignItems: 'center',
    direction: 'column',
    gutterSize: 's',
    justifyContent: 'center'
  };
}).withConfig({
  displayName: "FlexGroup",
  componentId: "sc-1uzak2q-1"
})(["", ""], function (_ref3) {
  var overlay = _ref3.overlay;
  return overlay && (0, _styledComponents.css)(["height:100%;"]);
});
FlexGroup.displayName = 'FlexGroup';

var Loader = _react.default.memo(function (_ref4) {
  var children = _ref4.children,
      overlay = _ref4.overlay,
      overlayBackground = _ref4.overlayBackground,
      size = _ref4.size;
  return _react.default.createElement(Aside, {
    overlay: overlay,
    overlayBackground: overlayBackground
  }, _react.default.createElement(FlexGroup, {
    overlay: {
      overlay: overlay
    }
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    "data-test-subj": "loading-spinner",
    size: size
  })), children && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "s"
  }, _react.default.createElement("p", null, children)))));
});

exports.Loader = Loader;
Loader.displayName = 'Loader';