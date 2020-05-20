"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatItemsComponent = exports.useKpiMatrixStatus = exports.addValueToBarChart = exports.addValueToAreaChart = exports.addValueToFields = exports.barchartConfigs = exports.areachartConfigs = exports.numberFormatter = void 0;

var _charts = require("@elastic/charts");

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _areachart = require("../charts/areachart");

var _barchart = require("../charts/barchart");

var _utils = require("../utils");

var _empty_value = require("../empty_value");

var _inspect = require("../inspect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "FlexItem",
  componentId: "sc-1lhly6r-0"
})(["min-width:0;"]);
FlexItem.displayName = 'FlexItem';
var StatValue = (0, _styledComponents.default)(_eui.EuiTitle).withConfig({
  displayName: "StatValue",
  componentId: "sc-1lhly6r-1"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
StatValue.displayName = 'StatValue';

var numberFormatter = function numberFormatter(value) {
  return value.toLocaleString();
};

exports.numberFormatter = numberFormatter;
var statItemBarchartRotation = 90;
var statItemChartCustomHeight = 74;

var areachartConfigs = function areachartConfigs(config) {
  return {
    series: {
      xScaleType: _charts.ScaleType.Time,
      yScaleType: _charts.ScaleType.Linear
    },
    axis: {
      xTickFormatter: (0, _fp.get)('xTickFormatter', config),
      yTickFormatter: numberFormatter
    },
    settings: {
      onBrushEnd: (0, _fp.getOr)(function () {}, 'onBrushEnd', config)
    },
    customHeight: statItemChartCustomHeight
  };
};

exports.areachartConfigs = areachartConfigs;

var barchartConfigs = function barchartConfigs(config) {
  return {
    series: {
      xScaleType: _charts.ScaleType.Ordinal,
      yScaleType: _charts.ScaleType.Linear,
      stackAccessors: ['y0']
    },
    axis: {
      xTickFormatter: numberFormatter
    },
    settings: {
      onElementClick: (0, _fp.getOr)(function () {}, 'onElementClick', config),
      rotation: statItemBarchartRotation
    },
    customHeight: statItemChartCustomHeight
  };
};

exports.barchartConfigs = barchartConfigs;

var addValueToFields = function addValueToFields(fields, data) {
  return fields.map(function (field) {
    return _objectSpread({}, field, {
      value: (0, _fp.get)(field.key, data)
    });
  });
};

exports.addValueToFields = addValueToFields;

var addValueToAreaChart = function addValueToAreaChart(fields, data) {
  return fields.filter(function (field) {
    return (0, _fp.get)("".concat(field.key, "Histogram"), data) != null;
  }).map(function (field) {
    return _objectSpread({}, field, {
      value: (0, _fp.get)("".concat(field.key, "Histogram"), data),
      key: "".concat(field.key, "Histogram")
    });
  });
};

exports.addValueToAreaChart = addValueToAreaChart;

var addValueToBarChart = function addValueToBarChart(fields, data) {
  if (fields.length === 0) return [];
  return fields.reduce(function (acc, field, idx) {
    var key = field.key,
        color = field.color;
    var y = (0, _fp.getOr)(null, key, data);
    var x = (0, _fp.get)("".concat(idx, ".name"), fields) || (0, _fp.getOr)('', "".concat(idx, ".description"), fields);
    var value = [{
      x: x,
      y: y,
      g: key,
      y0: 0
    }];
    return [].concat(_toConsumableArray(acc), [{
      key: key,
      color: color,
      value: value
    }]);
  }, []);
};

exports.addValueToBarChart = addValueToBarChart;

var useKpiMatrixStatus = function useKpiMatrixStatus(mappings, data, id, from, to, narrowDateRange) {
  var _useState = (0, _react.useState)(mappings),
      _useState2 = _slicedToArray(_useState, 2),
      statItemsProps = _useState2[0],
      setStatItemsProps = _useState2[1];

  (0, _react.useEffect)(function () {
    setStatItemsProps(mappings.map(function (stat) {
      return _objectSpread({}, stat, {
        areaChart: stat.enableAreaChart ? addValueToAreaChart(stat.fields, data) : undefined,
        barChart: stat.enableBarChart ? addValueToBarChart(stat.fields, data) : undefined,
        fields: addValueToFields(stat.fields, data),
        id: id,
        key: "kpi-summary-".concat(stat.key),
        statKey: "".concat(stat.key),
        from: from,
        to: to,
        narrowDateRange: narrowDateRange
      });
    }));
  }, [data]);
  return statItemsProps;
};

exports.useKpiMatrixStatus = useKpiMatrixStatus;

var StatItemsComponent = _react.default.memo(function (_ref) {
  var areaChart = _ref.areaChart,
      barChart = _ref.barChart,
      description = _ref.description,
      enableAreaChart = _ref.enableAreaChart,
      enableBarChart = _ref.enableBarChart,
      fields = _ref.fields,
      from = _ref.from,
      grow = _ref.grow,
      id = _ref.id,
      index = _ref.index,
      narrowDateRange = _ref.narrowDateRange,
      _ref$statKey = _ref.statKey,
      statKey = _ref$statKey === void 0 ? 'item' : _ref$statKey,
      to = _ref.to;
  var isBarChartDataAvailable = barChart && barChart.length && barChart.every(function (item) {
    return item.value != null && item.value.length > 0;
  });
  var isAreaChartDataAvailable = areaChart && areaChart.length && areaChart.every(function (item) {
    return item.value != null && item.value.length > 0;
  });
  return _react.default.createElement(FlexItem, {
    grow: grow,
    "data-test-subj": "stat-".concat(statKey)
  }, _react.default.createElement(_inspect.InspectButtonContainer, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: 'none'
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs"
  }, _react.default.createElement("h6", null, description))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_inspect.InspectButton, {
    queryId: id,
    title: "KPI ".concat(description),
    inspectIndex: index
  }))), _react.default.createElement(_eui.EuiFlexGroup, null, fields.map(function (field) {
    return _react.default.createElement(FlexItem, {
      key: "stat-items-field-".concat(field.key)
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      gutterSize: "m",
      responsive: false
    }, (isAreaChartDataAvailable || isBarChartDataAvailable) && field.icon && _react.default.createElement(FlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiIcon, {
      type: field.icon,
      color: field.color,
      size: "l",
      "data-test-subj": "stat-icon"
    })), _react.default.createElement(FlexItem, null, _react.default.createElement(StatValue, null, _react.default.createElement("p", {
      "data-test-subj": "stat-title"
    }, field.value != null ? field.value.toLocaleString() : (0, _empty_value.getEmptyTagValue)(), ' ', field.description)))));
  })), (enableAreaChart || enableBarChart) && _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiFlexGroup, null, enableBarChart && _react.default.createElement(FlexItem, null, _react.default.createElement(_barchart.BarChart, {
    barChart: barChart,
    configs: barchartConfigs()
  })), enableAreaChart && from != null && to != null && _react.default.createElement(FlexItem, null, _react.default.createElement(_areachart.AreaChart, {
    areaChart: areaChart,
    configs: areachartConfigs({
      xTickFormatter: (0, _utils.histogramDateTimeFormatter)([from, to]),
      onBrushEnd: narrowDateRange
    })
  }))))));
});

exports.StatItemsComponent = StatItemsComponent;
StatItemsComponent.displayName = 'StatItemsComponent';