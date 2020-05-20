"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function get() {
    return _plugin.DashboardEmbeddableContainerPublicPlugin;
  }
});
Object.defineProperty(exports, "DashboardStart", {
  enumerable: true,
  get: function get() {
    return _plugin.DashboardStart;
  }
});
Object.defineProperty(exports, "DashboardDoc730ToLatest", {
  enumerable: true,
  get: function get() {
    return _bwc.DashboardDoc730ToLatest;
  }
});
Object.defineProperty(exports, "DashboardDoc700To720", {
  enumerable: true,
  get: function get() {
    return _bwc.DashboardDoc700To720;
  }
});
Object.defineProperty(exports, "RawSavedDashboardPanelTo60", {
  enumerable: true,
  get: function get() {
    return _bwc.RawSavedDashboardPanelTo60;
  }
});
Object.defineProperty(exports, "RawSavedDashboardPanel610", {
  enumerable: true,
  get: function get() {
    return _bwc.RawSavedDashboardPanel610;
  }
});
Object.defineProperty(exports, "RawSavedDashboardPanel620", {
  enumerable: true,
  get: function get() {
    return _bwc.RawSavedDashboardPanel620;
  }
});
Object.defineProperty(exports, "RawSavedDashboardPanel630", {
  enumerable: true,
  get: function get() {
    return _bwc.RawSavedDashboardPanel630;
  }
});
Object.defineProperty(exports, "RawSavedDashboardPanel640To720", {
  enumerable: true,
  get: function get() {
    return _bwc.RawSavedDashboardPanel640To720;
  }
});
Object.defineProperty(exports, "RawSavedDashboardPanel730ToLatest", {
  enumerable: true,
  get: function get() {
    return _bwc.RawSavedDashboardPanel730ToLatest;
  }
});
Object.defineProperty(exports, "DashboardDocPre700", {
  enumerable: true,
  get: function get() {
    return _bwc.DashboardDocPre700;
  }
});
Object.defineProperty(exports, "DashboardContainer", {
  enumerable: true,
  get: function get() {
    return _embeddable.DashboardContainer;
  }
});
Object.defineProperty(exports, "DashboardContainerInput", {
  enumerable: true,
  get: function get() {
    return _embeddable.DashboardContainerInput;
  }
});
Object.defineProperty(exports, "DashboardContainerFactory", {
  enumerable: true,
  get: function get() {
    return _embeddable.DashboardContainerFactory;
  }
});
Object.defineProperty(exports, "DASHBOARD_CONTAINER_TYPE", {
  enumerable: true,
  get: function get() {
    return _embeddable.DASHBOARD_CONTAINER_TYPE;
  }
});
Object.defineProperty(exports, "DashboardPanelState", {
  enumerable: true,
  get: function get() {
    return _embeddable.DashboardPanelState;
  }
});
Object.defineProperty(exports, "DEFAULT_PANEL_WIDTH", {
  enumerable: true,
  get: function get() {
    return _embeddable.DEFAULT_PANEL_WIDTH;
  }
});
Object.defineProperty(exports, "DEFAULT_PANEL_HEIGHT", {
  enumerable: true,
  get: function get() {
    return _embeddable.DEFAULT_PANEL_HEIGHT;
  }
});
Object.defineProperty(exports, "GridData", {
  enumerable: true,
  get: function get() {
    return _embeddable.GridData;
  }
});
Object.defineProperty(exports, "SavedObjectDashboard", {
  enumerable: true,
  get: function get() {
    return _saved_dashboards.SavedObjectDashboard;
  }
});
Object.defineProperty(exports, "DASHBOARD_APP_URL_GENERATOR", {
  enumerable: true,
  get: function get() {
    return _url_generator.DASHBOARD_APP_URL_GENERATOR;
  }
});

require("./index.scss");

var _plugin = require("./plugin");

var _bwc = require("./bwc");

require("./types");

require("./actions");

var _embeddable = require("./embeddable");

var _saved_dashboards = require("./saved_dashboards");

var _url_generator = require("./url_generator");

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
 * These types can probably be internal once all of dashboard app is migrated into this plugin. Right
 * now, migrations are still in legacy land.
 */
function plugin(initializerContext) {
  return new _plugin.DashboardEmbeddableContainerPublicPlugin(initializerContext);
}