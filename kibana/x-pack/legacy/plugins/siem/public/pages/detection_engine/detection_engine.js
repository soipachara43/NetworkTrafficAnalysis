"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectionEnginePage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactSticky = require("react-sticky");

var _reactRedux = require("react-redux");

var _global_time = require("../../containers/global_time");

var _source = require("../../containers/source");

var _alerts_table = require("../../components/alerts_viewer/alerts_table");

var _filters_global = require("../../components/filters_global");

var _redirect_to_detection_engine = require("../../components/link_to/redirect_to_detection_engine");

var _search_bar = require("../../components/search_bar");

var _wrapper_page = require("../../components/wrapper_page");

var _navigation = require("../../components/navigation");

var _inputs = require("../../store/inputs");

var _actions = require("../../store/inputs/actions");

var _spy_routes = require("../../utils/route/spy_routes");

var _alerts_by_category = require("../overview/alerts_by_category");

var _signals_info = require("./components/signals_info");

var _signals = require("./components/signals");

var _no_api_integration_callout = require("./components/no_api_integration_callout");

var _no_write_signals_callout = require("./components/no_write_signals_callout");

var _signals_histogram_panel = require("./components/signals_histogram_panel");

var _config = require("./components/signals_histogram_panel/config");

var _user_info = require("./components/user_info");

var _detection_engine_empty_page = require("./detection_engine_empty_page");

var _detection_engine_no_signal_index = require("./detection_engine_no_signal_index");

var _detection_engine_header_page = require("./components/detection_engine_header_page");

var _detection_engine_user_unauthenticated = require("./detection_engine_user_unauthenticated");

var i18n = _interopRequireWildcard(require("./translations"));

var _types = require("./types");

var _detectionsTabs;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var detectionsTabs = (_detectionsTabs = {}, _defineProperty(_detectionsTabs, _types.DetectionEngineTab.signals, {
  id: _types.DetectionEngineTab.signals,
  name: i18n.SIGNAL,
  href: (0, _redirect_to_detection_engine.getDetectionEngineTabUrl)(_types.DetectionEngineTab.signals),
  disabled: false,
  urlKey: 'detections'
}), _defineProperty(_detectionsTabs, _types.DetectionEngineTab.alerts, {
  id: _types.DetectionEngineTab.alerts,
  name: i18n.ALERT,
  href: (0, _redirect_to_detection_engine.getDetectionEngineTabUrl)(_types.DetectionEngineTab.alerts),
  disabled: false,
  urlKey: 'detections'
}), _detectionsTabs);

