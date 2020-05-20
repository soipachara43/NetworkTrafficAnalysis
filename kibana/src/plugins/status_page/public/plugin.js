"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusPagePlugin = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var StatusPagePlugin =
/*#__PURE__*/
function () {
  function StatusPagePlugin() {
    _classCallCheck(this, StatusPagePlugin);
  }

  _createClass(StatusPagePlugin, [{
    key: "setup",
    value: function setup(core) {
      var isStatusPageAnonymous = core.injectedMetadata.getInjectedVar('isStatusPageAnonymous');

      if (isStatusPageAnonymous) {
        core.http.anonymousPaths.register('/status');
      }
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return StatusPagePlugin;
}();

exports.StatusPagePlugin = StatusPagePlugin;