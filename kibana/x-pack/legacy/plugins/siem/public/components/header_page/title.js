"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggables = require("../draggables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StyledEuiBetaBadge = (0, _styledComponents.default)(_eui.EuiBetaBadge).withConfig({
  displayName: "StyledEuiBetaBadge",
  componentId: "sc-1eunx16-0"
})(["vertical-align:middle;"]);
StyledEuiBetaBadge.displayName = 'StyledEuiBetaBadge';
var Badge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "Badge",
  componentId: "sc-1eunx16-1"
})(["letter-spacing:0;"]);
Badge.displayName = 'Badge';

var TitleComponent = function TitleComponent(_ref) {
  var draggableArguments = _ref.draggableArguments,
      title = _ref.title,
      badgeOptions = _ref.badgeOptions;
  return _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", {
    "data-test-subj": "header-page-title"
  }, !draggableArguments ? title : _react.default.createElement(_draggables.DefaultDraggable, {
    "data-test-subj": "header-page-draggable",
    id: "header-page-draggable-".concat(draggableArguments.field, "-").concat(draggableArguments.value),
    field: draggableArguments.field,
    value: "".concat(draggableArguments.value)
  }), badgeOptions && _react.default.createElement(_react.default.Fragment, null, ' ', badgeOptions.beta ? _react.default.createElement(StyledEuiBetaBadge, {
    label: badgeOptions.text,
    tooltipContent: badgeOptions.tooltip,
    tooltipPosition: "bottom"
  }) : _react.default.createElement(Badge, {
    color: "hollow"
  }, badgeOptions.text))));
};

var Title = _react.default.memo(TitleComponent);

exports.Title = Title;