"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.result = void 0;

var _state_containers = require("../../common/state_containers");

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
const container = (0, _state_containers.createStateContainer)({
  count: 0
}, {
  increment: state => by => ({
    count: state.count + by
  }),
  double: state => () => ({
    count: state.count * 2
  })
}, {
  count: state => () => state.count
});
container.transitions.increment(5);
container.transitions.double();
console.log(container.selectors.count()); // eslint-disable-line

const result = container.selectors.count();
exports.result = result;