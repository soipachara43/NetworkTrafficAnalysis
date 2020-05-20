"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyPage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EmptyPrompt = (0, _styledComponents.default)(_eui.EuiEmptyPrompt).withConfig({
  displayName: "EmptyPrompt",
  componentId: "sc-1xrloaw-0"
})(["align-self:center;"]);
EmptyPrompt.displayName = 'EmptyPrompt';

var EmptyPage = _react.default.memo(function (_ref) {
  var actionPrimaryIcon = _ref.actionPrimaryIcon,
      actionPrimaryLabel = _ref.actionPrimaryLabel,
      actionPrimaryTarget = _ref.actionPrimaryTarget,
      actionPrimaryUrl = _ref.actionPrimaryUrl,
      actionSecondaryIcon = _ref.actionSecondaryIcon,
      actionSecondaryLabel = _ref.actionSecondaryLabel,
      actionSecondaryTarget = _ref.actionSecondaryTarget,
      actionSecondaryUrl = _ref.actionSecondaryUrl,
      message = _ref.message,
      title = _ref.title,
      rest = _objectWithoutProperties(_ref, ["actionPrimaryIcon", "actionPrimaryLabel", "actionPrimaryTarget", "actionPrimaryUrl", "actionSecondaryIcon", "actionSecondaryLabel", "actionSecondaryTarget", "actionSecondaryUrl", "message", "title"]);

  return _react.default.createElement(EmptyPrompt, _extends({
    iconType: "securityAnalyticsApp",
    title: _react.default.createElement("h2", null, title),
    body: message && _react.default.createElement("p", null, message),
    actions: _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      fill: true,
      href: actionPrimaryUrl,
      iconType: actionPrimaryIcon,
      target: actionPrimaryTarget
    }, actionPrimaryLabel)), actionSecondaryLabel && actionSecondaryUrl && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      href: actionSecondaryUrl,
      iconType: actionSecondaryIcon,
      target: actionSecondaryTarget
    }, actionSecondaryLabel)))
  }, rest));
});

exports.EmptyPage = EmptyPage;
EmptyPage.displayName = 'EmptyPage';