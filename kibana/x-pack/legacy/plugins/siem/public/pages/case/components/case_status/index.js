"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseStatus = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("../case_view/translations"));

var _formatted_date = require("../../../../components/formatted_date");

var _actions = require("../case_view/actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MyDescriptionList = (0, _styledComponents.default)(_eui.EuiDescriptionList).withConfig({
  displayName: "MyDescriptionList",
  componentId: "sc-1ssz9ln-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["&{padding-right:", ";border-right:", ";}"], theme.eui.euiSizeL, theme.eui.euiBorderThin);
});

var CaseStatusComp = function CaseStatusComp(_ref2) {
  var dataTestSubj = _ref2['data-test-subj'],
      badgeColor = _ref2.badgeColor,
      buttonLabel = _ref2.buttonLabel,
      caseData = _ref2.caseData,
      _ref2$disabled = _ref2.disabled,
      disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
      icon = _ref2.icon,
      isLoading = _ref2.isLoading,
      isSelected = _ref2.isSelected,
      onRefresh = _ref2.onRefresh,
      status = _ref2.status,
      title = _ref2.title,
      toggleStatusCase = _ref2.toggleStatusCase,
      value = _ref2.value;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l",
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(MyDescriptionList, {
    compressed: true
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, i18n.STATUS), _react.default.createElement(_eui.EuiDescriptionListDescription, null, _react.default.createElement(_eui.EuiBadge, {
    color: badgeColor,
    "data-test-subj": "case-view-status"
  }, status))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionListTitle, null, title), _react.default.createElement(_eui.EuiDescriptionListDescription, null, _react.default.createElement(_formatted_date.FormattedRelativePreferenceDate, {
    "data-test-subj": dataTestSubj,
    value: value
  })))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "refresh",
    onClick: onRefresh
  }, i18n.CASE_REFRESH)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonToggle, {
    "data-test-subj": "toggle-case-status",
    isDisabled: disabled,
    iconType: icon,
    isLoading: isLoading,
    isSelected: isSelected,
    label: buttonLabel,
    onChange: toggleStatusCase
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_actions.CaseViewActions, {
    caseData: caseData,
    disabled: disabled
  })))));
};

var CaseStatus = _react.default.memo(CaseStatusComp);

exports.CaseStatus = CaseStatus;