"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datatableVisualization = void 0;

var _i18n = require("@kbn/i18n");

var _chart_datatable = _interopRequireDefault(require("../assets/chart_datatable.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function newLayerState(layerId) {
  return {
    layerId: layerId,
    columns: []
  };
}

var datatableVisualization = {
  id: 'lnsDatatable',
  visualizationTypes: [{
    id: 'lnsDatatable',
    icon: 'visTable',
    largeIcon: _chart_datatable.default,
    label: _i18n.i18n.translate('xpack.lens.datatable.label', {
      defaultMessage: 'Data table'
    })
  }],
  getLayerIds: function getLayerIds(state) {
    return state.layers.map(function (l) {
      return l.layerId;
    });
  },
  clearLayer: function clearLayer(state) {
    return {
      layers: state.layers.map(function (l) {
        return newLayerState(l.layerId);
      })
    };
  },
  getDescription: function getDescription() {
    return {
      icon: _chart_datatable.default,
      label: _i18n.i18n.translate('xpack.lens.datatable.label', {
        defaultMessage: 'Data table'
      })
    };
  },
  switchVisualizationType: function switchVisualizationType(_, state) {
    return state;
  },
  initialize: function initialize(frame, state) {
    return state || {
      layers: [newLayerState(frame.addNewLayer())]
    };
  },
  getPersistableState: function getPersistableState(state) {
    return state;
  },
  getSuggestions: function getSuggestions(_ref) {
    var table = _ref.table,
        state = _ref.state,
        keptLayerIds = _ref.keptLayerIds;

    if (keptLayerIds.length > 1 || keptLayerIds.length && table.layerId !== keptLayerIds[0] || state && table.changeType === 'unchanged') {
      return [];
    }

    var title = table.changeType === 'unchanged' ? _i18n.i18n.translate('xpack.lens.datatable.suggestionLabel', {
      defaultMessage: 'As table'
    }) : _i18n.i18n.translate('xpack.lens.datatable.visualizationOf', {
      defaultMessage: 'Table {operations}',
      values: {
        operations: table.label || table.columns.map(function (col) {
          return col.operation.label;
        }).join(_i18n.i18n.translate('xpack.lens.datatable.conjunctionSign', {
          defaultMessage: ' & ',
          description: 'A character that can be used for conjunction of multiple enumarated items. Make sure to include spaces around it if needed.'
        }))
      }
    });
    return [{
      title: title,
      // table with >= 10 columns will have a score of 0.6, fewer columns reduce score
      score: Math.min(table.columns.length, 10) / 10 * 0.6,
      state: {
        layers: [{
          layerId: table.layerId,
          columns: table.columns.map(function (col) {
            return col.columnId;
          })
        }]
      },
      previewIcon: _chart_datatable.default,
      // dont show suggestions for reduced versions or single-line tables
      hide: table.changeType === 'reduced' || !table.isMultiRow
    }];
  },
  getConfiguration: function getConfiguration(_ref2) {
    var state = _ref2.state,
        frame = _ref2.frame,
        layerId = _ref2.layerId;
    var layer = state.layers.find(function (l) {
      return l.layerId === layerId;
    });

    if (!layer) {
      return {
        groups: []
      };
    }

    var datasource = frame.datasourceLayers[layer.layerId];
    var originalOrder = datasource.getTableSpec().map(function (_ref3) {
      var columnId = _ref3.columnId;
      return columnId;
    }); // When we add a column it could be empty, and therefore have no order

    var sortedColumns = Array.from(new Set(originalOrder.concat(layer.columns)));
    return {
      groups: [{
        groupId: 'columns',
        groupLabel: _i18n.i18n.translate('xpack.lens.datatable.columns', {
          defaultMessage: 'Columns'
        }),
        layerId: state.layers[0].layerId,
        accessors: sortedColumns,
        supportsMoreColumns: true,
        filterOperations: function filterOperations() {
          return true;
        },
        dataTestSubj: 'lnsDatatable_column'
      }]
    };
  },
  setDimension: function setDimension(_ref4) {
    var prevState = _ref4.prevState,
        layerId = _ref4.layerId,
        columnId = _ref4.columnId;
    return _objectSpread({}, prevState, {
      layers: prevState.layers.map(function (l) {
        if (l.layerId !== layerId || l.columns.includes(columnId)) {
          return l;
        }

        return _objectSpread({}, l, {
          columns: [].concat(_toConsumableArray(l.columns), [columnId])
        });
      })
    });
  },
  removeDimension: function removeDimension(_ref5) {
    var prevState = _ref5.prevState,
        layerId = _ref5.layerId,
        columnId = _ref5.columnId;
    return _objectSpread({}, prevState, {
      layers: prevState.layers.map(function (l) {
        return l.layerId === layerId ? _objectSpread({}, l, {
          columns: l.columns.filter(function (c) {
            return c !== columnId;
          })
        }) : l;
      })
    });
  },
  toExpression: function toExpression(state, frame) {
    var layer = state.layers[0];
    var datasource = frame.datasourceLayers[layer.layerId];
    var operations = layer.columns.map(function (columnId) {
      return {
        columnId: columnId,
        operation: datasource.getOperationForColumnId(columnId)
      };
    }).filter(function (o) {
      return !!o.operation;
    });
    return {
      type: 'expression',
      chain: [{
        type: 'function',
        function: 'lens_datatable',
        arguments: {
          columns: [{
            type: 'expression',
            chain: [{
              type: 'function',
              function: 'lens_datatable_columns',
              arguments: {
                columnIds: operations.map(function (o) {
                  return o.columnId;
                })
              }
            }]
          }]
        }
      }]
    };
  }
};
exports.datatableVisualization = datatableVisualization;