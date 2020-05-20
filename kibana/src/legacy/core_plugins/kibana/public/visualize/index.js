"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  VisualizeConstants: true,
  createVisualizeEditUrl: true
};
Object.defineProperty(exports, "VisualizeConstants", {
  enumerable: true,
  get: function get() {
    return _visualize_constants.VisualizeConstants;
  }
});
Object.defineProperty(exports, "createVisualizeEditUrl", {
  enumerable: true,
  get: function get() {
    return _visualize_constants.createVisualizeEditUrl;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _visualize_constants = require("./np_ready/visualize_constants");

Object.keys(_visualize_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _visualize_constants[key];
    }
  });
});

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
// Core will be looking for this when loading our plugin in the new platform
var plugin = function plugin(context) {
  return new _plugin.VisualizePlugin(context);
};

exports.plugin = plugin;