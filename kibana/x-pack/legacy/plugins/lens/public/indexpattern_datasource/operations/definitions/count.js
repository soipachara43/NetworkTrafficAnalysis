"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countOperation = void 0;

var _i18n = require("@kbn/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var countLabel = _i18n.i18n.translate('xpack.lens.indexPattern.countOf', {
  defaultMessage: 'Count of records'
});

var countOperation = {
  type: 'count',
  priority: 2,
  displayName: _i18n.i18n.translate('xpack.lens.indexPattern.count', {
    defaultMessage: 'Count'
  }),
  onFieldChange: function onFieldChange(oldColumn, indexPattern, field) {
    return _objectSpread({}, oldColumn, {
      label: field.name,
      sourceField: field.name
    });
  },
  getPossibleOperationForField: function getPossibleOperationForField(field) {
    if (field.type === 'document') {
      return {
        dataType: 'number',
        isBucketed: false,
        scale: 'ratio'
      };
    }
  },
  buildColumn: function buildColumn(_ref) {
    var suggestedPriority = _ref.suggestedPriority,
        field = _ref.field,
        previousColumn = _ref.previousColumn;
    return {
      label: countLabel,
      dataType: 'number',
      operationType: 'count',
      suggestedPriority: suggestedPriority,
      isBucketed: false,
      scale: 'ratio',
      sourceField: field.name,
      params: previousColumn && previousColumn.dataType === 'number' ? previousColumn.params : undefined
    };
  },
  toEsAggsConfig: function toEsAggsConfig(column, columnId) {
    return {
      id: columnId,
      enabled: true,
      type: 'count',
      schema: 'metric',
      params: {}
    };
  },
  isTransferable: function isTransferable() {
    return true;
  }
};
exports.countOperation = countOperation;