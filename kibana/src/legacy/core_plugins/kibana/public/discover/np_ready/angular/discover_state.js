"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getState = getState;
exports.setState = setState;
exports.isEqualFilters = isEqualFilters;
exports.splitState = splitState;
exports.isEqualState = isEqualState;

var _lodash = require("lodash");

var _public = require("../../../../../../../plugins/kibana_utils/public");

var _public2 = require("../../../../../../../plugins/data/public");

var _public3 = require("../../../../../../../plugins/kibana_legacy/public");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var APP_STATE_URL_KEY = '_a';
/**
 * Builds and returns appState and globalState containers and helper functions
 * Used to sync URL with UI state
 */

function getState(_ref) {
  var _ref$defaultAppState = _ref.defaultAppState,
      defaultAppState = _ref$defaultAppState === void 0 ? {} : _ref$defaultAppState,
      _ref$storeInSessionSt = _ref.storeInSessionStorage,
      storeInSessionStorage = _ref$storeInSessionSt === void 0 ? false : _ref$storeInSessionSt,
      history = _ref.history;
  var stateStorage = (0, _public.createKbnUrlStateStorage)({
    useHash: storeInSessionStorage,
    history: history
  });
  var appStateFromUrl = stateStorage.get(APP_STATE_URL_KEY);

  if (appStateFromUrl && appStateFromUrl.query && !appStateFromUrl.query.language) {
    appStateFromUrl.query = (0, _public3.migrateLegacyQuery)(appStateFromUrl.query);
  }

  var initialAppState = _objectSpread({}, defaultAppState, {}, appStateFromUrl);

  var previousAppState;
  var appStateContainer = (0, _public.createStateContainer)(initialAppState);

  var appStateContainerModified = _objectSpread({}, appStateContainer, {
    set: function set(value) {
      if (value) {
        previousAppState = appStateContainer.getState();
        appStateContainer.set(value);
      }
    }
  });

  var _syncState = (0, _public.syncState)({
    storageKey: APP_STATE_URL_KEY,
    stateContainer: appStateContainerModified,
    stateStorage: stateStorage
  }),
      start = _syncState.start,
      stop = _syncState.stop;

  return {
    kbnUrlStateStorage: stateStorage,
    appStateContainer: appStateContainerModified,
    startSync: start,
    stopSync: stop,
    setAppState: function setAppState(newPartial) {
      return setState(appStateContainerModified, newPartial);
    },
    replaceUrlAppState: function () {
      var _replaceUrlAppState = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var newPartial,
            state,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                newPartial = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                state = _objectSpread({}, appStateContainer.getState(), {}, newPartial);
                _context.next = 4;
                return stateStorage.set(APP_STATE_URL_KEY, state, {
                  replace: true
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function replaceUrlAppState() {
        return _replaceUrlAppState.apply(this, arguments);
      }

      return replaceUrlAppState;
    }(),
    resetInitialAppState: function resetInitialAppState() {
      initialAppState = appStateContainer.getState();
    },
    getPreviousAppState: function getPreviousAppState() {
      return previousAppState;
    },
    flushToUrl: function flushToUrl() {
      return stateStorage.flush();
    },
    isAppStateDirty: function isAppStateDirty() {
      return !isEqualState(initialAppState, appStateContainer.getState());
    }
  };
}
/**
 * Helper function to merge a given new state with the existing state and to set the given state
 * container
 */


function setState(stateContainer, newState) {
  var oldState = stateContainer.getState();

  var mergedState = _objectSpread({}, oldState, {}, newState);

  if (!isEqualState(oldState, mergedState)) {
    stateContainer.set(mergedState);
  }
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
 * helper function to extract filters of the given state
 * returns a state object without filters and an array of filters
 */


function splitState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _state$filters = state.filters,
      filters = _state$filters === void 0 ? [] : _state$filters,
      statePartial = _objectWithoutProperties(state, ["filters"]);

  return {
    filters: filters,
    state: statePartial
  };
}
/**
 * Helper function to compare 2 different state, is needed since comparing filters
 * works differently
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

  return (0, _lodash.isEqual)(stateAPartial, stateBPartial) && isEqualFilters(stateAFilters, stateBFilters);
}