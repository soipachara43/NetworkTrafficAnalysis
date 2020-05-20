"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEditIndexPatternPageStateContainer = createEditIndexPatternPageStateContainer;

var _history = require("history");

var _public = require("../../../../../../../../plugins/kibana_utils/public");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Create state container with sync config for tab navigation specific for edit_index_pattern page
 */
function createEditIndexPatternPageStateContainer(_ref) {
  var defaultTab = _ref.defaultTab,
      useHashedUrl = _ref.useHashedUrl;
  // until angular is used as shell - use hash history
  var history = (0, _history.createHashHistory)(); // query param to store app state at

  var stateStorageKey = '_a'; // default app state, when there is no initial state in the url

  var defaultState = {
    tab: defaultTab
  };
  var kbnUrlStateStorage = (0, _public.createKbnUrlStateStorage)({
    useHash: useHashedUrl,
    history: history
  }); // extract starting app state from URL and use it as starting app state in state container

  var initialStateFromUrl = kbnUrlStateStorage.get(stateStorageKey);
  var stateContainer = (0, _public.createStateContainer)(_objectSpread({}, defaultState, {}, initialStateFromUrl), {
    setTab: function setTab(state) {
      return function (tab) {
        return _objectSpread({}, state, {
          tab: tab
        });
      };
    }
  }, {
    tab: function tab(state) {
      return function () {
        return state.tab;
      };
    }
  });

  var _syncState = (0, _public.syncState)({
    storageKey: stateStorageKey,
    stateContainer: _objectSpread({}, stateContainer, {
      // state syncing utility requires state containers to handle "null"
      set: function set(state) {
        return state && stateContainer.set(state);
      }
    }),
    stateStorage: kbnUrlStateStorage
  }),
      start = _syncState.start,
      stop = _syncState.stop; // makes sure initial url is the same as initial state (this is not really required)


  kbnUrlStateStorage.set(stateStorageKey, stateContainer.getState(), {
    replace: true
  }); // expose api needed for Controller

  return {
    startSyncingState: start,
    stopSyncingState: stop,
    setCurrentTab: function setCurrentTab(newTab) {
      return stateContainer.transitions.setTab(newTab);
    },
    getCurrentTab: function getCurrentTab() {
      return stateContainer.selectors.tab();
    },
    state$: stateContainer.state$
  };
}