"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = exports.TEXT_CONTEXT_TYPE = void 0;

var _lodash = require("lodash");

var _utils = require("../utils");

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
const TEXT_CONTEXT_TYPE = 'text';
exports.TEXT_CONTEXT_TYPE = TEXT_CONTEXT_TYPE;

const setup = (format, convert = _utils.asPrettyString) => {
  const recurse = value => {
    if (!value || !(0, _lodash.isFunction)(value.map)) {
      return convert.call(format, value);
    } // format a list of values. In text contexts we just use JSON encoding


    return JSON.stringify(value.map(recurse));
  };

  return recurse;
};

exports.setup = setup;