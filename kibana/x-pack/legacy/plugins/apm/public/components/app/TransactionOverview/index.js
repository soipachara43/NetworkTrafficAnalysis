"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionOverview = TransactionOverview;

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _useTransactionList2 = require("../../../hooks/useTransactionList");

var _useTransactionCharts2 = require("../../../hooks/useTransactionCharts");

var _TransactionCharts = require("../../shared/charts/TransactionCharts");

var _TransactionBreakdown = require("../../shared/TransactionBreakdown");

var _List = require("./List");

var _useRedirect = require("./useRedirect");

var _useFetcher2 = require("../../../hooks/useFetcher");

var _ml = require("../../../services/rest/ml");

var _history = require("../../../utils/history");

var _useLocation = require("../../../hooks/useLocation");

var _ChartsSyncContext = require("../../../context/ChartsSyncContext");

var _public = require("../../../../../../../plugins/observability/public");

var _url_helpers = require("../../shared/Links/url_helpers");

var _LocalUIFilters = require("../../shared/LocalUIFilters");

var _typings = require("../../../../../../../plugins/apm/common/projections/typings");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _useServiceTransactionTypes = require("../../../hooks/useServiceTransactionTypes");

var _TransactionTypeFilter = require("../../shared/LocalUIFilters/TransactionTypeFilter");

var _useApmPluginContext = require("../../../hooks/useApmPluginContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRedirectLocation(_ref) {
  var urlParams = _ref.urlParams,
      location = _ref.location,
      serviceTransactionTypes = _ref.serviceTransactionTypes;
  var transactionType = urlParams.transactionType;
  var firstTransactionType = (0, _lodash.first)(serviceTransactionTypes);

  if (!transactionType && firstTransactionType) {
    return _objectSpread({}, location, {
      search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(location.search), {
        transactionType: firstTransactionType
      }))
    });
  }
}

function TransactionOverview() {
  var location = (0, _useLocation.useLocation)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var serviceName = urlParams.serviceName,
      transactionType = urlParams.transactionType; // TODO: fetching of transaction types should perhaps be lifted since it is needed in several places. Context?

  var serviceTransactionTypes = (0, _useServiceTransactionTypes.useServiceTransactionTypes)(urlParams); // redirect to first transaction type

  (0, _useRedirect.useRedirect)(_history.history, getRedirectLocation({
    urlParams: urlParams,
    location: location,
    serviceTransactionTypes: serviceTransactionTypes
  }));

  var _useTransactionCharts = (0, _useTransactionCharts2.useTransactionCharts)(),
      transactionCharts = _useTransactionCharts.data;

  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'transaction_overview'
  });
  (0, _public.useTrackPageview)({
    app: 'apm',
    path: 'transaction_overview',
    delay: 15000
  });

  var _useTransactionList = (0, _useTransactionList2.useTransactionList)(urlParams),
      transactionListData = _useTransactionList.data,
      transactionListStatus = _useTransactionList.status;

  var http = (0, _useApmPluginContext.useApmPluginContext)().core.http;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function () {
    if (serviceName && transactionType) {
      return (0, _ml.getHasMLJob)({
        serviceName: serviceName,
        transactionType: transactionType,
        http: http
      });
    }
  }, [http, serviceName, transactionType]),
      _useFetcher$data = _useFetcher.data,
      hasMLJob = _useFetcher$data === void 0 ? false : _useFetcher$data;

  var localFiltersConfig = (0, _react.useMemo)(function () {
    return {
      filterNames: ['transactionResult', 'host', 'containerId', 'podName', 'serviceVersion'],
      params: {
        serviceName: serviceName,
        transactionType: transactionType
      },
      projection: _typings.PROJECTION.TRANSACTION_GROUPS
    };
  }, [serviceName, transactionType]); // TODO: improve urlParams typings.
  // `serviceName` or `transactionType` will never be undefined here, and this check should not be needed

  if (!serviceName || !transactionType) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_LocalUIFilters.LocalUIFilters, localFiltersConfig, _react.default.createElement(_TransactionTypeFilter.TransactionTypeFilter, {
    transactionTypes: serviceTransactionTypes
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "none"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 7
  }, _react.default.createElement(_ChartsSyncContext.ChartsSyncContextProvider, null, _react.default.createElement(_TransactionBreakdown.TransactionBreakdown, {
    initialIsOpen: true
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_TransactionCharts.TransactionCharts, {
    hasMLJob: hasMLJob,
    charts: transactionCharts,
    location: location,
    urlParams: urlParams
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, "Transactions")), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_List.TransactionList, {
    isLoading: transactionListStatus === 'loading',
    items: transactionListData
  })))));
}