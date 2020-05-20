"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _register_license_checker = require("./server/lib/register_license_checker");

var _index = require("./server/routes/api/index");

var _nodes = require("./server/routes/api/nodes");

var _policies = require("./server/routes/api/policies");

var _templates = require("./server/routes/api/templates");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const indexLifecycleDataEnricher = async (indicesList, callWithRequest) => {
  if (!indicesList || !indicesList.length) {
    return;
  }

  const params = {
    path: '/*/_ilm/explain',
    method: 'GET'
  };
  const {
    indices: ilmIndicesData
  } = await callWithRequest('transport.request', params);
  return indicesList.map(index => {
    return { ...index,
      ilm: { ...(ilmIndicesData[index.name] || {})
      }
    };
  });
};

class Plugin {
  setup(core, plugins, __LEGACY) {
    const {
      server
    } = __LEGACY;
    (0, _register_license_checker.registerLicenseChecker)(server); // Register routes.

    (0, _index.registerIndexRoutes)(server);
    (0, _nodes.registerNodesRoutes)(server);
    (0, _policies.registerPoliciesRoutes)(server);
    (0, _templates.registerTemplatesRoutes)(server);
    const serverPlugins = server.newPlatform.setup.plugins;

    if (server.config().get('xpack.ilm.ui.enabled') && serverPlugins.indexManagement && serverPlugins.indexManagement.indexDataEnricher) {
      serverPlugins.indexManagement.indexDataEnricher.add(indexLifecycleDataEnricher);
    }
  }

}

exports.Plugin = Plugin;