"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportTimelinesRoute = void 0;

var _utils = require("../../detection_engine/routes/utils");

var _constants = require("../../../../common/constants");

var _export_timelines_schema = require("./schemas/export_timelines_schema");

var _export_timelines = require("./utils/export_timelines");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const exportTimelinesRoute = (router, config) => {
  router.post({
    path: _constants.TIMELINE_EXPORT_URL,
    validate: {
      query: (0, _utils.buildRouteValidation)(_export_timelines_schema.exportTimelinesQuerySchema),
      body: (0, _utils.buildRouteValidation)(_export_timelines_schema.exportTimelinesSchema)
    },
    options: {
      tags: ['access:siem']
    }
  }, async (context, request, response) => {
    try {
      var _request$body;

      const siemResponse = (0, _utils.buildSiemResponse)(response);
      const savedObjectsClient = context.core.savedObjects.client;
      const exportSizeLimit = config().get('savedObjects.maxImportExportSize');

      if (((_request$body = request.body) === null || _request$body === void 0 ? void 0 : _request$body.ids) != null && request.body.ids.length > exportSizeLimit) {
        return siemResponse.error({
          statusCode: 400,
          body: `Can't export more than ${exportSizeLimit} timelines`
        });
      }

      const responseBody = await (0, _export_timelines.getExportTimelineByObjectIds)({
        client: savedObjectsClient,
        request
      });
      return response.ok({
        headers: {
          'Content-Disposition': `attachment; filename="${request.query.file_name}"`,
          'Content-Type': 'application/ndjson'
        },
        body: responseBody
      });
    } catch (err) {
      const error = (0, _utils.transformError)(err);
      const siemResponse = (0, _utils.buildSiemResponse)(response);
      return siemResponse.error({
        body: error.message,
        statusCode: error.statusCode
      });
    }
  });
};

exports.exportTimelinesRoute = exportTimelinesRoute;