"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerLegacy = registerLegacy;

var _querystring = _interopRequireDefault(require("querystring"));

var _constants = require("../../common/constants");

var _route_config_factories = require("./lib/route_config_factories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getStaticFeatureConfig = (getRouteConfig, featureId) => getRouteConfig(() => featureId);

const BASE_GENERATE = `${_constants.API_BASE_URL}/generate`;

function registerLegacy(server, plugins, handler, handleError, logger) {
  const getRouteConfig = (0, _route_config_factories.getRouteConfigFactoryReportingPre)(server, plugins, logger);

  function createLegacyPdfRoute({
    path,
    objectType
  }) {
    const exportTypeId = 'printablePdf';
    server.route({
      path,
      method: 'POST',
      options: getStaticFeatureConfig(getRouteConfig, exportTypeId),
      handler: async (request, h) => {
        const message = `The following URL is deprecated and will stop working in the next major version: ${request.url.path}`;
        logger.warn(message, ['deprecation']);

        try {
          const savedObjectId = request.params.savedId;

          const queryString = _querystring.default.stringify(request.query);

          return await handler(exportTypeId, {
            objectType,
            savedObjectId,
            queryString
          }, request, h);
        } catch (err) {
          throw handleError(exportTypeId, err);
        }
      }
    });
  }

  createLegacyPdfRoute({
    path: `${BASE_GENERATE}/visualization/{savedId}`,
    objectType: 'visualization'
  });
  createLegacyPdfRoute({
    path: `${BASE_GENERATE}/search/{savedId}`,
    objectType: 'search'
  });
  createLegacyPdfRoute({
    path: `${BASE_GENERATE}/dashboard/{savedId}`,
    objectType: 'dashboard'
  });
}