"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  BasicOptions: true,
  RangeOption: true,
  ColorRanges: true,
  SelectOption: true,
  SetColorSchemaOptionsValue: true,
  ColorSchemaOptions: true,
  NumberInputOption: true,
  SwitchOption: true,
  TextInputOption: true,
  ColorModes: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "BasicOptions", {
  enumerable: true,
  get: function get() {
    return _components.BasicOptions;
  }
});
Object.defineProperty(exports, "RangeOption", {
  enumerable: true,
  get: function get() {
    return _components.RangeOption;
  }
});
Object.defineProperty(exports, "ColorRanges", {
  enumerable: true,
  get: function get() {
    return _components.ColorRanges;
  }
});
Object.defineProperty(exports, "SelectOption", {
  enumerable: true,
  get: function get() {
    return _components.SelectOption;
  }
});
Object.defineProperty(exports, "SetColorSchemaOptionsValue", {
  enumerable: true,
  get: function get() {
    return _components.SetColorSchemaOptionsValue;
  }
});
Object.defineProperty(exports, "ColorSchemaOptions", {
  enumerable: true,
  get: function get() {
    return _components.ColorSchemaOptions;
  }
});
Object.defineProperty(exports, "NumberInputOption", {
  enumerable: true,
  get: function get() {
    return _components.NumberInputOption;
  }
});
Object.defineProperty(exports, "SwitchOption", {
  enumerable: true,
  get: function get() {
    return _components.SwitchOption;
  }
});
Object.defineProperty(exports, "TextInputOption", {
  enumerable: true,
  get: function get() {
    return _components.TextInputOption;
  }
});
Object.defineProperty(exports, "ColorModes", {
  enumerable: true,
  get: function get() {
    return _collections.ColorModes;
  }
});

var _plugin = require("./plugin");

var _components = require("./components");

var _collections = require("./utils/collections");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
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
function plugin(initializerContext) {
  return new _plugin.VisTypeVislibPlugin(initializerContext);
}