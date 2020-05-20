"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHelpExtensionApi = initHelpExtensionApi;

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

function createHelpExtensionApi() {
  return {
    helpExtension: {
      /**
       * Set the custom help extension, or clear it by passing undefined. This
       * will be rendered within the help popover in the header
       */
      set: function set(helpExtension) {
        newPlatformChrome.setHelpExtension(helpExtension);
      },

      /**
       * Get the current help extension that should be rendered in the header
       */
      get$: function get$() {
        return newPlatformChrome.getHelpExtension$();
      }
    }
  };
}

function initHelpExtensionApi(chrome, internal) {
  var _createHelpExtensionA = createHelpExtensionApi(),
      helpExtension = _createHelpExtensionA.helpExtension;

  chrome.helpExtension = helpExtension;
}