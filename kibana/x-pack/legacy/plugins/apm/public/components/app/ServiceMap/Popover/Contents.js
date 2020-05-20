"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contents = Contents;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _elasticsearch_fieldnames = require("../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _Buttons = require("./Buttons");

var _Info = require("./Info");

var _ServiceMetricFetcher = require("./ServiceMetricFetcher");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var popoverMinWidth = 280;
// IE 11 does not handle flex properties as expected. With browser detection,
// we can use regular div elements to render contents that are almost identical.
//
// This method of detecting IE is from a Stack Overflow answer:
// https://stackoverflow.com/a/21825207
//
// @ts-ignore `documentMode` is not recognized as a valid property of `document`.
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

var FlexColumnGroup = function FlexColumnGroup(props) {
  if (isIE11) {
    var direction = props.direction,
        gutterSize = props.gutterSize,
        rest = _objectWithoutProperties(props, ["direction", "gutterSize"]);

    return _react.default.createElement("div", rest);
  }

  return _react.default.createElement(_eui.EuiFlexGroup, props);
};

var FlexColumnItem = function FlexColumnItem(props) {
  return isIE11 ? _react.default.createElement("div", props) : _react.default.createElement(_eui.EuiFlexItem, props);
};

function Contents(_ref) {
  var selectedNodeData = _ref.selectedNodeData,
      isService = _ref.isService,
      label = _ref.label,
      onFocusClick = _ref.onFocusClick,
      selectedNodeServiceName = _ref.selectedNodeServiceName;
  var frameworkName = selectedNodeData[_elasticsearch_fieldnames.SERVICE_FRAMEWORK_NAME];
  return _react.default.createElement(FlexColumnGroup, {
    direction: "column",
    gutterSize: "s",
    style: {
      minWidth: popoverMinWidth
    }
  }, _react.default.createElement(FlexColumnItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("h3", null, label)), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "xs"
  })), _react.default.createElement(FlexColumnItem, null, isService ? _react.default.createElement(_ServiceMetricFetcher.ServiceMetricFetcher, {
    frameworkName: frameworkName,
    serviceName: selectedNodeServiceName
  }) : _react.default.createElement(_Info.Info, selectedNodeData)), isService && _react.default.createElement(_Buttons.Buttons, {
    onFocusClick: onFocusClick,
    selectedNodeServiceName: selectedNodeServiceName
  }));
}