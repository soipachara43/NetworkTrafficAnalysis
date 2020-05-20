"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleStatusIcon = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _use_eui_theme = require("../../../../../lib/theme/use_eui_theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RuleStatusIconStyled = _styledComponents.default.div.withConfig({
  displayName: "RuleStatusIconStyled",
  componentId: "sc-7x2h33-0"
})(["position:relative;svg{position:absolute;top:8px;left:9px;}"]);

var RuleStatusIconComponent = function RuleStatusIconComponent(_ref) {
  var name = _ref.name,
      type = _ref.type;
  var theme = (0, _use_eui_theme.useEuiTheme)();
  var color = type === 'passive' ? theme.euiColorLightestShade : theme.euiColorPrimary;
  return _react.default.createElement(RuleStatusIconStyled, null, _react.default.createElement(_eui.EuiAvatar, {
    color: color,
    name: type === 'valid' ? '' : name,
    size: "l"
  }), type === 'valid' ? _react.default.createElement(_eui.EuiIcon, {
    type: "check",
    color: theme.euiColorEmptyShade,
    size: "l"
  }) : null);
};

var RuleStatusIcon = (0, _react.memo)(RuleStatusIconComponent);
exports.RuleStatusIcon = RuleStatusIcon;