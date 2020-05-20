"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVisualizeAppState = useVisualizeAppState;

var _lodash = require("lodash");

var _migrate_app_state = require("./migrate_app_state");

var _public = require("../../../../../../../../plugins/kibana_utils/public");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STATE_STORAGE_KEY = '_a';

function toObject(state) {
  return (0, _lodash.omit)(state, function (value, key) {
    return key.charAt(0) === '$' || key.charAt(0) === '_' || (0, _lodash.isFunction)(value);
  });
}

function useVisualizeAppState(_ref) {
  var stateDefaults = _ref.stateDefaults,
      kbnUrlStateStorage = _ref.kbnUrlStateStorage;
  var urlState = kbnUrlStateStorage.get(STATE_STORAGE_KEY);
  var initialState = (0, _migrate_app_state.migrateAppState)(_objectSpread({}, stateDefaults, {}, urlState));
  /*
    make sure url ('_a') matches initial state
    Initializing appState does two things - first it translates the defaults into AppState,
    second it updates appState based on the url (the url trumps the defaults). This means if
    we update the state format at all and want to handle BWC, we must not only migrate the
    data stored with saved vis, but also any old state in the url.
  */

  kbnUrlStateStorage.set(STATE_STORAGE_KEY, initialState, {
    replace: true
  });
  var stateContainer = (0, _public.createStateContainer)(initialState, {
    set: function set(state) {
      return function (prop, value) {
        return _objectSpread({}, state, _defineProperty({}, prop, value));
      };
    },
    setVis: function setVis(state) {
      return function (vis) {
        return _objectSpread({}, state, {
          vis: _objectSpread({}, state.vis, {}, vis)
        });
      };
    },
    removeSavedQuery: function removeSavedQuery(state) {
      return function (defaultQuery) {
        var savedQuery = state.savedQuery,
            rest = _objectWithoutProperties(state, ["savedQuery"]);

        return _objectSpread({}, rest, {
          query: defaultQuery
        });
      };
    },
    unlinkSavedSearch: function unlinkSavedSearch(state) {
      return function (_ref2) {
        var query = _ref2.query,
            _ref2$parentFilters = _ref2.parentFilters,
            parentFilters = _ref2$parentFilters === void 0 ? [] : _ref2$parentFilters;
        return _objectSpread({}, state, {
          query: query || state.query,
          filters: (0, _lodash.union)(state.filters, parentFilters),
          linked: false
        });
      };
    },
    updateVisState: function updateVisState(state) {
      return function (newVisState) {
        return _objectSpread({}, state, {
          vis: toObject(newVisState)
        });
      };
    },
    updateFromSavedQuery: function updateFromSavedQuery(state) {
      return function (savedQuery) {
        return _objectSpread({}, state, {
          savedQuery: savedQuery.id,
          query: savedQuery.attributes.query
        });
      };
    }
  });

  var _syncState = (0, _public.syncState)({
    storageKey: STATE_STORAGE_KEY,
    stateContainer: _objectSpread({}, stateContainer, {
      set: function set(state) {
        if (state) {
          // syncState utils requires to handle incoming "null" value
          stateContainer.set(state);
        }
      }
    }),
    stateStorage: kbnUrlStateStorage
  }),
      startStateSync = _syncState.start,
      stopStateSync = _syncState.stop; // start syncing the appState with the ('_a') url


  startStateSync();
  return {
    stateContainer: stateContainer,
    stopStateSync: stopStateSync
  };
}