"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocumentPayloadFactory = getDocumentPayloadFactory;

var _contentDisposition = _interopRequireDefault(require("content-disposition"));

var _ = _interopRequireWildcard(require("lodash"));

var _constants = require("../../../common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const DEFAULT_TITLE = 'report';

const getTitle = (exportType, title) => `${title || DEFAULT_TITLE}.${exportType.jobContentExtension}`;

const getReportingHeaders = (output, exportType) => {
  const metaDataHeaders = {};

  if (exportType.jobType === _constants.CSV_JOB_TYPE) {
    const csvContainsFormulas = _.get(output, 'csv_contains_formulas', false);

    const maxSizedReach = _.get(output, 'max_size_reached', false);

    metaDataHeaders['kbn-csv-contains-formulas'] = csvContainsFormulas;
    metaDataHeaders['kbn-max-size-reached'] = maxSizedReach;
  }

  return metaDataHeaders;
};

function getDocumentPayloadFactory(server, exportTypesRegistry) {
  function encodeContent(content, exportType) {
    switch (exportType.jobContentEncoding) {
      case 'base64':
        return content ? Buffer.from(content, 'base64') : content;
      // Buffer.from rejects null

      default:
        return content;
    }
  }

  function getCompleted(output, jobType, title) {
    const exportType = exportTypesRegistry.get(item => item.jobType === jobType);
    const filename = getTitle(exportType, title);
    const headers = getReportingHeaders(output, exportType);
    return {
      statusCode: 200,
      content: encodeContent(output.content, exportType),
      contentType: output.content_type,
      headers: { ...headers,
        'Content-Disposition': (0, _contentDisposition.default)(filename, {
          type: 'inline'
        })
      }
    };
  }

  function getFailure(output) {
    return {
      statusCode: 500,
      content: {
        message: 'Reporting generation failed',
        reason: output.content
      },
      contentType: 'application/json',
      headers: {}
    };
  }

  function getIncomplete(status) {
    return {
      statusCode: 503,
      content: status,
      contentType: 'application/json',
      headers: {
        'retry-after': 30
      }
    };
  }

  return function getDocumentPayload(doc) {
    const {
      status,
      jobtype: jobType,
      payload: {
        title
      } = {
        title: ''
      }
    } = doc._source;
    const {
      output
    } = doc._source;

    if (status === 'completed') {
      return getCompleted(output, jobType, title);
    }

    if (status === 'failed') {
      return getFailure(output);
    } // send a 503 indicating that the report isn't completed yet


    return getIncomplete(status);
  };
}