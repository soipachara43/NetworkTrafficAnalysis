"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSystemApiHeader = addSystemApiHeader;
exports.isSystemApiRequest = isSystemApiRequest;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var SYSTEM_REQUEST_HEADER_NAME = 'kbn-system-request';
var LEGACY_SYSTEM_API_HEADER_NAME = 'kbn-system-api';
/**
 * Adds a custom header designating request as system API
 * @param originalHeaders Object representing set of headers
 * @return Object representing set of headers, with system API header added in
 */

function addSystemApiHeader(originalHeaders) {
  var systemApiHeaders = _defineProperty({}, SYSTEM_REQUEST_HEADER_NAME, true);

  return _objectSpread({}, originalHeaders, {}, systemApiHeaders);
}
/**
 * Returns true if request is a system API request; false otherwise
 *
 * @param request Object Request object created by $http service
 * @return true if request is a system API request; false otherwise
 */


function isSystemApiRequest(request) {
  var headers = request.headers;
  return headers && (!!headers[SYSTEM_REQUEST_HEADER_NAME] || !!headers[LEGACY_SYSTEM_API_HEADER_NAME]);
}