"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeStateful = makeStateful;

var _public = require("../../../../../../../../plugins/visualizations/public");

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

/**
 * @returns Create a PersistedState instance, initialize state changes subscriber/unsubscriber
 */
function makeStateful(prop, stateContainer) {
  // set up the persistedState state
  var persistedState = new _public.PersistedState(); // update the appState when the stateful instance changes

  var updateOnChange = function updateOnChange() {
    stateContainer.transitions.set(prop, persistedState.getChanges());
  };

  var handlerOnChange = function handlerOnChange(method) {
    return persistedState[method]('change', updateOnChange);
  };

  handlerOnChange('on');

  var unsubscribePersisted = function unsubscribePersisted() {
    return handlerOnChange('off');
  }; // update the stateful object when the app state changes


  var persistOnChange = function persistOnChange(state) {
    if (state[prop]) {
      persistedState.set(state[prop]);
    }
  };

  var appState = stateContainer.getState(); // if the thing we're making stateful has an appState value, write to persisted state

  if (appState[prop]) persistedState.setSilent(appState[prop]);
  return {
    persistedState: persistedState,
    unsubscribePersisted: unsubscribePersisted,
    persistOnChange: persistOnChange
  };
}