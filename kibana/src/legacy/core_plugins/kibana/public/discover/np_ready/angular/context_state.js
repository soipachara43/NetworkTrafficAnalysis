"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getState = getState;
exports.isEqualFilters = isEqualFilters;

var _lodash = _interopRequireDefault(require("lodash"));

var _history = require("history");

var _public = require("../../../../../../../plugins/kibana_utils/public");

var _public2 = require("../../../../../../../plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GLOBAL_STATE_URL_KEY = '_g';
var APP_STATE_URL_KEY = '_a';
/**
 * Builds and returns appState and globalState containers
 * provides helper functions to start/stop syncing with URL
 */

function getState(_ref) {
  var defaultStepSize = _ref.defaultStepSize,
      timeFieldName = _ref.timeFieldName,
      _ref$storeInSessionSt = _ref.storeInSessionStorage,
      storeInSessionStorage = _ref$storeInSessionSt === void 0 ? false : _ref$storeInSessionSt,
      history = _ref.history;
  var stateStorage = (0, _public.createKbnUrlStateStorage)({
    useHash: storeInSessionStorage,
    history: history ? history : (0, _history.createBrowserHistory)()
  });
  var globalStateInitial = stateStorage.get(GLOBAL_STATE_URL_KEY);
  var globalStateContainer = (0, _public.createStateContainer)(globalStateInitial);
  var appStateFromUrl = stateStorage.get(APP_STATE_URL_KEY);
  var appStateInitial = createInitialAppState(defaultStepSize, timeFieldName, appStateFromUrl);
  var appStateContainer = (0, _public.createStateContainer)(appStateInitial);

  var _syncStates = (0, _public.syncStates)([{
    storageKey: GLOBAL_STATE_URL_KEY,
    stateContainer: _objectSpread({}, globalStateContainer, {}, {
      set: function set(value) {
        if (value) {
          globalStateContainer.set(value);
        }
      }
    }),
    stateStorage: stateStorage
  }, {
    storageKey: APP_STATE_URL_KEY,
    stateContainer: _objectSpread({}, appStateContainer, {}, {
      set: function set(value) {
        if (value) {
          appStateContainer.set(value);
        }
      }
    }),
    stateStorage: stateStorage
  }]),
      start = _syncStates.start,
      stop = _syncStates.stop;

  return {
    globalState: globalStateContainer,
    appState: appStateContainer,
    startSync: start,
    stopSync: stop,
    setAppState: function setAppState(newState) {
      var oldState = appStateContainer.getState();

      var mergedState = _objectSpread({}, oldState, {}, newState);

      if (!isEqualState(oldState, mergedState)) {
        appStateContainer.set(mergedState);
      }
    },
    getFilters: function getFilters() {
      return [].concat(_toConsumableArray(_getFilters(globalStateContainer.getState())), _toConsumableArray(_getFilters(appStateContainer.getState())));
    },
    setFilters: function setFilters(filterManager) {
      // global state filters
      var globalFilters = filterManager.getGlobalFilters();
      var globalFilterChanged = !isEqualFilters(globalFilters, _getFilters(globalStateContainer.getState()));

      if (globalFilterChanged) {
        globalStateContainer.set({
          filters: globalFilters
        });
      } // app state filters


      var appFilters = filterManager.getAppFilters();
      var appFilterChanged = !isEqualFilters(appFilters, _getFilters(appStateContainer.getState()));

      if (appFilterChanged) {
        appStateContainer.set(_objectSpread({}, appStateContainer.getState(), {}, {
          filters: appFilters
        }));
      }
    },
    // helper function just needed for testing
    flushToUrl: function flushToUrl(replace) {
      return stateStorage.flush({
        replace: replace
      });
    }
  };
}
/**
 * Helper function to compare 2 different filter states
 */


function isEqualFilters(filtersA, filtersB) {
  if (!filtersA && !filtersB) {
    return true;
  } else if (!filtersA || !filtersB) {
    return false;
  }

  return _public2.esFilters.compareFilters(filtersA, filtersB, _public2.esFilters.COMPARE_ALL_OPTIONS);
}
/**
 * Helper function to compare 2 different states, is needed since comparing filters
 * works differently, doesn't work with _.isEqual
 */


function isEqualState(stateA, stateB) {
  if (!stateA && !stateB) {
    return true;
  } else if (!stateA || !stateB) {
    return false;
  }

  var _stateA$filters = stateA.filters,
      stateAFilters = _stateA$filters === void 0 ? [] : _stateA$filters,
      stateAPartial = _objectWithoutProperties(stateA, ["filters"]);

  var _stateB$filters = stateB.filters,
      stateBFilters = _stateB$filters === void 0 ? [] : _stateB$filters,
      stateBPartial = _objectWithoutProperties(stateB, ["filters"]);

  return _lodash.default.isEqual(stateAPartial, stateBPartial) && _public2.esFilters.compareFilters(stateAFilters, stateBFilters, _public2.esFilters.COMPARE_ALL_OPTIONS);
}
/**
 * Helper function to return array of filter object of a given state
 */


function _getFilters(state) {
  if (!state || !Array.isArray(state.filters)) {
    return [];
  }

  return state.filters;
}
/**
 * Helper function to return the initial app state, which is a merged object of url state and
 * default state. The default size is the default number of successor/predecessor records to fetch
 */


function createInitialAppState(defaultSize, timeFieldName, urlState) {
  var defaultState = {
    columns: ['_source'],
    filters: [],
    predecessorCount: parseInt(defaultSize, 10),
    sort: [timeFieldName, 'desc'],
    successorCount: parseInt(defaultSize, 10)
  };

  if (_typeof(urlState) !== 'object') {
    return defaultState;
  }

  return _objectSpread({}, defaultState, {}, urlState);
}