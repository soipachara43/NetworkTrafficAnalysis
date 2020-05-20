"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatrixHistogramContainer = exports.MatrixHistogram = exports.MatrixHistogramComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var i18n = _interopRequireWildcard(require("./translations"));

var _barchart = require("../charts/barchart");

var _header_section = require("../header_section");

var _matrix_loader = require("./matrix_loader");

var _panel = require("../panel");

var _utils = require("./utils");

var _matrix_histogram = require("../../containers/matrix_histogram");

var _inspect = require("../inspect");

var _store = require("../../store");

var _actions = require("../../store/inputs/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_PANEL_HEIGHT = 300;
var HeaderChildrenFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "HeaderChildrenFlexItem",
  componentId: "shgite-0"
})(["margin-left:24px;"]);
var HistogramPanel = (0, _styledComponents.default)(_panel.Panel).withConfig({
  displayName: "HistogramPanel",
  componentId: "shgite-1"
})(["display:flex;flex-direction:column;", ""], function (_ref) {
  var height = _ref.height;
  return height != null ? "height: ".concat(height, "px;") : '';
});

var MatrixHistogramComponent = function MatrixHistogramComponent(_ref2) {
  var chartHeight = _ref2.chartHeight,
      defaultStackByOption = _ref2.defaultStackByOption,
      endDate = _ref2.endDate,
      errorMessage = _ref2.errorMessage,
      filterQuery = _ref2.filterQuery,
      headerChildren = _ref2.headerChildren,
      histogramType = _ref2.histogramType,
      _ref2$hideHistogramIf = _ref2.hideHistogramIfEmpty,
      hideHistogramIfEmpty = _ref2$hideHistogramIf === void 0 ? false : _ref2$hideHistogramIf,
      id = _ref2.id,
      isInspected = _ref2.isInspected,
      legendPosition = _ref2.legendPosition,
      mapping = _ref2.mapping,
      _ref2$panelHeight = _ref2.panelHeight,
      panelHeight = _ref2$panelHeight === void 0 ? DEFAULT_PANEL_HEIGHT : _ref2$panelHeight,
      setQuery = _ref2.setQuery,
      showLegend = _ref2.showLegend,
      stackByOptions = _ref2.stackByOptions,
      startDate = _ref2.startDate,
      subtitle = _ref2.subtitle,
      title = _ref2.title,
      dispatchSetAbsoluteRangeDatePicker = _ref2.dispatchSetAbsoluteRangeDatePicker,
      yTickFormatter = _ref2.yTickFormatter;
  var barchartConfigs = (0, _react.useMemo)(function () {
    return (0, _utils.getBarchartConfigs)({
      chartHeight: chartHeight,
      from: startDate,
      legendPosition: legendPosition,
      to: endDate,
      onBrushEnd: function onBrushEnd(min, max) {
        dispatchSetAbsoluteRangeDatePicker({
          id: 'global',
          from: min,
          to: max
        });
      },
      yTickFormatter: yTickFormatter,
      showLegend: showLegend
    });
  }, [chartHeight, startDate, legendPosition, endDate, dispatchSetAbsoluteRangeDatePicker, yTickFormatter, showLegend]);

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isInitialLoading = _useState2[0],
      setIsInitialLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(defaultStackByOption),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedStackByOption = _useState4[0],
      setSelectedStackByOption = _useState4[1];

  var setSelectedChartOptionCallback = (0, _react.useCallback)(function (event) {
    var _ref3;

    setSelectedStackByOption((_ref3 = stackByOptions === null || stackByOptions === void 0 ? void 0 : stackByOptions.find(function (co) {
      return co.value === event.target.value;
    })) !== null && _ref3 !== void 0 ? _ref3 : defaultStackByOption);
  }, []);

  var _useQuery = (0, _matrix_histogram.useQuery)({
    endDate: endDate,
    errorMessage: errorMessage,
    filterQuery: filterQuery,
    histogramType: histogramType,
    startDate: startDate,
    isInspected: isInspected,
    stackByField: selectedStackByOption.value
  }),
      data = _useQuery.data,
      loading = _useQuery.loading,
      inspect = _useQuery.inspect,
      totalCount = _useQuery.totalCount,
      _useQuery$refetch = _useQuery.refetch,
      refetch = _useQuery$refetch === void 0 ? _fp.noop : _useQuery$refetch;

  var titleWithStackByField = (0, _react.useMemo)(function () {
    return title != null && typeof title === 'function' ? title(selectedStackByOption) : title;
  }, [title, selectedStackByOption]);
  var subtitleWithCounts = (0, _react.useMemo)(function () {
    return subtitle != null && typeof subtitle === 'function' ? subtitle(totalCount) : subtitle;
  }, [subtitle, totalCount]);
  var hideHistogram = (0, _react.useMemo)(function () {
    return totalCount <= 0 && hideHistogramIfEmpty ? true : false;
  }, [totalCount, hideHistogramIfEmpty]);
  var barChartData = (0, _react.useMemo)(function () {
    return (0, _utils.getCustomChartData)(data, mapping);
  }, [data, mapping]);
  (0, _react.useEffect)(function () {
    setQuery({
      id: id,
      inspect: inspect,
      loading: loading,
      refetch: refetch
    });

    if (isInitialLoading && !!barChartData && data) {
      setIsInitialLoading(false);
    }
  }, [setQuery, id, inspect, loading, refetch, isInitialLoading, barChartData, data, setIsInitialLoading]);

  if (hideHistogram) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_inspect.InspectButtonContainer, {
    show: !isInitialLoading
  }, _react.default.createElement(HistogramPanel, {
    "data-test-subj": "".concat(id, "Panel"),
    height: panelHeight
  }, loading && !isInitialLoading && _react.default.createElement(_eui.EuiProgress, {
    "data-test-subj": "initialLoadingPanelMatrixOverTime",
    size: "xs",
    position: "absolute",
    color: "accent"
  }), isInitialLoading ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_header_section.HeaderSection, {
    id: id,
    title: titleWithStackByField,
    subtitle: !isInitialLoading && (totalCount >= 0 ? subtitleWithCounts : null)
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, (stackByOptions === null || stackByOptions === void 0 ? void 0 : stackByOptions.length) > 1 && _react.default.createElement(_eui.EuiSelect, {
    onChange: setSelectedChartOptionCallback,
    options: stackByOptions,
    prepend: i18n.STACK_BY,
    value: selectedStackByOption === null || selectedStackByOption === void 0 ? void 0 : selectedStackByOption.value
  })), _react.default.createElement(HeaderChildrenFlexItem, {
    grow: false
  }, headerChildren))), _react.default.createElement(_matrix_loader.MatrixLoader, null)) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_header_section.HeaderSection, {
    id: id,
    title: titleWithStackByField,
    subtitle: !isInitialLoading && (totalCount != null && totalCount >= 0 ? subtitleWithCounts : null)
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, (stackByOptions === null || stackByOptions === void 0 ? void 0 : stackByOptions.length) > 1 && _react.default.createElement(_eui.EuiSelect, {
    onChange: setSelectedChartOptionCallback,
    options: stackByOptions,
    prepend: i18n.STACK_BY,
    value: selectedStackByOption === null || selectedStackByOption === void 0 ? void 0 : selectedStackByOption.value
  })), _react.default.createElement(HeaderChildrenFlexItem, {
    grow: false
  }, headerChildren))), _react.default.createElement(_barchart.BarChart, {
    barChart: barChartData,
    configs: barchartConfigs
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }));
};

exports.MatrixHistogramComponent = MatrixHistogramComponent;

var MatrixHistogram = _react.default.memo(MatrixHistogramComponent);

exports.MatrixHistogram = MatrixHistogram;

var makeMapStateToProps = function makeMapStateToProps() {
  var getQuery = _store.inputsSelectors.globalQueryByIdSelector();

  var mapStateToProps = function mapStateToProps(state, _ref4) {
    var type = _ref4.type,
        id = _ref4.id;

    var _getQuery = getQuery(state, id),
        isInspected = _getQuery.isInspected;

    return {
      isInspected: isInspected
    };
  };

  return mapStateToProps;
};

var MatrixHistogramContainer = (0, _redux.compose)((0, _reactRedux.connect)(makeMapStateToProps, {
  dispatchSetAbsoluteRangeDatePicker: _actions.setAbsoluteRangeDatePicker
}))(MatrixHistogram);
exports.MatrixHistogramContainer = MatrixHistogramContainer;