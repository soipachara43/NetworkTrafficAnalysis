"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyValueTable = KeyValueTable;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _FormattedValue = require("./FormattedValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function KeyValueTable(_ref) {
  var keyValuePairs = _ref.keyValuePairs,
      _ref$tableProps = _ref.tableProps,
      tableProps = _ref$tableProps === void 0 ? {} : _ref$tableProps;
  return _react.default.createElement(_eui.EuiTable, _extends({
    compressed: true
  }, tableProps), _react.default.createElement(_eui.EuiTableBody, null, keyValuePairs.map(function (_ref2) {
    var key = _ref2.key,
        value = _ref2.value;
    return _react.default.createElement(_eui.EuiTableRow, {
      key: key
    }, _react.default.createElement(_eui.EuiTableRowCell, null, _react.default.createElement("strong", {
      "data-test-subj": "dot-key"
    }, key)), _react.default.createElement(_eui.EuiTableRowCell, {
      "data-test-subj": "value"
    }, _react.default.createElement(_FormattedValue.FormattedValue, {
      value: value
    })));
  })));
}