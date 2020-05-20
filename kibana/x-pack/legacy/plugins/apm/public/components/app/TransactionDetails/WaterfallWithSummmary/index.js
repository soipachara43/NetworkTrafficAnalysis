"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaterfallWithSummmary = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _history = require("../../../../utils/history");

var _url_helpers = require("../../../shared/Links/url_helpers");

var _LoadingStatePrompt = require("../../../shared/LoadingStatePrompt");

var _TransactionSummary = require("../../../shared/Summary/TransactionSummary");

var _TransactionActionMenu = require("../../../shared/TransactionActionMenu/TransactionActionMenu");

var _MaybeViewTraceLink = require("./MaybeViewTraceLink");

var _TransactionTabs = require("./TransactionTabs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WaterfallWithSummmary = function WaterfallWithSummmary(_ref) {
  var _waterfall$rootTransa;

  var urlParams = _ref.urlParams,
      location = _ref.location,
      waterfall = _ref.waterfall,
      exceedsMax = _ref.exceedsMax,
      isLoading = _ref.isLoading,
      traceSamples = _ref.traceSamples;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      sampleActivePage = _useState2[0],
      setSampleActivePage = _useState2[1];

  (0, _react.useEffect)(function () {
    setSampleActivePage(0);
  }, [traceSamples]);

  var goToSample = function goToSample(index) {
    setSampleActivePage(index);
    var sample = traceSamples[index];

    _history.history.push(_objectSpread({}, _history.history.location, {
      search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(_history.history.location.search), {
        transactionId: sample.transactionId,
        traceId: sample.traceId
      }))
    }));
  };

  var entryTransaction = waterfall.entryTransaction;

  if (!entryTransaction) {
    var content = isLoading ? _react.default.createElement(_LoadingStatePrompt.LoadingStatePrompt, null) : _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: _react.default.createElement("div", null, _i18n.i18n.translate('xpack.apm.transactionDetails.traceNotFound', {
        defaultMessage: 'The selected trace cannot be found'
      })),
      titleSize: "s"
    });
    return _react.default.createElement(_eui.EuiPanel, {
      paddingSize: "m"
    }, content);
  }

  return _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h5", null, _i18n.i18n.translate('xpack.apm.transactionDetails.traceSampleTitle', {
    defaultMessage: 'Trace sample'
  }))), traceSamples && _react.default.createElement(_eui.EuiPagination, {
    pageCount: traceSamples.length,
    activePage: sampleActivePage,
    onPageClick: goToSample,
    compressed: true
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_TransactionActionMenu.TransactionActionMenu, {
    transaction: entryTransaction
  })), _react.default.createElement(_MaybeViewTraceLink.MaybeViewTraceLink, {
    transaction: entryTransaction,
    waterfall: waterfall
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_TransactionSummary.TransactionSummary, {
    errorCount: waterfall.errorsCount,
    totalDuration: (_waterfall$rootTransa = waterfall.rootTransaction) === null || _waterfall$rootTransa === void 0 ? void 0 : _waterfall$rootTransa.transaction.duration.us,
    transaction: entryTransaction
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_TransactionTabs.TransactionTabs, {
    transaction: entryTransaction,
    location: location,
    urlParams: urlParams,
    waterfall: waterfall,
    exceedsMax: exceedsMax
  }));
};

exports.WaterfallWithSummmary = WaterfallWithSummmary;