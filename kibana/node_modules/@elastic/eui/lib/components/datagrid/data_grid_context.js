"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataGridContext = _react.default.createContext({
  onFocusUpdate: function onFocusUpdate(_cell, _updateFocus) {}
});

exports.DataGridContext = DataGridContext;