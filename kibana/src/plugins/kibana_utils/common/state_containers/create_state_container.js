"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStateContainer = createStateContainer;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _deepFreezeStrict = _interopRequireDefault(require("deep-freeze-strict"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const $$observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
const $$setActionType = '@@SET';
const isProduction = typeof window === 'object' ? process.env.NODE_ENV === 'production' : !process.env.NODE_ENV || process.env.NODE_ENV === 'production';
const defaultFreeze = isProduction ? value => value : value => {
  const isFreezable = value !== null && typeof value === 'object';
  if (isFreezable) return (0, _deepFreezeStrict.default)(value);
  return value;
};

function createStateContainer(defaultState, pureTransitions = {}, pureSelectors = {}, options = {}) {
  const {
    freeze = defaultFreeze
  } = options;
  const data$ = new _rxjs.BehaviorSubject(freeze(defaultState));
  const state$ = data$.pipe((0, _operators.skip)(1));

  const get = () => data$.getValue();

  const container = {
    get,
    state$,
    getState: () => data$.getValue(),
    set: state => {
      container.dispatch({
        type: $$setActionType,
        args: [state]
      });
    },
    reducer: (state, action) => {
      if (action.type === $$setActionType) {
        return freeze(action.args[0]);
      }

      const pureTransition = pureTransitions[action.type];
      return pureTransition ? freeze(pureTransition(state)(...action.args)) : state;
    },
    replaceReducer: nextReducer => container.reducer = nextReducer,
    dispatch: action => data$.next(container.reducer(get(), action)),
    transitions: Object.keys(pureTransitions).reduce((acc, type) => ({ ...acc,
      [type]: (...args) => container.dispatch({
        type,
        args
      })
    }), {}),
    selectors: Object.keys(pureSelectors).reduce((acc, selector) => ({ ...acc,
      [selector]: (...args) => pureSelectors[selector](get())(...args)
    }), {}),
    addMiddleware: middleware => container.dispatch = middleware(container)(container.dispatch),
    subscribe: listener => {
      const subscription = state$.subscribe(listener);
      return () => subscription.unsubscribe();
    },
    [$$observable]: state$
  };
  return container;
}