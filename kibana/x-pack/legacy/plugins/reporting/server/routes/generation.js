"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerJobGenerationRoutes = registerJobGenerationRoutes;

var _boom = _interopRequireDefault(require("boom"));

var _elasticsearch = require("elasticsearch");

var _constants = require("../../common/constants");

var _generate_from_jobparams = require("./generate_from_jobparams");

var _generate_from_savedobject = require("./generate_from_savedobject");

var _generate_from_savedobject_immediate = require("./generate_from_savedobject_immediate");

var _legacy = require("./legacy");

var _make_request_facade = require("./lib/make_request_facade");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const esErrors = _elasticsearch.errors;

function registerJobGenerationRoutes(reporting, server, plugins, logger) {
  const config = server.config();
  const DOWNLOAD_BASE_URL = config.get('server.basePath') + `${_constants.API_BASE_URL}/jobs/download`;
  /*
   * Generates enqueued job details to use in responses
   */

  async function handler(exportTypeId, jobParams, legacyRequest, h) {
    const request = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
    const user = request.pre.user;
    const headers = request.headers;
    const enqueueJob = await reporting.getEnqueueJob();
    const job = await enqueueJob(exportTypeId, jobParams, user, headers, request); // return the queue's job information

    const jobJson = job.toJSON();
    return h.response({
      path: `${DOWNLOAD_BASE_URL}/${jobJson.id}`,
      job: jobJson
    }).type('application/json');
  }

  function handleError(exportTypeId, err) {
    if (err instanceof esErrors['401']) {
      return _boom.default.unauthorized(`Sorry, you aren't authenticated`);
    }

    if (err instanceof esErrors['403']) {
      return _boom.default.forbidden(`Sorry, you are not authorized to create ${exportTypeId} reports`);
    }

    if (err instanceof esErrors['404']) {
      return _boom.default.boomify(err, {
        statusCode: 404
      });
    }

    return err;
  }

  (0, _generate_from_jobparams.registerGenerateFromJobParams)(server, plugins, handler, handleError, logger);
  (0, _legacy.registerLegacy)(server, plugins, handler, handleError, logger); // 7.x only
  // Register beta panel-action download-related API's

  if (config.get('xpack.reporting.csv.enablePanelActionDownload')) {
    (0, _generate_from_savedobject.registerGenerateCsvFromSavedObject)(server, plugins, handler, handleError, logger);
    (0, _generate_from_savedobject_immediate.registerGenerateCsvFromSavedObjectImmediate)(reporting, server, plugins, logger);
  }
}