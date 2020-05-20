"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  kbnBaseUrl: true,
  initAngularBootstrap: true,
  PaginateDirectiveProvider: true,
  PaginateControlsDirectiveProvider: true
};
Object.defineProperty(exports, "kbnBaseUrl", {
  enumerable: true,
  get: function get() {
    return _kbn_base_url.kbnBaseUrl;
  }
});
Object.defineProperty(exports, "initAngularBootstrap", {
  enumerable: true,
  get: function get() {
    return _angular_bootstrap.initAngularBootstrap;
  }
});
Object.defineProperty(exports, "PaginateDirectiveProvider", {
  enumerable: true,
  get: function get() {
    return _paginate.PaginateDirectiveProvider;
  }
});
Object.defineProperty(exports, "PaginateControlsDirectiveProvider", {
  enumerable: true,
  get: function get() {
    return _paginate.PaginateControlsDirectiveProvider;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

Object.keys(_plugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _plugin[key];
    }
  });
});

var _kbn_base_url = require("../common/kbn_base_url");

var _angular_bootstrap = require("./angular_bootstrap");

var _paginate = require("./paginate/paginate");

var _angular = require("./angular");

Object.keys(_angular).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _angular[key];
    }
  });
});

var _notify = require("./notify");

Object.keys(_notify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _notify[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
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
  return new _plugin.KibanaLegacyPlugin(initializerContext);
};

exports.plugin = plugin;