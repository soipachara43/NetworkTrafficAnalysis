"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerGenerateFromJobParams = registerGenerateFromJobParams;

var _boom = _interopRequireDefault(require("boom"));

var _joi = _interopRequireDefault(require("joi"));

var _risonNode = _interopRequireDefault(require("rison-node"));

var _constants = require("../../common/constants");

var _make_request_facade = require("./lib/make_request_facade");

var _route_config_factories = require("./lib/route_config_factories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const BASE_GENERATE = `${_constants.API_BASE_URL}/generate`;

function registerGenerateFromJobParams(server, plugins, handler, handleError, logger) {
  const getRouteConfig = () => {
    const getOriginalRouteConfig = (0, _route_config_factories.getRouteConfigFactoryReportingPre)(server, plugins, logger);
    const routeConfigFactory = getOriginalRouteConfig(({
      params: {
        exportType
      }
    }) => exportType);
    return { ...routeConfigFactory,
      validate: {
        params: _joi.default.object({
          exportType: _joi.default.string().required()
        }).required(),
        payload: _joi.default.object({
          jobParams: _joi.default.string().optional().default(null)
        }).allow(null),
        // allow optional payload
        query: _joi.default.object({
          jobParams: _joi.default.string().default(null)
        }).default()
      }
    };
  }; // generate report


  server.route({
    path: `${BASE_GENERATE}/{exportType}`,
    method: 'POST',
    options: getRouteConfig(),
    handler: async (legacyRequest, h) => {
      const request = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
      let jobParamsRison;

      if (request.payload) {
        const {
          jobParams: jobParamsPayload
        } = request.payload;
        jobParamsRison = jobParamsPayload;
      } else {
        const {
          jobParams: queryJobParams
        } = request.query;

        if (queryJobParams) {
          jobParamsRison = queryJobParams;
        } else {
          jobParamsRison = null;
        }
      }

      if (!jobParamsRison) {
        throw _boom.default.badRequest('A jobParams RISON string is required');
      }

      const {
        exportType
      } = request.params;
      let jobParams;
      let response;

      try {
        jobParams = _risonNode.default.decode(jobParamsRison);

        if (!jobParams) {
          throw new Error('missing jobParams!');
        }
      } catch (err) {
        throw _boom.default.badRequest(`invalid rison: ${jobParamsRison}`);
      }

      try {
        response = await handler(exportType, jobParams, legacyRequest, h);
      } catch (err) {
        throw handleError(exportType, err);
      }

      return response;
    }
  }); // Get route to generation endpoint: show error about GET method to user

  server.route({
    path: `${BASE_GENERATE}/{p*}`,
    method: 'GET',
    handler: () => {
      const err = _boom.default.methodNotAllowed('GET is not allowed');

      err.output.headers.allow = 'POST';
      return err;
    }
  });
}