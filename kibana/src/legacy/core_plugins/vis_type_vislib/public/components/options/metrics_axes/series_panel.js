"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeriesPanel = SeriesPanel;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _chart_options = require("./chart_options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function SeriesPanel(_ref) {
  var seriesParams = _ref.seriesParams,
      chartProps = _objectWithoutProperties(_ref, ["seriesParams"]);

  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "visTypeVislib.controls.pointSeries.series.metricsTitle",
    defaultMessage: "Metrics"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), seriesParams.map(function (chart, index) {
    return _react.default.createElement(_eui.EuiAccordion, {
      id: "visEditorSeriesAccordion".concat(chart.data.id),
      key: index,
      className: "visEditorSidebar__section visEditorSidebar__collapsible",
      initialIsOpen: index === 0,
      buttonContent: chart.data.label,
      buttonContentClassName: "visEditorSidebar__aggGroupAccordionButtonContent eui-textTruncate",
      "aria-label": _i18n.i18n.translate('visTypeVislib.controls.pointSeries.seriesAccordionAriaLabel', {
        defaultMessage: 'Toggle {agg} options',
        values: {
          agg: chart.data.label
        }
      })
    }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_chart_options.ChartOptions, _extends({
      index: index,
      chart: chart
    }, chartProps))));
  }));
}