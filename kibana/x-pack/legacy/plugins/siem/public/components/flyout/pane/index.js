"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pane = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reResizable = require("re-resizable");

var _timeline_resize_handle = require("./timeline_resize_handle");

var _event_details_width_context = require("../../events_viewer/event_details_width_context");

var i18n = _interopRequireWildcard(require("./translations"));

var _actions = require("../../../store/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var minWidthPixels = 550; // do not allow the flyout to shrink below this width (pixels)

var maxWidthPercent = 95; // do not allow the flyout to grow past this percentage of the view

var EuiFlyoutContainer = _styledComponents.default.div.withConfig({
  displayName: "EuiFlyoutContainer",
  componentId: "tp3pa6-0"
})([".timeline-flyout{min-width:150px;width:auto;}"]);

var StyledResizable = (0, _styledComponents.default)(_reResizable.Resizable).withConfig({
  displayName: "StyledResizable",
  componentId: "tp3pa6-1"
})(["display:flex;flex-direction:column;"]);
var RESIZABLE_ENABLE = {
  left: true
};

var FlyoutPaneComponent = function FlyoutPaneComponent(_ref) {
  var children = _ref.children,
      flyoutHeight = _ref.flyoutHeight,
      onClose = _ref.onClose,
      timelineId = _ref.timelineId,
      width = _ref.width;
  var dispatch = (0, _reactRedux.useDispatch)();
  var onResizeStop = (0, _react.useCallback)(function (e, direction, ref, delta) {
    var bodyClientWidthPixels = document.body.clientWidth;

    if (delta.width) {
      dispatch(_actions.timelineActions.applyDeltaToWidth({
        bodyClientWidthPixels: bodyClientWidthPixels,
        delta: -delta.width,
        id: timelineId,
        maxWidthPercent: maxWidthPercent,
        minWidthPixels: minWidthPixels
      }));
    }
  }, [dispatch]);
  var resizableDefaultSize = (0, _react.useMemo)(function () {
    return {
      width: width,
      height: '100%'
    };
  }, []);
  var resizableHandleComponent = (0, _react.useMemo)(function () {
    return {
      left: _react.default.createElement(_timeline_resize_handle.TimelineResizeHandle, {
        "data-test-subj": "flyout-resize-handle",
        height: flyoutHeight
      })
    };
  }, [flyoutHeight]);
  return _react.default.createElement(EuiFlyoutContainer, {
    "data-test-subj": "flyout-pane"
  }, _react.default.createElement(_eui.EuiFlyout, {
    "aria-label": i18n.TIMELINE_DESCRIPTION,
    className: "timeline-flyout",
    "data-test-subj": "eui-flyout",
    hideCloseButton: true,
    onClose: onClose,
    size: "l"
  }, _react.default.createElement(StyledResizable, {
    enable: RESIZABLE_ENABLE,
    defaultSize: resizableDefaultSize,
    minWidth: minWidthPixels,
    maxWidth: "".concat(maxWidthPercent, "vw"),
    handleComponent: resizableHandleComponent,
    onResizeStop: onResizeStop
  }, _react.default.createElement(_event_details_width_context.EventDetailsWidthProvider, null, children))));
};

var Pane = _react.default.memo(FlyoutPaneComponent);

exports.Pane = Pane;
Pane.displayName = 'Pane';