"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExcludedFromSelection = exports.getQueryOperatorFromSelection = exports.selectionsAreValid = exports.getCategorizedFieldNames = exports.getFieldNames = exports.operatorLabels = void 0;

var _fp = require("lodash/fp");

var _source = require("../../containers/source");

var _data_provider = require("../timeline/data_providers/data_provider");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** The list of operators to display in the `Operator` select  */
var operatorLabels = [{
  label: i18n.IS
}, {
  label: i18n.IS_NOT
}, {
  label: i18n.EXISTS
}, {
  label: i18n.DOES_NOT_EXIST
}];
/** Returns the names of fields in a category */

exports.operatorLabels = operatorLabels;

var getFieldNames = function getFieldNames(category) {
  return category.fields != null && Object.keys(category.fields).length > 0 ? Object.keys(category.fields) : [];
};
/** Returns all field names by category, for display in an `EuiComboBox`  */


exports.getFieldNames = getFieldNames;

var getCategorizedFieldNames = function getCategorizedFieldNames(browserFields) {
  return Object.keys(browserFields).sort().map(function (categoryId) {
    return {
      label: categoryId,
      options: getFieldNames(browserFields[categoryId]).map(function (fieldId) {
        return {
          label: fieldId
        };
      })
    };
  });
};
/** Returns true if the specified field name is valid */


exports.getCategorizedFieldNames = getCategorizedFieldNames;

var selectionsAreValid = function selectionsAreValid(_ref) {
  var browserFields = _ref.browserFields,
      selectedField = _ref.selectedField,
      selectedOperator = _ref.selectedOperator;
  var fieldId = selectedField.length > 0 ? selectedField[0].label : '';
  var operator = selectedOperator.length > 0 ? selectedOperator[0].label : '';
  var fieldIsValid = (0, _source.getAllFieldsByName)(browserFields)[fieldId] != null;
  var operatorIsValid = (0, _fp.findIndex)(function (o) {
    return o.label === operator;
  }, operatorLabels) !== -1;
  return fieldIsValid && operatorIsValid;
};
/** Returns a `QueryOperator` based on the user's Operator selection */


exports.selectionsAreValid = selectionsAreValid;

var getQueryOperatorFromSelection = function getQueryOperatorFromSelection(selectedOperator) {
  var selection = selectedOperator.length > 0 ? selectedOperator[0].label : '';

  switch (selection) {
    case i18n.IS: // fall through

    case i18n.IS_NOT:
      return _data_provider.IS_OPERATOR;

    case i18n.EXISTS: // fall through

    case i18n.DOES_NOT_EXIST:
      return _data_provider.EXISTS_OPERATOR;

    default:
      return _data_provider.IS_OPERATOR;
  }
};
/**
 * Returns `true` when the search excludes results that match the specified data provider
 */


exports.getQueryOperatorFromSelection = getQueryOperatorFromSelection;

var getExcludedFromSelection = function getExcludedFromSelection(selectedOperator) {
  var selection = selectedOperator.length > 0 ? selectedOperator[0].label : '';

  switch (selection) {
    case i18n.IS_NOT: // fall through

    case i18n.DOES_NOT_EXIST:
      return true;

    default:
      return false;
  }
};

exports.getExcludedFromSelection = getExcludedFromSelection;