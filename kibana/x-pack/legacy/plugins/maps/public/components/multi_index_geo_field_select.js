"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiIndexGeoFieldSelect = MultiIndexGeoFieldSelect;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OPTION_ID_DELIMITER = '/';

function createOptionId(geoField) {
  // Namespace field with indexPatterId to avoid collisions between field names
  return "".concat(geoField.indexPatternId).concat(OPTION_ID_DELIMITER).concat(geoField.geoFieldName);
}

function splitOptionId(optionId) {
  var split = optionId.split(OPTION_ID_DELIMITER);
  return {
    indexPatternId: split[0],
    geoFieldName: split[1]
  };
}

function MultiIndexGeoFieldSelect(_ref) {
  var fields = _ref.fields,
      onChange = _ref.onChange,
      selectedField = _ref.selectedField;

  function onFieldSelect(selectedOptionId) {
    var _splitOptionId = splitOptionId(selectedOptionId),
        indexPatternId = _splitOptionId.indexPatternId,
        geoFieldName = _splitOptionId.geoFieldName;

    var newSelectedField = fields.find(function (field) {
      return field.indexPatternId === indexPatternId && field.geoFieldName === geoFieldName;
    });
    onChange(newSelectedField);
  }

  var options = fields.map(function (geoField) {
    return {
      inputDisplay: _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement(_eui.EuiTextColor, {
        color: "subdued"
      }, _react.default.createElement("small", null, geoField.indexPatternTitle)), _react.default.createElement("br", null), geoField.geoFieldName),
      value: createOptionId(geoField)
    };
  });
  return _react.default.createElement(_eui.EuiFormRow, {
    className: "mapGeometryFilter__geoFieldSuperSelectWrapper",
    label: _i18n.i18n.translate('xpack.maps.multiIndexFieldSelect.fieldLabel', {
      defaultMessage: 'Filtering field'
    }),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiSuperSelect, {
    className: "mapGeometryFilter__geoFieldSuperSelect",
    options: options,
    valueOfSelected: selectedField ? createOptionId(selectedField) : '',
    onChange: onFieldSelect,
    hasDividers: true,
    fullWidth: true,
    compressed: true,
    itemClassName: "mapGeometryFilter__geoFieldItem"
  }));
}