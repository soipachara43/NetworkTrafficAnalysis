"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renameColumns = void 0;

var _i18n = require("@kbn/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var renameColumns = {
  name: 'lens_rename_columns',
  type: 'kibana_datatable',
  help: _i18n.i18n.translate('xpack.lens.functions.renameColumns.help', {
    defaultMessage: 'A helper to rename the columns of a datatable'
  }),
  args: {
    idMap: {
      types: ['string'],
      help: _i18n.i18n.translate('xpack.lens.functions.renameColumns.idMap.help', {
        defaultMessage: 'A JSON encoded object in which keys are the old column ids and values are the corresponding new ones. All other columns ids are kept.'
      })
    }
  },
  inputTypes: ['kibana_datatable'],
  fn: function fn(data, _ref) {
    var encodedIdMap = _ref.idMap;
    var idMap = JSON.parse(encodedIdMap);
    return {
      type: 'kibana_datatable',
      rows: data.rows.map(function (row) {
        var mappedRow = {};
        Object.entries(idMap).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              fromId = _ref3[0],
              toId = _ref3[1];

          mappedRow[toId.id] = row[fromId];
        });
        Object.entries(row).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              id = _ref5[0],
              value = _ref5[1];

          if (id in idMap) {
            mappedRow[idMap[id].id] = sanitizeValue(value);
          } else {
            mappedRow[id] = sanitizeValue(value);
          }
        });
        return mappedRow;
      }),
      columns: data.columns.map(function (column) {
        var mappedItem = idMap[column.id];

        if (!mappedItem) {
          return column;
        }

        return _objectSpread({}, column, {
          id: mappedItem.id,
          name: getColumnName(mappedItem, column)
        });
      })
    };
  }
};
exports.renameColumns = renameColumns;

function getColumnName(originalColumn, newColumn) {
  if (originalColumn && originalColumn.operationType === 'date_histogram') {
    var fieldName = originalColumn.sourceField; // HACK: This is a hack, and introduces some fragility into
    // column naming. Eventually, this should be calculated and
    // built more systematically.

    return newColumn.name.replace(fieldName, originalColumn.label);
  }

  return originalColumn.label;
}

function sanitizeValue(value) {
  if (value === '') {
    return _i18n.i18n.translate('xpack.lens.indexpattern.emptyTextColumnValue', {
      defaultMessage: '(empty)'
    });
  }

  return value;
}