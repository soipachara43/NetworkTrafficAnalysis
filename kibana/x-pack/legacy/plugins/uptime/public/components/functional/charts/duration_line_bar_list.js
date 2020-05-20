"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationAnomaliesBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _charts = require("@elastic/charts");

var _annotation_tooltip = require("./annotation_tooltip");

var _anomalies = require("../../../../../../../plugins/ml/common/constants/anomalies");

var _anomaly_utils = require("../../../../../../../plugins/ml/common/util/anomaly_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DurationAnomaliesBar = function DurationAnomaliesBar(_ref) {
  var anomalies = _ref.anomalies,
      hiddenLegends = _ref.hiddenLegends;
  var anomalyAnnotations = new Map();
  Object.keys(_anomalies.ANOMALY_SEVERITY).forEach(function (severityLevel) {
    anomalyAnnotations.set(severityLevel.toLowerCase(), {
      rect: [],
      color: ''
    });
  });

  if (anomalies === null || anomalies === void 0 ? void 0 : anomalies.anomalies) {
    var records = anomalies.anomalies;
    records.forEach(function (record) {
      var _ref2, _record$source$observ;

      var recordObsvLoc = (_ref2 = (_record$source$observ = record.source['observer.geo.name']) === null || _record$source$observ === void 0 ? void 0 : _record$source$observ[0]) !== null && _ref2 !== void 0 ? _ref2 : 'N/A';

      if (recordObsvLoc === '') {
        recordObsvLoc = 'N/A';
      }

      if (hiddenLegends.length && hiddenLegends.includes("loc-avg-".concat(recordObsvLoc))) {
        return;
      }

      var severityLevel = (0, _anomaly_utils.getSeverityType)(record.severity);
      var tooltipData = {
        time: record.source.timestamp,
        score: record.severity,
        severity: severityLevel,
        color: (0, _anomaly_utils.getSeverityColor)(record.severity)
      };
      var anomalyRect = {
        coordinates: {
          x0: (0, _moment.default)(record.source.timestamp).valueOf(),
          x1: (0, _moment.default)(record.source.timestamp).add(record.source.bucket_span, 's').valueOf()
        },
        details: JSON.stringify(tooltipData)
      };
      anomalyAnnotations.get(severityLevel).rect.push(anomalyRect);
      anomalyAnnotations.get(severityLevel).color = (0, _anomaly_utils.getSeverityColor)(record.severity);
    });
  }

  var getRectStyle = function getRectStyle(color) {
    return {
      fill: color,
      opacity: 1,
      strokeWidth: 2,
      stroke: color
    };
  };

  var tooltipFormatter = function tooltipFormatter(details) {
    return _react.default.createElement(_annotation_tooltip.AnnotationTooltip, {
      details: details || ''
    });
  };

  return _react.default.createElement(_react.default.Fragment, null, Array.from(anomalyAnnotations).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        keyIndex = _ref4[0],
        rectAnnotation = _ref4[1];

    return rectAnnotation.rect.length > 0 ? _react.default.createElement(_charts.RectAnnotation, {
      dataValues: rectAnnotation.rect,
      key: keyIndex,
      id: keyIndex,
      style: getRectStyle(rectAnnotation.color),
      renderTooltip: tooltipFormatter
    }) : null;
  }));
};

exports.DurationAnomaliesBar = DurationAnomaliesBar;