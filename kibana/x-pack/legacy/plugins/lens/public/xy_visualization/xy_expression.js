"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XYChartReportable = XYChartReportable;
exports.XYChart = XYChart;
exports.getXyChartRenderer = exports.xyChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _charts = require("@elastic/charts");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _events = require("../../../../../../src/legacy/core_plugins/visualizations/public/np_ready/public/embeddable/events");

var _types = require("./types");

var _visualization_container = require("../visualization_container");

var _state_helpers = require("./state_helpers");

var _common = require("../../../../../../src/plugins/data/common");

var _services = require("./services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var xyChart = {
  name: 'lens_xy_chart',
  type: 'render',
  inputTypes: ['lens_multitable', 'kibana_context', 'null'],
  help: _i18n.i18n.translate('xpack.lens.xyChart.help', {
    defaultMessage: 'An X/Y chart'
  }),
  args: {
    xTitle: {
      types: ['string'],
      help: 'X axis title'
    },
    yTitle: {
      types: ['string'],
      help: 'Y axis title'
    },
    legend: {
      types: ['lens_xy_legendConfig'],
      help: _i18n.i18n.translate('xpack.lens.xyChart.legend.help', {
        defaultMessage: 'Configure the chart legend.'
      })
    },
    layers: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      types: ['lens_xy_layer'],
      help: 'Layers of visual series',
      multi: true
    }
  },
  fn: function fn(data, args) {
    return {
      type: 'render',
      as: 'lens_xy_chart_renderer',
      value: {
        data: data,
        args: args
      }
    };
  }
};
exports.xyChart = xyChart;

var getXyChartRenderer = function getXyChartRenderer(dependencies) {
  return {
    name: 'lens_xy_chart_renderer',
    displayName: 'XY chart',
    help: _i18n.i18n.translate('xpack.lens.xyChart.renderer.help', {
      defaultMessage: 'X/Y chart renderer'
    }),
    validate: function validate() {
      return undefined;
    },
    reuseDomNode: true,
    render: function render(domNode, config, handlers) {
      var executeTriggerActions = (0, _services.getExecuteTriggerActions)();
      handlers.onDestroy(function () {
        return _reactDom.default.unmountComponentAtNode(domNode);
      });

      _reactDom.default.render(_react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(XYChartReportable, _extends({}, config, dependencies, {
        executeTriggerActions: executeTriggerActions
      }))), domNode, function () {
        return handlers.done();
      });
    }
  };
};

exports.getXyChartRenderer = getXyChartRenderer;

function getIconForSeriesType(seriesType) {
  return _types.visualizationTypes.find(function (c) {
    return c.id === seriesType;
  }).icon || 'empty';
}

var MemoizedChart = _react.default.memo(XYChart);

