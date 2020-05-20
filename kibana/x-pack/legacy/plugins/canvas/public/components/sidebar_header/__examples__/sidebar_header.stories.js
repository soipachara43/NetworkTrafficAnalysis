"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _sidebar_header = require("../sidebar_header");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var handlers = {
  cloneNodes: (0, _addonActions.action)('cloneNodes'),
  copyNodes: (0, _addonActions.action)('copyNodes'),
  cutNodes: (0, _addonActions.action)('cutNodes'),
  pasteNodes: (0, _addonActions.action)('pasteNodes'),
  deleteNodes: (0, _addonActions.action)('deleteNodes'),
  bringToFront: (0, _addonActions.action)('bringToFront'),
  bringForward: (0, _addonActions.action)('bringForward'),
  sendBackward: (0, _addonActions.action)('sendBackward'),
  sendToBack: (0, _addonActions.action)('sendToBack'),
  createCustomElement: (0, _addonActions.action)('createCustomElement'),
  groupNodes: (0, _addonActions.action)('groupNodes'),
  ungroupNodes: (0, _addonActions.action)('ungroupNodes'),
  alignLeft: (0, _addonActions.action)('alignLeft'),
  alignMiddle: (0, _addonActions.action)('alignMiddle'),
  alignRight: (0, _addonActions.action)('alignRight'),
  alignTop: (0, _addonActions.action)('alignTop'),
  alignCenter: (0, _addonActions.action)('alignCenter'),
  alignBottom: (0, _addonActions.action)('alignBottom'),
  distributeHorizontally: (0, _addonActions.action)('distributeHorizontally'),
  distributeVertically: (0, _addonActions.action)('distributeVertically')
};
(0, _react2.storiesOf)('components/Sidebar/SidebarHeader', module).addDecorator(function (story) {
  return _react.default.createElement("div", {
    style: {
      width: '300px'
    }
  }, story());
}).add('default', function () {
  return _react.default.createElement(_sidebar_header.SidebarHeader, _extends({
    title: "Selected layer"
  }, handlers));
}).add('without layer controls', function () {
  return _react.default.createElement(_sidebar_header.SidebarHeader, _extends({
    title: "Grouped element",
    showLayerControls: false
  }, handlers));
});