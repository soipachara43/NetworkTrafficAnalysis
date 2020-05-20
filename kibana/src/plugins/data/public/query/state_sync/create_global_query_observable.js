"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQueryStateObservable = createQueryStateObservable;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _public = require("../../../../kibana_utils/public");

var _common = require("../../../common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createQueryStateObservable(_ref) {
  var timefilter = _ref.timefilter.timefilter,
      filterManager = _ref.filterManager;
  return new _rxjs.Observable(function (subscriber) {
    var state = (0, _public.createStateContainer)({
      time: timefilter.getTime(),
      refreshInterval: timefilter.getRefreshInterval(),
      filters: filterManager.getFilters()
    });
    var currentChange = {};
    var subs = [timefilter.getTimeUpdate$().subscribe(function () {
      currentChange.time = true;
      state.set(_objectSpread({}, state.get(), {
        time: timefilter.getTime()
      }));
    }), timefilter.getRefreshIntervalUpdate$().subscribe(function () {
      currentChange.refreshInterval = true;
      state.set(_objectSpread({}, state.get(), {
        refreshInterval: timefilter.getRefreshInterval()
      }));
    }), filterManager.getUpdates$().subscribe(function () {
      currentChange.filters = true;

      var _state$get = state.get(),
          filters = _state$get.filters;

      var globalOld = filters === null || filters === void 0 ? void 0 : filters.filter(function (f) {
        return (0, _common.isFilterPinned)(f);
      });
      var appOld = filters === null || filters === void 0 ? void 0 : filters.filter(function (f) {
        return !(0, _common.isFilterPinned)(f);
      });
      var globalNew = filterManager.getGlobalFilters();
      var appNew = filterManager.getAppFilters();

      if (!globalOld || !(0, _common.compareFilters)(globalOld, globalNew, _common.COMPARE_ALL_OPTIONS)) {
        currentChange.globalFilters = true;
      }

      if (!appOld || !(0, _common.compareFilters)(appOld, appNew, _common.COMPARE_ALL_OPTIONS)) {
        currentChange.appFilters = true;
      }

      state.set(_objectSpread({}, state.get(), {
        filters: filterManager.getFilters()
      }));
    }), state.state$.pipe((0, _operators.map)(function (newState) {
      return {
        state: newState,
        changes: currentChange
      };
    }), (0, _operators.tap)(function () {
      currentChange = {};
    })).subscribe(subscriber)];
    return function () {
      subs.forEach(function (s) {
        return s.unsubscribe();
      });
    };
  });
}