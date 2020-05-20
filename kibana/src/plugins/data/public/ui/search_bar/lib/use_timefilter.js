"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimefilter = void 0;

var _react = require("react");

var _rxjs = require("rxjs");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useTimefilter = function useTimefilter(props) {
  var initialTimeRange = {
    from: props.dateRangeFrom || props.timefilter.getTime().from,
    to: props.dateRangeTo || props.timefilter.getTime().to
  };
  var initialRefreshInterval = {
    value: props.refreshInterval || props.timefilter.getRefreshInterval().value,
    pause: props.isRefreshPaused || props.timefilter.getRefreshInterval().pause
  };

  var _useState = (0, _react.useState)(initialTimeRange),
      _useState2 = _slicedToArray(_useState, 2),
      timeRange = _useState2[0],
      setTimerange = _useState2[1];

  var _useState3 = (0, _react.useState)(initialRefreshInterval),
      _useState4 = _slicedToArray(_useState3, 2),
      refreshInterval = _useState4[0],
      setRefreshInterval = _useState4[1];

  (0, _react.useEffect)(function () {
    var subscriptions = new _rxjs.Subscription();
    subscriptions.add(props.timefilter.getRefreshIntervalUpdate$().subscribe({
      next: function next() {
        var newRefreshInterval = props.timefilter.getRefreshInterval();
        setRefreshInterval(newRefreshInterval);
      }
    }));
    subscriptions.add(props.timefilter.getTimeUpdate$().subscribe({
      next: function next() {
        setTimerange(props.timefilter.getTime());
      }
    }));
    return function () {
      subscriptions.unsubscribe();
    };
  }, [props.timefilter]);
  return {
    refreshInterval: refreshInterval,
    timeRange: timeRange
  };
};

exports.useTimefilter = useTimefilter;