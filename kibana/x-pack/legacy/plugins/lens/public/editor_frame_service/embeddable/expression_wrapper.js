"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionWrapper = ExpressionWrapper;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ExpressionWrapper(_ref) {
  var ExpressionRendererComponent = _ref.ExpressionRenderer,
      expression = _ref.expression,
      context = _ref.context;
  return _react.default.createElement(_react2.I18nProvider, null, expression === null || expression === '' ? _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column",
    alignItems: "center",
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiIcon, {
    type: "alert",
    color: "danger"
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.lens.embeddable.failure",
    defaultMessage: "Visualization couldn't be displayed"
  })))) : _react.default.createElement("div", {
    className: "lnsExpressionRenderer"
  }, _react.default.createElement(ExpressionRendererComponent, {
    className: "lnsExpressionRenderer__component",
    padding: "m",
    expression: expression,
    searchContext: _objectSpread({}, context),
    renderError: function renderError(error) {
      return _react.default.createElement("div", {
        "data-test-subj": "expression-renderer-error"
      }, error);
    }
  })));
}