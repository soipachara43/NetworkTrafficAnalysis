"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _reactRouterDom = require("react-router-dom");

var _uptime_date_picker = require("../components/functional/uptime_date_picker");

var _constants = require("../../common/constants");

var _connected = require("../components/connected");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PageHeader = _react.default.memo(function (_ref) {
  var headingText = _ref.headingText,
      _ref$extraLinks = _ref.extraLinks,
      extraLinks = _ref$extraLinks === void 0 ? false : _ref$extraLinks,
      _ref$datePicker = _ref.datePicker,
      datePicker = _ref$datePicker === void 0 ? true : _ref$datePicker;
  var datePickerComponent = datePicker ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_uptime_date_picker.UptimeDatePicker, null)) : null;

  var settingsLinkText = _i18n.i18n.translate('xpack.uptime.page_header.settingsLink', {
    defaultMessage: 'Settings'
  });

  var extraLinkComponents = !extraLinks ? null : _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_connected.ToggleAlertFlyoutButton, null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: _constants.SETTINGS_ROUTE
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "settings-page-link",
    iconType: "gear"
  }, settingsLinkText))));
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween",
    gutterSize: "s",
    wrap: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, headingText))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, extraLinkComponents), _react.default.createElement(_eui.EuiFlexItem, null, datePickerComponent)))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }));
});

exports.PageHeader = PageHeader;