var DetectionEnginePageComponent = function DetectionEnginePageComponent(_ref) {
  var filters = _ref.filters,
      query = _ref.query,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker;

  var _useParams = (0, _reactRouterDom.useParams)(),
      _useParams$tabName = _useParams.tabName,
      tabName = _useParams$tabName === void 0 ? _types.DetectionEngineTab.signals : _useParams$tabName;

  var _useUserInfo = (0, _user_info.useUserInfo)(),
      loading = _useUserInfo.loading,
      isSignalIndexExists = _useUserInfo.isSignalIndexExists,
      isUserAuthenticated = _useUserInfo.isAuthenticated,
      hasEncryptionKey = _useUserInfo.hasEncryptionKey,
      canUserCRUD = _useUserInfo.canUserCRUD,
      signalIndexName = _useUserInfo.signalIndexName,
      hasIndexWrite = _useUserInfo.hasIndexWrite;

  var _useSignalInfo = (0, _signals_info.useSignalInfo)({}),
      _useSignalInfo2 = _slicedToArray(_useSignalInfo, 1),
      lastSignals = _useSignalInfo2[0];

  var updateDateRangeCallback = (0, _react.useCallback)(function (min, max) {
    setAbsoluteRangeDatePicker({
      id: 'global',
      from: min,
      to: max
    });
  }, [setAbsoluteRangeDatePicker]);
  var indexToAdd = (0, _react.useMemo)(function () {
    return signalIndexName == null ? [] : [signalIndexName];
  }, [signalIndexName]);

  if (isUserAuthenticated != null && !isUserAuthenticated && !loading) {
    return _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
      border: true,
      title: i18n.PAGE_TITLE
    }), _react.default.createElement(_detection_engine_user_unauthenticated.DetectionEngineUserUnauthenticated, null));
  }

  if (isSignalIndexExists != null && !isSignalIndexExists && !loading) {
    return _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
      border: true,
      title: i18n.PAGE_TITLE
    }), _react.default.createElement(_detection_engine_no_signal_index.DetectionEngineNoIndex, null));
  }

  return _react.default.createElement(_react.default.Fragment, null, hasEncryptionKey != null && !hasEncryptionKey && _react.default.createElement(_no_api_integration_callout.NoApiIntegrationKeyCallOut, null), hasIndexWrite != null && !hasIndexWrite && _react.default.createElement(_no_write_signals_callout.NoWriteSignalsCallOut, null), _react.default.createElement(_source.WithSource, {
    sourceId: "default",
    indexToAdd: indexToAdd
  }, function (_ref2) {
    var indicesExist = _ref2.indicesExist,
        indexPattern = _ref2.indexPattern;
    return (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) ? _react.default.createElement(_reactSticky.StickyContainer, null, _react.default.createElement(_filters_global.FiltersGlobal, null, _react.default.createElement(_search_bar.SiemSearchBar, {
      id: "global",
      indexPattern: indexPattern
    })), _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
      subtitle: lastSignals != null && _react.default.createElement(_react.default.Fragment, null, i18n.LAST_SIGNAL, ': ', lastSignals),
      title: i18n.PAGE_TITLE
    }, _react.default.createElement(_eui.EuiButton, {
      fill: true,
      href: (0, _redirect_to_detection_engine.getRulesUrl)(),
      iconType: "gear",
      "data-test-subj": "manage-signal-detection-rules"
    }, i18n.BUTTON_MANAGE_RULES)), _react.default.createElement(_global_time.GlobalTime, null, function (_ref3) {
      var to = _ref3.to,
          from = _ref3.from,
          deleteQuery = _ref3.deleteQuery,
          setQuery = _ref3.setQuery;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_navigation.SiemNavigation, {
        navTabs: detectionsTabs
      }), _react.default.createElement(_eui.EuiSpacer, null), tabName === _types.DetectionEngineTab.signals && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_signals_histogram_panel.SignalsHistogramPanel, {
        deleteQuery: deleteQuery,
        filters: filters,
        from: from,
        query: query,
        setQuery: setQuery,
        showTotalSignalsCount: true,
        signalIndexName: signalIndexName,
        stackByOptions: _config.signalsHistogramOptions,
        to: to,
        updateDateRange: updateDateRangeCallback
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "l"
      }), _react.default.createElement(_signals.SignalsTable, {
        loading: loading,
        hasIndexWrite: hasIndexWrite !== null && hasIndexWrite !== void 0 ? hasIndexWrite : false,
        canUserCRUD: (canUserCRUD !== null && canUserCRUD !== void 0 ? canUserCRUD : false) && (hasEncryptionKey !== null && hasEncryptionKey !== void 0 ? hasEncryptionKey : false),
        from: from,
        signalsIndex: signalIndexName !== null && signalIndexName !== void 0 ? signalIndexName : '',
        to: to
      })), tabName === _types.DetectionEngineTab.alerts && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_alerts_by_category.AlertsByCategory, {
        deleteQuery: deleteQuery,
        filters: filters,
        from: from,
        hideHeaderChildren: true,
        indexPattern: indexPattern,
        query: query,
        setQuery: setQuery,
        to: to
      }), _react.default.createElement(_alerts_table.AlertsTable, {
        endDate: to,
        startDate: from
      })));
    }))) : _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_detection_engine_header_page.DetectionEngineHeaderPage, {
      border: true,
      title: i18n.PAGE_TITLE
    }), _react.default.createElement(_detection_engine_empty_page.DetectionEngineEmptyPage, null));
  }), _react.default.createElement(_spy_routes.SpyRoute, null));
};

var makeMapStateToProps = function makeMapStateToProps() {
  var getGlobalInputs = _inputs.inputsSelectors.globalSelector();

  return function (state) {
    var globalInputs = getGlobalInputs(state);
    var query = globalInputs.query,
        filters = globalInputs.filters;
    return {
      query: query,
      filters: filters
    };
  };
};

var mapDispatchToProps = {
  setAbsoluteRangeDatePicker: _actions.setAbsoluteRangeDatePicker
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var DetectionEnginePage = connector(_react.default.memo(DetectionEnginePageComponent));
exports.DetectionEnginePage = DetectionEnginePage;