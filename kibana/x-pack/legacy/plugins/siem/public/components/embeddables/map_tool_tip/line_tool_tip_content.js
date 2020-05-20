"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineToolTipContent = exports.LineToolTipContentComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _source_destination_arrows = require("../../source_destination/source_destination_arrows");

var _map_config = require("../map_config");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FlowBadge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "FlowBadge",
  componentId: "sc-5k92bb-0"
})(["height:45px;min-width:85px;"]);
var EuiFlexGroupStyled = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "EuiFlexGroupStyled",
  componentId: "sc-5k92bb-1"
})(["margin:0 auto;"]);

var LineToolTipContentComponent = function LineToolTipContentComponent(_ref) {
  var contextId = _ref.contextId,
      featureProps = _ref.featureProps;
  var lineProps = featureProps.reduce(function (acc, f) {
    return _objectSpread({}, acc, {}, _defineProperty({}, f._propertyKey, Array.isArray(f._rawValue) ? f._rawValue : [f._rawValue]));
  }, {});
  var isSrcDest = Object.keys(lineProps).includes(_map_config.SUM_OF_SOURCE_BYTES);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(FlowBadge, {
    color: "hollow"
  }, _react.default.createElement(EuiFlexGroupStyled, {
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isSrcDest ? i18n.SOURCE : i18n.CLIENT)))), _react.default.createElement(_source_destination_arrows.SourceDestinationArrows, {
    contextId: contextId,
    destinationBytes: isSrcDest ? lineProps[_map_config.SUM_OF_DESTINATION_BYTES] : lineProps[_map_config.SUM_OF_SERVER_BYTES],
    eventId: "map-line-tooltip-".concat(contextId),
    sourceBytes: isSrcDest ? lineProps[_map_config.SUM_OF_SOURCE_BYTES] : lineProps[_map_config.SUM_OF_CLIENT_BYTES]
  }), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(FlowBadge, {
    color: "hollow"
  }, _react.default.createElement(EuiFlexGroupStyled, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isSrcDest ? i18n.DESTINATION : i18n.SERVER)))));
};

exports.LineToolTipContentComponent = LineToolTipContentComponent;
LineToolTipContentComponent.displayName = 'LineToolTipContentComponent';

var LineToolTipContent = _react.default.memo(LineToolTipContentComponent);

exports.LineToolTipContent = LineToolTipContent;
LineToolTipContent.displayName = 'LineToolTipContent';