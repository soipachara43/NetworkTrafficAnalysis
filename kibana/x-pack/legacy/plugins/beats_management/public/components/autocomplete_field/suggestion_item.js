"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionItem = void 0;

var _eui = require("@elastic/eui");

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SuggestionItem = function SuggestionItem(props) {
  var isSelected = props.isSelected,
      onClick = props.onClick,
      onMouseEnter = props.onMouseEnter,
      suggestion = props.suggestion;
  return _react.default.createElement(SuggestionItemContainer, {
    isSelected: isSelected,
    onClick: onClick,
    onMouseEnter: onMouseEnter
  }, _react.default.createElement(SuggestionItemIconField, {
    suggestionType: suggestion.type
  }, _react.default.createElement(_eui.EuiIcon, {
    type: getEuiIconType(suggestion.type)
  })), _react.default.createElement(SuggestionItemTextField, null, suggestion.text), _react.default.createElement(SuggestionItemDescriptionField, null, suggestion.description));
};

exports.SuggestionItem = SuggestionItem;
SuggestionItem.defaultProps = {
  isSelected: false
};

var SuggestionItemContainer = _styledComponents.default.div.withConfig({
  displayName: "SuggestionItemContainer",
  componentId: "c8ig1b-0"
})(["display:flex;flex-direction:row;font-size:", ";height:", ";white-space:nowrap;background-color:", ";"], function (props) {
  return props.theme.eui.default.euiFontSizeS;
}, function (props) {
  return props.theme.eui.default.euiSizeXl;
}, function (props) {
  return props.isSelected ? props.theme.eui.default.euiColorLightestShade : 'transparent';
});

var SuggestionItemField = _styledComponents.default.div.withConfig({
  displayName: "SuggestionItemField",
  componentId: "c8ig1b-1"
})(["align-items:center;cursor:pointer;display:flex;flex-direction:row;height:", ";padding:", ";"], function (props) {
  return props.theme.eui.default.euiSizeXl;
}, function (props) {
  return props.theme.eui.default.euiSizeXs;
});

var SuggestionItemIconField = (0, _styledComponents.default)(SuggestionItemField).withConfig({
  displayName: "SuggestionItemIconField",
  componentId: "c8ig1b-2"
})(["background-color:", ";color:", ";flex:0 0 auto;justify-content:center;width:", ";"], function (props) {
  return (0, _polished.tint)(0.1, getEuiIconColor(props.theme, props.suggestionType));
}, function (props) {
  return getEuiIconColor(props.theme, props.suggestionType);
}, function (props) {
  return props.theme.eui.default.euiSizeXl;
});
var SuggestionItemTextField = (0, _styledComponents.default)(SuggestionItemField).withConfig({
  displayName: "SuggestionItemTextField",
  componentId: "c8ig1b-3"
})(["flex:2 0 0;font-family:", ";"], function (props) {
  return props.theme.eui.default.euiCodeFontFamily;
});
var SuggestionItemDescriptionField = (0, _styledComponents.default)(SuggestionItemField).withConfig({
  displayName: "SuggestionItemDescriptionField",
  componentId: "c8ig1b-4"
})(["flex:3 0 0;p{display:inline;span{font-family:", ";}}"], function (props) {
  return props.theme.eui.default.euiCodeFontFamily;
});

var getEuiIconType = function getEuiIconType(suggestionType) {
  switch (suggestionType) {
    case 'field':
      return 'kqlField';

    case 'value':
      return 'kqlValue';

    case 'recentSearch':
      return 'search';

    case 'conjunction':
      return 'kqlSelector';

    case 'operator':
      return 'kqlOperand';

    default:
      return 'empty';
  }
};

var getEuiIconColor = function getEuiIconColor(theme, suggestionType) {
  switch (suggestionType) {
    case 'field':
      return theme.eui.default.euiColorVis7;

    case 'value':
      return theme.eui.default.euiColorVis0;

    case 'operator':
      return theme.eui.default.euiColorVis1;

    case 'conjunction':
      return theme.eui.default.euiColorVis2;

    case 'recentSearch':
    default:
      return theme.eui.default.euiColorMediumShade;
  }
};