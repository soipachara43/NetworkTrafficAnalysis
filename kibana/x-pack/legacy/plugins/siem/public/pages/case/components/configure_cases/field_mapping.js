"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldMapping = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _field_mapping_row = require("./field_mapping_row");

var i18n = _interopRequireWildcard(require("./translations"));

var _config = require("../../../../lib/connectors/config");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FieldRowWrapper = _styledComponents.default.div.withConfig({
  displayName: "FieldRowWrapper",
  componentId: "sc-1acbjji-0"
})(["margin-top:8px;font-size:14px;"]);

var supportedThirdPartyFields = [{
  value: 'not_mapped',
  inputDisplay: _react.default.createElement("span", null, i18n.FIELD_MAPPING_FIELD_NOT_MAPPED),
  'data-test-subj': 'third-party-field-not-mapped'
}, {
  value: 'short_description',
  inputDisplay: _react.default.createElement("span", null, i18n.FIELD_MAPPING_FIELD_SHORT_DESC),
  'data-test-subj': 'third-party-field-short-description'
}, {
  value: 'comments',
  inputDisplay: _react.default.createElement("span", null, i18n.FIELD_MAPPING_FIELD_COMMENTS),
  'data-test-subj': 'third-party-field-comments'
}, {
  value: 'description',
  inputDisplay: _react.default.createElement("span", null, i18n.FIELD_MAPPING_FIELD_DESC),
  'data-test-subj': 'third-party-field-description'
}];

var FieldMappingComponent = function FieldMappingComponent(_ref) {
  var disabled = _ref.disabled,
      mapping = _ref.mapping,
      onChangeMapping = _ref.onChangeMapping;
  var onChangeActionType = (0, _react.useCallback)(function (caseField, newActionType) {
    var myMapping = mapping !== null && mapping !== void 0 ? mapping : _config.defaultMapping;
    onChangeMapping((0, _utils.setActionTypeToMapping)(caseField, newActionType, myMapping));
  }, [mapping]);
  var onChangeThirdParty = (0, _react.useCallback)(function (caseField, newThirdPartyField) {
    var myMapping = mapping !== null && mapping !== void 0 ? mapping : _config.defaultMapping;
    onChangeMapping((0, _utils.setThirdPartyToMapping)(caseField, newThirdPartyField, myMapping));
  }, [mapping]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    "data-test-subj": "case-configure-field-mapping-cols"
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("span", {
    className: "euiFormLabel"
  }, i18n.FIELD_MAPPING_FIRST_COL)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("span", {
    className: "euiFormLabel"
  }, i18n.FIELD_MAPPING_SECOND_COL)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("span", {
    className: "euiFormLabel"
  }, i18n.FIELD_MAPPING_THIRD_COL)))), _react.default.createElement(FieldRowWrapper, {
    "data-test-subj": "case-configure-field-mapping-row-wrapper"
  }, (mapping !== null && mapping !== void 0 ? mapping : _config.defaultMapping).map(function (item) {
    var _item$target;

    return _react.default.createElement(_field_mapping_row.FieldMappingRow, {
      key: item.source,
      disabled: disabled,
      siemField: item.source,
      thirdPartyOptions: supportedThirdPartyFields,
      onChangeActionType: onChangeActionType,
      onChangeThirdParty: onChangeThirdParty,
      selectedActionType: item.actionType,
      selectedThirdParty: (_item$target = item.target) !== null && _item$target !== void 0 ? _item$target : 'not_mapped'
    });
  })));
};

var FieldMapping = _react.default.memo(FieldMappingComponent);

exports.FieldMapping = FieldMapping;