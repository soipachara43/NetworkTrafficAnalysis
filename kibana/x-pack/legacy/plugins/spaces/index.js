"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spaces = void 0;

var _path = require("path");

var _server = require("../../../../src/core/server");

var _audit_logger = require("../../server/lib/audit_logger");

var _mappings = _interopRequireDefault(require("./mappings.json"));

var _errors = require("./server/lib/errors");

var _migrations = require("./server/lib/migrations");

var _watch_status_and_license_to_initialize = require("../../server/lib/watch_status_and_license_to_initialize");

var _views = require("./server/routes/views");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
const spaces = kibana => new kibana.Plugin({
  id: 'spaces',
  configPrefix: 'xpack.spaces',
  publicDir: (0, _path.resolve)(__dirname, 'public'),
  require: ['kibana', 'elasticsearch', 'xpack_main'],
  uiExports: {
    styleSheetPaths: (0, _path.resolve)(__dirname, 'public/index.scss'),
    managementSections: [],
    apps: [],
    hacks: ['plugins/spaces/legacy'],
    mappings: _mappings.default,
    migrations: {
      space: {
        '6.6.0': _migrations.migrateToKibana660
      }
    },
    savedObjectSchemas: {
      space: {
        isNamespaceAgnostic: true,
        hidden: true
      }
    },
    home: [],

    injectDefaultVars(server) {
      return {
        serverBasePath: server.config().get('server.basePath'),
        activeSpace: null
      };
    },

    async replaceInjectedVars(vars, request, server) {
      // NOTICE: use of `activeSpace` is deprecated and will not be made available in the New Platform.
      // Known usages:
      // - x-pack/legacy/plugins/infra/public/utils/use_kibana_space_id.ts
      const spacesPlugin = server.newPlatform.setup.plugins.spaces;

      if (!spacesPlugin) {
        throw new Error('New Platform XPack Spaces plugin is not available.');
      }

      const kibanaRequest = _server.KibanaRequest.from(request);

      const spaceId = spacesPlugin.spacesService.getSpaceId(kibanaRequest);
      const spacesClient = await spacesPlugin.spacesService.scopedClient(kibanaRequest);

      try {
        vars.activeSpace = {
          valid: true,
          space: await spacesClient.get(spaceId)
        };
      } catch (e) {
        vars.activeSpace = {
          valid: false,
          error: (0, _errors.wrapError)(e).output.payload
        };
      }

      return vars;
    }

  },

  async init(server) {
    const kbnServer = server;
    const spacesPlugin = kbnServer.newPlatform.setup.plugins.spaces;

    if (!spacesPlugin) {
      throw new Error('New Platform XPack Spaces plugin is not available.');
    }

    const {
      registerLegacyAPI,
      createDefaultSpace
    } = spacesPlugin.__legacyCompat;
    registerLegacyAPI({
      savedObjects: server.savedObjects,
      auditLogger: {
        create: pluginId => new _audit_logger.AuditLogger(server, pluginId, server.config(), server.plugins.xpack_main.info)
      }
    });
    (0, _views.initEnterSpaceView)(server);
    (0, _watch_status_and_license_to_initialize.watchStatusAndLicenseToInitialize)(server.plugins.xpack_main, this, async () => {
      await createDefaultSpace();
    });
    server.expose('getSpaceId', request => spacesPlugin.spacesService.getSpaceId(request));
    server.expose('getActiveSpace', request => spacesPlugin.spacesService.getActiveSpace(request));
    server.expose('spaceIdToNamespace', spacesPlugin.spacesService.spaceIdToNamespace);
    server.expose('namespaceToSpaceId', spacesPlugin.spacesService.namespaceToSpaceId);
    server.expose('getBasePath', spacesPlugin.spacesService.getBasePath);
  }

});

exports.spaces = spaces;