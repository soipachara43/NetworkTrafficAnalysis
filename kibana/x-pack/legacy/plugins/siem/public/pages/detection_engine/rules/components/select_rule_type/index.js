"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectRuleType = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _ml_helpers = require("../../../../../../common/detection_engine/ml_helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MlCardDescription = function MlCardDescription(_ref) {
  var _ref$hasValidLicense = _ref.hasValidLicense,
      hasValidLicense = _ref$hasValidLicense === void 0 ? false : _ref$hasValidLicense;
  return _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, hasValidLicense ? i18n.ML_TYPE_DESCRIPTION : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.detectionEngine.createRule.stepDefineRule.ruleTypeField.mlTypeDisabledDescription",
    defaultMessage: "Access to ML requires a {subscriptionsLink}.",
    values: {
      subscriptionsLink: _react.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/subscriptions",
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.siem.components.stepDefineRule.ruleTypeField.subscriptionsLink",
        defaultMessage: "Platinum subscription"
      }))
    }
  }));
};

var SelectRuleType = function SelectRuleType(_ref2) {
  var _ref2$describedByIds = _ref2.describedByIds,
      describedByIds = _ref2$describedByIds === void 0 ? [] : _ref2$describedByIds,
      field = _ref2.field,
      _ref2$isReadOnly = _ref2.isReadOnly,
      isReadOnly = _ref2$isReadOnly === void 0 ? false : _ref2$isReadOnly,
      _ref2$hasValidLicense = _ref2.hasValidLicense,
      hasValidLicense = _ref2$hasValidLicense === void 0 ? false : _ref2$hasValidLicense,
      _ref2$isMlAdmin = _ref2.isMlAdmin,
      isMlAdmin = _ref2$isMlAdmin === void 0 ? false : _ref2$isMlAdmin;
  var ruleType = field.value;
  var setType = (0, _react.useCallback)(function (type) {
    field.setValue(type);
  }, [field]);
  var setMl = (0, _react.useCallback)(function () {
    return setType('machine_learning');
  }, [setType]);
  var setQuery = (0, _react.useCallback)(function () {
    return setType('query');
  }, [setType]);
  var mlCardDisabled = isReadOnly || !hasValidLicense || !isMlAdmin;
  return _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    "data-test-subj": "selectRuleType",
    describedByIds: describedByIds,
    label: field.label
  }, _react.default.createElement(_eui.EuiFlexGrid, {
    columns: 4
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    "data-test-subj": "customRuleType",
    title: i18n.QUERY_TYPE_TITLE,
    description: i18n.QUERY_TYPE_DESCRIPTION,
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "l",
      type: "search"
    }),
    selectable: {
      isDisabled: isReadOnly,
      onClick: setQuery,
      isSelected: !(0, _ml_helpers.isMlRule)(ruleType)
    }
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    "data-test-subj": "machineLearningRuleType",
    title: i18n.ML_TYPE_TITLE,
    description: _react.default.createElement(MlCardDescription, {
      hasValidLicense: hasValidLicense
    }),
    icon: _react.default.createElement(_eui.EuiIcon, {
      size: "l",
      type: "machineLearningApp"
    }),
    isDisabled: mlCardDisabled,
    selectable: {
      isDisabled: mlCardDisabled,
      onClick: setMl,
      isSelected: (0, _ml_helpers.isMlRule)(ruleType)
    }
  }))));
};

exports.SelectRuleType = SelectRuleType;