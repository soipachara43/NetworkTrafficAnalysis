"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NEWSFEED_HASH_SET_STORAGE_KEY = exports.NEWSFEED_LAST_FETCH_STORAGE_KEY = exports.NEWSFEED_FALLBACK_LANGUAGE = void 0;

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
const NEWSFEED_FALLBACK_LANGUAGE = 'en';
exports.NEWSFEED_FALLBACK_LANGUAGE = NEWSFEED_FALLBACK_LANGUAGE;
const NEWSFEED_LAST_FETCH_STORAGE_KEY = 'newsfeed.lastfetchtime';
exports.NEWSFEED_LAST_FETCH_STORAGE_KEY = NEWSFEED_LAST_FETCH_STORAGE_KEY;
const NEWSFEED_HASH_SET_STORAGE_KEY = 'newsfeed.hashes';
exports.NEWSFEED_HASH_SET_STORAGE_KEY = NEWSFEED_HASH_SET_STORAGE_KEY;