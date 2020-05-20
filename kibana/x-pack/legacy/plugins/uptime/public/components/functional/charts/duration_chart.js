"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationChartComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _charts = require("@elastic/charts");

var _helper = require("../../../lib/helper");

var _duration_line_series_list = require("./duration_line_series_list");

var _chart_wrapper = require("./chart_wrapper");

var _hooks = require("../../../hooks");

var _get_tick_format = require("./get_tick_format");

var _chart_empty_state = require("./chart_empty_state");

var _duration_line_bar_list = require("./duration_line_bar_list");

var _ml_integeration = require("../../monitor_details/ml/ml_integeration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * This chart is intended to visualize monitor duration performance over time to
 * the users in a helpful way. Its x-axis is based on a timeseries, the y-axis is in
 * milliseconds.
 * @param props The props required for this component to render properly
 */
var DurationChartComponent = function DurationChartComponent(_ref) {
  var _ref2, _anomalies$anomalies;

  var locationDurationLines = _ref.locationDurationLines,
      anomalies = _ref.anomalies,
      loading = _ref.loading,
      hasMLJob = _ref.hasMLJob;
  var hasLines = locationDurationLines.length > 0;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      getUrlParams = _useUrlParams2[0],
      updateUrlParams = _useUrlParams2[1];

  var _getUrlParams = getUrlParams(),
      min = _getUrlParams.absoluteDateRangeStart,
      max = _getUrlParams.absoluteDateRangeEnd;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      hiddenLegends = _useState2[0],
      setHiddenLegends = _useState2[1];

  var onBrushEnd = function onBrushEnd(minX, maxX) {
    updateUrlParams({
      dateRangeStart: (0, _moment.default)(minX).toISOString(),
      dateRangeEnd: (0, _moment.default)(maxX).toISOString()
    });
  };

  var legendToggleVisibility = function legendToggleVisibility(legendItem) {
    if (legendItem) {
      setHiddenLegends(function (prevState) {
        if (prevState.includes(legendItem.specId)) {
          return _toConsumableArray(prevState.filter(function (item) {
            return item !== legendItem.specId;
          }));
        } else {
          return [].concat(_toConsumableArray(prevState), [legendItem.specId]);
        }
      });
    }
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h4", null, hasMLJob ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorCharts.monitorDuration.titleLabelWithAnomaly",
    defaultMessage: "Monitor duration (Anomalies: {noOfAnomalies})",
    values: {
      noOfAnomalies: (_ref2 = anomalies === null || anomalies === void 0 ? void 0 : (_anomalies$anomalies = anomalies.anomalies) === null || _anomalies$anomalies === void 0 ? void 0 : _anomalies$anomalies.length) !== null && _ref2 !== void 0 ? _ref2 : 0
    }
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.monitorCharts.monitorDuration.titleLabel",
    defaultMessage: "Monitor duration"
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_ml_integeration.MLIntegrationComponent, null))), _react.default.createElement(_chart_wrapper.ChartWrapper, {
    height: "400px",
    loading: loading
  }, hasLines ? _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, {
    xDomain: {
      min: min,
      max: max
    },
    showLegend: true,
    showLegendExtra: true,
    legendPosition: _charts.Position.Bottom,
    onBrushEnd: onBrushEnd,
    onLegendItemClick: legendToggleVisibility
  }), _react.default.createElement(_charts.Axis, {
    id: "bottom",
    position: _charts.Position.Bottom,
    showOverlappingTicks: true,
    tickFormat: (0, _charts.timeFormatter)((0, _helper.getChartDateLabel)(min, max)),
    title: _i18n.i18n.translate('xpack.uptime.monitorCharts.durationChart.bottomAxis.title', {
      defaultMessage: 'Timestamp'
    })
  }), _react.default.createElement(_charts.Axis, {
    domain: {
      min: 0
    },
    id: "left",
    position: _charts.Position.Left,
    tickFormat: function tickFormat(d) {
      return (0, _get_tick_format.getTickFormat)(d);
    },
    title: _i18n.i18n.translate('xpack.uptime.monitorCharts.durationChart.leftAxis.title', {
      defaultMessage: 'Duration ms'
    })
  }), _react.default.createElement(_duration_line_series_list.DurationLineSeriesList, {
    lines: locationDurationLines
  }), _react.default.createElement(_duration_line_bar_list.DurationAnomaliesBar, {
    anomalies: anomalies,
    hiddenLegends: hiddenLegends
  })) : _react.default.createElement(_chart_empty_state.ChartEmptyState, {
    body: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.durationChart.emptyPrompt.description",
      defaultMessage: "This monitor has never been {emphasizedText} during the selected time range.",
      values: {
        emphasizedText: _react.default.createElement("strong", null, "up")
      }
    }),
    title: _i18n.i18n.translate('xpack.uptime.durationChart.emptyPrompt.title', {
      defaultMessage: 'No duration data available'
    })
  }))));
};

exports.DurationChartComponent = DurationChartComponent;