"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeDatePicker = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("../../hooks");

var _constants = require("../../../common/constants");

var _contexts = require("../../contexts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UptimeDatePicker = function UptimeDatePicker() {
  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 2),
      getUrlParams = _useUrlParams2[0],
      updateUrl = _useUrlParams2[1];

  var _getUrlParams = getUrlParams(),
      autorefreshInterval = _getUrlParams.autorefreshInterval,
      autorefreshIsPaused = _getUrlParams.autorefreshIsPaused,
      dateRangeStart = _getUrlParams.dateRangeStart,
      dateRangeEnd = _getUrlParams.dateRangeEnd;

  var _useContext = (0, _react.useContext)(_contexts.UptimeSettingsContext),
      commonlyUsedRanges = _useContext.commonlyUsedRanges;

  var _useContext2 = (0, _react.useContext)(_contexts.UptimeRefreshContext),
      refreshApp = _useContext2.refreshApp;

  var euiCommonlyUsedRanges = commonlyUsedRanges ? commonlyUsedRanges.map(function (_ref) {
    var from = _ref.from,
        to = _ref.to,
        display = _ref.display;
    return {
      start: from,
      end: to,
      label: display
    };
  }) : _constants.CLIENT_DEFAULTS.COMMONLY_USED_DATE_RANGES;
  return _react.default.createElement(_eui.EuiSuperDatePicker, {
    start: dateRangeStart,
    end: dateRangeEnd,
    commonlyUsedRanges: euiCommonlyUsedRanges,
    isPaused: autorefreshIsPaused,
    refreshInterval: autorefreshInterval,
    onTimeChange: function onTimeChange(_ref2) {
      var start = _ref2.start,
          end = _ref2.end;
      updateUrl({
        dateRangeStart: start,
        dateRangeEnd: end
      });
      refreshApp();
    },
    onRefresh: refreshApp,
    onRefreshChange: function onRefreshChange(_ref3) {
      var isPaused = _ref3.isPaused,
          refreshInterval = _ref3.refreshInterval;
      updateUrl({
        autorefreshInterval: refreshInterval === undefined ? autorefreshInterval : refreshInterval,
        autorefreshIsPaused: isPaused
      });
    }
  });
};

exports.UptimeDatePicker = UptimeDatePicker;