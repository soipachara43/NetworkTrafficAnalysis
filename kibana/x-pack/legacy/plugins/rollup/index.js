"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rollup = rollup;

var _path = require("path");

var _i18n = require("@kbn/i18n");

var _common = require("./common");

var _server = require("./server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function rollup(kibana) {
  return new kibana.Plugin({
    id: _common.PLUGIN.ID,
    configPrefix: 'xpack.rollup',
    publicDir: (0, _path.resolve)(__dirname, 'public'),
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    uiExports: {
      styleSheetPaths: (0, _path.resolve)(__dirname, 'public/index.scss'),
      managementSections: ['plugins/rollup/legacy'],
      uiSettingDefaults: {
        [_common.CONFIG_ROLLUPS]: {
          name: _i18n.i18n.translate('xpack.rollupJobs.rollupIndexPatternsTitle', {
            defaultMessage: 'Enable rollup index patterns'
          }),
          value: true,
          description: _i18n.i18n.translate('xpack.rollupJobs.rollupIndexPatternsDescription', {
            defaultMessage: `Enable the creation of index patterns which capture rollup indices,
              which in turn enable visualizations based on rollup data. Refresh
              the page to apply the changes.`
          }),
          category: ['rollups']
        }
      },
      indexManagement: ['plugins/rollup/legacy'],
      visualize: ['plugins/rollup/legacy'],
      search: ['plugins/rollup/legacy']
    },

    init(server) {
      const {
        core: coreSetup,
        plugins
      } = server.newPlatform.setup;
      const {
        usageCollection,
        metrics,
        indexManagement
      } = plugins;
      const rollupSetup = plugins.rollup;
      const initContext = {
        config: rollupSetup.__legacy.config,
        logger: rollupSetup.__legacy.logger
      };
      const rollupPluginInstance = (0, _server.plugin)(initContext);
      rollupPluginInstance.setup(coreSetup, {
        usageCollection,
        metrics,
        indexManagement,
        __LEGACY: {
          plugins: {
            xpack_main: server.plugins.xpack_main,
            rollup: server.plugins[_common.PLUGIN.ID]
          }
        }
      });
    }

  });
}