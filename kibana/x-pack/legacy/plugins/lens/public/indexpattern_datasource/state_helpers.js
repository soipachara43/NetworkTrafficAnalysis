"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateColumnParam = updateColumnParam;
exports.changeColumn = changeColumn;
exports.deleteColumn = deleteColumn;
exports.getColumnOrder = getColumnOrder;
exports.updateLayerIndexPattern = updateLayerIndexPattern;

var _lodash = _interopRequireDefault(require("lodash"));

var _operations = require("./operations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function updateColumnParam(_ref) {
  var state = _ref.state,
      layerId = _ref.layerId,
      currentColumn = _ref.currentColumn,
      paramName = _ref.paramName,
      value = _ref.value;
  var columnId = Object.entries(state.layers[layerId].columns).find(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        _columnId = _ref3[0],
        column = _ref3[1];

    return column === currentColumn;
  })[0];
  return _objectSpread({}, state, {
    layers: _objectSpread({}, state.layers, _defineProperty({}, layerId, _objectSpread({}, state.layers[layerId], {
      columns: _objectSpread({}, state.layers[layerId].columns, _defineProperty({}, columnId, _objectSpread({}, currentColumn, {
        params: _objectSpread({}, currentColumn.params, _defineProperty({}, paramName, value))
      })))
    })))
  });
}

function adjustColumnReferencesForChangedColumn(columns, columnId) {
  var newColumns = _objectSpread({}, columns);

  Object.keys(newColumns).forEach(function (currentColumnId) {
    if (currentColumnId !== columnId) {
      var currentColumn = newColumns[currentColumnId];
      var operationDefinition = _operations.operationDefinitionMap[currentColumn.operationType];
      newColumns[currentColumnId] = operationDefinition.onOtherColumnChanged ? operationDefinition.onOtherColumnChanged(currentColumn, newColumns) : currentColumn;
    }
  });
  return newColumns;
}

function changeColumn(_ref4) {
  var state = _ref4.state,
      layerId = _ref4.layerId,
      columnId = _ref4.columnId,
      newColumn = _ref4.newColumn,
      _ref4$keepParams = _ref4.keepParams,
      keepParams = _ref4$keepParams === void 0 ? true : _ref4$keepParams;
  var oldColumn = state.layers[layerId].columns[columnId];
  var updatedColumn = keepParams && oldColumn && oldColumn.operationType === newColumn.operationType && 'params' in oldColumn ? _objectSpread({}, newColumn, {
    params: oldColumn.params
  }) : newColumn;
  var newColumns = adjustColumnReferencesForChangedColumn(_objectSpread({}, state.layers[layerId].columns, _defineProperty({}, columnId, updatedColumn)), columnId);
  return _objectSpread({}, state, {
    layers: _objectSpread({}, state.layers, _defineProperty({}, layerId, _objectSpread({}, state.layers[layerId], {
      columnOrder: getColumnOrder(newColumns),
      columns: newColumns
    })))
  });
}

function deleteColumn(_ref5) {
  var state = _ref5.state,
      layerId = _ref5.layerId,
      columnId = _ref5.columnId;

  var hypotheticalColumns = _objectSpread({}, state.layers[layerId].columns);

  delete hypotheticalColumns[columnId];
  var newColumns = adjustColumnReferencesForChangedColumn(hypotheticalColumns, columnId);
  return _objectSpread({}, state, {
    layers: _objectSpread({}, state.layers, _defineProperty({}, layerId, _objectSpread({}, state.layers[layerId], {
      columnOrder: getColumnOrder(newColumns),
      columns: newColumns
    })))
  });
}

function getColumnOrder(columns) {
  var entries = Object.entries(columns);

  var _$partition = _lodash.default.partition(entries, function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        id = _ref7[0],
        col = _ref7[1];

    return col.isBucketed;
  }),
      _$partition2 = _slicedToArray(_$partition, 2),
      aggregations = _$partition2[0],
      metrics = _$partition2[1];

  return aggregations.sort(function (_ref8, _ref9) {
    var _ref10 = _slicedToArray(_ref8, 2),
        id = _ref10[0],
        col = _ref10[1];

    var _ref11 = _slicedToArray(_ref9, 2),
        id2 = _ref11[0],
        col2 = _ref11[1];

    return (// Sort undefined orders last
      (col.suggestedPriority !== undefined ? col.suggestedPriority : Number.MAX_SAFE_INTEGER) - (col2.suggestedPriority !== undefined ? col2.suggestedPriority : Number.MAX_SAFE_INTEGER)
    );
  }).map(function (_ref12) {
    var _ref13 = _slicedToArray(_ref12, 1),
        id = _ref13[0];

    return id;
  }).concat(metrics.map(function (_ref14) {
    var _ref15 = _slicedToArray(_ref14, 1),
        id = _ref15[0];

    return id;
  }));
}

function updateLayerIndexPattern(layer, newIndexPattern) {
  var keptColumns = _lodash.default.pick(layer.columns, function (column) {
    return (0, _operations.isColumnTransferable)(column, newIndexPattern);
  });

  var newColumns = _lodash.default.mapValues(keptColumns, function (column) {
    var operationDefinition = _operations.operationDefinitionMap[column.operationType];
    return operationDefinition.transfer ? operationDefinition.transfer(column, newIndexPattern) : column;
  });

  var newColumnOrder = layer.columnOrder.filter(function (columnId) {
    return newColumns[columnId];
  });
  return _objectSpread({}, layer, {
    indexPatternId: newIndexPattern.id,
    columns: newColumns,
    columnOrder: newColumnOrder
  });
}