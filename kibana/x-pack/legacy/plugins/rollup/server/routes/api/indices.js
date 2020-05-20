"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerIndicesRoute = registerIndicesRoute;

var _configSchema = require("@kbn/config-schema");

var _call_with_request_factory = require("../../lib/call_with_request_factory");

var _is_es_error = require("../../lib/is_es_error");

var _license_pre_routing_factory = require("../../lib/license_pre_routing_factory");

var _map_capabilities = require("../../lib/map_capabilities");

var _common = require("../../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isNumericField(fieldCapability) {
  const numericTypes = ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'];
  return numericTypes.some(numericType => fieldCapability[numericType] != null);
}

function registerIndicesRoute(deps, legacy) {
  const getIndicesHandler = async (ctx, request, response) => {
    const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request);

    try {
      const data = await callWithRequest('rollup.rollupIndexCapabilities', {
        indexPattern: '_all'
      });
      return response.ok({
        body: (0, _map_capabilities.getCapabilitiesForRollupIndices)(data)
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

  const validateIndexPatternHandler = async (ctx, request, response) => {
    const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request);

    try {
      const {
        indexPattern
      } = request.params;
      const [fieldCapabilities, rollupIndexCapabilities] = await Promise.all([callWithRequest('rollup.fieldCapabilities', {
        indexPattern
      }), callWithRequest('rollup.rollupIndexCapabilities', {
        indexPattern
      })]);
      const doesMatchIndices = Object.entries(fieldCapabilities.fields).length !== 0;
      const doesMatchRollupIndices = Object.entries(rollupIndexCapabilities).length !== 0;
      const dateFields = [];
      const numericFields = [];
      const keywordFields = [];
      const fieldCapabilitiesEntries = Object.entries(fieldCapabilities.fields);
      fieldCapabilitiesEntries.forEach(([fieldName, fieldCapability]) => {
        if (fieldCapability.date) {
          dateFields.push(fieldName);
          return;
        }

        if (isNumericField(fieldCapability)) {
          numericFields.push(fieldName);
          return;
        }

        if (fieldCapability.keyword) {
          keywordFields.push(fieldName);
        }
      });
      const body = {
        doesMatchIndices,
        doesMatchRollupIndices,
        dateFields,
        numericFields,
        keywordFields
      };
      return response.ok({
        body
      });
    } catch (err) {
      // 404s are still valid results.
      if (err.statusCode === 404) {
        const notFoundBody = {
          doesMatchIndices: false,
          doesMatchRollupIndices: false,
          dateFields: [],
          numericFields: [],
          keywordFields: []
        };
        return response.ok({
          body: notFoundBody
        });
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
  /**
   * Returns a list of all rollup index names
   */


  deps.router.get({
    path: `${_common.API_BASE_PATH}/indices`,
    validate: false
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, getIndicesHandler));
  /**
   * Returns information on validity of an index pattern for creating a rollup job:
   *  - Does the index pattern match any indices?
   *  - Does the index pattern match rollup indices?
   *  - Which date fields, numeric fields, and keyword fields are available in the matching indices?
   */

  deps.router.get({
    path: `${_common.API_BASE_PATH}/index_pattern_validity/{indexPattern}`,
    validate: {
      params: _configSchema.schema.object({
        indexPattern: _configSchema.schema.string()
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, validateIndexPatternHandler));
}