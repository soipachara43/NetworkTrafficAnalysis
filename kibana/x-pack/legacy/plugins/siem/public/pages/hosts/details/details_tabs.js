"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostDetailsTabs = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _score_interval_to_datetime = require("../../../components/ml/score/score_interval_to_datetime");

var _model = require("../../../store/hosts/model");

var _anomalies_query_tab_body = require("../../../containers/anomalies/anomalies_query_tab_body");

var _anomalies_host_table = require("../../../components/ml/tables/anomalies_host_table");

var _utils = require("./utils");

var _navigation = require("../navigation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HostDetailsTabs = _react.default.memo(function (_ref) {
  var pageFilters = _ref.pageFilters,
      deleteQuery = _ref.deleteQuery,
      filterQuery = _ref.filterQuery,
      from = _ref.from,
      isInitializing = _ref.isInitializing,
      detailName = _ref.detailName,
      setAbsoluteRangeDatePicker = _ref.setAbsoluteRangeDatePicker,
      setQuery = _ref.setQuery,
      to = _ref.to,
      indexPattern = _ref.indexPattern,
      hostDetailsPagePath = _ref.hostDetailsPagePath;
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
  var tabProps = {
    deleteQuery: deleteQuery,
    endDate: to,
    filterQuery: filterQuery,
    skip: isInitializing,
    setQuery: setQuery,
    startDate: from,
    type: _utils.type,
    indexPattern: indexPattern,
    hostName: detailName,
    narrowDateRange: narrowDateRange,
    updateDateRange: updateDateRange
  };
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(hostDetailsPagePath, "/:tabName(").concat(_model.HostsTableType.authentications, ")")
  }, _react.default.createElement(_navigation.AuthenticationsQueryTabBody, tabProps)), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(hostDetailsPagePath, "/:tabName(").concat(_model.HostsTableType.hosts, ")")
  }, _react.default.createElement(_navigation.HostsQueryTabBody, tabProps)), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(hostDetailsPagePath, "/:tabName(").concat(_model.HostsTableType.uncommonProcesses, ")")
  }, _react.default.createElement(_navigation.UncommonProcessQueryTabBody, tabProps)), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(hostDetailsPagePath, "/:tabName(").concat(_model.HostsTableType.anomalies, ")")
  }, _react.default.createElement(_anomalies_query_tab_body.AnomaliesQueryTabBody, _extends({}, tabProps, {
    AnomaliesTableComponent: _anomalies_host_table.AnomaliesHostTable
  }))), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(hostDetailsPagePath, "/:tabName(").concat(_model.HostsTableType.events, ")")
  }, _react.default.createElement(_navigation.EventsQueryTabBody, _extends({}, tabProps, {
    pageFilters: pageFilters
  }))), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(hostDetailsPagePath, "/:tabName(").concat(_model.HostsTableType.alerts, ")")
  }, _react.default.createElement(_navigation.HostAlertsQueryTabBody, _extends({}, tabProps, {
    pageFilters: pageFilters
  }))));
});

exports.HostDetailsTabs = HostDetailsTabs;
HostDetailsTabs.displayName = 'HostDetailsTabs';