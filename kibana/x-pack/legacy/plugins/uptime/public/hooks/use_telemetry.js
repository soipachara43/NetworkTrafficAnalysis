"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUptimeTelemetry = exports.UptimePage = void 0;

var _react = require("react");

var _use_url_params = require("./use_url_params");

var _utils = require("../state/api/utils");

var _constants = require("../../common/constants");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UptimePage;
exports.UptimePage = UptimePage;

(function (UptimePage) {
  UptimePage["Overview"] = "Overview";
  UptimePage["Monitor"] = "Monitor";
  UptimePage["Settings"] = "Settings";
  UptimePage["NotFound"] = "__not-found__";
})(UptimePage || (exports.UptimePage = UptimePage = {}));

var useUptimeTelemetry = function useUptimeTelemetry(page) {
  var _useUrlParams = (0, _use_url_params.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      dateRangeStart = _getUrlParams.dateRangeStart,
      dateRangeEnd = _getUrlParams.dateRangeEnd,
      autorefreshInterval = _getUrlParams.autorefreshInterval,
      autorefreshIsPaused = _getUrlParams.autorefreshIsPaused;

  (0, _react.useEffect)(function () {
    if (!_utils.apiService.http) throw new Error('Core http services are not defined');
    var params = {
      page: page,
      autorefreshInterval: autorefreshInterval / 1000,
      // divide by 1000 to keep it in secs
      dateStart: dateRangeStart,
      dateEnd: dateRangeEnd,
      autoRefreshEnabled: !autorefreshIsPaused
    };

    _utils.apiService.post(_constants.API_URLS.LOG_PAGE_VIEW, params);
  }, [autorefreshInterval, autorefreshIsPaused, dateRangeEnd, dateRangeStart, page]);
};

exports.useUptimeTelemetry = useUptimeTelemetry;