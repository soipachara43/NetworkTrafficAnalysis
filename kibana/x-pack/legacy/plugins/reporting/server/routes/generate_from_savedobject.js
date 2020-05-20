"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerGenerateCsvFromSavedObject = registerGenerateCsvFromSavedObject;

var _lodash = require("lodash");

var _constants = require("../../common/constants");

var _get_job_params_from_request = require("../../export_types/csv_from_savedobject/server/lib/get_job_params_from_request");

var _make_request_facade = require("./lib/make_request_facade");

var _route_config_factories = require("./lib/route_config_factories");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * This function registers API Endpoints for queuing Reporting jobs. The API inputs are:
 * - saved object type and ID
 * - time range and time zone
 * - application state:
 *     - filters
 *     - query bar
 *     - local (transient) changes the user made to the saved object
 */
function registerGenerateCsvFromSavedObject(server, plugins, handleRoute, handleRouteError, logger) {
  const routeOptions = (0, _route_config_factories.getRouteOptionsCsv)(server, plugins, logger);
  server.route({
    path: `${_constants.API_BASE_GENERATE_V1}/csv/saved-object/{savedObjectType}:{savedObjectId}`,
    method: 'POST',
    options: routeOptions,
    handler: async (legacyRequest, h) => {
      const requestFacade = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
      /*
       * 1. Build `jobParams` object: job data that execution will need to reference in various parts of the lifecycle
       * 2. Pass the jobParams and other common params to `handleRoute`, a shared function to enqueue the job with the params
       * 3. Ensure that details for a queued job were returned
       */

      let result;

      try {
        const jobParams = (0, _get_job_params_from_request.getJobParamsFromRequest)(requestFacade, {
          isImmediate: false
        });
        result = await handleRoute(_constants.CSV_FROM_SAVEDOBJECT_JOB_TYPE, jobParams, legacyRequest, h); // pass the original request because the handler will make the request facade on its own
      } catch (err) {
        throw handleRouteError(_constants.CSV_FROM_SAVEDOBJECT_JOB_TYPE, err);
      }

      if ((0, _lodash.get)(result, 'source.job') == null) {
        throw new Error(`The Export handler is expected to return a result with job info! ${result}`);
      }

      return result;
    }
  });
}