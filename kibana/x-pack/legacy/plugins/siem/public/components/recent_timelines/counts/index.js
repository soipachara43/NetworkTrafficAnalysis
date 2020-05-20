"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentTimelineCounts = exports.IconWithCount = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../../open_timeline/helpers");

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
  componentId: "sc-1cop0yu-0"
})(["margin-right:8px;"]);
var FlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "FlexGroup",
  componentId: "sc-1cop0yu-1"
})(["margin-right:16px;"]);

var IconWithCount = _react.default.memo(function (_ref) {
  var count = _ref.count,
      icon = _ref.icon,
      tooltip = _ref.tooltip;
  return _react.default.createElement(_eui.EuiToolTip, {
    content: tooltip
  }, _react.default.createElement(FlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(Icon, {
    color: "subdued",
    size: "s",
    type: icon
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, count))));
});

exports.IconWithCount = IconWithCount;
IconWithCount.displayName = 'IconWithCount';

var RecentTimelineCounts = _react.default.memo(function (_ref2) {
  var timeline = _ref2.timeline;
  return _react.default.createElement("div", null, _react.default.createElement(IconWithCount, {
    count: (0, _helpers.getPinnedEventCount)(timeline),
    icon: "pinFilled",
    tooltip: i18n.PINNED_EVENTS
  }), _react.default.createElement(IconWithCount, {
    count: (0, _helpers.getNotesCount)(timeline),
    icon: "editorComment",
    tooltip: i18n.NOTES
  }));
});

exports.RecentTimelineCounts = RecentTimelineCounts;
RecentTimelineCounts.displayName = 'RecentTimelineCounts';