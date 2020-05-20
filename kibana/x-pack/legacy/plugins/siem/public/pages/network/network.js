"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Network = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reactSticky = require("react-sticky");

var _public = require("../../../../../../../src/plugins/data/public");

var _embedded_map = require("../../components/embeddables/embedded_map");

var _filters_global = require("../../components/filters_global");

var _header_page = require("../../components/header_page");

var _last_event_time = require("../../components/last_event_time");

var _navigation = require("../../components/navigation");

var _manage_query = require("../../components/page/manage_query");

var _network = require("../../components/page/network");

var _search_bar = require("../../components/search_bar");

var _wrapper_page = require("../../components/wrapper_page");

var _kpi_network = require("../../containers/kpi_network");

var _source = require("../../containers/source");

var _types = require("../../graphql/types");

var _kibana = require("../../lib/kibana");

var _keury = require("../../lib/keury");

var _store = require("../../store");

var _actions = require("../../store/inputs/actions");

var _spy_routes = require("../../utils/route/spy_routes");

var _navigation2 = require("./navigation");

var _alerts_query_tab_body = require("./navigation/alerts_query_tab_body");

var _network_empty_page = require("./network_empty_page");

var i18n = _interopRequireWildcard(require("./translations"));

var _types2 = require("./navigation/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var KpiNetworkComponentManage = (0, _manage_query.manageQuery)(_network.KpiNetworkComponent);
var sourceId = 'default';

var NetworkComponent = _react.default.memo(function (_ref) {
  var filters = _ref.filters,
      query = _ref.query,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker,
      networkPagePath = _ref.networkPagePath,
      to = _ref.to,
      from = _ref.from,
      setQuery = _ref.setQuery,
      isInitializing = _ref.isInitializing,
      hasMlUserPermissions = _ref.hasMlUserPermissions,
      capabilitiesFetched = _ref.capabilitiesFetched;
  var kibana = (0, _kibana.useKibana)();

  var _useParams = (0, _reactRouterDom.useParams)(),
      tabName = _useParams.tabName;

  var tabsFilters = (0, _react.useMemo)(function () {
    if (tabName === _types2.NetworkRouteType.alerts) {
      return filters.length > 0 ? [].concat(_toConsumableArray(filters), _toConsumableArray(_alerts_query_tab_body.filterNetworkData)) : _alerts_query_tab_body.filterNetworkData;
    }

    return filters;
  }, [tabName, filters]);
  var narrowDateRange = (0, _react.useCallback)(function (min, max) {
    setAbsoluteRangeDatePicker({
      id: 'global',
      from: min,
      to: max
    });
  }, [setAbsoluteRangeDatePicker]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_source.WithSource, {
    sourceId: sourceId
  }, function (_ref2) {
    var indicesExist = _ref2.indicesExist,
        indexPattern = _ref2.indexPattern;
    var filterQuery = (0, _keury.convertToBuildEsQuery)({
      config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
      indexPattern: indexPattern,
      queries: [query],
      filters: filters
    });
    var tabsFilterQuery = (0, _keury.convertToBuildEsQuery)({
      config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
      indexPattern: indexPattern,
      queries: [query],
      filters: tabsFilters
    });
    return (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) ? _react.default.createElement(_reactSticky.StickyContainer, null, _react.default.createElement(_filters_global.FiltersGlobal, null, _react.default.createElement(_search_bar.SiemSearchBar, {
      indexPattern: indexPattern,
      id: "global"
    })), _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_header_page.HeaderPage, {
      border: true,
      subtitle: _react.default.createElement(_last_event_time.LastEventTime, {
        indexKey: _types.LastEventIndexKey.network
      }),
      title: i18n.PAGE_TITLE
    }), _react.default.createElement(_embedded_map.EmbeddedMap, {
      query: query,
      filters: filters,
      startDate: from,
      endDate: to,
      setQuery: setQuery
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_kpi_network.KpiNetworkQuery, {
      endDate: to,
      filterQuery: filterQuery,
      skip: isInitializing,
      sourceId: sourceId,
      startDate: from
    }, function (_ref3) {
      var kpiNetwork = _ref3.kpiNetwork,
          loading = _ref3.loading,
          id = _ref3.id,
          inspect = _ref3.inspect,
          refetch = _ref3.refetch;
      return _react.default.createElement(KpiNetworkComponentManage, {
        id: id,
        inspect: inspect,
        setQuery: setQuery,
        refetch: refetch,
        data: kpiNetwork,
        loading: loading,
        from: from,
        to: to,
        narrowDateRange: narrowDateRange
      });
    }), capabilitiesFetched && !isInitializing ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_navigation.SiemNavigation, {
      navTabs: (0, _navigation2.navTabsNetwork)(hasMlUserPermissions)
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_navigation2.NetworkRoutes, {
      filterQuery: tabsFilterQuery,
      from: from,
      isInitializing: isInitializing,
      indexPattern: indexPattern,
      setQuery: setQuery,
      setAbsoluteRangeDatePicker: setAbsoluteRangeDatePicker,
      type: _store.networkModel.NetworkType.page,
      to: to,
      networkPagePath: networkPagePath
    })) : _react.default.createElement(_navigation2.NetworkRoutesLoading, null), _react.default.createElement(_eui.EuiSpacer, null))) : _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_header_page.HeaderPage, {
      border: true,
      title: i18n.PAGE_TITLE
    }), _react.default.createElement(_network_empty_page.NetworkEmptyPage, null));
  }), _react.default.createElement(_spy_routes.SpyRoute, null));
});

NetworkComponent.displayName = 'NetworkComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getGlobalQuerySelector = _store.inputsSelectors.globalQuerySelector();

  var getGlobalFiltersQuerySelector = _store.inputsSelectors.globalFiltersQuerySelector();

  var mapStateToProps = function mapStateToProps(state) {
    return {
      query: getGlobalQuerySelector(state),
      filters: getGlobalFiltersQuerySelector(state)
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  setAbsoluteRangeDatePicker: _actions.setAbsoluteRangeDatePicker
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var Network = connector(NetworkComponent);
exports.Network = Network;