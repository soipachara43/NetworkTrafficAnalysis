"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardinalityOperation = void 0;

var _i18n = require("@kbn/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var supportedTypes = new Set(['string', 'boolean', 'number', 'ip', 'date']);
var SCALE = 'ratio';
var OPERATION_TYPE = 'cardinality';
var IS_BUCKETED = false;

function ofName(name) {
  return _i18n.i18n.translate('xpack.lens.indexPattern.cardinalityOf', {
    defaultMessage: 'Unique count of {name}',
    values: {
      name: name
    }
  });
}

var cardinalityOperation = {
  type: OPERATION_TYPE,
  displayName: _i18n.i18n.translate('xpack.lens.indexPattern.cardinality', {
    defaultMessage: 'Unique count'
  }),
  getPossibleOperationForField: function getPossibleOperationForField(_ref) {
    var aggregationRestrictions = _ref.aggregationRestrictions,
        aggregatable = _ref.aggregatable,
        type = _ref.type;

    if (supportedTypes.has(type) && aggregatable && (!aggregationRestrictions || aggregationRestrictions.cardinality)) {
      return {
        dataType: 'number',
        isBucketed: IS_BUCKETED,
        scale: SCALE
      };
    }
  },
  isTransferable: function isTransferable(column, newIndexPattern) {
    var newField = newIndexPattern.fields.find(function (field) {
      return field.name === column.sourceField;
    });
    return Boolean(newField && supportedTypes.has(newField.type) && newField.aggregatable && (!newField.aggregationRestrictions || newField.aggregationRestrictions.cardinality));
  },
  buildColumn: function buildColumn(_ref2) {
    var suggestedPriority = _ref2.suggestedPriority,
        field = _ref2.field,
        previousColumn = _ref2.previousColumn;
    return {
      label: ofName(field.name),
      dataType: 'number',
      operationType: OPERATION_TYPE,
      scale: SCALE,
      suggestedPriority: suggestedPriority,
      sourceField: field.name,
      isBucketed: IS_BUCKETED,
      params: previousColumn && previousColumn.dataType === 'number' ? previousColumn.params : undefined
    };
  },
  toEsAggsConfig: function toEsAggsConfig(column, columnId) {
    return {
      id: columnId,
      enabled: true,
      type: OPERATION_TYPE,
      schema: 'metric',
      params: {
        field: column.sourceField,
        missing: 0
      }
    };
  },
  onFieldChange: function onFieldChange(oldColumn, indexPattern, field) {
    return _objectSpread({}, oldColumn, {
      label: ofName(field.name),
      sourceField: field.name
    });
  }
};
exports.cardinalityOperation = cardinalityOperation;