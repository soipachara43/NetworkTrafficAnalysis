"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitorBarSeries = void 0;

var _charts = require("@elastic/charts");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _helper = require("../../../lib/helper");

var _hooks = require("../../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * There is a specific focus on the monitor's down count, the up series is not shown,
 * so we will only render the series component if there are down counts for the selected monitor.
 * @param props - the values for the monitor this chart visualizes
 */
var MonitorBarSeries = function MonitorBarSeries(_ref) {
  var dangerColor = _ref.dangerColor,
      histogramSeries = _ref.histogramSeries;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      getUrlParams = _useUrlParams2[0],
      updateUrlParams = _useUrlParams2[1];

  var _getUrlParams = getUrlParams(),
      absoluteDateRangeStart = _getUrlParams.absoluteDateRangeStart,
      absoluteDateRangeEnd = _getUrlParams.absoluteDateRangeEnd;

  var onBrushEnd = function onBrushEnd(min, max) {
    updateUrlParams({
      dateRangeStart: (0, _moment.default)(min).toISOString(),
      dateRangeEnd: (0, _moment.default)(max).toISOString()
    });
  };

  var id = 'downSeries';
  return (0, _helper.seriesHasDownValues)(histogramSeries) ? _react.default.createElement("div", {
    style: {
      height: 50,
      width: '100%',
      maxWidth: '1200px',
      marginRight: 15
    }
  }, _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, {
    xDomain: {
      min: absoluteDateRangeStart,
      max: absoluteDateRangeEnd
    },
    onBrushEnd: onBrushEnd
  }), _react.default.createElement(_charts.Axis, {
    hide: true,
    id: "bottom",
    position: _charts.Position.Bottom,
    tickFormat: (0, _charts.timeFormatter)((0, _helper.getChartDateLabel)(absoluteDateRangeStart, absoluteDateRangeEnd))
  }), _react.default.createElement(_charts.BarSeries, {
    id: id,
    color: dangerColor,
    data: (histogramSeries || []).map(function (_ref2) {
      var timestamp = _ref2.timestamp,
          down = _ref2.down;
      return [timestamp, down];
    }),
    name: _i18n.i18n.translate('xpack.uptime.monitorList.downLineSeries.downLabel', {
      defaultMessage: 'Down checks'
    }),
    timeZone: "local",
    xAccessor: 0,
    xScaleType: _charts.ScaleType.Time,
    yAccessors: [1],
    yScaleType: _charts.ScaleType.Linear
  }))) : _react.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.uptime.monitorList.noDownHistory",
      defaultMessage: "This monitor has never been {emphasizedText} during the selected time range.",
      values: {
        emphasizedText: _react.default.createElement("strong", null, "down")
      }
    })
  }, _react.default.createElement(_eui.EuiText, {
    color: "secondary"
  }, "--"));
};

exports.MonitorBarSeries = MonitorBarSeries;