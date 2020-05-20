"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostDetails = exports.makeMapStateToProps = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactSticky = require("react-sticky");

var _filters_global = require("../../../components/filters_global");

var _header_page = require("../../../components/header_page");

var _last_event_time = require("../../../components/last_event_time");

var _anomaly_table_provider = require("../../../components/ml/anomaly/anomaly_table_provider");

var _host_to_criteria = require("../../../components/ml/criteria/host_to_criteria");

var _has_ml_user_permissions = require("../../../components/ml/permissions/has_ml_user_permissions");

var _use_ml_capabilities = require("../../../components/ml_popover/hooks/use_ml_capabilities");

var _score_interval_to_datetime = require("../../../components/ml/score/score_interval_to_datetime");

var _navigation = require("../../../components/navigation");

var _hosts = require("../../../components/page/hosts");

var _host_overview = require("../../../components/page/hosts/host_overview");

var _manage_query = require("../../../components/page/manage_query");

var _search_bar = require("../../../components/search_bar");

var _wrapper_page = require("../../../components/wrapper_page");

var _overview = require("../../../containers/hosts/overview");

var _kpi_host_details = require("../../../containers/kpi_host_details");

var _source = require("../../../containers/source");

var _types = require("../../../graphql/types");

var _kibana = require("../../../lib/kibana");

var _keury = require("../../../lib/keury");

var _store = require("../../../store");

var _actions = require("../../../store/hosts/actions");

var _actions2 = require("../../../store/inputs/actions");

var _spy_routes = require("../../../utils/route/spy_routes");

var _public = require("../../../../../../../../src/plugins/data/public");

var _hosts_empty_page = require("../hosts_empty_page");

var _details_tabs = require("./details_tabs");

var _nav_tabs = require("./nav_tabs");

var _utils = require("./utils");

