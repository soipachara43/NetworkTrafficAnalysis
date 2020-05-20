"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = DatePicker;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _url_helpers = require("../Links/url_helpers");

var _history = require("../../../utils/history");

var _useLocation = require("../../../hooks/useLocation");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _callApi = require("../../../services/rest/callApi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DatePicker() {
  var location = (0, _useLocation.useLocation)();

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams,
      refreshTimeRange = _useUrlParams.refreshTimeRange;

  var commonlyUsedRanges = [{
    start: 'now-15m',
    end: 'now',
    label: _i18n.i18n.translate('xpack.apm.datePicker.last15MinutesLabel', {
      defaultMessage: 'Last 15 minutes'
    })
  }, {
    start: 'now-30m',
    end: 'now',
    label: _i18n.i18n.translate('xpack.apm.datePicker.last30MinutesLabel', {
      defaultMessage: 'Last 30 minutes'
    })
  }, {
    start: 'now-1h',
    end: 'now',
    label: _i18n.i18n.translate('xpack.apm.datePicker.last1HourLabel', {
      defaultMessage: 'Last 1 hour'
    })
  }, {
    start: 'now-24h',
    end: 'now',
    label: _i18n.i18n.translate('xpack.apm.datePicker.last24HoursLabel', {
      defaultMessage: 'Last 24 hours'
    })
  }, {
    start: 'now-7d',
    end: 'now',
    label: _i18n.i18n.translate('xpack.apm.datePicker.last7DaysLabel', {
      defaultMessage: 'Last 7 days'
    })
  }, {
    start: 'now-30d',
    end: 'now',
    label: _i18n.i18n.translate('xpack.apm.datePicker.last30DaysLabel', {
      defaultMessage: 'Last 30 days'
    })
  }, {
    start: 'now-90d',
    end: 'now',
    label: _i18n.i18n.translate('xpack.apm.datePicker.last90DaysLabel', {
      defaultMessage: 'Last 90 days'
    })
  }, {
    start: 'now-1y',
    end: 'now',
    label: _i18n.i18n.translate('xpack.apm.datePicker.last1YearLabel', {
      defaultMessage: 'Last 1 year'
    })
  }];

  function updateUrl(nextQuery) {
    _history.history.push(_objectSpread({}, location, {
      search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(location.search), {}, nextQuery))
    }));
  }

  function onRefreshChange(_ref) {
    var isPaused = _ref.isPaused,
        refreshInterval = _ref.refreshInterval;
    updateUrl({
      refreshPaused: isPaused,
      refreshInterval: refreshInterval
    });
  }

  function onTimeChange(_ref2) {
    var start = _ref2.start,
        end = _ref2.end;
    updateUrl({
      rangeFrom: start,
      rangeTo: end
    });
  }

  var rangeFrom = urlParams.rangeFrom,
      rangeTo = urlParams.rangeTo,
      refreshPaused = urlParams.refreshPaused,
      refreshInterval = urlParams.refreshInterval;
  return _react.default.createElement(_eui.EuiSuperDatePicker, {
    start: rangeFrom,
    end: rangeTo,
    isPaused: refreshPaused,
    refreshInterval: refreshInterval,
    onTimeChange: onTimeChange,
    onRefresh: function onRefresh(_ref3) {
      var start = _ref3.start,
          end = _ref3.end;
      (0, _callApi.clearCache)();
      refreshTimeRange({
        rangeFrom: start,
        rangeTo: end
      });
    },
    onRefreshChange: onRefreshChange,
    showUpdateButton: true,
    commonlyUsedRanges: commonlyUsedRanges
  });
}