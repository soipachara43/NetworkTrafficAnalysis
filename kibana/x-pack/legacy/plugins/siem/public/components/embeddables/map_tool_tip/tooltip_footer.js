"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolTipFooter = exports.ToolTipFooterComponent = exports.Icon = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Icon = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "Icon",
  componentId: "sc-1n9v2e1-0"
})(["margin-right:", ";"], _eui_theme_light.default.euiSizeS);
exports.Icon = Icon;
Icon.displayName = 'Icon';

var ToolTipFooterComponent = function ToolTipFooterComponent(_ref) {
  var featureIndex = _ref.featureIndex,
      totalFeatures = _ref.totalFeatures,
      previousFeature = _ref.previousFeature,
      nextFeature = _ref.nextFeature;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center",
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, i18n.MAP_TOOL_TIP_FEATURES_FOOTER(featureIndex + 1, totalFeatures))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("span", null, _react.default.createElement(_eui.EuiButtonIcon, {
    "data-test-subj": 'previous-feature-button',
    color: 'text',
    onClick: previousFeature,
    iconType: "arrowLeft",
    "aria-label": "Next",
    disabled: featureIndex <= 0
  }), _react.default.createElement(_eui.EuiButtonIcon, {
    "data-test-subj": 'next-feature-button',
    color: 'text',
    onClick: nextFeature,
    iconType: "arrowRight",
    "aria-label": "Next",
    disabled: featureIndex >= totalFeatures - 1
  })))));
};

exports.ToolTipFooterComponent = ToolTipFooterComponent;
ToolTipFooterComponent.displayName = 'ToolTipFooterComponent';

var ToolTipFooter = _react.default.memo(ToolTipFooterComponent);

exports.ToolTipFooter = ToolTipFooter;
ToolTipFooter.displayName = 'ToolTipFooter';