var _helpers = require("./helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var HostOverviewManage = (0, _manage_query.manageQuery)(_host_overview.HostOverview);
var KpiHostDetailsManage = (0, _manage_query.manageQuery)(_hosts.KpiHostsComponent);

var HostDetailsComponent = _react.default.memo(function (_ref) {
  var filters = _ref.filters,
      from = _ref.from,
      isInitializing = _ref.isInitializing,
      query = _ref.query,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker,
      setHostDetailsTablesActivePageToZero = _ref.setHostDetailsTablesActivePageToZero,
      setQuery = _ref.setQuery,
      to = _ref.to,
      detailName = _ref.detailName,
      deleteQuery = _ref.deleteQuery,
      hostDetailsPagePath = _ref.hostDetailsPagePath;
  (0, _react.useEffect)(function () {
    setHostDetailsTablesActivePageToZero();
  }, [setHostDetailsTablesActivePageToZero, detailName]);
  var capabilities = (0, _use_ml_capabilities.useMlCapabilities)();
  var kibana = (0, _kibana.useKibana)();
  var hostDetailsPageFilters = (0, _react.useMemo)(function () {
    return (0, _helpers.getHostDetailsPageFilters)(detailName);
  }, [detailName]);

  var getFilters = function getFilters() {
    return [].concat(_toConsumableArray(hostDetailsPageFilters), _toConsumableArray(filters));
  };

  var narrowDateRange = (0, _react.useCallback)(function (min, max) {
    setAbsoluteRangeDatePicker({
      id: 'global',
      from: min,
      to: max
    });
  }, [setAbsoluteRangeDatePicker]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_source.WithSource, {
    sourceId: "default"
  }, function (_ref2) {
    var indicesExist = _ref2.indicesExist,
        indexPattern = _ref2.indexPattern;
    var filterQuery = (0, _keury.convertToBuildEsQuery)({
      config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
      indexPattern: indexPattern,
      queries: [query],
      filters: getFilters()
    });
    return (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) ? _react.default.createElement(_reactSticky.StickyContainer, null, _react.default.createElement(_filters_global.FiltersGlobal, null, _react.default.createElement(_search_bar.SiemSearchBar, {
      indexPattern: indexPattern,
      id: "global"
    })), _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_header_page.HeaderPage, {
      border: true,
      subtitle: _react.default.createElement(_last_event_time.LastEventTime, {
        indexKey: _types.LastEventIndexKey.hostDetails,
        hostName: detailName
      }),
      title: detailName
    }), _react.default.createElement(_overview.HostOverviewByNameQuery, {
      sourceId: "default",
      hostName: detailName,
      skip: isInitializing,
      startDate: from,
      endDate: to
    }, function (_ref3) {
      var hostOverview = _ref3.hostOverview,
          loading = _ref3.loading,
          id = _ref3.id,
          inspect = _ref3.inspect,
          refetch = _ref3.refetch;
      return _react.default.createElement(_anomaly_table_provider.AnomalyTableProvider, {
        criteriaFields: (0, _host_to_criteria.hostToCriteria)(hostOverview),
        startDate: from,
        endDate: to,
        skip: isInitializing
      }, function (_ref4) {
        var isLoadingAnomaliesData = _ref4.isLoadingAnomaliesData,
            anomaliesData = _ref4.anomaliesData;
        return _react.default.createElement(HostOverviewManage, {
          id: id,
          inspect: inspect,
          refetch: refetch,
          setQuery: setQuery,
          data: hostOverview,
          anomaliesData: anomaliesData,
          isLoadingAnomaliesData: isLoadingAnomaliesData,
          loading: loading,
          startDate: from,
          endDate: to,
          narrowDateRange: function narrowDateRange(score, interval) {
            var fromTo = (0, _score_interval_to_datetime.scoreIntervalToDateTime)(score, interval);
            setAbsoluteRangeDatePicker({
              id: 'global',
              from: fromTo.from,
              to: fromTo.to
            });
          }
        });
      });
    }), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_kpi_host_details.KpiHostDetailsQuery, {
      sourceId: "default",
      filterQuery: filterQuery,
      skip: isInitializing,
      startDate: from,
      endDate: to
    }, function (_ref5) {
      var kpiHostDetails = _ref5.kpiHostDetails,
          id = _ref5.id,
          inspect = _ref5.inspect,
          loading = _ref5.loading,
          refetch = _ref5.refetch;
      return _react.default.createElement(KpiHostDetailsManage, {
        data: kpiHostDetails,
        from: from,
        id: id,
        inspect: inspect,
        loading: loading,
        refetch: refetch,
        setQuery: setQuery,
        to: to,
        narrowDateRange: narrowDateRange
      });
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_navigation.SiemNavigation, {
      navTabs: (0, _nav_tabs.navTabsHostDetails)(detailName, (0, _has_ml_user_permissions.hasMlUserPermissions)(capabilities))
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_details_tabs.HostDetailsTabs, {
      isInitializing: isInitializing,
      deleteQuery: deleteQuery,
      pageFilters: hostDetailsPageFilters,
      to: to,
      from: from,
      detailName: detailName,
      type: _utils.type,
      setQuery: setQuery,
      filterQuery: filterQuery,
      hostDetailsPagePath: hostDetailsPagePath,
      indexPattern: indexPattern,
      setAbsoluteRangeDatePicker: setAbsoluteRangeDatePicker
    }))) : _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_header_page.HeaderPage, {
      border: true,
      title: detailName
    }), _react.default.createElement(_hosts_empty_page.HostsEmptyPage, null));
  }), _react.default.createElement(_spy_routes.SpyRoute, null));
});

HostDetailsComponent.displayName = 'HostDetailsComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getGlobalQuerySelector = _store.inputsSelectors.globalQuerySelector();

  var getGlobalFiltersQuerySelector = _store.inputsSelectors.globalFiltersQuerySelector();

  return function (state) {
    return {
      query: getGlobalQuerySelector(state),
      filters: getGlobalFiltersQuerySelector(state)
    };
  };
};

exports.makeMapStateToProps = makeMapStateToProps;
var mapDispatchToProps = {
  setAbsoluteRangeDatePicker: _actions2.setAbsoluteRangeDatePicker,
  setHostDetailsTablesActivePageToZero: _actions.setHostDetailsTablesActivePageToZero
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var HostDetails = connector(HostDetailsComponent);
exports.HostDetails = HostDetails;