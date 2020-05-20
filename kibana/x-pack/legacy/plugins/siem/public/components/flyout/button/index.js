"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutButton = exports.READY_TO_DROP_CLASS_NAME = exports.NOT_READY_TO_DROP_CLASS_NAME = void 0;

var _eui = require("@elastic/eui");

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _droppable_wrapper = require("../../drag_and_drop/droppable_wrapper");

var _helpers = require("../../drag_and_drop/helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NOT_READY_TO_DROP_CLASS_NAME = 'not-ready-to-drop';
exports.NOT_READY_TO_DROP_CLASS_NAME = NOT_READY_TO_DROP_CLASS_NAME;
var READY_TO_DROP_CLASS_NAME = 'ready-to-drop';
exports.READY_TO_DROP_CLASS_NAME = READY_TO_DROP_CLASS_NAME;

var Container = _styledComponents.default.div.withConfig({
  displayName: "Container",
  componentId: "sc-6z02we-0"
})(["overflow-x:auto;overflow-y:hidden;padding-top:8px;position:fixed;top:40%;right:-51px;z-index:", ";transform:rotate(-90deg);user-select:none;button{border-radius:4px 4px 0 0;box-shadow:none;height:46px;margin:1px 0 1px 1px;width:136px;}.euiButton:hover:not(:disabled){transform:none;}.euiButton--primary:enabled{background:", ";box-shadow:none;}.euiButton--primary:enabled:hover,.euiButton--primary:enabled:focus{animation:none;background:", ";box-shadow:none;}.", " & .", "{color:", ";background:", " !important;border:1px solid ", ";border-bottom:none;text-decoration:none;}.", "{color:", ";background:", " !important;border:1px solid ", ";border-bottom:none;text-decoration:none;}"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiZLevel9;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiColorEmptyShade;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiColorEmptyShade;
}, _helpers.IS_DRAGGING_CLASS_NAME, NOT_READY_TO_DROP_CLASS_NAME, function (_ref4) {
  var theme = _ref4.theme;
  return theme.eui.euiColorSuccess;
}, function (_ref5) {
  var theme = _ref5.theme;
  return (0, _polished.rgba)(theme.eui.euiColorSuccess, 0.1);
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.eui.euiColorSuccess;
}, READY_TO_DROP_CLASS_NAME, function (_ref7) {
  var theme = _ref7.theme;
  return theme.eui.euiColorSuccess;
}, function (_ref8) {
  var theme = _ref8.theme;
  return (0, _polished.rgba)(theme.eui.euiColorSuccess, 0.2);
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.eui.euiColorSuccess;
});

Container.displayName = 'Container';

var BadgeButtonContainer = _styledComponents.default.div.withConfig({
  displayName: "BadgeButtonContainer",
  componentId: "sc-6z02we-1"
})(["align-items:flex-start;display:flex;flex-direction:row;"]);

BadgeButtonContainer.displayName = 'BadgeButtonContainer';

var FlyoutButton = _react.default.memo(function (_ref10) {
  var onOpen = _ref10.onOpen,
      show = _ref10.show,
      dataProviders = _ref10.dataProviders,
      timelineId = _ref10.timelineId;
  return show ? _react.default.createElement(Container, {
    onClick: onOpen
  }, _react.default.createElement(_droppable_wrapper.DroppableWrapper, {
    "data-test-subj": "flyout-droppable-wrapper",
    droppableId: "".concat(_helpers.droppableTimelineFlyoutButtonPrefix).concat(timelineId),
    render: function render(_ref11) {
      var isDraggingOver = _ref11.isDraggingOver;
      return _react.default.createElement(BadgeButtonContainer, {
        className: "flyout-overlay",
        "data-test-subj": "flyoutOverlay",
        onClick: onOpen
      }, !isDraggingOver ? _react.default.createElement(_eui.EuiButton, {
        className: NOT_READY_TO_DROP_CLASS_NAME,
        "data-test-subj": "flyout-button-not-ready-to-drop",
        fill: false,
        iconSide: "right",
        iconType: "arrowUp"
      }, i18n.FLYOUT_BUTTON) : _react.default.createElement(_eui.EuiButton, {
        className: READY_TO_DROP_CLASS_NAME,
        "data-test-subj": "flyout-button-ready-to-drop",
        fill: false
      }, _react.default.createElement(_eui.EuiIcon, {
        "data-test-subj": "flyout-button-plus-icon",
        type: "plusInCircleFilled"
      })), _react.default.createElement(_eui.EuiNotificationBadge, {
        color: "accent",
        "data-test-subj": "badge",
        style: {
          left: '-9px',
          position: 'relative',
          top: '-6px',
          transform: 'rotate(90deg)',
          visibility: dataProviders.length !== 0 ? 'inherit' : 'hidden',
          zIndex: 10
        }
      }, dataProviders.length));
    }
  })) : null;
}, function (prevProps, nextProps) {
  return prevProps.show === nextProps.show && prevProps.dataProviders === nextProps.dataProviders && prevProps.timelineId === nextProps.timelineId;
});

exports.FlyoutButton = FlyoutButton;
FlyoutButton.displayName = 'FlyoutButton';