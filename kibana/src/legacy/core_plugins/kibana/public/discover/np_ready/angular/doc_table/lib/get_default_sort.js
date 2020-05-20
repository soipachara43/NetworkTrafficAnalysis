"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultSort = getDefaultSort;

var _get_sort = require("./get_sort");

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
// @ts-ignore

/**
 * use in case the user didn't manually sort.
 * the default sort is returned depending of the index pattern
 */
function getDefaultSort(indexPattern) {
  var defaultSortOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'desc';

  if (indexPattern.timeFieldName && (0, _get_sort.isSortable)(indexPattern.timeFieldName, indexPattern)) {
    return [[indexPattern.timeFieldName, defaultSortOrder]];
  } else {
    return [['_score', defaultSortOrder]];
  }
}