"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _and_or_badge = require("../../and_or_badge");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Text = (0, _styledComponents.default)(_eui.EuiText).withConfig({
  displayName: "Text",
  componentId: "su2p8o-0"
})(["overflow:hidden;margin:5px 0 5px 0;padding:3px;white-space:nowrap;"]);
Text.displayName = 'Text';
var BadgeHighlighted = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "BadgeHighlighted",
  componentId: "su2p8o-1"
})(["height:20px;margin:0 5px 0 5px;maxwidth:85px;minwidth:85px;"]);
BadgeHighlighted.displayName = 'BadgeHighlighted';

var HighlightedBackground = _styledComponents.default.span.withConfig({
  displayName: "HighlightedBackground",
  componentId: "su2p8o-2"
})(["background-color:", ";"], function (props) {
  return props.theme.eui.euiColorLightShade;
});

HighlightedBackground.displayName = 'HighlightedBackground';

var EmptyContainer = _styledComponents.default.div.withConfig({
  displayName: "EmptyContainer",
  componentId: "su2p8o-3"
})(["width:", ";align-items:center;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;user-select:none;align-content:center;", ""], function (props) {
  return props.showSmallMsg ? '60px' : 'auto';
}, function (props) {
  return props.showSmallMsg ? "\n      border-right: 1px solid ".concat(props.theme.eui.euiColorMediumShade, ";\n      margin-right: 10px;\n    ") : "\n  min-height: 100px;\n  + div {\n    display: none !important;\n   }\n  ";
});

EmptyContainer.displayName = 'EmptyContainer';

var NoWrap = _styledComponents.default.div.withConfig({
  displayName: "NoWrap",
  componentId: "su2p8o-4"
})(["align-items:center;display:flex;flex-direction:row;flex-wrap:no-wrap;"]);

NoWrap.displayName = 'NoWrap';

/**
 * Prompts the user to drop anything with a facet count into the data providers section.
 */
var Empty = _react.default.memo(function (_ref) {
  var _ref$showSmallMsg = _ref.showSmallMsg,
      showSmallMsg = _ref$showSmallMsg === void 0 ? false : _ref$showSmallMsg;
  return _react.default.createElement(EmptyContainer, {
    className: "timeline-drop-area-empty",
    "data-test-subj": "empty",
    showSmallMsg: showSmallMsg
  }, !showSmallMsg && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(NoWrap, null, _react.default.createElement(Text, {
    color: "subdued",
    size: "s"
  }, i18n.DROP_ANYTHING), _react.default.createElement(HighlightedBackground, null, _react.default.createElement(BadgeHighlighted, null, i18n.HIGHLIGHTED))), _react.default.createElement(NoWrap, null, _react.default.createElement(Text, {
    color: "subdued",
    size: "s"
  }, i18n.HERE_TO_BUILD_AN), _react.default.createElement(_and_or_badge.AndOrBadge, {
    type: "or"
  }), _react.default.createElement(Text, {
    color: "subdued",
    size: "s"
  }, i18n.QUERY))), showSmallMsg && _react.default.createElement(_and_or_badge.AndOrBadge, {
    type: "or"
  }));
});

exports.Empty = Empty;
Empty.displayName = 'Empty';