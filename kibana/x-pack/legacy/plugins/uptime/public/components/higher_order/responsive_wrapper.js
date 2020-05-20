"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withResponsiveWrapper = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ResponsiveWrapper = _styledComponents.default.div.withConfig({
  displayName: "ResponsiveWrapper",
  componentId: "sc-1ofyze9-0"
})(["margin-left:120px;@media (max-width:950px){margin-left:48px;}@media (max-width:767px){margin-left:12px;margin-top:40px;}"]);

/**
 * HOC that wraps a component in either a responsive div or an EuiPanel.
 * @param Component The component to wrap.
 */
var withResponsiveWrapper = function withResponsiveWrapper(Component) {
  return function (_ref) {
    var isResponsive = _ref.isResponsive,
        rest = _objectWithoutProperties(_ref, ["isResponsive"]);

    return isResponsive ? _react.default.createElement(ResponsiveWrapper, null, _react.default.createElement(Component, rest)) : _react.default.createElement(_eui.EuiPanel, {
      paddingSize: "m"
    }, _react.default.createElement(Component, rest));
  };
};

exports.withResponsiveWrapper = withResponsiveWrapper;