"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExecutionContainer = exports.executionPureTransitions = void 0;

var _state_containers = require("../../../kibana_utils/common/state_containers");

var _executor = require("../executor");

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
const executionDefaultState = { ..._executor.defaultState,
  state: 'not-started',
  ast: {
    type: 'expression',
    chain: []
  }
}; // eslint-disable-next-line

const executionPureTransitions = {
  start: state => () => ({ ...state,
    state: 'pending'
  }),
  setResult: state => result => ({ ...state,
    state: 'result',
    result
  }),
  setError: state => error => ({ ...state,
    state: 'error',
    error
  })
};
exports.executionPureTransitions = executionPureTransitions;

const freeze = state => state;

const createExecutionContainer = (state = executionDefaultState) => {
  const container = (0, _state_containers.createStateContainer)(state, executionPureTransitions, {}, {
    freeze
  });
  return container;
};

exports.createExecutionContainer = createExecutionContainer;