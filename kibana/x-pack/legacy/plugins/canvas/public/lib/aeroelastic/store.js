"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var counter = 0;

var createStore = function createStore(initialState, updater) {
  var currentState = initialState;

  var commit = function commit(type, payload) {
    return currentState = updater(_objectSpread({}, currentState, {
      primaryUpdate: {
        type: type,
        payload: _objectSpread({}, payload, {
          uid: counter++
        })
      }
    }));
  };

  var getCurrentState = function getCurrentState() {
    return currentState;
  };

  var setCurrentState = function setCurrentState(state) {
    currentState = state;
    commit('flush', {});
  };

  return {
    getCurrentState: getCurrentState,
    setCurrentState: setCurrentState,
    commit: commit
  };
};

exports.createStore = createStore;