"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BucketNestingEditor = BucketNestingEditor;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var generator = (0, _eui.htmlIdGenerator)('lens-nesting');

function nestColumn(columnOrder, outer, inner) {
  var result = columnOrder.filter(function (c) {
    return c !== inner;
  });
  var outerPosition = result.indexOf(outer);
  result.splice(outerPosition + 1, 0, inner);
  return result;
}

function BucketNestingEditor(_ref) {
  var columnId = _ref.columnId,
      layer = _ref.layer,
      setColumns = _ref.setColumns;
  var column = layer.columns[columnId];
  var columns = Object.entries(layer.columns);
  var aggColumns = columns.filter(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        id = _ref3[0],
        c = _ref3[1];

    return id !== columnId && c.isBucketed;
  }).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        value = _ref5[0],
        c = _ref5[1];

    return {
      value: value,
      text: c.label,
      fieldName: (0, _utils.hasField)(c) ? c.sourceField : ''
    };
  });

  if (!column || !column.isBucketed || !aggColumns.length) {
    return null;
  }

  var fieldName = (0, _utils.hasField)(column) ? column.sourceField : '';
  var prevColumn = layer.columnOrder[layer.columnOrder.indexOf(columnId) - 1];

  if (aggColumns.length === 1) {
    var toggleNesting = function toggleNesting() {
      if (prevColumn) {
        setColumns(nestColumn(layer.columnOrder, columnId, target.value));
      } else {
        setColumns(nestColumn(layer.columnOrder, target.value, columnId));
      }
    };

    var _aggColumns = _slicedToArray(aggColumns, 1),
        target = _aggColumns[0];

    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "m"
    }), _react.default.createElement(_eui.EuiFormRow, {
      label: _i18n.i18n.translate('xpack.lens.indexPattern.groupingControlLabel', {
        defaultMessage: 'Grouping'
      })
    }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiRadio, {
      id: generator('topLevel'),
      "data-test-subj": "indexPattern-nesting-topLevel",
      label: column.operationType === 'terms' ? _i18n.i18n.translate('xpack.lens.indexPattern.groupingOverallTerms', {
        defaultMessage: 'Overall top {field}',
        values: {
          field: fieldName
        }
      }) : _i18n.i18n.translate('xpack.lens.indexPattern.groupingOverallDateHistogram', {
        defaultMessage: 'Dates overall'
      }),
      checked: !prevColumn,
      onChange: toggleNesting
    }), _react.default.createElement(_eui.EuiRadio, {
      id: generator('bottomLevel'),
      "data-test-subj": "indexPattern-nesting-bottomLevel",
      label: column.operationType === 'terms' ? _i18n.i18n.translate('xpack.lens.indexPattern.groupingSecondTerms', {
        defaultMessage: 'Top values for each {target}',
        values: {
          target: target.fieldName
        }
      }) : _i18n.i18n.translate('xpack.lens.indexPattern.groupingSecondDateHistogram', {
        defaultMessage: 'Dates for each {target}',
        values: {
          target: target.fieldName
        }
      }),
      checked: !!prevColumn,
      onChange: toggleNesting
    }))));
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.lens.indexPattern.groupByDropdown', {
      defaultMessage: 'Group by'
    }),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiSelect, {
    compressed: true,
    "data-test-subj": "indexPattern-nesting-select",
    options: [{
      value: '',
      text: _i18n.i18n.translate('xpack.lens.xyChart.nestUnderRoot', {
        defaultMessage: 'Entire data set'
      })
    }].concat(_toConsumableArray(aggColumns)),
    value: prevColumn,
    onChange: function onChange(e) {
      return setColumns(nestColumn(layer.columnOrder, e.target.value, columnId));
    }
  })));
}