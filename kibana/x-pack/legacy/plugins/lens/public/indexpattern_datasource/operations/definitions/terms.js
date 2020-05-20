"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.termsOperation = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _state_helpers = require("../../state_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Add ticks to EuiRange component props
var FixedEuiRange = _eui.EuiRange;

function ofName(name) {
  return _i18n.i18n.translate('xpack.lens.indexPattern.termsOf', {
    defaultMessage: 'Top values of {name}',
    values: {
      name: name
    }
  });
}

function isSortableByColumn(column) {
  return !column.isBucketed;
}

var DEFAULT_SIZE = 3;
var supportedTypes = new Set(['string', 'boolean', 'number', 'ip']);
var termsOperation = {
  type: 'terms',
  displayName: _i18n.i18n.translate('xpack.lens.indexPattern.terms', {
    defaultMessage: 'Top values'
  }),
  getPossibleOperationForField: function getPossibleOperationForField(_ref) {
    var aggregationRestrictions = _ref.aggregationRestrictions,
        aggregatable = _ref.aggregatable,
        type = _ref.type;

    if (supportedTypes.has(type) && aggregatable && (!aggregationRestrictions || aggregationRestrictions.terms)) {
      return {
        dataType: type,
        isBucketed: true,
        scale: 'ordinal'
      };
    }
  },
  isTransferable: function isTransferable(column, newIndexPattern) {
    var newField = newIndexPattern.fields.find(function (field) {
      return field.name === column.sourceField;
    });
    return Boolean(newField && supportedTypes.has(newField.type) && newField.aggregatable && (!newField.aggregationRestrictions || newField.aggregationRestrictions.terms));
  },
  buildColumn: function buildColumn(_ref2) {
    var suggestedPriority = _ref2.suggestedPriority,
        columns = _ref2.columns,
        field = _ref2.field;
    var existingMetricColumn = Object.entries(columns).filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          _columnId = _ref4[0],
          column = _ref4[1];

      return column && isSortableByColumn(column);
    }).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          id = _ref6[0];

      return id;
    })[0];
    return {
      label: ofName(field.name),
      dataType: field.type,
      operationType: 'terms',
      scale: 'ordinal',
      suggestedPriority: suggestedPriority,
      sourceField: field.name,
      isBucketed: true,
      params: {
        size: DEFAULT_SIZE,
        orderBy: existingMetricColumn ? {
          type: 'column',
          columnId: existingMetricColumn
        } : {
          type: 'alphabetical'
        },
        orderDirection: existingMetricColumn ? 'desc' : 'asc'
      }
    };
  },
  toEsAggsConfig: function toEsAggsConfig(column, columnId) {
    return {
      id: columnId,
      enabled: true,
      type: 'terms',
      schema: 'segment',
      params: {
        field: column.sourceField,
        orderBy: column.params.orderBy.type === 'alphabetical' ? '_key' : column.params.orderBy.columnId,
        order: column.params.orderDirection,
        size: column.params.size,
        otherBucket: false,
        otherBucketLabel: 'Other',
        missingBucket: false,
        missingBucketLabel: 'Missing'
      }
    };
  },
  onFieldChange: function onFieldChange(oldColumn, indexPattern, field) {
    return _objectSpread({}, oldColumn, {
      label: ofName(field.name),
      sourceField: field.name
    });
  },
  onOtherColumnChanged: function onOtherColumnChanged(currentColumn, columns) {
    if (currentColumn.params.orderBy.type === 'column') {
      // check whether the column is still there and still a metric
      var columnSortedBy = columns[currentColumn.params.orderBy.columnId];

      if (!columnSortedBy || !isSortableByColumn(columnSortedBy)) {
        return _objectSpread({}, currentColumn, {
          params: _objectSpread({}, currentColumn.params, {
            orderBy: {
              type: 'alphabetical'
            },
            orderDirection: 'asc'
          })
        });
      }
    }

    return currentColumn;
  },
  paramEditor: function paramEditor(_ref7) {
    var state = _ref7.state,
        setState = _ref7.setState,
        currentColumn = _ref7.currentColumn,
        layerId = _ref7.layerId;
    var SEPARATOR = '$$$';

    function toValue(orderBy) {
      if (orderBy.type === 'alphabetical') {
        return orderBy.type;
      }

      return "".concat(orderBy.type).concat(SEPARATOR).concat(orderBy.columnId);
    }

    function fromValue(value) {
      if (value === 'alphabetical') {
        return {
          type: 'alphabetical'
        };
      }

      var parts = value.split(SEPARATOR);
      return {
        type: 'column',
        columnId: parts[1]
      };
    }

    var orderOptions = Object.entries(state.layers[layerId].columns).filter(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          _columnId = _ref9[0],
          column = _ref9[1];

      return isSortableByColumn(column);
    }).map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
          columnId = _ref11[0],
          column = _ref11[1];

      return {
        value: toValue({
          type: 'column',
          columnId: columnId
        }),
        text: column.label
      };
    });
    orderOptions.push({
      value: toValue({
        type: 'alphabetical'
      }),
      text: _i18n.i18n.translate('xpack.lens.indexPattern.terms.orderAlphabetical', {
        defaultMessage: 'Alphabetical'
      })
    });
    return _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
      label: _i18n.i18n.translate('xpack.lens.indexPattern.terms.size', {
        defaultMessage: 'Number of values'
      }),
      display: "columnCompressed"
    }, _react.default.createElement(FixedEuiRange, {
      min: 1,
      max: 20,
      step: 1,
      value: currentColumn.params.size,
      showInput: true,
      showLabels: true,
      compressed: true,
      onChange: function onChange(e) {
        return setState((0, _state_helpers.updateColumnParam)({
          state: state,
          layerId: layerId,
          currentColumn: currentColumn,
          paramName: 'size',
          value: Number(e.target.value)
        }));
      },
      "aria-label": _i18n.i18n.translate('xpack.lens.indexPattern.terms.size', {
        defaultMessage: 'Number of values'
      })
    })), _react.default.createElement(_eui.EuiFormRow, {
      label: _i18n.i18n.translate('xpack.lens.indexPattern.terms.orderBy', {
        defaultMessage: 'Order by'
      }),
      display: "columnCompressed"
    }, _react.default.createElement(_eui.EuiSelect, {
      compressed: true,
      "data-test-subj": "indexPattern-terms-orderBy",
      options: orderOptions,
      value: toValue(currentColumn.params.orderBy),
      onChange: function onChange(e) {
        return setState((0, _state_helpers.updateColumnParam)({
          state: state,
          layerId: layerId,
          currentColumn: currentColumn,
          paramName: 'orderBy',
          value: fromValue(e.target.value)
        }));
      },
      "aria-label": _i18n.i18n.translate('xpack.lens.indexPattern.terms.orderBy', {
        defaultMessage: 'Order by'
      })
    })), _react.default.createElement(_eui.EuiFormRow, {
      label: _i18n.i18n.translate('xpack.lens.indexPattern.terms.orderDirection', {
        defaultMessage: 'Order direction'
      }),
      display: "columnCompressed"
    }, _react.default.createElement(_eui.EuiSelect, {
      compressed: true,
      "data-test-subj": "indexPattern-terms-orderDirection",
      options: [{
        value: 'asc',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.terms.orderAscending', {
          defaultMessage: 'Ascending'
        })
      }, {
        value: 'desc',
        text: _i18n.i18n.translate('xpack.lens.indexPattern.terms.orderDescending', {
          defaultMessage: 'Descending'
        })
      }],
      value: currentColumn.params.orderDirection,
      onChange: function onChange(e) {
        return setState((0, _state_helpers.updateColumnParam)({
          state: state,
          layerId: layerId,
          currentColumn: currentColumn,
          paramName: 'orderDirection',
          value: e.target.value
        }));
      },
      "aria-label": _i18n.i18n.translate('xpack.lens.indexPattern.terms.orderBy', {
        defaultMessage: 'Order by'
      })
    })));
  }
};
exports.termsOperation = termsOperation;