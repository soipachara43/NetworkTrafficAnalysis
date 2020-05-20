"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailView = DetailView;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _lodash = require("lodash");

var _variables = require("../../../../style/variables");

var _DiscoverErrorLink = require("../../../shared/Links/DiscoverLinks/DiscoverErrorLink");

var _url_helpers = require("../../../shared/Links/url_helpers");

var _history = require("../../../../utils/history");

var _ErrorMetadata = require("../../../shared/MetadataTable/ErrorMetadata");

var _Stacktrace = require("../../../shared/Stacktrace");

var _ErrorTabs = require("./ErrorTabs");

var _Summary = require("../../../shared/Summary");

var _TimestampTooltip = require("../../../shared/TimestampTooltip");

var _HttpInfoSummaryItem = require("../../../shared/Summary/HttpInfoSummaryItem");

var _TransactionDetailLink = require("../../../shared/Links/apm/TransactionDetailLink");

var _UserAgentSummaryItem = require("../../../shared/Summary/UserAgentSummaryItem");

var _ExceptionStacktrace = require("./ExceptionStacktrace");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeaderContainer = _styledComponents.default.div.withConfig({
  displayName: "HeaderContainer",
  componentId: "a860kg-0"
})(["display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:", ";"], (0, _variables.px)(_variables.unit));

var TransactionLinkName = _styledComponents.default.div.withConfig({
  displayName: "TransactionLinkName",
  componentId: "a860kg-1"
})(["margin-left:", ";display:inline-block;vertical-align:middle;"], (0, _variables.px)(_variables.units.half));

// TODO: Move query-string-based tabs into a re-usable component?
function getCurrentTab() {
  var tabs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var currentTabKey = arguments.length > 1 ? arguments[1] : undefined;
  var selectedTab = tabs.find(function (_ref) {
    var key = _ref.key;
    return key === currentTabKey;
  });
  return selectedTab ? selectedTab : (0, _lodash.first)(tabs) || {};
}

function DetailView(_ref2) {
  var _error$error$page, _error$url, _error$http, _error$http$request, _error$http2, _error$http2$response;

  var errorGroup = _ref2.errorGroup,
      urlParams = _ref2.urlParams,
      location = _ref2.location;
  var transaction = errorGroup.transaction,
      error = errorGroup.error,
      occurrencesCount = errorGroup.occurrencesCount;

  if (!error) {
    return null;
  }

  var tabs = (0, _ErrorTabs.getTabs)(error);
  var currentTab = getCurrentTab(tabs, urlParams.detailTab);
  var errorUrl = ((_error$error$page = error.error.page) === null || _error$error$page === void 0 ? void 0 : _error$error$page.url) || ((_error$url = error.url) === null || _error$url === void 0 ? void 0 : _error$url.full);
  var method = (_error$http = error.http) === null || _error$http === void 0 ? void 0 : (_error$http$request = _error$http.request) === null || _error$http$request === void 0 ? void 0 : _error$http$request.method;
  var status = (_error$http2 = error.http) === null || _error$http2 === void 0 ? void 0 : (_error$http2$response = _error$http2.response) === null || _error$http2$response === void 0 ? void 0 : _error$http2$response.status_code;
  return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(HeaderContainer, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.errorGroupDetails.errorOccurrenceTitle', {
    defaultMessage: 'Error occurrence'
  }))), _react.default.createElement(_DiscoverErrorLink.DiscoverErrorLink, {
    error: error,
    kuery: urlParams.kuery
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "discoverApp"
  }, _i18n.i18n.translate('xpack.apm.errorGroupDetails.viewOccurrencesInDiscoverButtonLabel', {
    defaultMessage: 'View {occurrencesCount} {occurrencesCount, plural, one {occurrence} other {occurrences}} in Discover.',
    values: {
      occurrencesCount: occurrencesCount
    }
  })))), _react.default.createElement(_Summary.Summary, {
    items: [_react.default.createElement(_TimestampTooltip.TimestampTooltip, {
      time: error.timestamp.us / 1000
    }), errorUrl && method ? _react.default.createElement(_HttpInfoSummaryItem.HttpInfoSummaryItem, {
      url: errorUrl,
      method: method,
      status: status
    }) : null, transaction && transaction.user_agent ? _react.default.createElement(_UserAgentSummaryItem.UserAgentSummaryItem, transaction.user_agent) : null, transaction && _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.apm.errorGroupDetails.relatedTransactionSample', {
        defaultMessage: 'Related transaction sample'
      })
    }, _react.default.createElement(_TransactionDetailLink.TransactionDetailLink, {
      traceId: transaction.trace.id,
      transactionId: transaction.transaction.id,
      transactionName: transaction.transaction.name,
      transactionType: transaction.transaction.type,
      serviceName: transaction.service.name
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "merge"
    }), _react.default.createElement(TransactionLinkName, null, transaction.transaction.name)))]
  }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTabs, null, tabs.map(function (_ref3) {
    var key = _ref3.key,
        label = _ref3.label;
    return _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        _history.history.replace(_objectSpread({}, location, {
          search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(location.search), {
            detailTab: key
          }))
        }));
      },
      isSelected: currentTab.key === key,
      key: key
    }, label);
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(TabContent, {
    error: error,
    currentTab: currentTab
  }));
}

function TabContent(_ref4) {
  var _error$service$langua, _error$error$log;

  var error = _ref4.error,
      currentTab = _ref4.currentTab;
  var codeLanguage = (_error$service$langua = error.service.language) === null || _error$service$langua === void 0 ? void 0 : _error$service$langua.name;
  var exceptions = error.error.exception || [];
  var logStackframes = (_error$error$log = error.error.log) === null || _error$error$log === void 0 ? void 0 : _error$error$log.stacktrace;

  switch (currentTab.key) {
    case _ErrorTabs.logStacktraceTab.key:
      return _react.default.createElement(_Stacktrace.Stacktrace, {
        stackframes: logStackframes,
        codeLanguage: codeLanguage
      });

    case _ErrorTabs.exceptionStacktraceTab.key:
      return _react.default.createElement(_ExceptionStacktrace.ExceptionStacktrace, {
        codeLanguage: codeLanguage,
        exceptions: exceptions
      });

    default:
      return _react.default.createElement(_ErrorMetadata.ErrorMetadata, {
        error: error
      });
  }
}