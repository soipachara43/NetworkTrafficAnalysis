"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadJobResponseHandlerFactory = downloadJobResponseHandlerFactory;
exports.deleteJobResponseHandlerFactory = deleteJobResponseHandlerFactory;

var _boom = _interopRequireDefault(require("boom"));

var _constants = require("../../../common/constants");

var _jobs_query = require("../../lib/jobs_query");

var _get_document_payload = require("./get_document_payload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function downloadJobResponseHandlerFactory(server, elasticsearch, exportTypesRegistry) {
  const jobsQuery = (0, _jobs_query.jobsQueryFactory)(server, elasticsearch);
  const getDocumentPayload = (0, _get_document_payload.getDocumentPayloadFactory)(server, exportTypesRegistry);
  return function jobResponseHandler(validJobTypes, user, h, params, opts = {}) {
    const {
      docId
    } = params; // TODO: async/await

    return jobsQuery.get(user, docId, {
      includeContent: !opts.excludeContent
    }).then(doc => {
      if (!doc) return _boom.default.notFound();
      const {
        jobtype: jobType
      } = doc._source;

      if (!validJobTypes.includes(jobType)) {
        return _boom.default.unauthorized(`Sorry, you are not authorized to download ${jobType} reports`);
      }

      const output = getDocumentPayload(doc);

      if (!_constants.WHITELISTED_JOB_CONTENT_TYPES.includes(output.contentType)) {
        return _boom.default.badImplementation(`Unsupported content-type of ${output.contentType} specified by job output`);
      }

      const response = h.response(output.content).type(output.contentType).code(output.statusCode);

      if (output.headers) {
        Object.keys(output.headers).forEach(key => {
          response.header(key, output.headers[key]);
        });
      }

      return response; // Hapi
    });
  };
}

function deleteJobResponseHandlerFactory(server, elasticsearch) {
  const jobsQuery = (0, _jobs_query.jobsQueryFactory)(server, elasticsearch);
  return async function deleteJobResponseHander(validJobTypes, user, h, params) {
    const {
      docId
    } = params;
    const doc = await jobsQuery.get(user, docId, {
      includeContent: false
    });
    if (!doc) return _boom.default.notFound();
    const {
      jobtype: jobType
    } = doc._source;

    if (!validJobTypes.includes(jobType)) {
      return _boom.default.unauthorized(`Sorry, you are not authorized to delete ${jobType} reports`);
    }

    try {
      const docIndex = doc._index;
      await jobsQuery.delete(docIndex, docId);
      return h.response({
        deleted: true
      });
    } catch (error) {
      return _boom.default.boomify(error, {
        statusCode: error.statusCode
      });
    }
  };
}