"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toExpression = toExpression;

var _operations = require("./operations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getExpressionForLayer(indexPattern, columns, columnOrder) {
  if (columnOrder.length === 0) {
    return null;
  }

  function getEsAggsConfig(column, columnId) {
    return _operations.operationDefinitionMap[column.operationType].toEsAggsConfig(column, columnId);
  }

  var columnEntries = columnOrder.map(function (colId) {
    return [colId, columns[colId]];
  });

  if (columnEntries.length) {
    var aggs = columnEntries.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          colId = _ref2[0],
          col = _ref2[1];

      return getEsAggsConfig(col, colId);
    });
    var idMap = columnEntries.reduce(function (currentIdMap, _ref3, index) {
      var _ref4 = _slicedToArray(_ref3, 1),
          colId = _ref4[0];

      return _objectSpread({}, currentIdMap, _defineProperty({}, "col-".concat(index, "-").concat(colId), _objectSpread({}, columns[colId], {
        id: colId
      })));
    }, {});
    var formatterOverrides = columnEntries.map(function (_ref5) {
      var _format$params;

      var _ref6 = _slicedToArray(_ref5, 2),
          id = _ref6[0],
          col = _ref6[1];

      var format = col.params && 'format' in col.params ? col.params.format : undefined;

      if (!format) {
        return null;
      }

      var base = "| lens_format_column format=\"".concat(format.id, "\" columnId=\"").concat(id, "\"");

      if (typeof ((_format$params = format.params) === null || _format$params === void 0 ? void 0 : _format$params.decimals) === 'number') {
        return base + " decimals=".concat(format.params.decimals);
      }

      return base;
    }).filter(function (expr) {
      return !!expr;
    }).join(' ');
    return "esaggs\n      index=\"".concat(indexPattern.id, "\"\n      metricsAtAllLevels=false\n      partialRows=false\n      includeFormatHints=true\n      aggConfigs={lens_auto_date aggConfigs='").concat(JSON.stringify(aggs), "'} | lens_rename_columns idMap='").concat(JSON.stringify(idMap), "' ").concat(formatterOverrides);
  }

  return null;
}

function toExpression(state, layerId) {
  if (state.layers[layerId]) {
    return getExpressionForLayer(state.indexPatterns[state.layers[layerId].indexPatternId], state.layers[layerId].columns, state.layers[layerId].columnOrder);
  }

  return null;
}