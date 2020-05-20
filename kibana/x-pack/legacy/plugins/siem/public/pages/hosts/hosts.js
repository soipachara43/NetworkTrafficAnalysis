"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hosts = exports.HostsComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactSticky = require("react-sticky");

var _reactRouterDom = require("react-router-dom");

var _filters_global = require("../../components/filters_global");

var _header_page = require("../../components/header_page");

var _last_event_time = require("../../components/last_event_time");

var _has_ml_user_permissions = require("../../components/ml/permissions/has_ml_user_permissions");

var _navigation = require("../../components/navigation");

var _hosts = require("../../components/page/hosts");

var _manage_query = require("../../components/page/manage_query");

var _search_bar = require("../../components/search_bar");

var _wrapper_page = require("../../components/wrapper_page");

var _kpi_hosts = require("../../containers/kpi_hosts");

var _source = require("../../containers/source");

var _types = require("../../graphql/types");

var _kibana = require("../../lib/kibana");

var _keury = require("../../lib/keury");

var _store = require("../../store");

var _actions = require("../../store/inputs/actions");

var _spy_routes = require("../../utils/route/spy_routes");

var _public = require("../../../../../../../src/plugins/data/public");

var _use_ml_capabilities = require("../../components/ml_popover/hooks/use_ml_capabilities");

var _hosts_empty_page = require("./hosts_empty_page");

var _hosts_tabs = require("./hosts_tabs");

var _nav_tabs = require("./nav_tabs");

var i18n = _interopRequireWildcard(require("./translations"));

var _navigation2 = require("./navigation");

var _model = require("../../store/hosts/model");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var KpiHostsComponentManage = (0, _manage_query.manageQuery)(_hosts.KpiHostsComponent);

var HostsComponent = _react.default.memo(function (_ref) {
  var deleteQuery = _ref.deleteQuery,
      isInitializing = _ref.isInitializing,
      filters = _ref.filters,
      from = _ref.from,
      query = _ref.query,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker,
      setQuery = _ref.setQuery,
      to = _ref.to,
      hostsPagePath = _ref.hostsPagePath;
  var capabilities = (0, _use_ml_capabilities.useMlCapabilities)();
  var kibana = (0, _kibana.useKibana)();

  var _useParams = (0, _reactRouterDom.useParams)(),
      tabName = _useParams.tabName;

  var tabsFilters = _react.default.useMemo(function () {
    if (tabName === _model.HostsTableType.alerts) {
      return filters.length > 0 ? [].concat(_toConsumableArray(filters), _toConsumableArray(_navigation2.filterHostData)) : _navigation2.filterHostData;
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
    sourceId: "default"
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
        indexKey: _types.LastEventIndexKey.hosts
      }),
      title: i18n.PAGE_TITLE
    }), _react.default.createElement(_kpi_hosts.KpiHostsQuery, {
      endDate: to,
      filterQuery: filterQuery,
      skip: isInitializing,
      sourceId: "default",
      startDate: from
    }, function (_ref3) {
      var kpiHosts = _ref3.kpiHosts,
          loading = _ref3.loading,
          id = _ref3.id,
          inspect = _ref3.inspect,
          refetch = _ref3.refetch;
      return _react.default.createElement(KpiHostsComponentManage, {
        data: kpiHosts,
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
      navTabs: (0, _nav_tabs.navTabsHosts)((0, _has_ml_user_permissions.hasMlUserPermissions)(capabilities))
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_hosts_tabs.HostsTabs, {
      deleteQuery: deleteQuery,
      to: to,
      filterQuery: tabsFilterQuery,
      isInitializing: isInitializing,
      setAbsoluteRangeDatePicker: setAbsoluteRangeDatePicker,
      setQuery: setQuery,
      from: from,
      type: _store.hostsModel.HostsType.page,
      indexPattern: indexPattern,
      hostsPagePath: hostsPagePath
    }))) : _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_header_page.HeaderPage, {
      border: true,
      title: i18n.PAGE_TITLE
    }), _react.default.createElement(_hosts_empty_page.HostsEmptyPage, null));
  }), _react.default.createElement(_spy_routes.SpyRoute, null));
});

exports.HostsComponent = HostsComponent;
HostsComponent.displayName = 'HostsComponent';

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
var Hosts = connector(HostsComponent);
exports.Hosts = Hosts;