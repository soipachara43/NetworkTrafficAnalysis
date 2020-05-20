"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importRulesRoute = void 0;

var _fp = require("lodash/fp");

var _path = require("path");

var _streams = require("../../../../../../../../../src/legacy/utils/streams");

var _constants = require("../../../../../common/constants");

var _create_rules = require("../../rules/create_rules");

var _read_rules = require("../../rules/read_rules");

var _get_index_exists = require("../../index/get_index_exists");

var _utils = require("../utils");

var _create_rules_stream_from_ndjson = require("../../rules/create_rules_stream_from_ndjson");

var _patch_rules = require("../../rules/patch_rules");

var _import_rules_schema = require("../schemas/import_rules_schema");

var _import_rules_schema2 = require("../schemas/response/import_rules_schema");

var _utils2 = require("./utils");

var _validate = require("./validate");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CHUNK_PARSED_OBJECT_SIZE = 10;

const importRulesRoute = (router, config) => {
  router.post({
    path: `${_constants.DETECTION_ENGINE_RULES_URL}/_import`,
    validate: {
      query: (0, _utils.buildRouteValidation)(_import_rules_schema.importRulesQuerySchema),
      body: (0, _utils.buildRouteValidation)(_import_rules_schema.importRulesPayloadSchema)
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

    try {
      var _context$alerting, _context$actions, _context$siem;

      const alertsClient = (_context$alerting = context.alerting) === null || _context$alerting === void 0 ? void 0 : _context$alerting.getAlertsClient();
      const actionsClient = (_context$actions = context.actions) === null || _context$actions === void 0 ? void 0 : _context$actions.getActionsClient();
      const clusterClient = context.core.elasticsearch.dataClient;
      const savedObjectsClient = context.core.savedObjects.client;
      const siemClient = (_context$siem = context.siem) === null || _context$siem === void 0 ? void 0 : _context$siem.getSiemClient();

      if (!siemClient || !actionsClient || !alertsClient) {
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
      const readStream = (0, _create_rules_stream_from_ndjson.createRulesStreamFromNdJson)(objectLimit);
      const parsedObjects = await (0, _streams.createPromiseFromStreams)([request.body.file, ...readStream]);
      const [duplicateIdErrors, uniqueParsedObjects] = (0, _utils2.getTupleDuplicateErrorsAndUniqueRules)(parsedObjects, request.query.overwrite);
      const chunkParseObjects = (0, _fp.chunk)(CHUNK_PARSED_OBJECT_SIZE, uniqueParsedObjects);
      let importRuleResponse = [];

      while (chunkParseObjects.length) {
        var _chunkParseObjects$sh;

        const batchParseObjects = (_chunkParseObjects$sh = chunkParseObjects.shift()) !== null && _chunkParseObjects$sh !== void 0 ? _chunkParseObjects$sh : [];
        const newImportRuleResponse = await Promise.all(batchParseObjects.reduce((accum, parsedRule) => {
          const importsWorkerPromise = new Promise(async (resolve, reject) => {
            if (parsedRule instanceof Error) {
              // If the JSON object had a validation or parse error then we return
              // early with the error and an (unknown) for the ruleId
              resolve((0, _utils.createBulkErrorObject)({
                statusCode: 400,
                message: parsedRule.message
              }));
              return null;
            }

            const {
              anomaly_threshold: anomalyThreshold,
              description,
              enabled,
              false_positives: falsePositives,
              from,
              immutable,
              query,
              language,
              machine_learning_job_id: machineLearningJobId,
              output_index: outputIndex,
              saved_id: savedId,
              meta,
              filters,
              rule_id: ruleId,
              index,
              interval,
              max_signals: maxSignals,
              risk_score: riskScore,
              name,
              severity,
              tags,
              threat,
              to,
              type,
              references,
              note,
              timeline_id: timelineId,
              timeline_title: timelineTitle,
              version,
              lists
            } = parsedRule;

            try {
              (0, _utils.validateLicenseForRuleType)({
                license: context.licensing.license,
                ruleType: type
              });
              const signalsIndex = siemClient.signalsIndex;
              const indexExists = await (0, _get_index_exists.getIndexExists)(clusterClient.callAsCurrentUser, signalsIndex);

              if (!indexExists) {
                resolve((0, _utils.createBulkErrorObject)({
                  ruleId,
                  statusCode: 409,
                  message: `To create a rule, the index must exist first. Index ${signalsIndex} does not exist`
                }));
              }

              const rule = await (0, _read_rules.readRules)({
                alertsClient,
                ruleId
              });

              if (rule == null) {
                await (0, _create_rules.createRules)({
                  alertsClient,
                  actionsClient,
                  anomalyThreshold,
                  description,
                  enabled,
                  falsePositives,
                  from,
                  immutable,
                  query,
                  language,
                  machineLearningJobId,
                  outputIndex: signalsIndex,
                  savedId,
                  timelineId,
                  timelineTitle,
                  meta,
                  filters,
                  ruleId,
                  index,
                  interval,
                  maxSignals,
                  riskScore,
                  name,
                  severity,
                  tags,
                  to,
                  type,
                  threat,
                  references,
                  note,
                  version,
                  lists,
                  actions: [] // Actions are not imported nor exported at this time

                });
                resolve({
                  rule_id: ruleId,
                  status_code: 200
                });
              } else if (rule != null && request.query.overwrite) {
                await (0, _patch_rules.patchRules)({
                  alertsClient,
                  actionsClient,
                  savedObjectsClient,
                  description,
                  enabled,
                  falsePositives,
                  from,
                  immutable,
                  query,
                  language,
                  outputIndex,
                  savedId,
                  timelineId,
                  timelineTitle,
                  meta,
                  filters,
                  id: undefined,
                  ruleId,
                  index,
                  interval,
                  maxSignals,
                  riskScore,
                  name,
                  severity,
                  tags,
                  to,
                  type,
                  threat,
                  references,
                  note,
                  version,
                  lists,
                  anomalyThreshold,
                  machineLearningJobId
                });
                resolve({
                  rule_id: ruleId,
                  status_code: 200
                });
              } else if (rule != null) {
                resolve((0, _utils.createBulkErrorObject)({
                  ruleId,
                  statusCode: 409,
                  message: `rule_id: "${ruleId}" already exists`
                }));
              }
            } catch (err) {
              resolve((0, _utils.createBulkErrorObject)({
                ruleId,
                statusCode: 400,
                message: err.message
              }));
            }
          });
          return [...accum, importsWorkerPromise];
        }, []));
        importRuleResponse = [...duplicateIdErrors, ...importRuleResponse, ...newImportRuleResponse];
      }

      const errorsResp = importRuleResponse.filter(resp => (0, _utils.isBulkError)(resp));
      const successes = importRuleResponse.filter(resp => {
        if ((0, _utils.isImportRegular)(resp)) {
          return resp.status_code === 200;
        } else {
          return false;
        }
      });
      const importRules = {
        success: errorsResp.length === 0,
        success_count: successes.length,
        errors: errorsResp
      };
      const [validated, errors] = (0, _validate.validate)(importRules, _import_rules_schema2.importRulesSchema);

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

exports.importRulesRoute = importRulesRoute;