"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkRoutes = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _eui = require("@elastic/eui");

var _types = require("../../../graphql/types");

var _score_interval_to_datetime = require("../../../components/ml/score/score_interval_to_datetime");

var _ips_query_tab_body = require("./ips_query_tab_body");

var _countries_query_tab_body = require("./countries_query_tab_body");

var _http_query_tab_body = require("./http_query_tab_body");

var _anomalies_query_tab_body = require("../../../containers/anomalies/anomalies_query_tab_body");

var _anomalies_network_table = require("../../../components/ml/tables/anomalies_network_table");

var _dns_query_tab_body = require("./dns_query_tab_body");

var _conditional_flex_group = require("./conditional_flex_group");

var _types2 = require("./types");

var _tls_query_tab_body = require("./tls_query_tab_body");

var _alerts_query_tab_body = require("./alerts_query_tab_body");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NetworkRoutes = _react.default.memo(function (_ref) {
  var networkPagePath = _ref.networkPagePath,
      type = _ref.type,
      to = _ref.to,
      filterQuery = _ref.filterQuery,
      isInitializing = _ref.isInitializing,
      from = _ref.from,
      indexPattern = _ref.indexPattern,
      setQuery = _ref.setQuery,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker;
  var narrowDateRange = (0, _react.useCallback)(function (score, interval) {
    var fromTo = (0, _score_interval_to_datetime.scoreIntervalToDateTime)(score, interval);
    setAbsoluteRangeDatePicker({
      id: 'global',
      from: fromTo.from,
      to: fromTo.to
    });
  }, [setAbsoluteRangeDatePicker]);
  var updateDateRange = (0, _react.useCallback)(function (min, max) {
    setAbsoluteRangeDatePicker({
      id: 'global',
      from: min,
      to: max
    });
  }, [setAbsoluteRangeDatePicker]);
  var networkAnomaliesFilterQuery = {
    bool: {
      should: [{
        exists: {
          field: 'source.ip'
        }
      }, {
        exists: {
          field: 'destination.ip'
        }
      }],
      minimum_should_match: 1
    }
  };
  var commonProps = {
    startDate: from,
    endDate: to,
    skip: isInitializing,
    type: type,
    narrowDateRange: narrowDateRange,
    setQuery: setQuery,
    filterQuery: filterQuery
  };

  var tabProps = _objectSpread({}, commonProps, {
    indexPattern: indexPattern,
    updateDateRange: updateDateRange
  });

  var anomaliesProps = _objectSpread({}, commonProps, {
    anomaliesFilterQuery: networkAnomaliesFilterQuery,
    AnomaliesTableComponent: _anomalies_network_table.AnomaliesNetworkTable
  });

  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(networkPagePath, "/:tabName(").concat(_types2.NetworkRouteType.dns, ")")
  }, _react.default.createElement(_dns_query_tab_body.DnsQueryTabBody, tabProps)), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(networkPagePath, "/:tabName(").concat(_types2.NetworkRouteType.flows, ")")
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_conditional_flex_group.ConditionalFlexGroup, {
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_ips_query_tab_body.IPsQueryTabBody, _extends({}, tabProps, {
    flowTarget: _types.FlowTargetSourceDest.source
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_ips_query_tab_body.IPsQueryTabBody, _extends({}, tabProps, {
    flowTarget: _types.FlowTargetSourceDest.destination
  })))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_conditional_flex_group.ConditionalFlexGroup, {
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_countries_query_tab_body.CountriesQueryTabBody, _extends({}, tabProps, {
    flowTarget: _types.FlowTargetSourceDest.source
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_countries_query_tab_body.CountriesQueryTabBody, _extends({}, tabProps, {
    flowTarget: _types.FlowTargetSourceDest.destination
  })))))), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(networkPagePath, "/:tabName(").concat(_types2.NetworkRouteType.http, ")")
  }, _react.default.createElement(_http_query_tab_body.HttpQueryTabBody, tabProps)), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(networkPagePath, "/:tabName(").concat(_types2.NetworkRouteType.tls, ")")
  }, _react.default.createElement(_tls_query_tab_body.TlsQueryTabBody, _extends({}, tabProps, {
    flowTarget: _types.FlowTargetSourceDest.source
  }))), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(networkPagePath, "/:tabName(").concat(_types2.NetworkRouteType.anomalies, ")")
  }, _react.default.createElement(_anomalies_query_tab_body.AnomaliesQueryTabBody, _extends({}, anomaliesProps, {
    AnomaliesTableComponent: _anomalies_network_table.AnomaliesNetworkTable
  }))), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(networkPagePath, "/:tabName(").concat(_types2.NetworkRouteType.alerts, ")")
  }, _react.default.createElement(_alerts_query_tab_body.NetworkAlertsQueryTabBody, tabProps)));
});

exports.NetworkRoutes = NetworkRoutes;
NetworkRoutes.displayName = 'NetworkRoutes';