"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "AdvancedSettingsSetup", {
  enumerable: true,
  get: function get() {
    return _types.AdvancedSettingsSetup;
  }
});
Object.defineProperty(exports, "AdvancedSettingsStart", {
  enumerable: true,
  get: function get() {
    return _types.AdvancedSettingsStart;
  }
});
Object.defineProperty(exports, "ComponentRegistry", {
  enumerable: true,
  get: function get() {
    return _component_registry.ComponentRegistry;
  }
});
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function get() {
    return _field.Field;
  }
});

var _plugin = require("./plugin");

var _types = require("./types");

var _component_registry = require("./component_registry");

var _field = require("./management_app/components/field");

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
function plugin(initializerContext) {
  return new _plugin.AdvancedSettingsPlugin();
}