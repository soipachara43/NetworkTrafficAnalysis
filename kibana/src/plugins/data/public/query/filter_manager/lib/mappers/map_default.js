"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDefault = void 0;

var _lodash = require("lodash");

var _common = require("../../../../../common");

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
var mapDefault = function mapDefault(filter) {
  var metaProperty = /(^\$|meta)/;
  var key = (0, _lodash.find)((0, _lodash.keys)(filter), function (item) {
    return !item.match(metaProperty);
  });

  if (key) {
    var type = _common.FILTERS.CUSTOM;
    var value = JSON.stringify((0, _lodash.get)(filter, key, {}));
    return {
      type: type,
      key: key,
      value: value
    };
  }

  throw filter;
};

exports.mapDefault = mapDefault;