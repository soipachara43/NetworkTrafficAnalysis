"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPluginInitializerContext = createPluginInitializerContext;
exports.createPluginSetupContext = createPluginSetupContext;
exports.createPluginStartContext = createPluginStartContext;

var _lodash = require("lodash");

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
 * Provides a plugin-specific context passed to the plugin's construtor. This is currently
 * empty but should provide static services in the future, such as config and logging.
 *
 * @param coreContext
 * @param opaqueId
 * @param pluginManifest
 * @param pluginConfig
 * @internal
 */
function createPluginInitializerContext(coreContext, opaqueId, pluginManifest, pluginConfig) {
  return {
    opaqueId: opaqueId,
    env: coreContext.env,
    config: {
      get: function get() {
        return pluginConfig;
      }
    }
  };
}
/**
 * Provides a plugin-specific context passed to the plugin's `setup` lifecycle event. Currently
 * this returns a shallow copy the service setup contracts, but in the future could provide
 * plugin-scoped versions of the service.
 *
 * @param coreContext
 * @param deps
 * @param plugin
 * @internal
 */


function createPluginSetupContext(coreContext, deps, plugin) {
  return {
    application: {
      register: function register(app) {
        return deps.application.register(plugin.opaqueId, app);
      },
      registerAppUpdater: function registerAppUpdater(statusUpdater$) {
        return deps.application.registerAppUpdater(statusUpdater$);
      },
      registerMountContext: function registerMountContext(contextName, provider) {
        return deps.application.registerMountContext(plugin.opaqueId, contextName, provider);
      }
    },
    context: deps.context,
    fatalErrors: deps.fatalErrors,
    http: deps.http,
    notifications: deps.notifications,
    uiSettings: deps.uiSettings,
    injectedMetadata: {
      getInjectedVar: deps.injectedMetadata.getInjectedVar
    },
    getStartServices: function getStartServices() {
      return plugin.startDependencies;
    }
  };
}
/**
 * Provides a plugin-specific context passed to the plugin's `start` lifecycle event. Currently
 * this returns a shallow copy the service start contracts, but in the future could provide
 * plugin-scoped versions of the service.
 *
 * @param coreContext
 * @param deps
 * @param plugin
 * @internal
 */


function createPluginStartContext(coreContext, deps, plugin) {
  return {
    application: {
      currentAppId$: deps.application.currentAppId$,
      capabilities: deps.application.capabilities,
      navigateToApp: deps.application.navigateToApp,
      getUrlForApp: deps.application.getUrlForApp,
      registerMountContext: function registerMountContext(contextName, provider) {
        return deps.application.registerMountContext(plugin.opaqueId, contextName, provider);
      }
    },
    docLinks: deps.docLinks,
    http: deps.http,
    chrome: (0, _lodash.omit)(deps.chrome, 'getComponent'),
    i18n: deps.i18n,
    notifications: deps.notifications,
    overlays: deps.overlays,
    uiSettings: deps.uiSettings,
    savedObjects: deps.savedObjects,
    injectedMetadata: {
      getInjectedVar: deps.injectedMetadata.getInjectedVar
    },
    fatalErrors: deps.fatalErrors
  };
}