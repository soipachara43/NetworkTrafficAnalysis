"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToQueryState = void 0;

var _operators = require("rxjs/operators");

var _lodash = _interopRequireDefault(require("lodash"));

var _common = require("../../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Helper to setup two-way syncing of global data and a state container
 * @param QueryService: either setup or start
 * @param stateContainer to use for syncing
 */
var connectToQueryState = function connectToQueryState(_ref, stateContainer, syncConfig) {
  var timefilter = _ref.timefilter.timefilter,
      filterManager = _ref.filterManager,
      state$ = _ref.state$;
  var syncKeys = [];

  if (syncConfig.time) {
    syncKeys.push('time');
  }

  if (syncConfig.refreshInterval) {
    syncKeys.push('refreshInterval');
  }

  if (syncConfig.filters) {
    switch (syncConfig.filters) {
      case true:
        syncKeys.push('filters');
        break;

      case _common.FilterStateStore.APP_STATE:
        syncKeys.push('appFilters');
        break;

      case _common.FilterStateStore.GLOBAL_STATE:
        syncKeys.push('globalFilters');
        break;
    }
  } // initial syncing
  // TODO:
  // data services take precedence, this seems like a good default,
  // and apps could anyway set their own value after initialisation,
  // but maybe maybe this should be a configurable option?


  var initialState = _objectSpread({}, stateContainer.get());

  var initialDirty = false;

  if (syncConfig.time && !_lodash.default.isEqual(initialState.time, timefilter.getTime())) {
    initialState.time = timefilter.getTime();
    initialDirty = true;
  }

  if (syncConfig.refreshInterval && !_lodash.default.isEqual(initialState.refreshInterval, timefilter.getRefreshInterval())) {
    initialState.refreshInterval = timefilter.getRefreshInterval();
    initialDirty = true;
  }

  if (syncConfig.filters) {
    if (syncConfig.filters === true) {
      if (!initialState.filters || !(0, _common.compareFilters)(initialState.filters, filterManager.getFilters(), _common.COMPARE_ALL_OPTIONS)) {
        initialState.filters = filterManager.getFilters();
        initialDirty = true;
      }
    } else if (syncConfig.filters === _common.FilterStateStore.GLOBAL_STATE) {
      if (!initialState.filters || !(0, _common.compareFilters)(initialState.filters, filterManager.getGlobalFilters(), _common.COMPARE_ALL_OPTIONS)) {
        initialState.filters = filterManager.getGlobalFilters();
        initialDirty = true;
      }
    } else if (syncConfig.filters === _common.FilterStateStore.APP_STATE) {
      if (!initialState.filters || !(0, _common.compareFilters)(initialState.filters, filterManager.getAppFilters(), _common.COMPARE_ALL_OPTIONS)) {
        initialState.filters = filterManager.getAppFilters();
        initialDirty = true;
      }
    }
  }

  if (initialDirty) {
    stateContainer.set(_objectSpread({}, stateContainer.get(), {}, initialState));
  } // to ignore own state updates


  var updateInProgress = false;
  var subs = [state$.pipe((0, _operators.filter)(function (_ref2) {
    var changes = _ref2.changes,
        state = _ref2.state;
    if (updateInProgress) return false;
    return syncKeys.some(function (syncKey) {
      return changes[syncKey];
    });
  }), (0, _operators.map)(function (_ref3) {
    var changes = _ref3.changes;
    var newState = {};

    if (syncConfig.time && changes.time) {
      newState.time = timefilter.getTime();
    }

    if (syncConfig.refreshInterval && changes.refreshInterval) {
      newState.refreshInterval = timefilter.getRefreshInterval();
    }

    if (syncConfig.filters) {
      if (syncConfig.filters === true && changes.filters) {
        newState.filters = filterManager.getFilters();
      } else if (syncConfig.filters === _common.FilterStateStore.GLOBAL_STATE && changes.globalFilters) {
        newState.filters = filterManager.getGlobalFilters();
      } else if (syncConfig.filters === _common.FilterStateStore.APP_STATE && changes.appFilters) {
        newState.filters = filterManager.getAppFilters();
      }
    }

    return newState;
  })).subscribe(function (newState) {
    stateContainer.set(_objectSpread({}, stateContainer.get(), {}, newState));
  }), stateContainer.state$.subscribe(function (state) {
    updateInProgress = true; // cloneDeep is required because services are mutating passed objects
    // and state in state container is frozen

    if (syncConfig.time) {
      var time = state.time || timefilter.getTimeDefaults();

      if (!_lodash.default.isEqual(time, timefilter.getTime())) {
        timefilter.setTime(_lodash.default.cloneDeep(time));
      }
    }

    if (syncConfig.refreshInterval) {
      var refreshInterval = state.refreshInterval || timefilter.getRefreshIntervalDefaults();

      if (!_lodash.default.isEqual(refreshInterval, timefilter.getRefreshInterval())) {
        timefilter.setRefreshInterval(_lodash.default.cloneDeep(refreshInterval));
      }
    }

    if (syncConfig.filters) {
      var filters = state.filters || [];

      if (syncConfig.filters === true) {
        if (!(0, _common.compareFilters)(filters, filterManager.getFilters(), _common.COMPARE_ALL_OPTIONS)) {
          filterManager.setFilters(_lodash.default.cloneDeep(filters));
        }
      } else if (syncConfig.filters === _common.FilterStateStore.APP_STATE) {
        if (!(0, _common.compareFilters)(filters, filterManager.getAppFilters(), _common.COMPARE_ALL_OPTIONS)) {
          filterManager.setAppFilters(_lodash.default.cloneDeep(filters));
        }
      } else if (syncConfig.filters === _common.FilterStateStore.GLOBAL_STATE) {
        if (!(0, _common.compareFilters)(filters, filterManager.getGlobalFilters(), _common.COMPARE_ALL_OPTIONS)) {
          filterManager.setGlobalFilters(_lodash.default.cloneDeep(filters));
        }
      }
    }

    updateInProgress = false;
  })];
  return function () {
    subs.forEach(function (s) {
      return s.unsubscribe();
    });
  };
};

exports.connectToQueryState = connectToQueryState;