"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelBounds = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

var _settings = require("../common/settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SPEC_ID = 'model';

var areaSeriesStyle = _objectSpread({}, _settings.seriesStyle, {
  area: _objectSpread({}, _settings.seriesStyle.area, {
    visible: true
  }),
  line: _objectSpread({}, _settings.seriesStyle.line, {
    strokeWidth: 1,
    opacity: 0.4
  })
});

var ModelBounds = function ModelBounds(_ref) {
  var modelData = _ref.modelData;

  var _useChartColors = (0, _settings.useChartColors)(),
      MODEL_COLOR = _useChartColors.MODEL_COLOR;

  var model = modelData === undefined ? [] : modelData;
  return _react.default.createElement(_charts.AreaSeries, {
    id: SPEC_ID,
    xScaleType: _charts.ScaleType.Time,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: 'time',
    yAccessors: ['modelUpper'],
    y0Accessors: ['modelLower'],
    data: model,
    stackAccessors: ['time'],
    yScaleToDataExtent: false,
    curve: _charts.CurveType.CURVE_MONOTONE_X,
    areaSeriesStyle: areaSeriesStyle,
    color: MODEL_COLOR
  });
};

exports.ModelBounds = ModelBounds;