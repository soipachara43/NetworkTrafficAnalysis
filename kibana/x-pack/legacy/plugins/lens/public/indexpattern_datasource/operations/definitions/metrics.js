"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumOperation = exports.averageOperation = exports.maxOperation = exports.minOperation = void 0;

var _i18n = require("@kbn/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildMetricOperation(_ref) {
  var type = _ref.type,
      displayName = _ref.displayName,
      ofName = _ref.ofName,
      priority = _ref.priority;
  return {
    type: type,
    priority: priority,
    displayName: displayName,
    getPossibleOperationForField: function getPossibleOperationForField(_ref2) {
      var aggregationRestrictions = _ref2.aggregationRestrictions,
          aggregatable = _ref2.aggregatable,
          fieldType = _ref2.type;

      if (fieldType === 'number' && aggregatable && (!aggregationRestrictions || aggregationRestrictions[type])) {
        return {
          dataType: 'number',
          isBucketed: false,
          scale: 'ratio'
        };
      }
    },
    isTransferable: function isTransferable(column, newIndexPattern) {
      var newField = newIndexPattern.fields.find(function (field) {
        return field.name === column.sourceField;
      });
      return Boolean(newField && newField.type === 'number' && newField.aggregatable && (!newField.aggregationRestrictions || newField.aggregationRestrictions[type]));
    },
    buildColumn: function buildColumn(_ref3) {
      var suggestedPriority = _ref3.suggestedPriority,
          field = _ref3.field,
          previousColumn = _ref3.previousColumn;
      return {
        label: ofName(field.name),
        dataType: 'number',
        operationType: type,
        suggestedPriority: suggestedPriority,
        sourceField: field.name,
        isBucketed: false,
        scale: 'ratio',
        params: previousColumn && previousColumn.dataType === 'number' ? previousColumn.params : undefined
      };
    },
    onFieldChange: function onFieldChange(oldColumn, indexPattern, field) {
      return _objectSpread({}, oldColumn, {
        label: ofName(field.name),
        sourceField: field.name
      });
    },
    toEsAggsConfig: function toEsAggsConfig(column, columnId) {
      return {
        id: columnId,
        enabled: true,
        type: column.operationType,
        schema: 'metric',
        params: {
          field: column.sourceField,
          missing: 0
        }
      };
    }
  };
}

var minOperation = buildMetricOperation({
  type: 'min',
  displayName: _i18n.i18n.translate('xpack.lens.indexPattern.min', {
    defaultMessage: 'Minimum'
  }),
  ofName: function ofName(name) {
    return _i18n.i18n.translate('xpack.lens.indexPattern.minOf', {
      defaultMessage: 'Minimum of {name}',
      values: {
        name: name
      }
    });
  }
});
exports.minOperation = minOperation;
var maxOperation = buildMetricOperation({
  type: 'max',
  displayName: _i18n.i18n.translate('xpack.lens.indexPattern.max', {
    defaultMessage: 'Maximum'
  }),
  ofName: function ofName(name) {
    return _i18n.i18n.translate('xpack.lens.indexPattern.maxOf', {
      defaultMessage: 'Maximum of {name}',
      values: {
        name: name
      }
    });
  }
});
exports.maxOperation = maxOperation;
var averageOperation = buildMetricOperation({
  type: 'avg',
  priority: 2,
  displayName: _i18n.i18n.translate('xpack.lens.indexPattern.avg', {
    defaultMessage: 'Average'
  }),
  ofName: function ofName(name) {
    return _i18n.i18n.translate('xpack.lens.indexPattern.avgOf', {
      defaultMessage: 'Average of {name}',
      values: {
        name: name
      }
    });
  }
});
exports.averageOperation = averageOperation;
var sumOperation = buildMetricOperation({
  type: 'sum',
  priority: 1,
  displayName: _i18n.i18n.translate('xpack.lens.indexPattern.sum', {
    defaultMessage: 'Sum'
  }),
  ofName: function ofName(name) {
    return _i18n.i18n.translate('xpack.lens.indexPattern.sumOf', {
      defaultMessage: 'Sum of {name}',
      values: {
        name: name
      }
    });
  }
});
exports.sumOperation = sumOperation;