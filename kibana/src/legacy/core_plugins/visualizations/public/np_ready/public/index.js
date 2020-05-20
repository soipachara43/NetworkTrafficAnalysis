"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "VisualizationsSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.VisualizationsSetup;
  }
});
Object.defineProperty(exports, "VisualizationsStart", {
  enumerable: true,
  get: function get() {
    return _plugin.VisualizationsStart;
  }
});
Object.defineProperty(exports, "VisTypeAlias", {
  enumerable: true,
  get: function get() {
    return _vis_types.VisTypeAlias;
  }
});
Object.defineProperty(exports, "VisType", {
  enumerable: true,
  get: function get() {
    return _vis_types.VisType;
  }
});
Object.defineProperty(exports, "VisSavedObject", {
  enumerable: true,
  get: function get() {
    return _types.VisSavedObject;
  }
});
Object.defineProperty(exports, "Vis", {
  enumerable: true,
  get: function get() {
    return _vis.Vis;
  }
});
Object.defineProperty(exports, "VisParams", {
  enumerable: true,
  get: function get() {
    return _vis.VisParams;
  }
});
Object.defineProperty(exports, "SerializedVis", {
  enumerable: true,
  get: function get() {
    return _vis.SerializedVis;
  }
});
Object.defineProperty(exports, "SerializedVisData", {
  enumerable: true,
  get: function get() {
    return _vis.SerializedVisData;
  }
});
Object.defineProperty(exports, "VisData", {
  enumerable: true,
  get: function get() {
    return _vis.VisData;
  }
});
Object.defineProperty(exports, "TypesService", {
  enumerable: true,
  get: function get() {
    return _types_service.TypesService;
  }
});
Object.defineProperty(exports, "VISUALIZE_EMBEDDABLE_TYPE", {
  enumerable: true,
  get: function get() {
    return _embeddable.VISUALIZE_EMBEDDABLE_TYPE;
  }
});
Object.defineProperty(exports, "VisualizeInput", {
  enumerable: true,
  get: function get() {
    return _embeddable.VisualizeInput;
  }
});
Object.defineProperty(exports, "SchemaConfig", {
  enumerable: true,
  get: function get() {
    return _build_pipeline.SchemaConfig;
  }
});

var _plugin = require("./plugin");

var _vis_types = require("./vis_types");

var _types = require("./types");

var _vis = require("./vis");

var _types_service = require("./vis_types/types_service");

var _embeddable = require("./embeddable");

var _build_pipeline = require("./legacy/build_pipeline");

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

/**
 * Visualizations Plugin - public
 *
 * This is the entry point for the entire client-side public contract of the plugin.
 * If something is not explicitly exported here, you can safely assume it is private
 * to the plugin and not considered stable.
 *
 * All stateful contracts will be injected by the platform at runtime, and are defined
 * in the setup/start interfaces in `plugin.ts`. The remaining items exported here are
 * either types, or static code.
 */

/** @public */

/** @public types */
function plugin(initializerContext) {
  return new _plugin.VisualizationsPlugin(initializerContext);
}