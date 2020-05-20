"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapValuesOfMap = mapValuesOfMap;
exports.groupIntoMap = groupIntoMap;

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
function mapValuesOfMap(map, mapper) {
  const result = new Map();

  for (const [key, value] of map.entries()) {
    result.set(key, mapper(value));
  }

  return result;
}

function groupIntoMap(collection, groupBy) {
  const map = new Map();
  collection.forEach(item => {
    const key = groupBy(item);
    const values = map.get(key) || [];
    values.push(item);
    map.set(key, values);
  });
  return map;
}