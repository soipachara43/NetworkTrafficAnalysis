"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleAsyncAction = handleAsyncAction;
exports.getAsyncInitialState = getAsyncInitialState;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function handleAsyncAction(storeKey, asyncAction) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, String(asyncAction.get), function (state) {
    return _objectSpread({}, state, _defineProperty({}, storeKey, _objectSpread({}, state[storeKey], {
      loading: true
    })));
  }), _defineProperty(_ref, String(asyncAction.success), function (state, action) {
    return _objectSpread({}, state, _defineProperty({}, storeKey, _objectSpread({}, state[storeKey], {
      data: action.payload === null ? action.payload : _objectSpread({}, action.payload),
      loading: false
    })));
  }), _defineProperty(_ref, String(asyncAction.fail), function (state, action) {
    return _objectSpread({}, state, _defineProperty({}, storeKey, _objectSpread({}, state[storeKey], {
      data: null,
      error: action.payload,
      loading: false
    })));
  }), _ref;
}

function getAsyncInitialState() {
  var initialData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    data: initialData,
    loading: false,
    error: null
  };
}