"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricVisualization = void 0;

var _metric_visualization = require("./metric_visualization");

var _metric_expression = require("./metric_expression");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MetricVisualization =
/*#__PURE__*/
function () {
  function MetricVisualization() {
    _classCallCheck(this, MetricVisualization);
  }

  _createClass(MetricVisualization, [{
    key: "setup",
    value: function setup(_core, _ref) {
      var expressions = _ref.expressions,
          formatFactory = _ref.formatFactory,
          editorFrame = _ref.editorFrame;
      expressions.registerFunction(function () {
        return _metric_expression.metricChart;
      });
      expressions.registerRenderer(function () {
        return (0, _metric_expression.getMetricChartRenderer)(formatFactory);
      });
      editorFrame.registerVisualization(_metric_visualization.metricVisualization);
    }
  }]);

  return MetricVisualization;
}();

exports.MetricVisualization = MetricVisualization;