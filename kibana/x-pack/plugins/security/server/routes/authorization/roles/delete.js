"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineDeleteRolesRoutes = defineDeleteRolesRoutes;

var _configSchema = require("@kbn/config-schema");

var _licensed_route_handler = require("../../licensed_route_handler");

var _errors = require("../../../errors");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineDeleteRolesRoutes({
  router,
  clusterClient
}) {
  router.delete({
    path: '/api/security/role/{name}',
    validate: {
      params: _configSchema.schema.object({
        name: _configSchema.schema.string({
          minLength: 1
        })
      })
    }
  }, (0, _licensed_route_handler.createLicensedRouteHandler)(async (context, request, response) => {
    try {
      await clusterClient.asScoped(request).callAsCurrentUser('shield.deleteRole', {
        name: request.params.name
      });
      return response.noContent();
    } catch (error) {
      return response.customError((0, _errors.wrapIntoCustomErrorResponse)(error));
    }
  }));
}