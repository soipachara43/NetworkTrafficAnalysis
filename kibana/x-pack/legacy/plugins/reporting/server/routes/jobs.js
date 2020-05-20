"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerJobInfoRoutes = registerJobInfoRoutes;

var _boom = _interopRequireDefault(require("boom"));

var _constants = require("../../common/constants");

var _jobs_query = require("../lib/jobs_query");

var _job_response_handler = require("./lib/job_response_handler");

var _make_request_facade = require("./lib/make_request_facade");

var _route_config_factories = require("./lib/route_config_factories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const MAIN_ENTRY = `${_constants.API_BASE_URL}/jobs`;

function isResponse(response) {
  return !response.isBoom;
}

function registerJobInfoRoutes(reporting, server, plugins, logger) {
  const {
    elasticsearch
  } = plugins;
  const jobsQuery = (0, _jobs_query.jobsQueryFactory)(server, elasticsearch);
  const getRouteConfig = (0, _route_config_factories.getRouteConfigFactoryManagementPre)(server, plugins, logger); // list jobs in the queue, paginated

  server.route({
    path: `${MAIN_ENTRY}/list`,
    method: 'GET',
    options: getRouteConfig(),
    handler: legacyRequest => {
      const request = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
      const {
        page: queryPage,
        size: querySize,
        ids: queryIds
      } = request.query;
      const page = parseInt(queryPage, 10) || 0;
      const size = Math.min(100, parseInt(querySize, 10) || 10);
      const jobIds = queryIds ? queryIds.split(',') : null;
      const results = jobsQuery.list(request.pre.management.jobTypes, request.pre.user, page, size, jobIds);
      return results;
    }
  }); // return the count of all jobs in the queue

  server.route({
    path: `${MAIN_ENTRY}/count`,
    method: 'GET',
    options: getRouteConfig(),
    handler: legacyRequest => {
      const request = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
      const results = jobsQuery.count(request.pre.management.jobTypes, request.pre.user);
      return results;
    }
  }); // return the raw output from a job

  server.route({
    path: `${MAIN_ENTRY}/output/{docId}`,
    method: 'GET',
    options: getRouteConfig(),
    handler: legacyRequest => {
      const request = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
      const {
        docId
      } = request.params;
      return jobsQuery.get(request.pre.user, docId, {
        includeContent: true
      }).then(result => {
        if (!result) {
          throw _boom.default.notFound();
        }

        const {
          _source: {
            jobtype: jobType,
            output: jobOutput
          }
        } = result;

        if (!request.pre.management.jobTypes.includes(jobType)) {
          throw _boom.default.unauthorized(`Sorry, you are not authorized to download ${jobType} reports`);
        }

        return jobOutput;
      });
    }
  }); // return some info about the job

  server.route({
    path: `${MAIN_ENTRY}/info/{docId}`,
    method: 'GET',
    options: getRouteConfig(),
    handler: legacyRequest => {
      const request = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
      const {
        docId
      } = request.params;
      return jobsQuery.get(request.pre.user, docId).then(result => {
        if (!result) {
          throw _boom.default.notFound();
        }

        const {
          _source: job
        } = result;
        const {
          jobtype: jobType,
          payload: jobPayload
        } = job;

        if (!request.pre.management.jobTypes.includes(jobType)) {
          throw _boom.default.unauthorized(`Sorry, you are not authorized to view ${jobType} info`);
        }

        return { ...job,
          payload: { ...jobPayload,
            headers: undefined
          }
        };
      });
    }
  }); // trigger a download of the output from a job

  const exportTypesRegistry = reporting.getExportTypesRegistry();
  const getRouteConfigDownload = (0, _route_config_factories.getRouteConfigFactoryDownloadPre)(server, plugins, logger);
  const downloadResponseHandler = (0, _job_response_handler.downloadJobResponseHandlerFactory)(server, elasticsearch, exportTypesRegistry); // prettier-ignore

  server.route({
    path: `${MAIN_ENTRY}/download/{docId}`,
    method: 'GET',
    options: getRouteConfigDownload(),
    handler: async (legacyRequest, h) => {
      const request = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
      const {
        docId
      } = request.params;
      let response = await downloadResponseHandler(request.pre.management.jobTypes, request.pre.user, h, {
        docId
      });

      if (isResponse(response)) {
        const {
          statusCode
        } = response;

        if (statusCode !== 200) {
          if (statusCode === 500) {
            logger.error(`Report ${docId} has failed: ${JSON.stringify(response.source)}`);
          } else {
            logger.debug(`Report ${docId} has non-OK status: [${statusCode}] Reason: [${JSON.stringify(response.source)}]`);
          }
        }

        response = response.header('accept-ranges', 'none');
      }

      return response;
    }
  }); // allow a report to be deleted

  const getRouteConfigDelete = (0, _route_config_factories.getRouteConfigFactoryDeletePre)(server, plugins, logger);
  const deleteResponseHandler = (0, _job_response_handler.deleteJobResponseHandlerFactory)(server, elasticsearch);
  server.route({
    path: `${MAIN_ENTRY}/delete/{docId}`,
    method: 'DELETE',
    options: getRouteConfigDelete(),
    handler: async (legacyRequest, h) => {
      const request = (0, _make_request_facade.makeRequestFacade)(legacyRequest);
      const {
        docId
      } = request.params;
      let response = await deleteResponseHandler(request.pre.management.jobTypes, request.pre.user, h, {
        docId
      });

      if (isResponse(response)) {
        const {
          statusCode
        } = response;

        if (statusCode !== 200) {
          if (statusCode === 500) {
            logger.error(`Report ${docId} has failed: ${JSON.stringify(response.source)}`);
          } else {
            logger.debug(`Report ${docId} has non-OK status: [${statusCode}] Reason: [${JSON.stringify(response.source)}]`);
          }
        }

        response = response.header('accept-ranges', 'none');
      }

      return response;
    }
  });
}