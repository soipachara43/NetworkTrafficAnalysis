"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFilterManager = void 0;

var _react = require("react");

var _rxjs = require("rxjs");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useFilterManager = function useFilterManager(props) {
  // Filters should be either what's passed in the initial state or the current state of the filter manager
  var _useState = (0, _react.useState)(props.filters || props.filterManager.getFilters()),
      _useState2 = _slicedToArray(_useState, 2),
      filters = _useState2[0],
      setFilters = _useState2[1];

  (0, _react.useEffect)(function () {
    var subscriptions = new _rxjs.Subscription();
    subscriptions.add(props.filterManager.getUpdates$().subscribe({
      next: function next() {
        var newFilters = props.filterManager.getFilters();
        setFilters(newFilters);
      }
    }));
    return function () {
      subscriptions.unsubscribe();
    };
  }, [props.filterManager]);
  return {
    filters: filters
  };
};

exports.useFilterManager = useFilterManager;