function XYChartReportable(props) {
  var _useState = (0, _react.useState)({
    isReady: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1]; // It takes a cycle for the XY chart to render. This prevents
  // reporting from printing a blank chart placeholder.


  (0, _react.useEffect)(function () {
    setState({
      isReady: true
    });
  }, []);
  return _react.default.createElement(_visualization_container.VisualizationContainer, {
    className: "lnsXyExpression__container",
    isReady: state.isReady
  }, _react.default.createElement(MemoizedChart, props));
}

function XYChart(_ref) {
  var _parseInterval, _xAxisColumn$meta, _xAxisColumn$meta$agg;

  var data = _ref.data,
      args = _ref.args,
      formatFactory = _ref.formatFactory,
      timeZone = _ref.timeZone,
      chartTheme = _ref.chartTheme,
      executeTriggerActions = _ref.executeTriggerActions;
  var legend = args.legend,
      layers = args.layers;

  if (Object.values(data.tables).every(function (table) {
    return table.rows.length === 0;
  })) {
    var icon = layers.length > 0 ? getIconForSeriesType(layers[0].seriesType) : 'bar';
    return _react.default.createElement(_eui.EuiText, {
      className: "lnsChart__empty",
      textAlign: "center",
      color: "subdued",
      size: "xs"
    }, _react.default.createElement(_eui.EuiIcon, {
      type: icon,
      color: "subdued",
      size: "l"
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.lens.xyVisualization.noDataLabel",
      defaultMessage: "No results found"
    })));
  } // use formatting hint of first x axis column to format ticks


  var xAxisColumn = Object.values(data.tables)[0].columns.find(function (_ref2) {
    var id = _ref2.id;
    return id === layers[0].xAccessor;
  });
  var xAxisFormatter = formatFactory(xAxisColumn && xAxisColumn.formatHint); // use default number formatter for y axis and use formatting hint if there is just a single y column

  var yAxisFormatter = formatFactory({
    id: 'number'
  });

  if (layers.length === 1 && layers[0].accessors.length === 1) {
    var firstYAxisColumn = Object.values(data.tables)[0].columns.find(function (_ref3) {
      var id = _ref3.id;
      return id === layers[0].accessors[0];
    });

    if (firstYAxisColumn && firstYAxisColumn.formatHint) {
      yAxisFormatter = formatFactory(firstYAxisColumn.formatHint);
    }
  }

  var chartHasMoreThanOneSeries = layers.length > 1 || data.tables[layers[0].layerId].columns.length > 2;
  var shouldRotate = (0, _state_helpers.isHorizontalChart)(layers);
  var xTitle = xAxisColumn && xAxisColumn.name || args.xTitle; // add minInterval only for single row value as it cannot be determined from dataset

  var minInterval = layers.every(function (layer) {
    return data.tables[layer.layerId].rows.length <= 1;
  }) ? (_parseInterval = (0, _common.parseInterval)(xAxisColumn === null || xAxisColumn === void 0 ? void 0 : (_xAxisColumn$meta = xAxisColumn.meta) === null || _xAxisColumn$meta === void 0 ? void 0 : (_xAxisColumn$meta$agg = _xAxisColumn$meta.aggConfigParams) === null || _xAxisColumn$meta$agg === void 0 ? void 0 : _xAxisColumn$meta$agg.interval)) === null || _parseInterval === void 0 ? void 0 : _parseInterval.asMilliseconds() : undefined;
  var xDomain = data.dateRange && layers.every(function (l) {
    return l.xScaleType === 'time';
  }) ? {
    min: data.dateRange.fromDate.getTime(),
    max: data.dateRange.toDate.getTime(),
    minInterval: minInterval
  } : undefined;
  return _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, {
    showLegend: legend.isVisible ? chartHasMoreThanOneSeries : legend.isVisible,
    legendPosition: legend.position,
    showLegendExtra: false,
    theme: chartTheme,
    rotation: shouldRotate ? 90 : 0,
    xDomain: xDomain,
    onElementClick: function onElementClick(_ref4) {
      var _table$columns$find, _table$columns$find$m, _table$columns$find$m2;

      var _ref5 = _slicedToArray(_ref4, 1),
          _ref5$ = _slicedToArray(_ref5[0], 2),
          geometry = _ref5$[0],
          series = _ref5$[1];

      // for xyChart series is always XYChartSeriesIdentifier and geometry is always type of GeometryValue
      var xySeries = series;
      var xyGeometry = geometry;
      var layer = layers.find(function (l) {
        return xySeries.seriesKeys.some(function (key) {
          return l.accessors.includes(key.toString());
        });
      });

      if (!layer) {
        return;
      }

      var table = data.tables[layer.layerId];
      var points = [{
        row: table.rows.findIndex(function (row) {
          return layer.xAccessor && row[layer.xAccessor] === xyGeometry.x;
        }),
        column: table.columns.findIndex(function (col) {
          return col.id === layer.xAccessor;
        }),
        value: xyGeometry.x
      }];

      if (xySeries.seriesKeys.length > 1) {
        var pointValue = xySeries.seriesKeys[0];
        points.push({
          row: table.rows.findIndex(function (row) {
            return layer.splitAccessor && row[layer.splitAccessor] === pointValue;
          }),
          column: table.columns.findIndex(function (col) {
            return col.id === layer.splitAccessor;
          }),
          value: pointValue
        });
      }

      var xAxisFieldName = (_table$columns$find = table.columns.find(function (col) {
        return col.id === layer.xAccessor;
      })) === null || _table$columns$find === void 0 ? void 0 : (_table$columns$find$m = _table$columns$find.meta) === null || _table$columns$find$m === void 0 ? void 0 : (_table$columns$find$m2 = _table$columns$find$m.aggConfigParams) === null || _table$columns$find$m2 === void 0 ? void 0 : _table$columns$find$m2.field;
      var timeFieldName = xDomain && xAxisFieldName;
      var context = {
        data: {
          data: points.map(function (point) {
            return {
              row: point.row,
              column: point.column,
              value: point.value,
              table: table
            };
          })
        },
        timeFieldName: timeFieldName
      };
      executeTriggerActions(_events.VIS_EVENT_TO_TRIGGER.filter, context);
    }
  }), _react.default.createElement(_charts.Axis, {
    id: "x",
    position: shouldRotate ? _charts.Position.Left : _charts.Position.Bottom,
    title: xTitle,
    showGridLines: false,
    hide: layers[0].hide,
    tickFormat: function tickFormat(d) {
      return xAxisFormatter.convert(d);
    }
  }), _react.default.createElement(_charts.Axis, {
    id: "y",
    position: shouldRotate ? _charts.Position.Bottom : _charts.Position.Left,
    title: args.yTitle,
    showGridLines: false,
    hide: layers[0].hide,
    tickFormat: function tickFormat(d) {
      return yAxisFormatter.convert(d);
    }
  }), layers.map(function (_ref6, index) {
    var splitAccessor = _ref6.splitAccessor,
        seriesType = _ref6.seriesType,
        accessors = _ref6.accessors,
        xAccessor = _ref6.xAccessor,
        layerId = _ref6.layerId,
        columnToLabel = _ref6.columnToLabel,
        yScaleType = _ref6.yScaleType,
        xScaleType = _ref6.xScaleType,
        isHistogram = _ref6.isHistogram;

    if (!xAccessor || !accessors.length || !data.tables[layerId] || data.tables[layerId].rows.length === 0 || data.tables[layerId].rows.every(function (row) {
      return typeof row[xAccessor] === 'undefined';
    })) {
      return;
    }

    var columnToLabelMap = columnToLabel ? JSON.parse(columnToLabel) : {};
    var table = data.tables[layerId]; // For date histogram chart type, we're getting the rows that represent intervals without data.
    // To not display them in the legend, they need to be filtered out.

    var rows = table.rows.filter(function (row) {
      return !(splitAccessor && !row[splitAccessor] && accessors.every(function (accessor) {
        return !row[accessor];
      }));
    });
    var seriesProps = {
      splitSeriesAccessors: splitAccessor ? [splitAccessor] : [],
      stackAccessors: seriesType.includes('stacked') ? [xAccessor] : [],
      id: splitAccessor || accessors.join(','),
      xAccessor: xAccessor,
      yAccessors: accessors,
      data: rows,
      xScaleType: xScaleType,
      yScaleType: yScaleType,
      enableHistogramMode: isHistogram && (seriesType.includes('stacked') || !splitAccessor),
      timeZone: timeZone,
      name: function name(d) {
        var _columnToLabelMap$d$s;

        if (accessors.length > 1) {
          return d.seriesKeys.map(function (key) {
            return columnToLabelMap[key] || key;
          }).join(' - ');
        }

        return (_columnToLabelMap$d$s = columnToLabelMap[d.seriesKeys[0]]) !== null && _columnToLabelMap$d$s !== void 0 ? _columnToLabelMap$d$s : d.seriesKeys[0];
      }
    };

    switch (seriesType) {
      case 'line':
        return _react.default.createElement(_charts.LineSeries, _extends({
          key: index
        }, seriesProps));

      case 'bar':
      case 'bar_stacked':
      case 'bar_horizontal':
      case 'bar_horizontal_stacked':
        return _react.default.createElement(_charts.BarSeries, _extends({
          key: index
        }, seriesProps));

      default:
        return _react.default.createElement(_charts.AreaSeries, _extends({
          key: index
        }, seriesProps));
    }
  }));
}