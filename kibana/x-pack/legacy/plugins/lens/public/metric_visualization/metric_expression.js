"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricChart = MetricChart;
exports.getMetricChartRenderer = exports.metricChart = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _auto_scale = require("./auto_scale");

var _visualization_container = require("../visualization_container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var metricChart = {
  name: 'lens_metric_chart',
  type: 'render',
  help: 'A metric chart',
  args: {
    title: {
      types: ['string'],
      help: 'The chart title.'
    },
    accessor: {
      types: ['string'],
      help: 'The column whose value is being displayed'
    },
    mode: {
      types: ['string'],
      options: ['reduced', 'full'],
      default: 'full',
      help: 'The display mode of the chart - reduced will only show the metric itself without min size'
    }
  },
  inputTypes: ['lens_multitable'],
  fn: function fn(data, args) {
    return {
      type: 'render',
      as: 'lens_metric_chart_renderer',
      value: {
        data: data,
        args: args
      }
    };
  }
};
exports.metricChart = metricChart;

var getMetricChartRenderer = function getMetricChartRenderer(formatFactory) {
  return {
    name: 'lens_metric_chart_renderer',
    displayName: 'Metric chart',
    help: 'Metric chart renderer',
    validate: function validate() {
      return undefined;
    },
    reuseDomNode: true,
    render: function render(domNode, config, handlers) {
      _reactDom.default.render(_react.default.createElement(MetricChart, _extends({}, config, {
        formatFactory: formatFactory
      })), domNode, function () {
        handlers.done();
      });

      handlers.onDestroy(function () {
        return _reactDom.default.unmountComponentAtNode(domNode);
      });
    }
  };
};

exports.getMetricChartRenderer = getMetricChartRenderer;

function MetricChart(_ref) {
  var data = _ref.data,
      args = _ref.args,
      formatFactory = _ref.formatFactory;
  var title = args.title,
      accessor = args.accessor,
      mode = args.mode;
  var value = '-';
  var firstTable = Object.values(data.tables)[0];

  if (!accessor) {
    return _react.default.createElement(_visualization_container.VisualizationContainer, {
      reportTitle: title,
      className: "lnsMetricExpression__container"
    });
  }

  if (firstTable) {
    var column = firstTable.columns[0];
    var row = firstTable.rows[0];

    if (row[accessor]) {
      value = column && column.formatHint ? formatFactory(column.formatHint).convert(row[accessor]) : Number(Number(row[accessor]).toFixed(3)).toString();
    }
  }

  return _react.default.createElement(_visualization_container.VisualizationContainer, {
    reportTitle: title,
    className: "lnsMetricExpression__container"
  }, _react.default.createElement(_auto_scale.AutoScale, null, _react.default.createElement("div", {
    "data-test-subj": "lns_metric_value",
    style: {
      fontSize: '60pt',
      fontWeight: 600
    }
  }, value), mode === 'full' && _react.default.createElement("div", {
    "data-test-subj": "lns_metric_title",
    style: {
      fontSize: '24pt'
    }
  }, title)));
}