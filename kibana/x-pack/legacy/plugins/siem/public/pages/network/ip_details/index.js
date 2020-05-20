"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getBreadcrumbs", {
  enumerable: true,
  get: function get() {
    return _utils.getBreadcrumbs;
  }
});
exports.IPDetails = exports.connector = exports.IPDetailsComponent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactSticky = require("react-sticky");

var _filters_global = require("../../../components/filters_global");

var _header_page = require("../../../components/header_page");

var _last_event_time = require("../../../components/last_event_time");

var _anomaly_table_provider = require("../../../components/ml/anomaly/anomaly_table_provider");

var _network_to_criteria = require("../../../components/ml/criteria/network_to_criteria");

var _score_interval_to_datetime = require("../../../components/ml/score/score_interval_to_datetime");

var _anomalies_network_table = require("../../../components/ml/tables/anomalies_network_table");

var _manage_query = require("../../../components/page/manage_query");

var _flow_target_select_connected = require("../../../components/page/network/flow_target_select_connected");

var _ip_overview = require("../../../components/page/network/ip_overview");

var _search_bar = require("../../../components/search_bar");

var _wrapper_page = require("../../../components/wrapper_page");

var _ip_overview2 = require("../../../containers/ip_overview");

var _source = require("../../../containers/source");

var _types = require("../../../graphql/types");

var _kibana = require("../../../lib/kibana");

var _helpers = require("../../../lib/helpers");

var _keury = require("../../../lib/keury");

var _conditional_flex_group = require("../../../pages/network/navigation/conditional_flex_group");

var _store = require("../../../store");

var _actions = require("../../../store/inputs/actions");

var _actions2 = require("../../../store/network/actions");

var _spy_routes = require("../../../utils/route/spy_routes");

var _network_empty_page = require("../network_empty_page");

var _network_http_query_table = require("./network_http_query_table");

var _network_top_countries_query_table = require("./network_top_countries_query_table");

var _network_top_n_flow_query_table = require("./network_top_n_flow_query_table");

var _tls_query_table = require("./tls_query_table");

var _users_query_table = require("./users_query_table");

var _anomalies_query_tab_body = require("../../../containers/anomalies/anomalies_query_tab_body");

var _public = require("../../../../../../../../src/plugins/data/public");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IpOverviewManage = (0, _manage_query.manageQuery)(_ip_overview.IpOverview);

