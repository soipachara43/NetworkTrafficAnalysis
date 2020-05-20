"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerJobsRoute = registerJobsRoute;

var _configSchema = require("@kbn/config-schema");

var _call_with_request_factory = require("../../lib/call_with_request_factory");

var _is_es_error = require("../../lib/is_es_error");

var _license_pre_routing_factory = require("../../lib/license_pre_routing_factory");

var _common = require("../../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerJobsRoute(deps, legacy) {
  const getJobsHandler = async (ctx, request, response) => {
    const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request);

    try {
      const data = await callWithRequest('rollup.jobs');
      return response.ok({
        body: data
      });
    } catch (err) {
      if ((0, _is_es_error.isEsError)(err)) {
        return response.customError({
          statusCode: err.statusCode,
          body: err
        });
      }

      return response.internalError({
        body: err
      });
    }
  };

  const createJobsHandler = async (ctx, request, response) => {
    try {
      const {
        id,
        ...rest
      } = request.body.job;
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request); // Create job.

      await callWithRequest('rollup.createJob', {
        id,
        body: rest
      }); // Then request the newly created job.

      const results = await callWithRequest('rollup.job', {
        id
      });
      return response.ok({
        body: results.jobs[0]
      });
    } catch (err) {
      if ((0, _is_es_error.isEsError)(err)) {
        return response.customError({
          statusCode: err.statusCode,
          body: err
        });
      }

      return response.internalError({
        body: err
      });
    }
  };

  const startJobsHandler = async (ctx, request, response) => {
    try {
      const {
        jobIds
      } = request.body;
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request);
      const data = await Promise.all(jobIds.map(id => callWithRequest('rollup.startJob', {
        id
      }))).then(() => ({
        success: true
      }));
      return response.ok({
        body: data
      });
    } catch (err) {
      // There is an issue opened on ES to handle the following error correctly
      // https://github.com/elastic/elasticsearch/issues/39845
      // Until then we'll modify the response here.
      if (err.message.includes('Cannot start task for Rollup Job')) {
        err.status = 400;
        err.statusCode = 400;
        err.body.error.status = 400;
        err.displayName = 'Bad request';
      }

      if ((0, _is_es_error.isEsError)(err)) {
        return response.customError({
          statusCode: err.statusCode,
          body: err
        });
      }

      return response.internalError({
        body: err
      });
    }
  };

  const stopJobsHandler = async (ctx, request, response) => {
    try {
      const {
        jobIds
      } = request.body; // For our API integration tests we need to wait for the jobs to be stopped
      // in order to be able to delete them sequencially.

      const {
        waitForCompletion
      } = request.query;
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request);

      const stopRollupJob = id => callWithRequest('rollup.stopJob', {
        id,
        waitForCompletion: waitForCompletion === 'true'
      });

      const data = await Promise.all(jobIds.map(stopRollupJob)).then(() => ({
        success: true
      }));
      return response.ok({
        body: data
      });
    } catch (err) {
      if ((0, _is_es_error.isEsError)(err)) {
        return response.customError({
          statusCode: err.statusCode,
          body: err
        });
      }

      return response.internalError({
        body: err
      });
    }
  };

  const deleteJobsHandler = async (ctx, request, response) => {
    try {
      const {
        jobIds
      } = request.body;
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request);
      const data = await Promise.all(jobIds.map(id => callWithRequest('rollup.deleteJob', {
        id
      }))).then(() => ({
        success: true
      }));
      return response.ok({
        body: data
      });
    } catch (err) {
      // There is an issue opened on ES to handle the following error correctly
      // https://github.com/elastic/elasticsearch/issues/42908
      // Until then we'll modify the response here.
      if (err.response && err.response.includes('Job must be [STOPPED] before deletion')) {
        err.status = 400;
        err.statusCode = 400;
        err.displayName = 'Bad request';
        err.message = JSON.parse(err.response).task_failures[0].reason.reason;
      }

      if ((0, _is_es_error.isEsError)(err)) {
        return response.customError({
          statusCode: err.statusCode,
          body: err
        });
      }

      return response.internalError({
        body: err
      });
    }
  };

  deps.router.get({
    path: `${_common.API_BASE_PATH}/jobs`,
    validate: false
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, getJobsHandler));
  deps.router.put({
    path: `${_common.API_BASE_PATH}/create`,
    validate: {
      body: _configSchema.schema.object({
        job: _configSchema.schema.object({
          id: _configSchema.schema.string()
        }, {
          unknowns: 'allow'
        })
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, createJobsHandler));
  deps.router.post({
    path: `${_common.API_BASE_PATH}/start`,
    validate: {
      body: _configSchema.schema.object({
        jobIds: _configSchema.schema.arrayOf(_configSchema.schema.string())
      }),
      query: _configSchema.schema.maybe(_configSchema.schema.object({
        waitForCompletion: _configSchema.schema.maybe(_configSchema.schema.string())
      }))
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, startJobsHandler));
  deps.router.post({
    path: `${_common.API_BASE_PATH}/stop`,
    validate: {
      body: _configSchema.schema.object({
        jobIds: _configSchema.schema.arrayOf(_configSchema.schema.string())
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, stopJobsHandler));
  deps.router.post({
    path: `${_common.API_BASE_PATH}/delete`,
    validate: {
      body: _configSchema.schema.object({
        jobIds: _configSchema.schema.arrayOf(_configSchema.schema.string())
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, deleteJobsHandler));
}