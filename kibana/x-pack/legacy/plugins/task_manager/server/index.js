"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskManager = taskManager;
Object.defineProperty(exports, "LegacyTaskManagerApi", {
  enumerable: true,
  get: function () {
    return _legacy.LegacyTaskManagerApi;
  }
});
Object.defineProperty(exports, "getTaskManagerSetup", {
  enumerable: true,
  get: function () {
    return _legacy.getTaskManagerSetup;
  }
});
Object.defineProperty(exports, "getTaskManagerStart", {
  enumerable: true,
  get: function () {
    return _legacy.getTaskManagerStart;
  }
});

var _mappings = _interopRequireDefault(require("./mappings.json"));

var _migrations = require("./migrations");

var _legacy = require("./legacy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const savedObjectSchemas = {
  task: {
    hidden: true,
    isNamespaceAgnostic: true,
    convertToAliasScript: `ctx._id = ctx._source.type + ':' + ctx._id`,

    indexPattern(config) {
      return config.get('xpack.task_manager.index');
    }

  }
};

function taskManager(kibana) {
  return new kibana.Plugin({
    id: 'task_manager',
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    configPrefix: 'xpack.task_manager',

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        index: Joi.string().description('The name of the index used to store task information.').default('.kibana_task_manager').invalid(['.tasks'])
      }).unknown(true).default();
    },

    init(server) {
      /*
       * We must expose the New Platform Task Manager Plugin via the legacy Api
       * as removing it now would be a breaking change - we'll remove this in v8.0.0
       */
      server.expose((0, _legacy.createLegacyApi)((0, _legacy.getTaskManagerSetup)(server).registerLegacyAPI({}).then(taskManagerPlugin => {
        // we can't tell the Kibana Platform Task Manager plugin to
        // to wait to `start` as that happens before legacy plugins
        // instead we will start the internal Task Manager plugin when
        // all legacy plugins have finished initializing
        // Once all plugins are migrated to NP, this can be removed
        this.kbnServer.afterPluginsInit(() => {
          taskManagerPlugin.start();
        });
        return taskManagerPlugin;
      })));
    },

    uiExports: {
      mappings: _mappings.default,
      migrations: _migrations.migrations,
      savedObjectSchemas
    }
  });
}