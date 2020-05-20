"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragAndDropReducer = exports.unRegisterProviderHandler = exports.registerProviderHandler = exports.initialDragAndDropState = void 0;

var _fp = require("lodash/fp");

var _typescriptFsaReducers = require("typescript-fsa-reducers");

var _actions = require("./actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialDragAndDropState = {
  dataProviders: {}
};
exports.initialDragAndDropState = initialDragAndDropState;

var registerProviderHandler = function registerProviderHandler(_ref) {
  var provider = _ref.provider,
      dataProviders = _ref.dataProviders;
  return _objectSpread({}, dataProviders, _defineProperty({}, provider.id, provider));
};

exports.registerProviderHandler = registerProviderHandler;

var unRegisterProviderHandler = function unRegisterProviderHandler(_ref2) {
  var id = _ref2.id,
      dataProviders = _ref2.dataProviders;
  return (0, _fp.omit)(id, dataProviders);
};

exports.unRegisterProviderHandler = unRegisterProviderHandler;
var dragAndDropReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialDragAndDropState).case(_actions.registerProvider, function (state, _ref3) {
  var provider = _ref3.provider;
  return _objectSpread({}, state, {
    dataProviders: registerProviderHandler({
      provider: provider,
      dataProviders: state.dataProviders
    })
  });
}).case(_actions.unRegisterProvider, function (state, _ref4) {
  var id = _ref4.id;
  return _objectSpread({}, state, {
    dataProviders: unRegisterProviderHandler({
      id: id,
      dataProviders: state.dataProviders
    })
  });
}).build();
exports.dragAndDropReducer = dragAndDropReducer;