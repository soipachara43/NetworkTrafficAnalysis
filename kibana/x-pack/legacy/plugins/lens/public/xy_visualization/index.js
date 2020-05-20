"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XyVisualization = void 0;

var _eui_charts_theme = require("@elastic/eui/dist/eui_charts_theme");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _xy_visualization = require("./xy_visualization");

var _xy_expression = require("./xy_expression");

var _types = require("./types");

var _services = require("./services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getTimeZone(uiSettings) {
  var configuredTimeZone = uiSettings.get('dateFormat:tz');

  if (configuredTimeZone === 'Browser') {
    return _momentTimezone.default.tz.guess();
  }

  return configuredTimeZone;
}

var XyVisualization =
/*#__PURE__*/
function () {
  function XyVisualization() {
    _classCallCheck(this, XyVisualization);
  }

  _createClass(XyVisualization, [{
    key: "setup",
    value: function setup(core, _ref) {
      var expressions = _ref.expressions,
          formatFactory = _ref.formatFactory,
          editorFrame = _ref.editorFrame;
      expressions.registerFunction(function () {
        return _types.legendConfig;
      });
      expressions.registerFunction(function () {
        return _types.xConfig;
      });
      expressions.registerFunction(function () {
        return _types.layerConfig;
      });
      expressions.registerFunction(function () {
        return _xy_expression.xyChart;
      });
      expressions.registerRenderer((0, _xy_expression.getXyChartRenderer)({
        formatFactory: formatFactory,
        chartTheme: core.uiSettings.get('theme:darkMode') ? _eui_charts_theme.EUI_CHARTS_THEME_DARK.theme : _eui_charts_theme.EUI_CHARTS_THEME_LIGHT.theme,
        timeZone: getTimeZone(core.uiSettings)
      }));
      editorFrame.registerVisualization(_xy_visualization.xyVisualization);
    }
  }, {
    key: "start",
    value: function start(core, _ref2) {
      var uiActions = _ref2.uiActions;
      (0, _services.setExecuteTriggerActions)(uiActions.executeTriggerActions);
    }
  }]);

  return XyVisualization;
}();

exports.XyVisualization = XyVisualization;