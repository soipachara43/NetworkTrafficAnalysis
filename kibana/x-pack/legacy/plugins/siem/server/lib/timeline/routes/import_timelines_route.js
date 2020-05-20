"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importTimelinesRoute = void 0;

var _path = require("path");

var _fp = require("lodash/fp");

var _utils = require("../../detection_engine/routes/utils");

var _create_timelines_stream_from_ndjson = require("../create_timelines_stream_from_ndjson");

var _utils2 = require("../../../../../../../../src/legacy/utils");

var _import_timelines = require("./utils/import_timelines");

var _constants = require("../../../../common/constants");

var _import_timelines_schema = require("./schemas/import_timelines_schema");

var _import_rules_schema = require("../../detection_engine/routes/schemas/response/import_rules_schema");

var _saved_object = require("../saved_object");

var _validate = require("../../detection_engine/routes/rules/validate");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CHUNK_PARSED_OBJECT_SIZE = 10;
const timelineLib = new _saved_object.Timeline();

const importTimelinesRoute = (router, config, security) => {
  router.post({
    path: `${_constants.TIMELINE_IMPORT_URL}`,
    validate: {
      body: (0, _utils.buildRouteValidation)(_import_timelines_schema.importTimelinesPayloadSchema)
    },
    options: {
      tags: ['access:siem'],
      body: {
        maxBytes: config().get('savedObjects.maxImportPayloadBytes'),
        output: 'stream'
      }
    }
  }, async (context, request, response) => {
    const siemResponse = (0, _utils.buildSiemResponse)(response);
    const savedObjectsClient = context.core.savedObjects.client;

    if (!savedObjectsClient) {
      return siemResponse.error({
        statusCode: 404
      });
    }

    const {
      filename
    } = request.body.file.hapi;
    const fileExtension = (0, _path.extname)(filename).toLowerCase();

    if (fileExtension !== '.ndjson') {
      return siemResponse.error({
        statusCode: 400,
        body: `Invalid file extension ${fileExtension}`
      });
    }

    const objectLimit = config().get('savedObjects.maxImportExportSize');

    try {
      const readStream = (0, _create_timelines_stream_from_ndjson.createTimelinesStreamFromNdJson)(objectLimit);
      const parsedObjects = await (0, _utils2.createPromiseFromStreams)([request.body.file, ...readStream]);
      const [duplicateIdErrors, uniqueParsedObjects] = (0, _import_timelines.getTupleDuplicateErrorsAndUniqueTimeline)(parsedObjects, false);
      const chunkParseObjects = (0, _fp.chunk)(CHUNK_PARSED_OBJECT_SIZE, uniqueParsedObjects);
      let importTimelineResponse = [];
      const user = await (security === null || security === void 0 ? void 0 : security.authc.getCurrentUser(request));
      let frameworkRequest = (0, _fp.set)('context.core.savedObjects.client', savedObjectsClient, request);
      frameworkRequest = (0, _fp.set)('user', user, frameworkRequest);

      while (chunkParseObjects.length) {
        var _chunkParseObjects$sh;

        const batchParseObjects = (_chunkParseObjects$sh = chunkParseObjects.shift()) !== null && _chunkParseObjects$sh !== void 0 ? _chunkParseObjects$sh : [];
        const newImportTimelineResponse = await Promise.all(batchParseObjects.reduce((accum, parsedTimeline) => {
          const importsWorkerPromise = new Promise(async (resolve, reject) => {
            if (parsedTimeline instanceof Error) {
              // If the JSON object had a validation or parse error then we return
              // early with the error and an (unknown) for the ruleId
              resolve((0, _utils.createBulkErrorObject)({
                statusCode: 400,
                message: parsedTimeline.message
              }));
              return null;
            }

            const {
              savedObjectId,
              pinnedEventIds,
              globalNotes,
              eventNotes
            } = parsedTimeline;
            const parsedTimelineObject = (0, _fp.omit)(['globalNotes', 'eventNotes', 'pinnedEventIds', 'version', 'savedObjectId', 'created', 'createdBy', 'updated', 'updatedBy'], parsedTimeline);

            try {
              let timeline = null;

              try {
                timeline = await timelineLib.getTimeline(frameworkRequest, savedObjectId); // eslint-disable-next-line no-empty
              } catch (e) {}

              if (timeline == null) {
                const newSavedObjectId = await (0, _import_timelines.createTimelines)(frameworkRequest, parsedTimelineObject, null, // timelineSavedObjectId
                null, // timelineVersion
                pinnedEventIds, [...globalNotes, ...eventNotes], [] // existing note ids
                );
                resolve({
                  timeline_id: newSavedObjectId,
                  status_code: 200
                });
              } else {
                resolve((0, _utils.createBulkErrorObject)({
                  id: savedObjectId,
                  statusCode: 409,
                  message: `timeline_id: "${savedObjectId}" already exists`
                }));
              }
            } catch (err) {
              resolve((0, _utils.createBulkErrorObject)({
                id: savedObjectId,
                statusCode: 400,
                message: err.message
              }));
            }
          });
          return [...accum, importsWorkerPromise];
        }, []));
        importTimelineResponse = [...duplicateIdErrors, ...importTimelineResponse, ...newImportTimelineResponse];
      }

      const errorsResp = importTimelineResponse.filter(resp => (0, _import_timelines.isBulkError)(resp));
      const successes = importTimelineResponse.filter(resp => {
        if ((0, _import_timelines.isImportRegular)(resp)) {
          return resp.status_code === 200;
        } else {
          return false;
        }
      });
      const importTimelines = {
        success: errorsResp.length === 0,
        success_count: successes.length,
        errors: errorsResp
      };
      const [validated, errors] = (0, _validate.validate)(importTimelines, _import_rules_schema.importRulesSchema);

      if (errors != null) {
        return siemResponse.error({
          statusCode: 500,
          body: errors
        });
      } else {
        return response.ok({
          body: validated !== null && validated !== void 0 ? validated : {}
        });
      }
    } catch (err) {
      const error = (0, _utils.transformError)(err);
      return siemResponse.error({
        body: error.message,
        statusCode: error.statusCode
      });
    }
  });
};

exports.importTimelinesRoute = importTimelinesRoute;