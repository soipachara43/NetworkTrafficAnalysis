"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSetupShim = createSetupShim;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function createSetupShim(server) {
  const setup = server.newPlatform.setup.core;
  return {
    coreSetup: { ...setup,
      elasticsearch: server.plugins.elasticsearch,
      getInjectedUiAppVars: server.getInjectedUiAppVars,
      getServerConfig: () => server.config(),
      http: { // @ts-ignore: New Platform object not typed
        ...server.newPlatform.setup.core.http,
        route: (...args) => server.route(...args)
      }
    },
    pluginsSetup: {
      // @ts-ignore: New Platform not typed
      features: server.newPlatform.setup.plugins.features,
      home: server.newPlatform.setup.plugins.home,
      // @ts-ignore Interpreter plugin not typed on legacy server
      interpreter: server.plugins.interpreter,
      kibana: {
        injectedUiAppVars: await server.getInjectedUiAppVars('kibana')
      },
      usageCollection: server.newPlatform.setup.plugins.usageCollection
    }
  };
}