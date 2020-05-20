"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricVisComponent = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _legacy_imports = require("../legacy_imports");

var _metric_vis_value = require("./metric_vis_value");

var _public = require("../../../../../plugins/charts/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MetricVisComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(MetricVisComponent, _Component);

  function MetricVisComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MetricVisComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MetricVisComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getFormattedValue", function (fieldFormatter, value) {
      var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';
      if ((0, _lodash.isNaN)(value)) return '-';
      return fieldFormatter.convert(value, format);
    });

    _defineProperty(_assertThisInitialized(_this), "filterBucket", function (metric) {
      var dimensions = _this.props.visParams.dimensions;

      if (!dimensions.bucket) {
        return;
      }

      var table = _this.props.visData;

      _this.props.vis.API.events.filter({
        table: table,
        column: dimensions.bucket.accessor,
        row: metric.rowIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderMetric", function (metric, index) {
      return _react.default.createElement(_metric_vis_value.MetricVisValue, {
        key: index,
        metric: metric,
        fontSize: _this.props.visParams.metric.style.fontSize,
        onFilter: _this.props.visParams.dimensions.bucket ? _this.filterBucket : undefined,
        showLabel: _this.props.visParams.metric.labels.show
      });
    });

    return _this;
  }

  _createClass(MetricVisComponent, [{
    key: "getLabels",
    value: function getLabels() {
      var config = this.props.visParams.metric;
      var isPercentageMode = config.percentageMode;
      var colorsRange = config.colorsRange;
      var max = (0, _lodash.last)(colorsRange).to;
      var labels = [];
      colorsRange.forEach(function (range) {
        var from = isPercentageMode ? Math.round(100 * range.from / max) : range.from;
        var to = isPercentageMode ? Math.round(100 * range.to / max) : range.to;
        labels.push("".concat(from, " - ").concat(to));
      });
      return labels;
    }
  }, {
    key: "getColors",
    value: function getColors() {
      var config = this.props.visParams.metric;
      var invertColors = config.invertColors;
      var colorSchema = config.colorSchema;
      var colorsRange = config.colorsRange;
      var labels = this.getLabels();
      var colors = {};

      for (var i = 0; i < labels.length; i += 1) {
        var divider = Math.max(colorsRange.length - 1, 1);
        var val = invertColors ? 1 - i / divider : i / divider;
        colors[labels[i]] = (0, _public.getHeatmapColors)(val, colorSchema);
      }

      return colors;
    }
  }, {
    key: "getBucket",
    value: function getBucket(val) {
      var config = this.props.visParams.metric;
      var bucket = (0, _lodash.findIndex)(config.colorsRange, function (range) {
        return range.from <= val && range.to > val;
      });

      if (bucket === -1) {
        if (val < config.colorsRange[0].from) bucket = 0;else bucket = config.colorsRange.length - 1;
      }

      return bucket;
    }
  }, {
    key: "getColor",
    value: function getColor(val, labels, colors) {
      var bucket = this.getBucket(val);
      var label = labels[bucket];
      return colors[label];
    }
  }, {
    key: "needsLightText",
    value: function needsLightText(bgColor) {
      var colors = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(bgColor);

      if (!colors) {
        return false;
      }

      var _colors$slice$map = colors.slice(1).map(parseInt),
          _colors$slice$map2 = _slicedToArray(_colors$slice$map, 3),
          red = _colors$slice$map2[0],
          green = _colors$slice$map2[1],
          blue = _colors$slice$map2[2];

      return (0, _eui.isColorDark)(red, green, blue);
    }
  }, {
    key: "processTableGroups",
    value: function processTableGroups(table) {
      var _this2 = this;

      var config = this.props.visParams.metric;
      var dimensions = this.props.visParams.dimensions;
      var isPercentageMode = config.percentageMode;
      var min = config.colorsRange[0].from;
      var max = (0, _lodash.last)(config.colorsRange).to;
      var colors = this.getColors();
      var labels = this.getLabels();
      var metrics = [];
      var bucketColumnId;
      var bucketFormatter;

      if (dimensions.bucket) {
        bucketColumnId = table.columns[dimensions.bucket.accessor].id;
        bucketFormatter = (0, _legacy_imports.getFormat)(dimensions.bucket.format);
      }

      dimensions.metrics.forEach(function (metric) {
        var columnIndex = metric.accessor;
        var column = table === null || table === void 0 ? void 0 : table.columns[columnIndex];
        var formatter = (0, _legacy_imports.getFormat)(metric.format);
        table.rows.forEach(function (row, rowIndex) {
          var title = column.name;
          var value = row[column.id];

          var color = _this2.getColor(value, labels, colors);

          if (isPercentageMode) {
            value = (value - min) / (max - min);
          }

          value = _this2.getFormattedValue(formatter, value, 'html');

          if (bucketColumnId) {
            var bucketValue = _this2.getFormattedValue(bucketFormatter, row[bucketColumnId]);

            title = "".concat(bucketValue, " - ").concat(title);
          }

          var shouldColor = config.colorsRange.length > 1;
          metrics.push({
            label: title,
            value: value,
            color: shouldColor && config.style.labelColor ? color : undefined,
            bgColor: shouldColor && config.style.bgColor ? color : undefined,
            lightText: shouldColor && config.style.bgColor && _this2.needsLightText(color),
            rowIndex: rowIndex
          });
        });
      });
      return metrics;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.renderComplete();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.props.renderComplete();
    }
  }, {
    key: "render",
    value: function render() {
      var metricsHtml;

      if (this.props.visData) {
        var metrics = this.processTableGroups(this.props.visData);
        metricsHtml = metrics.map(this.renderMetric);
      }

      return _react.default.createElement("div", {
        className: "mtrVis"
      }, metricsHtml);
    }
  }]);

  return MetricVisComponent;
}(_react.Component);

exports.MetricVisComponent = MetricVisComponent;