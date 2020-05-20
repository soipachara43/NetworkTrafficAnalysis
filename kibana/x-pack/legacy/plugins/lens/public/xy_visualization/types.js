"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualizationTypes = exports.layerConfig = exports.xConfig = exports.legendConfig = void 0;

var _charts = require("@elastic/charts");

var _i18n = require("@kbn/i18n");

var _chart_area = _interopRequireDefault(require("../assets/chart_area.svg"));

var _chart_area_stacked = _interopRequireDefault(require("../assets/chart_area_stacked.svg"));

var _chart_bar = _interopRequireDefault(require("../assets/chart_bar.svg"));

var _chart_bar_stacked = _interopRequireDefault(require("../assets/chart_bar_stacked.svg"));

var _chart_bar_horizontal = _interopRequireDefault(require("../assets/chart_bar_horizontal.svg"));

var _chart_bar_horizontal_stacked = _interopRequireDefault(require("../assets/chart_bar_horizontal_stacked.svg"));

var _chart_line = _interopRequireDefault(require("../assets/chart_line.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var legendConfig = {
  name: 'lens_xy_legendConfig',
  aliases: [],
  type: 'lens_xy_legendConfig',
  help: "Configure the xy chart's legend",
  inputTypes: ['null'],
  args: {
    isVisible: {
      types: ['boolean'],
      help: _i18n.i18n.translate('xpack.lens.xyChart.isVisible.help', {
        defaultMessage: 'Specifies whether or not the legend is visible.'
      })
    },
    position: {
      types: ['string'],
      options: [_charts.Position.Top, _charts.Position.Right, _charts.Position.Bottom, _charts.Position.Left],
      help: _i18n.i18n.translate('xpack.lens.xyChart.position.help', {
        defaultMessage: 'Specifies the legend position.'
      })
    }
  },
  fn: function fn(input, args) {
    return _objectSpread({
      type: 'lens_xy_legendConfig'
    }, args);
  }
};
exports.legendConfig = legendConfig;
var axisConfig = {
  title: {
    types: ['string'],
    help: _i18n.i18n.translate('xpack.lens.xyChart.title.help', {
      defaultMessage: 'The axis title'
    })
  },
  hide: {
    types: ['boolean'],
    default: false,
    help: 'Show / hide axis'
  }
};
var xConfig = {
  name: 'lens_xy_xConfig',
  aliases: [],
  type: 'lens_xy_xConfig',
  help: "Configure the xy chart's x axis",
  inputTypes: ['null'],
  args: _objectSpread({}, axisConfig, {
    accessor: {
      types: ['string'],
      help: 'The column to display on the x axis.'
    }
  }),
  fn: function fn(input, args) {
    return _objectSpread({
      type: 'lens_xy_xConfig'
    }, args);
  }
};
exports.xConfig = xConfig;
var layerConfig = {
  name: 'lens_xy_layer',
  aliases: [],
  type: 'lens_xy_layer',
  help: "Configure a layer in the xy chart",
  inputTypes: ['null'],
  args: _objectSpread({}, axisConfig, {
    layerId: {
      types: ['string'],
      help: ''
    },
    xAccessor: {
      types: ['string'],
      help: ''
    },
    seriesType: {
      types: ['string'],
      options: ['bar', 'line', 'area', 'bar_stacked', 'area_stacked'],
      help: 'The type of chart to display.'
    },
    xScaleType: {
      options: ['ordinal', 'linear', 'time'],
      help: 'The scale type of the x axis',
      default: 'ordinal'
    },
    isHistogram: {
      types: ['boolean'],
      default: false,
      help: 'Whether to layout the chart as a histogram'
    },
    yScaleType: {
      options: ['log', 'sqrt', 'linear', 'time'],
      help: 'The scale type of the y axes',
      default: 'linear'
    },
    splitAccessor: {
      types: ['string'],
      help: 'The column to split by',
      multi: false
    },
    accessors: {
      types: ['string'],
      help: 'The columns to display on the y axis.',
      multi: true
    },
    columnToLabel: {
      types: ['string'],
      help: 'JSON key-value pairs of column ID to label'
    }
  }),
  fn: function fn(input, args) {
    return _objectSpread({
      type: 'lens_xy_layer'
    }, args);
  }
};
exports.layerConfig = layerConfig;
var visualizationTypes = [{
  id: 'bar',
  icon: 'visBarVertical',
  largeIcon: _chart_bar.default,
  label: _i18n.i18n.translate('xpack.lens.xyVisualization.barLabel', {
    defaultMessage: 'Bar'
  })
}, {
  id: 'bar_horizontal',
  icon: 'visBarHorizontal',
  largeIcon: _chart_bar_horizontal.default,
  label: _i18n.i18n.translate('xpack.lens.xyVisualization.barHorizontalLabel', {
    defaultMessage: 'Horizontal bar'
  })
}, {
  id: 'bar_stacked',
  icon: 'visBarVerticalStacked',
  largeIcon: _chart_bar_stacked.default,
  label: _i18n.i18n.translate('xpack.lens.xyVisualization.stackedBarLabel', {
    defaultMessage: 'Stacked bar'
  })
}, {
  id: 'bar_horizontal_stacked',
  icon: 'visBarHorizontalStacked',
  largeIcon: _chart_bar_horizontal_stacked.default,
  label: _i18n.i18n.translate('xpack.lens.xyVisualization.stackedBarHorizontalLabel', {
    defaultMessage: 'Stacked horizontal bar'
  })
}, {
  id: 'line',
  icon: 'visLine',
  largeIcon: _chart_line.default,
  label: _i18n.i18n.translate('xpack.lens.xyVisualization.lineLabel', {
    defaultMessage: 'Line'
  })
}, {
  id: 'area',
  icon: 'visArea',
  largeIcon: _chart_area.default,
  label: _i18n.i18n.translate('xpack.lens.xyVisualization.areaLabel', {
    defaultMessage: 'Area'
  })
}, {
  id: 'area_stacked',
  icon: 'visAreaStacked',
  largeIcon: _chart_area_stacked.default,
  label: _i18n.i18n.translate('xpack.lens.xyVisualization.stackedAreaLabel', {
    defaultMessage: 'Stacked area'
  })
}];
exports.visualizationTypes = visualizationTypes;