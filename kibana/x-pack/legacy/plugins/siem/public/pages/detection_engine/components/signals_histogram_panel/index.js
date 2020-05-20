"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalsHistogramPanel = exports.DETECTIONS_HISTOGRAM_ID = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fp = require("lodash/fp");

var _header_section = require("../../../../components/header_section");

var _public = require("../../../../../../../../../src/plugins/data/public");

var _constants = require("../../../../../common/constants");

var _use_query = require("../../../../containers/detection_engine/signals/use_query");

var _link_to = require("../../../../components/link_to");

var _inspect = require("../../../../components/inspect");

var _use_get_url_search = require("../../../../components/navigation/use_get_url_search");

var _matrix_loader = require("../../../../components/matrix_histogram/matrix_loader");

var _kibana = require("../../../../lib/kibana");

var _home_navigations = require("../../../home/home_navigations");

var _config = require("./config");

var _helpers = require("./helpers");

var _signals_histogram = require("./signals_histogram");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_PANEL_HEIGHT = 300;
var StyledEuiPanel = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "StyledEuiPanel",
  componentId: "codc7p-0"
})(["display:flex;flex-direction:column;", " position:relative;"], function (_ref) {
  var height = _ref.height;
  return height != null ? "height: ".concat(height, "px;") : '';
});
var defaultTotalSignalsObj = {
  value: 0,
  relation: 'eq'
};
var DETECTIONS_HISTOGRAM_ID = 'detections-histogram';
exports.DETECTIONS_HISTOGRAM_ID = DETECTIONS_HISTOGRAM_ID;
var ViewSignalsFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "ViewSignalsFlexItem",
  componentId: "codc7p-1"
})(["margin-left:24px;"]);
var SignalsHistogramPanel = (0, _react.memo)(function (_ref2) {
  var chartHeight = _ref2.chartHeight,
      _ref2$defaultStackByO = _ref2.defaultStackByOption,
      defaultStackByOption = _ref2$defaultStackByO === void 0 ? _config.signalsHistogramOptions[0] : _ref2$defaultStackByO,
      deleteQuery = _ref2.deleteQuery,
      filters = _ref2.filters,
      query = _ref2.query,
      from = _ref2.from,
      _ref2$legendPosition = _ref2.legendPosition,
      legendPosition = _ref2$legendPosition === void 0 ? 'right' : _ref2$legendPosition,
      _ref2$panelHeight = _ref2.panelHeight,
      panelHeight = _ref2$panelHeight === void 0 ? DEFAULT_PANEL_HEIGHT : _ref2$panelHeight,
      setQuery = _ref2.setQuery,
      signalIndexName = _ref2.signalIndexName,
      _ref2$showLinkToSigna = _ref2.showLinkToSignals,
      showLinkToSignals = _ref2$showLinkToSigna === void 0 ? false : _ref2$showLinkToSigna,
      _ref2$showTotalSignal = _ref2.showTotalSignalsCount,
      showTotalSignalsCount = _ref2$showTotalSignal === void 0 ? false : _ref2$showTotalSignal,
      stackByOptions = _ref2.stackByOptions,
      to = _ref2.to,
      _ref2$title = _ref2.title,
      title = _ref2$title === void 0 ? i18n.HISTOGRAM_HEADER : _ref2$title,
      updateDateRange = _ref2.updateDateRange;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isInitialLoading = _useState2[0],
      setIsInitialLoading = _useState2[1];

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_NUMBER_FORMAT),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultNumberFormat = _useUiSetting$2[0];

  var _useState3 = (0, _react.useState)(defaultTotalSignalsObj),
      _useState4 = _slicedToArray(_useState3, 2),
      totalSignalsObj = _useState4[0],
      setTotalSignalsObj = _useState4[1];

  var _useState5 = (0, _react.useState)(defaultStackByOption),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedStackByOption = _useState6[0],
      setSelectedStackByOption = _useState6[1];

  var _useQuerySignals = (0, _use_query.useQuerySignals)((0, _helpers.getSignalsHistogramQuery)(selectedStackByOption.value, from, to, []), signalIndexName),
      isLoadingSignals = _useQuerySignals.loading,
      signalsData = _useQuerySignals.data,
      setSignalsQuery = _useQuerySignals.setQuery,
      response = _useQuerySignals.response,
      request = _useQuerySignals.request,
      refetch = _useQuerySignals.refetch;

  var kibana = (0, _kibana.useKibana)();
  var urlSearch = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.detections);
  var totalSignals = (0, _react.useMemo)(function () {
    return i18n.SHOWING_SIGNALS((0, _numeral.default)(totalSignalsObj.value).format(defaultNumberFormat), totalSignalsObj.value, totalSignalsObj.relation === 'gte' ? '>' : totalSignalsObj.relation === 'lte' ? '<' : '');
  }, [totalSignalsObj]);
  var setSelectedOptionCallback = (0, _react.useCallback)(function (event) {
    var _ref3;

    setSelectedStackByOption((_ref3 = stackByOptions === null || stackByOptions === void 0 ? void 0 : stackByOptions.find(function (co) {
      return co.value === event.target.value;
    })) !== null && _ref3 !== void 0 ? _ref3 : defaultStackByOption);
  }, []);
  var formattedSignalsData = (0, _react.useMemo)(function () {
    return (0, _helpers.formatSignalsData)(signalsData);
  }, [signalsData]);
  (0, _react.useEffect)(function () {
    var canceled = false;

    if (!canceled && !(0, _helpers.showInitialLoadingSpinner)({
      isInitialLoading: isInitialLoading,
      isLoadingSignals: isLoadingSignals
    })) {
      setIsInitialLoading(false);
    }

    return function () {
      canceled = true; // prevent long running data fetches from updating state after unmounting
    };
  }, [isInitialLoading, isLoadingSignals, setIsInitialLoading]);
  (0, _react.useEffect)(function () {
    return function () {
      if (deleteQuery) {
        deleteQuery({
          id: DETECTIONS_HISTOGRAM_ID
        });
      }
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (refetch != null && setQuery != null) {
      setQuery({
        id: DETECTIONS_HISTOGRAM_ID,
        inspect: {
          dsl: [request],
          response: [response]
        },
        loading: isLoadingSignals,
        refetch: refetch
      });
    }
  }, [setQuery, isLoadingSignals, signalsData, response, request, refetch]);
  (0, _react.useEffect)(function () {
    var _ref4;

    setTotalSignalsObj((_ref4 = signalsData === null || signalsData === void 0 ? void 0 : signalsData.hits.total) !== null && _ref4 !== void 0 ? _ref4 : {
      value: 0,
      relation: 'eq'
    });
  }, [signalsData]);
  (0, _react.useEffect)(function () {
    var _ref5;

    var converted = _public.esQuery.buildEsQuery(undefined, query != null ? [query] : [], (_ref5 = filters === null || filters === void 0 ? void 0 : filters.filter(function (f) {
      return f.meta.disabled === false;
    })) !== null && _ref5 !== void 0 ? _ref5 : [], _objectSpread({}, _public.esQuery.getEsQueryConfig(kibana.services.uiSettings), {
      dateFormatTZ: undefined
    }));

    setSignalsQuery((0, _helpers.getSignalsHistogramQuery)(selectedStackByOption.value, from, to, !(0, _fp.isEmpty)(converted) ? [converted] : []));
  }, [selectedStackByOption.value, from, to, query, filters]);
  var linkButton = (0, _react.useMemo)(function () {
    if (showLinkToSignals) {
      return _react.default.createElement(ViewSignalsFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        href: (0, _link_to.getDetectionEngineUrl)(urlSearch)
      }, i18n.VIEW_SIGNALS));
    }
  }, [showLinkToSignals, urlSearch]);
  return _react.default.createElement(_inspect.InspectButtonContainer, {
    show: !isInitialLoading
  }, _react.default.createElement(StyledEuiPanel, {
    height: panelHeight
  }, isInitialLoading ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_header_section.HeaderSection, {
    id: DETECTIONS_HISTOGRAM_ID,
    title: title
  }), _react.default.createElement(_matrix_loader.MatrixLoader, null)) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_header_section.HeaderSection, {
    id: DETECTIONS_HISTOGRAM_ID,
    title: title,
    subtitle: showTotalSignalsCount && totalSignals
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, stackByOptions && _react.default.createElement(_eui.EuiSelect, {
    onChange: setSelectedOptionCallback,
    options: stackByOptions,
    prepend: i18n.STACK_BY_LABEL,
    value: selectedStackByOption.value
  })), linkButton)), _react.default.createElement(_signals_histogram.SignalsHistogram, {
    chartHeight: chartHeight,
    data: formattedSignalsData,
    from: from,
    legendPosition: legendPosition,
    loading: isLoadingSignals,
    to: to,
    updateDateRange: updateDateRange
  }))));
});
exports.SignalsHistogramPanel = SignalsHistogramPanel;
SignalsHistogramPanel.displayName = 'SignalsHistogramPanel';