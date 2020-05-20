"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SERVICE_PATH = exports.DEV_SERVICE_URLROOT = exports.DEFAULT_SERVICE_URLROOT = exports.PLUGIN_ID = void 0;

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
const PLUGIN_ID = 'newsfeed';
exports.PLUGIN_ID = PLUGIN_ID;
const DEFAULT_SERVICE_URLROOT = 'https://feeds.elastic.co';
exports.DEFAULT_SERVICE_URLROOT = DEFAULT_SERVICE_URLROOT;
const DEV_SERVICE_URLROOT = 'https://feeds-staging.elastic.co';
exports.DEV_SERVICE_URLROOT = DEV_SERVICE_URLROOT;
const DEFAULT_SERVICE_PATH = '/kibana/v{VERSION}.json';
exports.DEFAULT_SERVICE_PATH = DEFAULT_SERVICE_PATH;