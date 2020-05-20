"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PingHistogramComponent = void 0;

var _charts = require("@elastic/charts");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _helper = require("../../../lib/helper");

var _chart_wrapper = require("./chart_wrapper");

var _contexts = require("../../../contexts");

var _hooks = require("../../../hooks");

var _chart_empty_state = require("./chart_empty_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PingHistogramComponent = function PingHistogramComponent(_ref) {
  var _data$histogram;

  var absoluteStartDate = _ref.absoluteStartDate,
      absoluteEndDate = _ref.absoluteEndDate,
      data = _ref.data,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      height = _ref.height;

  var _useContext = (0, _react.useContext)(_contexts.UptimeThemeContext),
      _useContext$colors = _useContext.colors,
      danger = _useContext$colors.danger,
      gray = _useContext$colors.gray;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      updateUrlParams = _useUrlParams2[1];

  var content;

  if (!(data === null || data === void 0 ? void 0 : (_data$histogram = data.histogram) === null || _data$histogram === void 0 ? void 0 : _data$histogram.length)) {
    content = _react.default.createElement(_chart_empty_state.ChartEmptyState, {
      title: _i18n.i18n.translate('xpack.uptime.snapshot.noDataTitle', {
        defaultMessage: 'No ping data available'
      }),
      body: _i18n.i18n.translate('xpack.uptime.snapshot.noDataDescription', {
        defaultMessage: 'There are no pings in the selected time range.'
      })
    });
  } else {
    var histogram = data.histogram;

    var downSpecId = _i18n.i18n.translate('xpack.uptime.snapshotHistogram.downMonitorsId', {
      defaultMessage: 'Down Monitors'
    });

    var upMonitorsId = _i18n.i18n.translate('xpack.uptime.snapshotHistogram.series.upLabel', {
      defaultMessage: 'Up'
    });

    var onBrushEnd = function onBrushEnd(min, max) {
      updateUrlParams({
        dateRangeStart: (0, _moment.default)(min).toISOString(),
        dateRangeEnd: (0, _moment.default)(max).toISOString()
      });
    };

    content = _react.default.createElement(_chart_wrapper.ChartWrapper, {
      height: height,
      loading: loading,
      "aria-label": _i18n.i18n.translate('xpack.uptime.snapshotHistogram.description', {
        defaultMessage: 'Bar Chart showing uptime status over time from {startTime} to {endTime}.',
        values: {
          startTime: (0, _moment.default)(new Date(absoluteStartDate).valueOf()).fromNow(),
          endTime: (0, _moment.default)(new Date(absoluteEndDate).valueOf()).fromNow()
        }
      })
    }, _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, {
      xDomain: {
        min: absoluteStartDate,
        max: absoluteEndDate
      },
      showLegend: false,
      onBrushEnd: onBrushEnd
    }), _react.default.createElement(_charts.Axis, {
      id: _i18n.i18n.translate('xpack.uptime.snapshotHistogram.xAxisId', {
        defaultMessage: 'Ping X Axis'
      }),
      position: _charts.Position.Bottom,
      showOverlappingTicks: false,
      tickFormat: (0, _charts.timeFormatter)((0, _helper.getChartDateLabel)(absoluteStartDate, absoluteEndDate))
    }), _react.default.createElement(_charts.Axis, {
      id: _i18n.i18n.translate('xpack.uptime.snapshotHistogram.yAxisId', {
        defaultMessage: 'Ping Y Axis'
      }),
      position: "left",
      title: _i18n.i18n.translate('xpack.uptime.snapshotHistogram.yAxis.title', {
        defaultMessage: 'Pings',
        description: 'The label on the y-axis of a chart that displays the number of times Heartbeat has pinged a set of services/websites.'
      })
    }), _react.default.createElement(_charts.BarSeries, {
      color: danger,
      data: histogram.map(function (_ref2) {
        var x = _ref2.x,
            downCount = _ref2.downCount;
        return [x, downCount || 0];
      }),
      id: downSpecId,
      name: _i18n.i18n.translate('xpack.uptime.snapshotHistogram.series.downLabel', {
        defaultMessage: 'Down'
      }),
      stackAccessors: [0],
      timeZone: "local",
      xAccessor: 0,
      xScaleType: "time",
      yAccessors: [1],
      yScaleType: "linear"
    }), _react.default.createElement(_charts.BarSeries, {
      color: gray,
      data: histogram.map(function (_ref3) {
        var x = _ref3.x,
            upCount = _ref3.upCount;
        return [x, upCount || 0];
      }),
      id: upMonitorsId,
      name: upMonitorsId,
      stackAccessors: [0],
      timeZone: "local",
      xAccessor: 0,
      xScaleType: "time",
      yAccessors: [1],
      yScaleType: "linear"
    })));
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.snapshot.pingsOverTimeTitle",
    defaultMessage: "Pings over time"
  }))), content);
};

exports.PingHistogramComponent = PingHistogramComponent;