"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapping = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

var _field_mapping = require("./field_mapping");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EuiButtonEmptyExtended = (0, _styledComponents.default)(_eui.EuiButtonEmpty).withConfig({
  displayName: "EuiButtonEmptyExtended",
  componentId: "sc-184kpjy-0"
})(["font-size:12px;height:24px;"]);

var MappingComponent = function MappingComponent(_ref) {
  var disabled = _ref.disabled,
      updateConnectorDisabled = _ref.updateConnectorDisabled,
      mapping = _ref.mapping,
      onChangeMapping = _ref.onChangeMapping,
      setEditFlyoutVisibility = _ref.setEditFlyoutVisibility;
  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h3", null, i18n.FIELD_MAPPING_TITLE),
    description: i18n.FIELD_MAPPING_DESC,
    "data-test-subj": "case-mapping-form-group"
  }, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    "data-test-subj": "case-mapping-form-row"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "euiFormLabel"
  }, _react.default.createElement(EuiButtonEmptyExtended, {
    onClick: setEditFlyoutVisibility,
    disabled: updateConnectorDisabled,
    "data-test-subj": "case-mapping-update-connector-button"
  }, i18n.UPDATE_CONNECTOR)))), _react.default.createElement(_field_mapping.FieldMapping, {
    disabled: disabled,
    mapping: mapping,
    onChangeMapping: onChangeMapping,
    "data-test-subj": "case-mapping-field"
  }));
};

var Mapping = _react.default.memo(MappingComponent);

exports.Mapping = Mapping;