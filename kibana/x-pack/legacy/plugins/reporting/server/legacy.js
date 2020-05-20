"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.legacyInit = void 0;

var _index = require("./index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const buildLegacyDependencies = (server, reportingPlugin) => ({
  config: server.config,
  info: server.info,
  route: server.route.bind(server),
  plugins: {
    elasticsearch: server.plugins.elasticsearch,
    xpack_main: server.plugins.xpack_main,
    reporting: reportingPlugin
  }
});

const legacyInit = async (server, reportingPlugin) => {
  const coreSetup = server.newPlatform.setup.core;
  const pluginInstance = (0, _index.plugin)(server.newPlatform.coreContext);

  const __LEGACY = buildLegacyDependencies(server, reportingPlugin);

  await pluginInstance.setup(coreSetup, {
    elasticsearch: coreSetup.elasticsearch,
    security: server.newPlatform.setup.plugins.security,
    usageCollection: server.newPlatform.setup.plugins.usageCollection,
    __LEGACY
  }); // Schedule to call the "start" hook only after start dependencies are ready

  coreSetup.getStartServices().then(([core, plugins]) => pluginInstance.start(core, {
    elasticsearch: coreSetup.elasticsearch,
    data: plugins.data,
    __LEGACY
  }));
};

exports.legacyInit = legacyInit;