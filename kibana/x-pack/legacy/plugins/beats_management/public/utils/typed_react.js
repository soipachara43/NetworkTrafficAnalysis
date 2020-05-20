"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeStateUpdaters = composeStateUpdaters;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function composeStateUpdaters() {
  for (var _len = arguments.length, updaters = new Array(_len), _key = 0; _key < _len; _key++) {
    updaters[_key] = arguments[_key];
  }

  return function (state, props) {
    return updaters.reduce(function (currentState, updater) {
      return updater(currentState, props) || currentState;
    }, state);
  };
}