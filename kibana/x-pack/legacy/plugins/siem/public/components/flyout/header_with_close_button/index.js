"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutHeaderWithCloseButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _header = require("../header");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FlyoutHeaderContainer = _styledComponents.default.div.withConfig({
  displayName: "FlyoutHeaderContainer",
  componentId: "sc-1uof4jz-0"
})(["align-items:center;display:flex;flex-direction:row;justify-content:space-between;width:100%;"]); // manually wrap the close button because EuiButtonIcon can't be a wrapped `styled`


var WrappedCloseButton = _styledComponents.default.div.withConfig({
  displayName: "WrappedCloseButton",
  componentId: "sc-1uof4jz-1"
})(["margin-right:5px;"]);

var FlyoutHeaderWithCloseButtonComponent = function FlyoutHeaderWithCloseButtonComponent(_ref) {
  var onClose = _ref.onClose,
      timelineId = _ref.timelineId,
      usersViewing = _ref.usersViewing;
  return _react.default.createElement(FlyoutHeaderContainer, null, _react.default.createElement(WrappedCloseButton, null, _react.default.createElement(_eui.EuiToolTip, {
    content: i18n.CLOSE_TIMELINE
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": i18n.CLOSE_TIMELINE,
    "data-test-subj": "close-timeline",
    iconType: "cross",
    onClick: onClose
  }))), _react.default.createElement(_header.FlyoutHeader, {
    timelineId: timelineId,
    usersViewing: usersViewing
  }));
};

var FlyoutHeaderWithCloseButton = _react.default.memo(FlyoutHeaderWithCloseButtonComponent);

exports.FlyoutHeaderWithCloseButton = FlyoutHeaderWithCloseButton;
FlyoutHeaderWithCloseButton.displayName = 'FlyoutHeaderWithCloseButton';