var IPDetailsComponent = function IPDetailsComponent(_ref) {
  var detailName = _ref.detailName,
      filters = _ref.filters,
      flowTarget = _ref.flowTarget,
      from = _ref.from,
      isInitializing = _ref.isInitializing,
      query = _ref.query,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker,
      setIpDetailsTablesActivePageToZero = _ref.setIpDetailsTablesActivePageToZero,
      setQuery = _ref.setQuery,
      to = _ref.to;
  var type = _store.networkModel.NetworkType.details;
  var narrowDateRange = (0, _react.useCallback)(function (score, interval) {
    var fromTo = (0, _score_interval_to_datetime.scoreIntervalToDateTime)(score, interval);
    setAbsoluteRangeDatePicker({
      id: 'global',
      from: fromTo.from,
      to: fromTo.to
    });
  }, [setAbsoluteRangeDatePicker]);
  var kibana = (0, _kibana.useKibana)();
  (0, _react.useEffect)(function () {
    setIpDetailsTablesActivePageToZero();
  }, [detailName, setIpDetailsTablesActivePageToZero]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_source.WithSource, {
    sourceId: "default",
    "data-test-subj": "ip-details-page"
  }, function (_ref2) {
    var indicesExist = _ref2.indicesExist,
        indexPattern = _ref2.indexPattern;
    var ip = (0, _helpers.decodeIpv6)(detailName);
    var filterQuery = (0, _keury.convertToBuildEsQuery)({
      config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
      indexPattern: indexPattern,
      queries: [query],
      filters: filters
    });
    return (0, _source.indicesExistOrDataTemporarilyUnavailable)(indicesExist) ? _react.default.createElement(_reactSticky.StickyContainer, null, _react.default.createElement(_filters_global.FiltersGlobal, null, _react.default.createElement(_search_bar.SiemSearchBar, {
      indexPattern: indexPattern,
      id: "global"
    })), _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_header_page.HeaderPage, {
      border: true,
      "data-test-subj": "ip-details-headline",
      draggableArguments: {
        field: "".concat(flowTarget, ".ip"),
        value: ip
      },
      subtitle: _react.default.createElement(_last_event_time.LastEventTime, {
        indexKey: _types.LastEventIndexKey.ipDetails,
        ip: ip
      }),
      title: ip
    }, _react.default.createElement(_flow_target_select_connected.FlowTargetSelectConnected, {
      flowTarget: flowTarget
    })), _react.default.createElement(_ip_overview2.IpOverviewQuery, {
      skip: isInitializing,
      sourceId: "default",
      filterQuery: filterQuery,
      type: type,
      ip: ip
    }, function (_ref3) {
      var id = _ref3.id,
          inspect = _ref3.inspect,
          ipOverviewData = _ref3.ipOverviewData,
          loading = _ref3.loading,
          refetch = _ref3.refetch;
      return _react.default.createElement(_anomaly_table_provider.AnomalyTableProvider, {
        criteriaFields: (0, _network_to_criteria.networkToCriteria)(detailName, flowTarget),
        startDate: from,
        endDate: to,
        skip: isInitializing
      }, function (_ref4) {
        var isLoadingAnomaliesData = _ref4.isLoadingAnomaliesData,
            anomaliesData = _ref4.anomaliesData;
        return _react.default.createElement(IpOverviewManage, {
          id: id,
          inspect: inspect,
          ip: ip,
          data: ipOverviewData,
          anomaliesData: anomaliesData,
          loading: loading,
          isLoadingAnomaliesData: isLoadingAnomaliesData,
          type: type,
          flowTarget: flowTarget,
          refetch: refetch,
          setQuery: setQuery,
          startDate: from,
          endDate: to,
          narrowDateRange: narrowDateRange
        });
      });
    }), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_conditional_flex_group.ConditionalFlexGroup, {
      direction: "column"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_network_top_n_flow_query_table.NetworkTopNFlowQueryTable, {
      endDate: to,
      filterQuery: filterQuery,
      flowTarget: _types.FlowTargetSourceDest.source,
      ip: ip,
      skip: isInitializing,
      startDate: from,
      type: type,
      setQuery: setQuery,
      indexPattern: indexPattern
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_network_top_n_flow_query_table.NetworkTopNFlowQueryTable, {
      endDate: to,
      flowTarget: _types.FlowTargetSourceDest.destination,
      filterQuery: filterQuery,
      ip: ip,
      skip: isInitializing,
      startDate: from,
      type: type,
      setQuery: setQuery,
      indexPattern: indexPattern
    }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_conditional_flex_group.ConditionalFlexGroup, {
      direction: "column"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_network_top_countries_query_table.NetworkTopCountriesQueryTable, {
      endDate: to,
      filterQuery: filterQuery,
      flowTarget: _types.FlowTargetSourceDest.source,
      ip: ip,
      skip: isInitializing,
      startDate: from,
      type: type,
      setQuery: setQuery,
      indexPattern: indexPattern
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_network_top_countries_query_table.NetworkTopCountriesQueryTable, {
      endDate: to,
      flowTarget: _types.FlowTargetSourceDest.destination,
      filterQuery: filterQuery,
      ip: ip,
      skip: isInitializing,
      startDate: from,
      type: type,
      setQuery: setQuery,
      indexPattern: indexPattern
    }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_users_query_table.UsersQueryTable, {
      endDate: to,
      filterQuery: filterQuery,
      flowTarget: flowTarget,
      ip: ip,
      skip: isInitializing,
      startDate: from,
      type: type,
      setQuery: setQuery
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_network_http_query_table.NetworkHttpQueryTable, {
      endDate: to,
      filterQuery: filterQuery,
      ip: ip,
      skip: isInitializing,
      startDate: from,
      type: type,
      setQuery: setQuery
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_tls_query_table.TlsQueryTable, {
      endDate: to,
      filterQuery: filterQuery,
      flowTarget: flowTarget,
      ip: ip,
      setQuery: setQuery,
      skip: isInitializing,
      startDate: from,
      type: type
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_anomalies_query_tab_body.AnomaliesQueryTabBody, {
      filterQuery: filterQuery,
      setQuery: setQuery,
      startDate: from,
      endDate: to,
      skip: isInitializing,
      ip: ip,
      type: type,
      flowTarget: flowTarget,
      narrowDateRange: narrowDateRange,
      hideHistogramIfEmpty: true,
      AnomaliesTableComponent: _anomalies_network_table.AnomaliesNetworkTable
    }))) : _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_header_page.HeaderPage, {
      border: true,
      title: ip
    }), _react.default.createElement(_network_empty_page.NetworkEmptyPage, null));
  }), _react.default.createElement(_spy_routes.SpyRoute, null));
};

exports.IPDetailsComponent = IPDetailsComponent;
IPDetailsComponent.displayName = 'IPDetailsComponent';

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

var mapDispatchToProps = {
  setAbsoluteRangeDatePicker: _actions.setAbsoluteRangeDatePicker,
  setIpDetailsTablesActivePageToZero: _actions2.setIpDetailsTablesActivePageToZero
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
exports.connector = connector;
var IPDetails = connector(_react.default.memo(IPDetailsComponent));
exports.IPDetails = IPDetails;