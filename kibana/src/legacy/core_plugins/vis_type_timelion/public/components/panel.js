"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = Panel;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _lodash = require("lodash");

var _public = require("../../../../../plugins/kibana_react/public");

require("../flot");

var _lib = require("../../../../../plugins/timelion/common/lib");

var _panel_utils = require("../helpers/panel_utils");

var _tick_formatters = require("../helpers/tick_formatters");

var _tick_generator = require("../helpers/tick_generator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEBOUNCE_DELAY = 50; // ensure legend is the same height with or without a caption so legend items do not move around

var emptyCaption = '<br>';

function Panel(_ref) {
  var interval = _ref.interval,
      seriesList = _ref.seriesList,
      renderComplete = _ref.renderComplete;
  var kibana = (0, _public.useKibana)();

  var _useState = (0, _react.useState)(function () {
    return (0, _lodash.cloneDeep)(seriesList.list);
  }),
      _useState2 = _slicedToArray(_useState, 2),
      chart = _useState2[0],
      setChart = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      canvasElem = _useState4[0],
      setCanvasElem = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      chartElem = _useState6[0],
      setChartElem = _useState6[1];

  var _useState7 = (0, _react.useState)(function () {
    return new Map();
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      originalColorMap = _useState8[0],
      setOriginalColorMap = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      highlightedSeries = _useState10[0],
      setHighlightedSeries = _useState10[1];

  var _useState11 = (0, _react.useState)(),
      _useState12 = _slicedToArray(_useState11, 2),
      focusedSeries = _useState12[0],
      setFocusedSeries = _useState12[1];

  var _useState13 = (0, _react.useState)(),
      _useState14 = _slicedToArray(_useState13, 2),
      plot = _useState14[0],
      setPlot = _useState14[1]; // Used to toggle the series, and for displaying values on hover


  var _useState15 = (0, _react.useState)(),
      _useState16 = _slicedToArray(_useState15, 2),
      legendValueNumbers = _useState16[0],
      setLegendValueNumbers = _useState16[1];

  var _useState17 = (0, _react.useState)(),
      _useState18 = _slicedToArray(_useState17, 2),
      legendCaption = _useState18[0],
      setLegendCaption = _useState18[1];

  var canvasRef = (0, _react.useCallback)(function (node) {
    if (node !== null) {
      setCanvasElem(node);
    }
  }, []);
  var elementRef = (0, _react.useCallback)(function (node) {
    if (node !== null) {
      setChartElem(node);
    }
  }, []);
  (0, _react.useEffect)(function () {
    return function () {
      (0, _jquery.default)(chartElem).off('plotselected').off('plothover').off('mouseleave');
    };
  }, [chartElem]);
  var highlightSeries = (0, _react.useCallback)((0, _lodash.debounce)(function (_ref2) {
    var currentTarget = _ref2.currentTarget;
    var id = Number(currentTarget.getAttribute(_panel_utils.SERIES_ID_ATTR));

    if (highlightedSeries === id) {
      return;
    }

    setHighlightedSeries(id);
    setChart(function (chartState) {
      return chartState.map(function (series, seriesIndex) {
        series.color = seriesIndex === id ? originalColorMap.get(series) // color it like it was
        : 'rgba(128,128,128,0.1)'; // mark as grey

        return series;
      });
    });
  }, DEBOUNCE_DELAY), [originalColorMap, highlightedSeries]);
  var focusSeries = (0, _react.useCallback)(function (event) {
    var id = Number(event.currentTarget.getAttribute(_panel_utils.SERIES_ID_ATTR));
    setFocusedSeries(id);
    highlightSeries(event);
  }, [highlightSeries]);
  var toggleSeries = (0, _react.useCallback)(function (_ref3) {
    var currentTarget = _ref3.currentTarget;
    var id = Number(currentTarget.getAttribute(_panel_utils.SERIES_ID_ATTR));
    setChart(function (chartState) {
      return chartState.map(function (series, seriesIndex) {
        if (seriesIndex === id) {
          series._hide = !series._hide;
        }

        return series;
      });
    });
  }, []);
  var updateCaption = (0, _react.useCallback)(function (plotData) {
    if ((0, _lodash.get)(plotData, '[0]._global.legend.showTime', true)) {
      var caption = (0, _jquery.default)('<caption class="timChart__legendCaption"></caption>');
      caption.html(emptyCaption);
      setLegendCaption(caption);
      var canvasNode = (0, _jquery.default)(canvasElem);
      canvasNode.find('div.legend table').append(caption);
      setLegendValueNumbers(canvasNode.find('.ngLegendValueNumber'));
      var legend = (0, _jquery.default)(canvasElem).find('.ngLegendValue');

      if (legend) {
        legend.click(toggleSeries);
        legend.focus(focusSeries);
        legend.mouseover(highlightSeries);
      } // legend has been re-created. Apply focus on legend element when previously set


      if (focusedSeries || focusedSeries === 0) {
        canvasNode.find('div.legend table .legendLabel>span').get(focusedSeries).focus();
      }
    }
  }, [focusedSeries, canvasElem, toggleSeries, focusSeries, highlightSeries]);
  var updatePlot = (0, _react.useCallback)(function (chartValue, grid) {
    if (canvasElem && canvasElem.clientWidth > 0 && canvasElem.clientHeight > 0) {
      var options = (0, _panel_utils.buildOptions)(interval, kibana.services.timefilter, kibana.services.uiSettings, chartElem && chartElem.clientWidth, grid);
      var updatedSeries = (0, _panel_utils.buildSeriesData)(chartValue, options);

      if (options.yaxes) {
        options.yaxes.forEach(function (yaxis) {
          if (yaxis && yaxis.units) {
            var formatters = (0, _tick_formatters.tickFormatters)();
            yaxis.tickFormatter = formatters[yaxis.units.type];
            var byteModes = ['bytes', 'bytes/s'];

            if (byteModes.includes(yaxis.units.type)) {
              yaxis.tickGenerator = (0, _tick_generator.generateTicksProvider)();
            }
          }
        });
      }

      var newPlot = _jquery.default.plot(canvasElem, updatedSeries, options);

      setPlot(newPlot);
      renderComplete();
      updateCaption(newPlot.getData());
    }
  }, [canvasElem, chartElem, renderComplete, kibana.services, interval, updateCaption]);
  (0, _react.useEffect)(function () {
    updatePlot(chart, seriesList.render && seriesList.render.grid);
  }, [chart, updatePlot, seriesList.render]);
  (0, _react.useEffect)(function () {
    var colorsSet = [];
    var newChart = seriesList.list.map(function (series, seriesIndex) {
      var newSeries = _objectSpread({}, series);

      if (!newSeries.color) {
        var colorIndex = seriesIndex % _panel_utils.colors.length;
        newSeries.color = _panel_utils.colors[colorIndex];
      }

      colorsSet.push([newSeries, newSeries.color]);
      return newSeries;
    });
    setChart(newChart);
    setOriginalColorMap(new Map(colorsSet));
  }, [seriesList.list]);
  var unhighlightSeries = (0, _react.useCallback)(function () {
    if (highlightedSeries === null) {
      return;
    }

    setHighlightedSeries(null);
    setFocusedSeries(null);
    setChart(function (chartState) {
      return chartState.map(function (series) {
        series.color = originalColorMap.get(series); // reset the colors

        return series;
      });
    });
  }, [originalColorMap, highlightedSeries]); // Shamelessly borrowed from the flotCrosshairs example

  var setLegendNumbers = (0, _react.useCallback)(function (pos) {
    unhighlightSeries();
    var axes = plot.getAxes();

    if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max) {
      return;
    }

    var dataset = plot.getData();

    if (legendCaption) {
      legendCaption.text((0, _momentTimezone.default)(pos.x).format((0, _lodash.get)(dataset, '[0]._global.legend.timeFormat', _lib.DEFAULT_TIME_FORMAT)));
    }

    var _loop = function _loop(i) {
      var series = dataset[i];
      var useNearestPoint = series.lines.show && !series.lines.steps;
      var precision = (0, _lodash.get)(series, '_meta.precision', 2);

      if (series._hide) {
        return "continue";
      }

      var currentPoint = series.data.find(function (point, index) {
        if (index + 1 === series.data.length) {
          return true;
        }

        if (useNearestPoint) {
          return pos.x - point[0] < series.data[index + 1][0] - pos.x;
        } else {
          return pos.x < series.data[index + 1][0];
        }
      });
      var y = currentPoint[1];

      if (y != null && legendValueNumbers) {
        var label = y.toFixed(precision);

        if (series.yaxis.tickFormatter) {
          label = series.yaxis.tickFormatter(Number(label), series.yaxis);
        }

        legendValueNumbers.eq(i).text("(".concat(label, ")"));
      } else {
        legendValueNumbers.eq(i).empty();
      }
    };

    for (var i = 0; i < dataset.length; ++i) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }
  }, [plot, legendValueNumbers, unhighlightSeries, legendCaption]);
  var debouncedSetLegendNumbers = (0, _react.useCallback)((0, _lodash.debounce)(setLegendNumbers, DEBOUNCE_DELAY, {
    maxWait: DEBOUNCE_DELAY,
    leading: true,
    trailing: false
  }), [setLegendNumbers]);
  var clearLegendNumbers = (0, _react.useCallback)(function () {
    if (legendCaption) {
      legendCaption.html(emptyCaption);
    }

    (0, _lodash.each)(legendValueNumbers, function (num) {
      (0, _jquery.default)(num).empty();
    });
  }, [legendCaption, legendValueNumbers]);
  var plotHoverHandler = (0, _react.useCallback)(function (event, pos) {
    if (!plot) {
      return;
    }

    plot.setCrosshair(pos);
    debouncedSetLegendNumbers(pos);
  }, [plot, debouncedSetLegendNumbers]);
  var mouseLeaveHandler = (0, _react.useCallback)(function () {
    if (!plot) {
      return;
    }

    plot.clearCrosshair();
    clearLegendNumbers();
  }, [plot, clearLegendNumbers]);
  var plotSelectedHandler = (0, _react.useCallback)(function (event, ranges) {
    kibana.services.timefilter.setTime({
      from: (0, _momentTimezone.default)(ranges.xaxis.from),
      to: (0, _momentTimezone.default)(ranges.xaxis.to)
    });
  }, [kibana.services.timefilter]);
  (0, _react.useEffect)(function () {
    if (chartElem) {
      (0, _jquery.default)(chartElem).off('plotselected').on('plotselected', plotSelectedHandler);
    }
  }, [chartElem, plotSelectedHandler]);
  (0, _react.useEffect)(function () {
    if (chartElem) {
      (0, _jquery.default)(chartElem).off('mouseleave').on('mouseleave', mouseLeaveHandler);
    }
  }, [chartElem, mouseLeaveHandler]);
  (0, _react.useEffect)(function () {
    if (chartElem) {
      (0, _jquery.default)(chartElem).off('plothover').on('plothover', plotHoverHandler);
    }
  }, [chartElem, plotHoverHandler]);
  var title = (0, _react.useMemo)(function () {
    return (0, _lodash.last)((0, _lodash.compact)((0, _lodash.map)(seriesList.list, '_title'))) || '';
  }, [seriesList.list]);
  return _react.default.createElement("div", {
    ref: elementRef,
    className: "timChart"
  }, _react.default.createElement("div", {
    className: "chart-top-title"
  }, title), _react.default.createElement("div", {
    ref: canvasRef,
    className: "chart-canvas"
  }));
}