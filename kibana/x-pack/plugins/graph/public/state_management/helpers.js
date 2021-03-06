"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchesOne = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Infers the type of an action out of a given action type.
 * This makes it easier to distribute the action types because they come
 * along with the creators: `type MyAction = InferActionType<typeof myActionCreator>`.
 *
 * This isn't expected to be used in a lot of places - if it is, naming the individual
 * action types might make more sense.
 */

/**
 * Helper to create a matcher that matches all passed in action creators.
 *
 * This is helpful to create a saga that takes multiple actions:
 * `yield takeEvery(matchesOne(actionCreator1, actionCreator2), handler);`
 *
 * @param actionCreators The action creators to create a unified matcher for
 */
var matchesOne = function matchesOne() {
  for (var _len = arguments.length, actionCreators = new Array(_len), _key = 0; _key < _len; _key++) {
    actionCreators[_key] = arguments[_key];
  }

  return function (action) {
    return actionCreators.some(function (actionCreator) {
      return actionCreator.match(action);
    });
  };
};

exports.matchesOne = matchesOne;