"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockIconContainer = exports.Facet = exports.StyledStar = exports.LabelText = exports.ButtonContainer = exports.DescriptionContainer = exports.NameField = exports.DatePicker = exports.TimelineProperties = void 0;

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var fadeInEffect = (0, _styledComponents.keyframes)(["from{opacity:0;}to{opacity:1;}"]);

var TimelineProperties = _styledComponents.default.div.withConfig({
  displayName: "TimelineProperties",
  componentId: "sc-1esg8gm-0"
})(["flex:1;align-items:center;display:flex;flex-direction:row;justify-content:space-between;user-select:none;"]);

exports.TimelineProperties = TimelineProperties;
TimelineProperties.displayName = 'TimelineProperties';
var DatePicker = (0, _styledComponents.default)(_eui.EuiFlexItem).attrs(function (_ref) {
  var width = _ref.width;
  return {
    style: {
      width: "".concat(width, "px")
    }
  };
}).withConfig({
  displayName: "DatePicker",
  componentId: "sc-1esg8gm-1"
})([".euiSuperDatePicker__flexWrapper{max-width:none;width:auto;}"]);
exports.DatePicker = DatePicker;
DatePicker.displayName = 'DatePicker';
var NameField = (0, _styledComponents.default)(_eui.EuiFieldText).withConfig({
  displayName: "NameField",
  componentId: "sc-1esg8gm-2"
})(["width:150px;margin-right:5px;"]);
exports.NameField = NameField;
NameField.displayName = 'NameField';

var DescriptionContainer = _styledComponents.default.div.withConfig({
  displayName: "DescriptionContainer",
  componentId: "sc-1esg8gm-3"
})(["animation:", " 0.3s;margin-right:5px;min-width:150px;"], fadeInEffect);

exports.DescriptionContainer = DescriptionContainer;
DescriptionContainer.displayName = 'DescriptionContainer';

var ButtonContainer = _styledComponents.default.div.withConfig({
  displayName: "ButtonContainer",
  componentId: "sc-1esg8gm-4"
})(["animation:", " ", ";"], fadeInEffect, function (_ref2) {
  var animate = _ref2.animate;
  return animate ? '0.3s' : '0s';
});

exports.ButtonContainer = ButtonContainer;
ButtonContainer.displayName = 'ButtonContainer';

var LabelText = _styledComponents.default.div.withConfig({
  displayName: "LabelText",
  componentId: "sc-1esg8gm-5"
})(["margin-left:10px;"]);

exports.LabelText = LabelText;
LabelText.displayName = 'LabelText';
var StyledStar = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "StyledStar",
  componentId: "sc-1esg8gm-6"
})(["margin-right:5px;cursor:pointer;"]);
exports.StyledStar = StyledStar;
StyledStar.displayName = 'StyledStar';

var Facet = _styledComponents.default.div.withConfig({
  displayName: "Facet",
  componentId: "sc-1esg8gm-7"
})(["align-items:center;display:inline-flex;justify-content:center;border-radius:4px;background:#e4e4e4;color:#000;font-size:12px;line-height:16px;height:20px;min-width:20px;padding-left:8px;padding-right:8px;user-select:none;"]);

exports.Facet = Facet;
Facet.displayName = 'Facet';
var LockIconContainer = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "LockIconContainer",
  componentId: "sc-1esg8gm-8"
})(["margin-right:2px;"]);
exports.LockIconContainer = LockIconContainer;
LockIconContainer.displayName = 'LockIconContainer';