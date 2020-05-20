"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexLifecycleManagement = indexLifecycleManagement;

var _path = require("path");

var _constants = require("./common/constants");

var _plugin = require("./plugin");

var _shim = require("./shim");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function indexLifecycleManagement(kibana) {
  return new kibana.Plugin({
    id: _constants.PLUGIN.ID,
    configPrefix: 'xpack.ilm',
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    require: ['kibana', 'elasticsearch', 'xpack_main', 'index_management'],
    uiExports: {
      styleSheetPaths: (0, _path.resolve)(__dirname, 'public/np_ready/application/index.scss'),
      managementSections: ['plugins/index_lifecycle_management/legacy'],

      injectDefaultVars(server) {
        const config = server.config();
        return {
          ilmUiEnabled: config.get('xpack.ilm.ui.enabled')
        };
      }

    },
    config: Joi => {
      return Joi.object({
        // display menu item
        ui: Joi.object({
          enabled: Joi.boolean().default(true)
        }).default(),
        // enable plugin
        enabled: Joi.boolean().default(true),
        filteredNodeAttributes: Joi.array().items(Joi.string()).default([])
      }).default();
    },

    isEnabled(config) {
      return config.get('xpack.ilm.enabled') && config.has('xpack.index_management.enabled') && config.get('xpack.index_management.enabled');
    },

    init(server) {
      const core = server.newPlatform.setup.core;
      const plugins = {};

      const __LEGACY = (0, _shim.createShim)(server);

      const indexLifecycleManagementPlugin = new _plugin.Plugin(); // Set up plugin.

      indexLifecycleManagementPlugin.setup(core, plugins, __LEGACY);
    }

  });
}