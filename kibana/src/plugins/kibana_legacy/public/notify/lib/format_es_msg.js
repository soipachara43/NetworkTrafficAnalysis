"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatESMsg = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

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
var getRootCause = function getRootCause(err) {
  return _lodash.default.get(err, 'resp.error.root_cause');
};
/**
 * Utilize the extended error information returned from elasticsearch
 * @param  {Error|String} err
 * @returns {string}
 */


var formatESMsg = function formatESMsg(err) {
  var rootCause = getRootCause(err);

  if (!Array.isArray(rootCause)) {
    return;
  }

  return rootCause.map(function (cause) {
    return cause.reason;
  }).join('\n');
};

exports.formatESMsg = formatESMsg;