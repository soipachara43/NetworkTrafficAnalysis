"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncQueryStateWithUrl = void 0;

var _public = require("../../../../kibana_utils/public");

var _connect_to_query_state = require("./connect_to_query_state");

var _filters = require("../../../common/es_query/filters");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GLOBAL_STATE_STORAGE_KEY = '_g';
/**
 * Helper to setup syncing of global data with the URL
 * @param QueryService: either setup or start
 * @param kbnUrlStateStorage to use for syncing
 */

var syncQueryStateWithUrl = function syncQueryStateWithUrl(query, kbnUrlStateStorage) {
  var timefilter = query.timefilter.timefilter,
      filterManager = query.filterManager;
  var defaultState = {
    time: timefilter.getTime(),
    refreshInterval: timefilter.getRefreshInterval(),
    filters: filterManager.getGlobalFilters()
  }; // retrieve current state from `_g` url

  var initialStateFromUrl = kbnUrlStateStorage.get(GLOBAL_STATE_STORAGE_KEY); // remember whether there was info in the URL

  var hasInheritedQueryFromUrl = Boolean(initialStateFromUrl && Object.keys(initialStateFromUrl).length); // prepare initial state, whatever was in URL takes precedences over current state in services

  var initialState = _objectSpread({}, defaultState, {}, initialStateFromUrl);

  var globalQueryStateContainer = (0, _public.createStateContainer)(initialState);
  var stopSyncingWithStateContainer = (0, _connect_to_query_state.connectToQueryState)(query, globalQueryStateContainer, {
    refreshInterval: true,
    time: true,
    filters: _filters.FilterStateStore.GLOBAL_STATE
  }); // if there weren't any initial state in url,
  // then put _g key into url

  if (!initialStateFromUrl) {
    kbnUrlStateStorage.set(GLOBAL_STATE_STORAGE_KEY, initialState, {
      replace: true
    });
  } // trigger initial syncing from state container to services if needed


  globalQueryStateContainer.set(initialState);

  var _syncState = (0, _public.syncState)({
    stateStorage: kbnUrlStateStorage,
    stateContainer: _objectSpread({}, globalQueryStateContainer, {
      set: function set(state) {
        if (state) {
          // syncState utils requires to handle incoming "null" value
          globalQueryStateContainer.set(state);
        }
      }
    }),
    storageKey: GLOBAL_STATE_STORAGE_KEY
  }),
      start = _syncState.start,
      stopSyncingWithUrl = _syncState.stop;

  start();
  return {
    stop: function stop() {
      stopSyncingWithStateContainer();
      stopSyncingWithUrl();
    },
    hasInheritedQueryFromUrl: hasInheritedQueryFromUrl
  };
};

exports.syncQueryStateWithUrl = syncQueryStateWithUrl;