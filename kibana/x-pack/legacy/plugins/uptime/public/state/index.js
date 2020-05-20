"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _redux = require("redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _effects = require("./effects");

var _reducers = require("./reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var sagaMW = (0, _reduxSaga.default)();
var store = (0, _redux.createStore)(_reducers.rootReducer, composeEnhancers((0, _redux.applyMiddleware)(sagaMW)));
exports.store = store;
sagaMW.run(_effects.rootEffect);