"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connectors = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _connectors_dropdown = require("./connectors_dropdown");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EuiFormRowExtended = (0, _styledComponents.default)(_eui.EuiFormRow).withConfig({
  displayName: "EuiFormRowExtended",
  componentId: "sc-4a1q8h-0"
})([".euiFormRow__labelWrapper{.euiFormRow__label{width:100%;}}"]);

var ConnectorsComponent = function ConnectorsComponent(_ref) {
  var connectors = _ref.connectors,
      disabled = _ref.disabled,
      isLoading = _ref.isLoading,
      onChangeConnector = _ref.onChangeConnector,
      selectedConnector = _ref.selectedConnector,
      handleShowAddFlyout = _ref.handleShowAddFlyout;

  var dropDownLabel = _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, i18n.INCIDENT_MANAGEMENT_SYSTEM_LABEL), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLink, {
    disabled: disabled,
    onClick: handleShowAddFlyout,
    "data-test-subj": "case-configure-add-connector-button"
  }, i18n.ADD_NEW_CONNECTOR)));

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h3", null, i18n.INCIDENT_MANAGEMENT_SYSTEM_TITLE),
    description: i18n.INCIDENT_MANAGEMENT_SYSTEM_DESC,
    "data-test-subj": "case-connectors-form-group"
  }, _react.default.createElement(EuiFormRowExtended, {
    fullWidth: true,
    label: dropDownLabel,
    "data-test-subj": "case-connectors-form-row"
  }, _react.default.createElement(_connectors_dropdown.ConnectorsDropdown, {
    connectors: connectors,
    disabled: disabled,
    selectedConnector: selectedConnector,
    isLoading: isLoading,
    onChange: onChangeConnector,
    "data-test-subj": "case-connectors-dropdown"
  }))));
};

var Connectors = _react.default.memo(ConnectorsComponent);

exports.Connectors = Connectors;