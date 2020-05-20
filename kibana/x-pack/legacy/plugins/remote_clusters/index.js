"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remoteClusters = remoteClusters;

var _path = require("path");

var _common = require("./common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function remoteClusters(kibana) {
  return new kibana.Plugin({
    id: _common.PLUGIN.ID,
    configPrefix: 'xpack.remote_clusters',
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    require: ['kibana'],
    uiExports: {
      styleSheetPaths: (0, _path.resolve)(__dirname, 'public/index.scss')
    },

    // TODO: Remove once CCR has migrated to NP
    config(Joi) {
      return Joi.object({
        // display menu item
        ui: Joi.object({
          enabled: Joi.boolean().default(true)
        }).default(),
        // enable plugin
        enabled: Joi.boolean().default(true)
      }).default();
    },

    isEnabled(config) {
      return config.get('xpack.remote_clusters.enabled') && config.get('xpack.index_management.enabled');
    },

    init() {}

  });
}