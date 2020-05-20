"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlotValues = getPlotValues;
exports.SharedPlot = SharedPlot;

var _lodash = require("lodash");

var _d3Scale = require("d3-scale");

var _reactVis = require("react-vis");

var _d2 = _interopRequireDefault(require("d3"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _variables = require("../../../../style/variables");

var _timezone = require("../helper/timezone");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var XY_HEIGHT = _variables.unit * 16;
var XY_MARGIN = {
  top: _variables.unit,
  left: _variables.unit * 5,
  right: 0,
  bottom: _variables.unit * 2
};

var getXScale = function getXScale(xMin, xMax, width) {
  return (0, _d3Scale.scaleLinear)().domain([xMin, xMax]).range([XY_MARGIN.left, width - XY_MARGIN.right]);
};

var getYScale = function getYScale(yMin, yMax) {
  return (0, _d3Scale.scaleLinear)().domain([yMin, yMax]).range([XY_HEIGHT, 0]).nice();
};

function getFlattenedCoordinates(visibleSeries, enabledSeries) {
  var enabledCoordinates = (0, _lodash.flatten)(enabledSeries.map(function (serie) {
    return serie.data;
  }));

  if (!(0, _lodash.isEmpty)(enabledCoordinates)) {
    return enabledCoordinates;
  }

  return (0, _lodash.flatten)(visibleSeries.map(function (serie) {
    return serie.data;
  }));
}

function getPlotValues(visibleSeries, enabledSeries, _ref) {
  var width = _ref.width,
      _ref$yMin = _ref.yMin,
      yMin = _ref$yMin === void 0 ? 0 : _ref$yMin,
      _ref$yMax = _ref.yMax,
      yMax = _ref$yMax === void 0 ? 'max' : _ref$yMax,
      height = _ref.height,
      stackBy = _ref.stackBy;
  var flattenedCoordinates = getFlattenedCoordinates(visibleSeries, enabledSeries);

  var xMin = _d2.default.min(flattenedCoordinates, function (d) {
    return d.x;
  });

  var xMax = _d2.default.max(flattenedCoordinates, function (d) {
    return d.x;
  });

  if (yMax === 'max') {
    yMax = _d2.default.max(flattenedCoordinates, function (d) {
      var _d$y;

      return (_d$y = d.y) !== null && _d$y !== void 0 ? _d$y : 0;
    });
  }

  if (yMin === 'min') {
    yMin = _d2.default.min(flattenedCoordinates, function (d) {
      var _d$y2;

      return (_d$y2 = d.y) !== null && _d$y2 !== void 0 ? _d$y2 : 0;
    });
  }

  var _getDomainTZ = (0, _timezone.getDomainTZ)(xMin, xMax),
      _getDomainTZ2 = _slicedToArray(_getDomainTZ, 2),
      xMinZone = _getDomainTZ2[0],
      xMaxZone = _getDomainTZ2[1];

  var xScale = getXScale(xMin, xMax, width);
  var yScale = getYScale(yMin, yMax);
  var yMaxNice = yScale.domain()[1];
  var yTickValues = [0, yMaxNice / 2, yMaxNice]; // approximate number of x-axis ticks based on the width of the plot. There should by approx 1 tick per 100px
  // d3 will determine the exact number of ticks based on the selected range

  var xTickTotal = Math.floor(width / 100);
  var xTickValues = (0, _timezone.getTimeTicksTZ)({
    domain: [xMinZone, xMaxZone],
    totalTicks: xTickTotal,
    width: width
  });
  return {
    x: xScale,
    y: yScale,
    xTickValues: xTickValues,
    yTickValues: yTickValues,
    XY_MARGIN: XY_MARGIN,
    XY_HEIGHT: height || XY_HEIGHT,
    XY_WIDTH: width,
    stackBy: stackBy
  };
}

function SharedPlot(_ref2) {
  var plotValues = _ref2.plotValues,
      props = _objectWithoutProperties(_ref2, ["plotValues"]);

  var height = plotValues.XY_HEIGHT,
      margin = plotValues.XY_MARGIN,
      width = plotValues.XY_WIDTH;
  return _react.default.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none'
    }
  }, _react.default.createElement(_reactVis.XYPlot, _extends({
    dontCheckIfEmpty: true,
    height: height,
    margin: margin,
    xType: "time-utc",
    width: width,
    xDomain: plotValues.x.domain(),
    yDomain: plotValues.y.domain(),
    stackBy: plotValues.stackBy
  }, props)));
}

SharedPlot.propTypes = {
  plotValues: _propTypes.default.shape({
    x: _propTypes.default.func.isRequired,
    y: _propTypes.default.func.isRequired,
    XY_WIDTH: _propTypes.default.number.isRequired,
    height: _propTypes.default.number
  }).isRequired
};