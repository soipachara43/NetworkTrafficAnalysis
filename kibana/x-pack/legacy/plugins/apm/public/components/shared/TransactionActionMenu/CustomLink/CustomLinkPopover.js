"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomLinkPopover = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _CustomLinkSection = require("./CustomLinkSection");

var _ManageCustomLink = require("./ManageCustomLink");

var _variables = require("../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ScrollableContainer = _styledComponents.default.div.withConfig({
  displayName: "ScrollableContainer",
  componentId: "sc-3spf5d-0"
})(["-ms-overflow-style:none;max-height:", ";overflow:scroll;"], (0, _variables.px)(535));

var CustomLinkPopover = function CustomLinkPopover(_ref) {
  var customLinks = _ref.customLinks,
      onCreateCustomLinkClick = _ref.onCreateCustomLinkClick,
      onClose = _ref.onClose,
      transaction = _ref.transaction;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPopoverTitle, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      alignItems: 'flex-start'
    }
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "text",
    size: "xs",
    onClick: onClose,
    iconType: "arrowLeft",
    style: {
      fontWeight: 'bold'
    },
    flush: "left"
  }, _i18n.i18n.translate('xpack.apm.transactionActionMenu.customLink.popover.title', {
    defaultMessage: 'CUSTOM LINKS'
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_ManageCustomLink.ManageCustomLink, {
    onCreateCustomLinkClick: onCreateCustomLinkClick
  })))), _react.default.createElement(ScrollableContainer, null, _react.default.createElement(_CustomLinkSection.CustomLinkSection, {
    customLinks: customLinks,
    transaction: transaction
  })));
};

exports.CustomLinkPopover = CustomLinkPopover;