"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canAppendWildcard = void 0;

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
var canAppendWildcard = function canAppendWildcard(keyPressed) {
  // If it's not a letter, number or is something longer, reject it
  if (!keyPressed || !/[a-z0-9]/i.test(keyPressed) || keyPressed.length !== 1) {
    return false;
  }

  return true;
};

exports.canAppendWildcard = canAppendWildcard;