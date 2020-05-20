"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJobFactory = void 0;

var _boom = require("boom");

var _lodash = require("lodash");

var _constants = require("../../../../common/constants");

var _lib = require("../../../../server/lib");

var _create_job_search = require("./create_job_search");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createJobFactory = function createJobFactoryFn(reporting, server, elasticsearch, parentLogger) {
  const crypto = (0, _lib.cryptoFactory)(server);
  const logger = parentLogger.clone([_constants.CSV_FROM_SAVEDOBJECT_JOB_TYPE, 'create-job']);
  return async function createJob(jobParams, headers, req) {
    const {
      savedObjectType,
      savedObjectId
    } = jobParams;
    const serializedEncryptedHeaders = await crypto.encrypt(headers);
    const client = req.getSavedObjectsClient();
    const {
      panel,
      title,
      visType
    } = await Promise.resolve().then(() => client.get(savedObjectType, savedObjectId)).then(async savedObject => {
      const {
        attributes,
        references
      } = savedObject;
      const {
        kibanaSavedObjectMeta: kibanaSavedObjectMetaJSON
      } = attributes;
      const {
        timerange
      } = req.payload;

      if (!kibanaSavedObjectMetaJSON) {
        throw new Error('Could not parse saved object data!');
      }

      const kibanaSavedObjectMeta = { ...kibanaSavedObjectMetaJSON,
        searchSource: JSON.parse(kibanaSavedObjectMetaJSON.searchSourceJSON)
      };
      const {
        visState: visStateJSON
      } = attributes;

      if (visStateJSON) {
        throw (0, _boom.notImplemented)('Visualization types are not yet implemented');
      } // saved search type


      return await (0, _create_job_search.createJobSearch)(timerange, attributes, references, kibanaSavedObjectMeta);
    }).catch(err => {
      const boomErr = err;

      if (boomErr.isBoom) {
        throw err;
      }

      const errPayload = (0, _lodash.get)(err, 'output.payload', {
        statusCode: 0
      });

      if (errPayload.statusCode === 404) {
        throw (0, _boom.notFound)(errPayload.message);
      }

      if (err.stack) {
        logger.error(err.stack);
      }

      throw new Error(`Unable to create a job from saved object data! Error: ${err}`);
    });
    return {
      headers: serializedEncryptedHeaders,
      jobParams: { ...jobParams,
        panel,
        visType
      },
      type: null,
      title
    };
  };
};

exports.createJobFactory = createJobFactory;