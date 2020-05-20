"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  FeatureCatalogueSetup: true,
  EnvironmentSetup: true,
  TutorialSetup: true,
  HomePublicPluginSetup: true,
  FeatureCatalogueEntry: true,
  FeatureCatalogueCategory: true,
  Environment: true,
  TutorialVariables: true
};
Object.defineProperty(exports, "FeatureCatalogueSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.FeatureCatalogueSetup;
  }
});
Object.defineProperty(exports, "EnvironmentSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.EnvironmentSetup;
  }
});
Object.defineProperty(exports, "TutorialSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.TutorialSetup;
  }
});
Object.defineProperty(exports, "HomePublicPluginSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.HomePublicPluginSetup;
  }
});
Object.defineProperty(exports, "FeatureCatalogueEntry", {
  enumerable: true,
  get: function get() {
    return _services.FeatureCatalogueEntry;
  }
});
Object.defineProperty(exports, "FeatureCatalogueCategory", {
  enumerable: true,
  get: function get() {
    return _services.FeatureCatalogueCategory;
  }
});
Object.defineProperty(exports, "Environment", {
  enumerable: true,
  get: function get() {
    return _services.Environment;
  }
});
Object.defineProperty(exports, "TutorialVariables", {
  enumerable: true,
  get: function get() {
    return _services.TutorialVariables;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _services = require("./services");

var _instruction_variant = require("../common/instruction_variant");

Object.keys(_instruction_variant).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _instruction_variant[key];
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
var plugin = function plugin(initializerContext) {
  return new _plugin.HomePublicPlugin(initializerContext);
};

exports.plugin = plugin;