"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncState = syncState;
exports.syncStates = syncStates;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _common = require("../../common");

var _diff_object = require("../state_management/utils/diff_object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function syncState(_ref) {
  var storageKey = _ref.storageKey,
      stateStorage = _ref.stateStorage,
      stateContainer = _ref.stateContainer;
  var subscriptions = [];

  var updateState = function updateState() {
    var newState = stateStorage.get(storageKey);
    var oldState = stateContainer.get();

    if (newState) {
      // apply only real differences to new state
      var mergedState = _objectSpread({}, oldState); // merges into 'mergedState' all differences from newState,
      // but leaves references if they are deeply the same


      var diff = (0, _diff_object.applyDiff)(mergedState, newState);

      if (diff.keys.length > 0) {
        stateContainer.set(mergedState);
      }
    } else if (oldState !== newState) {
      // empty new state case
      stateContainer.set(newState);
    }
  };

  var updateStorage = function updateStorage() {
    var newStorageState = stateContainer.get();
    var oldStorageState = stateStorage.get(storageKey);

    if (!(0, _fastDeepEqual.default)(newStorageState, oldStorageState)) {
      stateStorage.set(storageKey, newStorageState);
    }
  };

  var onStateChange$ = stateContainer.state$.pipe((0, _common.distinctUntilChangedWithInitialValue)(stateContainer.get(), _fastDeepEqual.default), (0, _operators.tap)(function () {
    return updateStorage();
  }));
  var onStorageChange$ = stateStorage.change$ ? stateStorage.change$(storageKey).pipe((0, _common.distinctUntilChangedWithInitialValue)(stateStorage.get(storageKey), _fastDeepEqual.default), (0, _operators.tap)(function () {
    updateState();
  })) : _rxjs.EMPTY;
  return {
    stop: function stop() {
      // if stateStorage has any cancellation logic, then run it
      if (stateStorage.cancel) {
        stateStorage.cancel();
      }

      subscriptions.forEach(function (s) {
        return s.unsubscribe();
      });
      subscriptions.splice(0, subscriptions.length);
    },
    start: function start() {
      if (subscriptions.length > 0) {
        throw new Error("syncState: can't start syncing state, when syncing is in progress");
      }

      subscriptions.push(onStateChange$.subscribe(), onStorageChange$.subscribe());
    }
  };
}
/**
 * multiple different sync configs
 * syncStates([
 *   {
 *     storageKey: '_s1',
 *     stateStorage: stateStorage1,
 *     stateContainer: stateContainer1,
 *   },
 *   {
 *     storageKey: '_s2',
 *     stateStorage: stateStorage2,
 *     stateContainer: stateContainer2,
 *   },
 * ]);
 * @param stateSyncConfigs - Array of IStateSyncConfig to sync
 */


function syncStates(stateSyncConfigs) {
  var syncRefs = stateSyncConfigs.map(function (config) {
    return syncState(config);
  });
  return {
    stop: function stop() {
      syncRefs.forEach(function (s) {
        return s.stop();
      });
    },
    start: function start() {
      syncRefs.forEach(function (s) {
        return s.start();
      });
    }
  };
}