"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Context = Context;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _lodash = require("lodash");

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _javascript = _interopRequireDefault(require("react-syntax-highlighter/dist/languages/javascript"));

var _python = _interopRequireDefault(require("react-syntax-highlighter/dist/languages/python"));

var _ruby = _interopRequireDefault(require("react-syntax-highlighter/dist/languages/ruby"));

var _light = _interopRequireWildcard(require("react-syntax-highlighter/dist/light"));

var _styles = require("react-syntax-highlighter/dist/styles");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../style/variables");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _light.registerLanguage)('javascript', _javascript.default);
(0, _light.registerLanguage)('python', _python.default);
(0, _light.registerLanguage)('ruby', _ruby.default);

var ContextContainer = _styledComponents.default.div.withConfig({
  displayName: "ContextContainer",
  componentId: "urrc06-0"
})(["position:relative;border-radius:", ";"], _variables.borderRadius);

var LINE_HEIGHT = _variables.units.eighth * 9;

var LineHighlight = _styledComponents.default.div.withConfig({
  displayName: "LineHighlight",
  componentId: "urrc06-1"
})(["position:absolute;width:100%;height:", ";top:", ";pointer-events:none;background-color:", ";"], (0, _variables.px)(_variables.units.eighth * 9), function (props) {
  return (0, _variables.px)(props.lineNumber * LINE_HEIGHT);
}, (0, _polished.tint)(0.1, _eui_theme_light.default.euiColorWarning));

var LineNumberContainer = _styledComponents.default.div.withConfig({
  displayName: "LineNumberContainer",
  componentId: "urrc06-2"
})(["position:absolute;top:0;left:0;border-radius:", ";background:", ";"], _variables.borderRadius, function (props) {
  return props.isLibraryFrame ? _eui_theme_light.default.euiColorEmptyShade : _eui_theme_light.default.euiColorLightestShade;
});

var LineNumber = _styledComponents.default.div.withConfig({
  displayName: "LineNumber",
  componentId: "urrc06-3"
})(["position:relative;min-width:", ";padding-left:", ";padding-right:", ";color:", ";line-height:", ";text-align:right;border-right:1px solid ", ";background-color:", ";&:last-of-type{border-radius:0 0 0 ", ";}"], (0, _variables.px)(_variables.units.eighth * 21), (0, _variables.px)(_variables.units.half), (0, _variables.px)(_variables.units.quarter), _eui_theme_light.default.euiColorMediumShade, (0, _variables.px)(_variables.unit + _variables.units.eighth), _eui_theme_light.default.euiColorLightShade, function (props) {
  return props.highlight ? (0, _polished.tint)(0.1, _eui_theme_light.default.euiColorWarning) : null;
}, _variables.borderRadius);

var LineContainer = _styledComponents.default.div.withConfig({
  displayName: "LineContainer",
  componentId: "urrc06-4"
})(["overflow:auto;margin:0 0 0 ", ";padding:0;background-color:", ";&:last-of-type{border-radius:0 0 ", " 0;}"], (0, _variables.px)(_variables.units.eighth * 21), _eui_theme_light.default.euiColorEmptyShade, _variables.borderRadius);

var Line = _styledComponents.default.pre.withConfig({
  displayName: "Line",
  componentId: "urrc06-5"
})(["margin:0;color:inherit;background:inherit;border:0;border-radius:0;overflow:initial;padding:0 ", ";line-height:", ";"], (0, _variables.px)(LINE_HEIGHT), (0, _variables.px)(LINE_HEIGHT));

var Code = _styledComponents.default.code.withConfig({
  displayName: "Code",
  componentId: "urrc06-6"
})(["position:relative;padding:0;margin:0;white-space:pre;z-index:2;"]);

function getStackframeLines(stackframe) {
  var _stackframe$context, _stackframe$context2;

  var line = stackframe.line.context;
  var preLines = ((_stackframe$context = stackframe.context) === null || _stackframe$context === void 0 ? void 0 : _stackframe$context.pre) || [];
  var postLines = ((_stackframe$context2 = stackframe.context) === null || _stackframe$context2 === void 0 ? void 0 : _stackframe$context2.post) || [];
  return [].concat(_toConsumableArray(preLines), [line], _toConsumableArray(postLines));
}

function getStartLineNumber(stackframe) {
  var _stackframe$context3;

  var preLines = (0, _lodash.size)(((_stackframe$context3 = stackframe.context) === null || _stackframe$context3 === void 0 ? void 0 : _stackframe$context3.pre) || []);
  return stackframe.line.number - preLines;
}

function Context(_ref) {
  var _stackframe$context4;

  var stackframe = _ref.stackframe,
      codeLanguage = _ref.codeLanguage,
      isLibraryFrame = _ref.isLibraryFrame;
  var lines = getStackframeLines(stackframe);
  var startLineNumber = getStartLineNumber(stackframe);
  var highlightedLineIndex = (0, _lodash.size)(((_stackframe$context4 = stackframe.context) === null || _stackframe$context4 === void 0 ? void 0 : _stackframe$context4.pre) || []);
  var language = codeLanguage || 'javascript'; // TODO: Add support for more languages

  return _react.default.createElement(ContextContainer, null, _react.default.createElement(LineHighlight, {
    lineNumber: highlightedLineIndex
  }), _react.default.createElement(LineNumberContainer, {
    isLibraryFrame: isLibraryFrame
  }, lines.map(function (line, i) {
    return _react.default.createElement(LineNumber, {
      key: line + i,
      highlight: highlightedLineIndex === i
    }, i + startLineNumber, ".");
  })), _react.default.createElement(LineContainer, null, lines.map(function (line, i) {
    return _react.default.createElement(_light.default, {
      key: line + i,
      language: language,
      style: _styles.xcode,
      PreTag: Line,
      CodeTag: Code,
      customStyle: {
        padding: null,
        overflowX: null
      }
    }, line || '\n');
  })));
}