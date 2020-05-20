"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _connected = require("../connected");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var STATUS_CHART_HEIGHT = '160px';

var StatusPanel = function StatusPanel(_ref) {
  _objectDestructuringEmpty(_ref);

  return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "l"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_connected.Snapshot, {
    height: STATUS_CHART_HEIGHT
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 10
  }, _react.default.createElement(_connected.PingHistogram, {
    height: STATUS_CHART_HEIGHT,
    isResponsive: true
  }))));
};

exports.StatusPanel = StatusPanel;