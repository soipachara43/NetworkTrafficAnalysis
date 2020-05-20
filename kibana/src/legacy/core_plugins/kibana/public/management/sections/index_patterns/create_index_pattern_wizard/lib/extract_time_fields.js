"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractTimeFields = extractTimeFields;

var _i18n = require("@kbn/i18n");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function extractTimeFields(fields) {
  var dateFields = fields.filter(function (field) {
    return field.type === 'date';
  });

  var label = _i18n.i18n.translate('kbn.management.createIndexPattern.stepTime.noTimeFieldsLabel', {
    defaultMessage: "The indices which match this index pattern don't contain any time fields."
  });

  if (dateFields.length === 0) {
    return [{
      display: label
    }];
  }

  var disabledDividerOption = {
    isDisabled: true,
    display: '───',
    fieldName: ''
  };

  var noTimeFieldLabel = _i18n.i18n.translate('kbn.management.createIndexPattern.stepTime.noTimeFieldOptionLabel', {
    defaultMessage: "I don't want to use the Time Filter"
  });

  var noTimeFieldOption = {
    display: noTimeFieldLabel,
    fieldName: undefined
  };
  return [].concat(_toConsumableArray(dateFields.map(function (field) {
    return {
      display: field.name,
      fieldName: field.name
    };
  })), [disabledDividerOption, noTimeFieldOption]);
}