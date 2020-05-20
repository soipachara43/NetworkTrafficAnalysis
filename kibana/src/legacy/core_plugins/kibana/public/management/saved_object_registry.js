"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedObjectManagementRegistry = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _new_platform = require("ui/new_platform");

var _legacy = require("../../../visualizations/public/np_ready/public/legacy");

var _public = require("../../../../../plugins/discover/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var registry = [];
var savedObjectManagementRegistry = {
  register: function register(service) {
    registry.push(service);
  },
  all: function all() {
    return registry;
  },
  get: function get(id) {
    return _lodash.default.find(registry, {
      id: id
    });
  }
};
exports.savedObjectManagementRegistry = savedObjectManagementRegistry;
var services = {
  savedObjectsClient: _new_platform.npStart.core.savedObjects.client,
  indexPatterns: _new_platform.npStart.plugins.data.indexPatterns,
  chrome: _new_platform.npStart.core.chrome,
  overlays: _new_platform.npStart.core.overlays
};
savedObjectManagementRegistry.register({
  id: 'savedVisualizations',
  service: _legacy.start.savedVisualizationsLoader,
  title: 'visualizations'
});
savedObjectManagementRegistry.register({
  id: 'savedDashboards',
  service: _new_platform.npStart.plugins.dashboard.getSavedDashboardLoader(),
  title: _i18n.i18n.translate('kbn.dashboard.savedDashboardsTitle', {
    defaultMessage: 'dashboards'
  })
});
savedObjectManagementRegistry.register({
  id: 'savedSearches',
  service: (0, _public.createSavedSearchesLoader)(services),
  title: 'searches'
});