"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unpinFilter = exports.pinFilter = exports.disableFilter = exports.enableFilter = exports.toggleFilterPinned = exports.toggleFilterNegated = exports.toggleFilterDisabled = exports.isFilterPinned = exports.buildEmptyFilter = exports.FilterStateStore = void 0;

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
let FilterStateStore;
exports.FilterStateStore = FilterStateStore;

(function (FilterStateStore) {
  FilterStateStore["APP_STATE"] = "appState";
  FilterStateStore["GLOBAL_STATE"] = "globalState";
})(FilterStateStore || (exports.FilterStateStore = FilterStateStore = {}));

const buildEmptyFilter = (isPinned, index) => {
  const meta = {
    disabled: false,
    negate: false,
    alias: null,
    index
  };
  const $state = {
    store: isPinned ? FilterStateStore.GLOBAL_STATE : FilterStateStore.APP_STATE
  };
  return {
    meta,
    $state
  };
};

exports.buildEmptyFilter = buildEmptyFilter;

const isFilterPinned = filter => {
  return filter.$state && filter.$state.store === FilterStateStore.GLOBAL_STATE;
};

exports.isFilterPinned = isFilterPinned;

const toggleFilterDisabled = filter => {
  const disabled = !filter.meta.disabled;
  const meta = { ...filter.meta,
    disabled
  };
  return { ...filter,
    meta
  };
};

exports.toggleFilterDisabled = toggleFilterDisabled;

const toggleFilterNegated = filter => {
  const negate = !filter.meta.negate;
  const meta = { ...filter.meta,
    negate
  };
  return { ...filter,
    meta
  };
};

exports.toggleFilterNegated = toggleFilterNegated;

const toggleFilterPinned = filter => {
  const store = isFilterPinned(filter) ? FilterStateStore.APP_STATE : FilterStateStore.GLOBAL_STATE;
  const $state = { ...filter.$state,
    store
  };
  return { ...filter,
    $state
  };
};

exports.toggleFilterPinned = toggleFilterPinned;

const enableFilter = filter => !filter.meta.disabled ? filter : toggleFilterDisabled(filter);

exports.enableFilter = enableFilter;

const disableFilter = filter => filter.meta.disabled ? filter : toggleFilterDisabled(filter);

exports.disableFilter = disableFilter;

const pinFilter = filter => isFilterPinned(filter) ? filter : toggleFilterPinned(filter);

exports.pinFilter = pinFilter;

const unpinFilter = filter => !isFilterPinned(filter) ? filter : toggleFilterPinned(filter);

exports.unpinFilter = unpinFilter;