"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * The reason for the type of syntax below of:
 * `styled(({ loading, ...props })`
 * is filter out the "loading" attribute from being put on the DOM
 * and getting one of the stack traces from
 * ```
 * ReactJS about non-standard HTML such as this one:
 * Warning: Received `true` for a non-boolean attribute `loading`.
 * If you want to write it to the DOM, pass a string instead: loading="true" or loading={value.toString()}.
 * ```
 *
 * Ref: https://github.com/styled-components/styled-components/issues/1198#issuecomment-425650423
 * Ref: https://github.com/elastic/kibana/pull/41596#issuecomment-514418978
 * Ref: https://www.styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings
 * Ref: https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html
 */
var Panel = (0, _styledComponents.default)(function (_ref) {
  var loading = _ref.loading,
      props = _objectWithoutProperties(_ref, ["loading"]);

  return _react.default.createElement(_eui.EuiPanel, props);
}).withConfig({
  displayName: "Panel",
  componentId: "sc-12yaru5-0"
})(["position:relative;", ""], function (_ref2) {
  var loading = _ref2.loading;
  return loading && "\n    overflow: hidden;\n  ";
});
exports.Panel = Panel;
Panel.displayName = 'Panel';