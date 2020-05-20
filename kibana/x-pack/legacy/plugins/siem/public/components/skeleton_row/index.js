"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var RowComponent = _styledComponents.default.div.attrs(function (_ref) {
  var rowHeight = _ref.rowHeight,
      rowPadding = _ref.rowPadding,
      theme = _ref.theme;
  return {
    className: 'siemSkeletonRow',
    rowHeight: rowHeight || theme.eui.euiSizeXL,
    rowPadding: rowPadding || "".concat(theme.eui.paddingSizes.s, " ").concat(theme.eui.paddingSizes.xs)
  };
}).withConfig({
  displayName: "RowComponent",
  componentId: "d6u3rc-0"
})(["border-bottom:", ";display:flex;height:", ";padding:", ";"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiBorderThin;
}, function (_ref3) {
  var rowHeight = _ref3.rowHeight;
  return rowHeight;
}, function (_ref4) {
  var rowPadding = _ref4.rowPadding;
  return rowPadding;
});

RowComponent.displayName = 'RowComponent';

var Row = _react.default.memo(RowComponent);

Row.displayName = 'Row';

var CellComponent = _styledComponents.default.div.attrs(function (_ref5) {
  var cellColor = _ref5.cellColor,
      cellMargin = _ref5.cellMargin,
      theme = _ref5.theme;
  return {
    className: 'siemSkeletonRow__cell',
    cellColor: cellColor || theme.eui.euiColorLightestShade,
    cellMargin: cellMargin || theme.eui.gutterTypes.gutterSmall
  };
}).withConfig({
  displayName: "CellComponent",
  componentId: "d6u3rc-1"
})(["background-color:", ";border-radius:2px;flex:1;& + &{margin-left:", ";}"], function (_ref6) {
  var cellColor = _ref6.cellColor;
  return cellColor;
}, function (_ref7) {
  var cellMargin = _ref7.cellMargin;
  return cellMargin;
});

CellComponent.displayName = 'CellComponent';

var Cell = _react.default.memo(CellComponent);

Cell.displayName = 'Cell';

var SkeletonRow = _react.default.memo(function (_ref8) {
  var cellColor = _ref8.cellColor,
      _ref8$cellCount = _ref8.cellCount,
      cellCount = _ref8$cellCount === void 0 ? 4 : _ref8$cellCount,
      cellMargin = _ref8.cellMargin,
      rowHeight = _ref8.rowHeight,
      rowPadding = _ref8.rowPadding;
  var cells = (0, _react.useMemo)(function () {
    return _toConsumableArray(Array(cellCount)).map(function (_, i) {
      return _react.default.createElement(Cell, {
        cellColor: cellColor,
        cellMargin: cellMargin,
        key: i
      });
    }, [cellCount]);
  }, [cellCount, cellColor, cellMargin]);
  return _react.default.createElement(Row, {
    rowHeight: rowHeight,
    rowPadding: rowPadding
  }, cells);
});

exports.SkeletonRow = SkeletonRow;
SkeletonRow.displayName = 'SkeletonRow';