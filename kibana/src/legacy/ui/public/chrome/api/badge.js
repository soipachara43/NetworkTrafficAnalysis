"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initChromeBadgeApi = initChromeBadgeApi;

var _new_platform = require("ui/new_platform");

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
var newPlatformChrome = _new_platform.npStart.core.chrome;

function createBadgeApi() {
  return {
    badge: {
      /**
       * Get an observable that emits the current badge
       * and emits each update to the badge
       */
      get$: function get$() {
        return newPlatformChrome.getBadge$();
      },

      /**
       * Replace the badge with a new one
       */
      set: function set(newBadge) {
        newPlatformChrome.setBadge(newBadge);
      }
    }
  };
}

function initChromeBadgeApi(chrome) {
  var _createBadgeApi = createBadgeApi(),
      badge = _createBadgeApi.badge;

  chrome.badge = badge;
}