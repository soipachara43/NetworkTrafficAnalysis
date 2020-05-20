"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProviderBadge = void 0;

var _eui = require("@elastic/eui");

var _classnames = _interopRequireDefault(require("classnames"));

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _empty_value = require("../../empty_value");

var _data_provider = require("./data_provider");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ProviderBadgeStyled = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "ProviderBadgeStyled",
  componentId: "ookgsb-0"
})([".euiToolTipAnchor{&::after{font-style:normal;content:'|';padding:0px 3px;}}&.globalFilterItem{white-space:nowrap;&.globalFilterItem-isDisabled{text-decoration:line-through;font-weight:400;font-style:italic;}}.euiBadge.euiBadge--iconLeft &.euiBadge.euiBadge--iconRight .euiBadge__content{flex-direction:row;}.euiBadge.euiBadge--iconLeft &.euiBadge.euiBadge--iconRight .euiBadge__content .euiBadge__iconButton{margin-right:0;margin-left:4px;}"]);
ProviderBadgeStyled.displayName = 'ProviderBadgeStyled';

var ProviderBadge = _react.default.memo(function (_ref) {
  var deleteProvider = _ref.deleteProvider,
      field = _ref.field,
      isEnabled = _ref.isEnabled,
      isExcluded = _ref.isExcluded,
      operator = _ref.operator,
      providerId = _ref.providerId,
      togglePopover = _ref.togglePopover,
      val = _ref.val;

  var deleteFilter = function deleteFilter(event) {
    // Make sure it doesn't also trigger the onclick for the whole badge
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    deleteProvider();
  };

  var classes = (0, _classnames.default)('globalFilterItem', {
    'globalFilterItem-isDisabled': !isEnabled,
    'globalFilterItem-isExcluded': isExcluded
  });
  var formattedValue = (0, _fp.isString)(val) && val === '' ? (0, _empty_value.getEmptyString)() : val;
  var prefix = isExcluded ? _react.default.createElement("span", null, i18n.NOT, " ") : null;
  var title = "".concat(field, ": \"").concat(formattedValue, "\"");
  return _react.default.createElement(ProviderBadgeStyled, {
    id: "".concat(providerId, "-").concat(field, "-").concat(val),
    className: classes,
    color: "hollow",
    title: title,
    iconOnClick: deleteFilter,
    iconOnClickAriaLabel: i18n.REMOVE_DATA_PROVIDER,
    iconType: "cross",
    iconSide: "right",
    onClick: togglePopover,
    onClickAriaLabel: "".concat(i18n.SHOW_OPTIONS_DATA_PROVIDER, " ").concat(formattedValue),
    closeButtonProps: {
      // Removing tab focus on close button because the same option can be obtained through the context menu
      // TODO: add a `DEL` keyboard press functionality
      tabIndex: -1
    },
    "data-test-subj": "providerBadge"
  }, prefix, operator !== _data_provider.EXISTS_OPERATOR ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", {
    className: "field-value"
  }, "".concat(field, ": ")), _react.default.createElement("span", {
    className: "field-value"
  }, "\"".concat(formattedValue, "\""))) : _react.default.createElement("span", {
    className: "field-value"
  }, field, " ", i18n.EXISTS_LABEL));
});

exports.ProviderBadge = ProviderBadge;
ProviderBadge.displayName = 'ProviderBadge';