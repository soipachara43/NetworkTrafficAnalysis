"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldMappingRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionTypeOptions = [{
  value: 'nothing',
  inputDisplay: _react.default.createElement(_react.default.Fragment, null, i18n.FIELD_MAPPING_EDIT_NOTHING),
  'data-test-subj': 'edit-update-option-nothing'
}, {
  value: 'overwrite',
  inputDisplay: _react.default.createElement(_react.default.Fragment, null, i18n.FIELD_MAPPING_EDIT_OVERWRITE),
  'data-test-subj': 'edit-update-option-overwrite'
}, {
  value: 'append',
  inputDisplay: _react.default.createElement(_react.default.Fragment, null, i18n.FIELD_MAPPING_EDIT_APPEND),
  'data-test-subj': 'edit-update-option-append'
}];

var FieldMappingRowComponent = function FieldMappingRowComponent(_ref) {
  var disabled = _ref.disabled,
      siemField = _ref.siemField,
      thirdPartyOptions = _ref.thirdPartyOptions,
      onChangeActionType = _ref.onChangeActionType,
      onChangeThirdParty = _ref.onChangeThirdParty,
      selectedActionType = _ref.selectedActionType,
      selectedThirdParty = _ref.selectedThirdParty;
  var siemFieldCapitalized = (0, _react.useMemo)(function () {
    return (0, _fp.capitalize)(siemField);
  }, [siemField]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    component: "span",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    component: "span",
    grow: false
  }, siemFieldCapitalized), _react.default.createElement(_eui.EuiFlexItem, {
    component: "span",
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "sortRight"
  })))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSuperSelect, {
    disabled: disabled,
    options: thirdPartyOptions,
    valueOfSelected: selectedThirdParty,
    onChange: onChangeThirdParty.bind(null, siemField),
    "data-test-subj": 'case-configure-third-party-select'
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSuperSelect, {
    disabled: disabled,
    options: actionTypeOptions,
    valueOfSelected: selectedActionType,
    onChange: onChangeActionType.bind(null, siemField),
    "data-test-subj": 'case-configure-action-type-select'
  })));
};

var FieldMappingRow = _react.default.memo(FieldMappingRowComponent);

exports.FieldMappingRow = FieldMappingRow;