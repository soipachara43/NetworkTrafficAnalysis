"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionLineChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useChartsSync = require("../../../../../hooks/useChartsSync");

var _CustomPlot = _interopRequireDefault(require("../../CustomPlot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var TransactionLineChart = function TransactionLineChart(props) {
  var series = props.series,
      tickFormatY = props.tickFormatY,
      formatTooltipValue = props.formatTooltipValue,
      _props$yMax = props.yMax,
      yMax = _props$yMax === void 0 ? 'max' : _props$yMax,
      height = props.height,
      truncateLegends = props.truncateLegends,
      _props$stacked = props.stacked,
      stacked = _props$stacked === void 0 ? false : _props$stacked,
      onHover = props.onHover;
  var syncedChartsProps = (0, _useChartsSync.useChartsSync)(); // combine callback for syncedChartsProps.onHover and props.onHover

  var combinedOnHover = (0, _react.useCallback)(function (hoverX) {
    if (onHover) {
      onHover();
    }

    return syncedChartsProps.onHover(hoverX);
  }, [syncedChartsProps, onHover]);
  return _react.default.createElement(_CustomPlot.default, _extends({
    series: series
  }, syncedChartsProps, {
    onHover: combinedOnHover,
    tickFormatY: tickFormatY,
    formatTooltipValue: formatTooltipValue,
    yMax: yMax,
    height: height,
    truncateLegends: truncateLegends
  }, stacked ? {
    stackBy: 'y'
  } : {}));
};

exports.TransactionLineChart = TransactionLineChart;