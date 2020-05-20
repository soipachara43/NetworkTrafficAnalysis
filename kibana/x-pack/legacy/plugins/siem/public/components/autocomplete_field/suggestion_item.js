"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionItem = void 0;

var _eui = require("@elastic/eui");

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui_styled_components = _interopRequireDefault(require("../../../../../common/eui_styled_components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  flex-direction: row;\n  height: ", ";\n  padding: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  font-size: ", ";\n  height: ", ";\n  white-space: nowrap;\n  background-color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SuggestionItem = _react.default.memo(function (_ref) {
  var _ref$isSelected = _ref.isSelected,
      isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
      onClick = _ref.onClick,
      onMouseEnter = _ref.onMouseEnter,
      suggestion = _ref.suggestion;
  return _react.default.createElement(SuggestionItemContainer, {
    isSelected: isSelected,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    "data-test-subj": "suggestion-item"
  }, _react.default.createElement(SuggestionItemIconField, {
    suggestionType: suggestion.type
  }, _react.default.createElement(_eui.EuiIcon, {
    type: getEuiIconType(suggestion.type)
  })), _react.default.createElement(SuggestionItemTextField, null, suggestion.text), _react.default.createElement(SuggestionItemDescriptionField, null, suggestion.description));
});

exports.SuggestionItem = SuggestionItem;
SuggestionItem.displayName = 'SuggestionItem';

var SuggestionItemContainer = _eui_styled_components.default.div(_templateObject(), function (props) {
  return props.theme.eui.euiFontSizeS;
}, function (props) {
  return props.theme.eui.euiSizeXL;
}, function (props) {
  return props.isSelected ? props.theme.eui.euiColorLightestShade : 'transparent';
});

SuggestionItemContainer.displayName = 'SuggestionItemContainer';

var SuggestionItemField = _eui_styled_components.default.div(_templateObject2(), function (props) {
  return props.theme.eui.euiSizeXL;
}, function (props) {
  return props.theme.eui.euiSizeXS;
});

SuggestionItemField.displayName = 'SuggestionItemField';
var SuggestionItemIconField = (0, _styledComponents.default)(SuggestionItemField).withConfig({
  displayName: "SuggestionItemIconField",
  componentId: "sc-1hhi27d-0"
})(["background-color:", ";color:", ";flex:0 0 auto;justify-content:center;width:", ";"], function (props) {
  return (0, _polished.transparentize)(0.9, getEuiIconColor(props.theme, props.suggestionType));
}, function (props) {
  return getEuiIconColor(props.theme, props.suggestionType);
}, function (props) {
  return props.theme.eui.euiSizeXL;
});
SuggestionItemIconField.displayName = 'SuggestionItemIconField';
var SuggestionItemTextField = (0, _styledComponents.default)(SuggestionItemField).withConfig({
  displayName: "SuggestionItemTextField",
  componentId: "sc-1hhi27d-1"
})(["flex:2 0 0;font-family:", ";"], function (props) {
  return props.theme.eui.euiCodeFontFamily;
});
SuggestionItemTextField.displayName = 'SuggestionItemTextField';
var SuggestionItemDescriptionField = (0, _styledComponents.default)(SuggestionItemField).withConfig({
  displayName: "SuggestionItemDescriptionField",
  componentId: "sc-1hhi27d-2"
})(["flex:3 0 0;p{display:inline;span{font-family:", ";}}"], function (props) {
  return props.theme.eui.euiCodeFontFamily;
});
SuggestionItemDescriptionField.displayName = 'SuggestionItemDescriptionField';

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
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any


var getEuiIconColor = function getEuiIconColor(theme, suggestionType) {
  switch (suggestionType) {
    case 'field':
      return theme.eui.euiColorVis7;

    case 'value':
      return theme.eui.euiColorVis0;

    case 'operator':
      return theme.eui.euiColorVis1;

    case 'conjunction':
      return theme.eui.euiColorVis2;

    case 'recentSearch':
    default:
      return theme.eui.euiColorMediumShade;
  }
};