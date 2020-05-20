"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DnsQueryTabBody = exports.histogramConfigs = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var _network_dns_table = require("../../../components/page/network/network_dns_table");

var _network_dns = require("../../../containers/network_dns");

var _manage_query = require("../../../components/page/manage_query");

var _store = require("../../../store");

var i18n = _interopRequireWildcard(require("../translations"));

var _matrix_histogram = require("../../../components/matrix_histogram");

var _types = require("../../../graphql/types");

var _dnsStackByOptions$fi;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NetworkDnsTableManage = (0, _manage_query.manageQuery)(_network_dns_table.NetworkDnsTable);
var dnsStackByOptions = [{
  text: 'dns.question.registered_domain',
  value: 'dns.question.registered_domain'
}];
var DEFAULT_STACK_BY = 'dns.question.registered_domain';
var histogramConfigs = {
  defaultStackByOption: (_dnsStackByOptions$fi = dnsStackByOptions.find(function (o) {
    return o.text === DEFAULT_STACK_BY;
  })) !== null && _dnsStackByOptions$fi !== void 0 ? _dnsStackByOptions$fi : dnsStackByOptions[0],
  errorMessage: i18n.ERROR_FETCHING_DNS_DATA,
  histogramType: _types.HistogramType.dns,
  stackByOptions: dnsStackByOptions,
  subtitle: undefined
};
exports.histogramConfigs = histogramConfigs;

var DnsQueryTabBody = function DnsQueryTabBody(_ref) {
  var deleteQuery = _ref.deleteQuery,
      endDate = _ref.endDate,
      filterQuery = _ref.filterQuery,
      skip = _ref.skip,
      startDate = _ref.startDate,
      setQuery = _ref.setQuery,
      type = _ref.type;
  (0, _react.useEffect)(function () {
    return function () {
      if (deleteQuery) {
        deleteQuery({
          id: _network_dns.HISTOGRAM_ID
        });
      }
    };
  }, [deleteQuery]);
  var getTitle = (0, _react.useCallback)(function (option) {
    return i18n.DOMAINS_COUNT_BY(option.text);
  }, []);
  var dnsHistogramConfigs = (0, _react.useMemo)(function () {
    return _objectSpread({}, histogramConfigs, {
      title: getTitle
    });
  }, [getTitle]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_matrix_histogram.MatrixHistogramContainer, _extends({
    endDate: endDate,
    filterQuery: filterQuery,
    id: _network_dns.HISTOGRAM_ID,
    setQuery: setQuery,
    showLegend: true,
    sourceId: "default",
    startDate: startDate,
    type: _store.networkModel.NetworkType.page
  }, dnsHistogramConfigs)), _react.default.createElement(_network_dns.NetworkDnsQuery, {
    endDate: endDate,
    filterQuery: filterQuery,
    skip: skip,
    sourceId: "default",
    startDate: startDate,
    type: type
  }, function (_ref2) {
    var totalCount = _ref2.totalCount,
        loading = _ref2.loading,
        networkDns = _ref2.networkDns,
        pageInfo = _ref2.pageInfo,
        loadPage = _ref2.loadPage,
        id = _ref2.id,
        inspect = _ref2.inspect,
        isInspected = _ref2.isInspected,
        refetch = _ref2.refetch;
    return _react.default.createElement(NetworkDnsTableManage, {
      data: networkDns,
      fakeTotalCount: (0, _fp.getOr)(50, 'fakeTotalCount', pageInfo),
      id: id,
      inspect: inspect,
      isInspect: isInspected,
      loading: loading,
      loadPage: loadPage,
      refetch: refetch,
      setQuery: setQuery,
      showMorePagesIndicator: (0, _fp.getOr)(false, 'showMorePagesIndicator', pageInfo),
      totalCount: totalCount,
      type: type
    });
  }));
};

exports.DnsQueryTabBody = DnsQueryTabBody;
DnsQueryTabBody.displayName = 'DNSQueryTabBody';