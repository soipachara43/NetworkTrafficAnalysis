"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStore = exports.createStore = void 0;

var _redux = require("redux");

var _reduxObservable = require("redux-observable");

var _telemetry = require("../lib/telemetry");

var _app = require("./app");

var _timeline = require("./timeline");

var _inputs = require("./inputs");

var _reducer = require("./reducer");

var _epic = require("./epic");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var store = null;

var createStore = function createStore() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _reducer.initialState;
  var apolloClient = arguments.length > 1 ? arguments[1] : undefined;
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  var middlewareDependencies = {
    apolloClient$: apolloClient,
    selectNotesByIdSelector: _app.appSelectors.selectNotesByIdSelector,
    timelineByIdSelector: _timeline.timelineSelectors.timelineByIdSelector,
    timelineTimeRangeSelector: _inputs.inputsSelectors.timelineTimeRangeSelector
  };
  var epicMiddleware = (0, _reduxObservable.createEpicMiddleware)({
    dependencies: middlewareDependencies
  });
  store = (0, _redux.createStore)(_reducer.reducer, state, composeEnhancers((0, _redux.applyMiddleware)(epicMiddleware, _telemetry.telemetryMiddleware)));
  epicMiddleware.run((0, _epic.createRootEpic)());
  return store;
};

exports.createStore = createStore;

var getStore = function getStore() {
  return store;
};

exports.getStore = getStore;