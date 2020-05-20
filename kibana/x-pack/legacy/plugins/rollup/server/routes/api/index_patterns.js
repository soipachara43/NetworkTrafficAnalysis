"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFieldsForWildcardRoute = registerFieldsForWildcardRoute;

var _configSchema = require("@kbn/config-schema");

var _lodash = require("lodash");

var _shared_imports = require("../../shared_imports");

var _call_with_request_factory = require("../../lib/call_with_request_factory");

var _is_es_error = require("../../lib/is_es_error");

var _license_pre_routing_factory = require("../../lib/license_pre_routing_factory");

var _map_capabilities = require("../../lib/map_capabilities");

var _merge_capabilities_with_fields = require("../../lib/merge_capabilities_with_fields");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const parseMetaFields = metaFields => {
  let parsedFields = [];

  if (typeof metaFields === 'string') {
    parsedFields = JSON.parse(metaFields);
  } else {
    parsedFields = metaFields;
  }

  return parsedFields;
};

const getFieldsForWildcardRequest = async (context, request, response) => {
  const {
    callAsCurrentUser
  } = context.core.elasticsearch.dataClient;
  const indexPatterns = new _shared_imports.IndexPatternsFetcher(callAsCurrentUser);
  const {
    pattern,
    meta_fields: metaFields
  } = request.query;
  let parsedFields = [];

  try {
    parsedFields = parseMetaFields(metaFields);
  } catch (error) {
    return response.badRequest({
      body: error
    });
  }

  try {
    const fields = await indexPatterns.getFieldsForWildcard({
      pattern,
      metaFields: parsedFields
    });
    return response.ok({
      body: {
        fields
      },
      headers: {
        'content-type': 'application/json'
      }
    });
  } catch (error) {
    return response.notFound();
  }
};
/**
 * Get list of fields for rollup index pattern, in the format of regular index pattern fields
 */


function registerFieldsForWildcardRoute(deps, legacy) {
  const handler = async (ctx, request, response) => {
    const {
      params,
      meta_fields: metaFields
    } = request.query;

    try {
      // Make call and use field information from response
      const {
        payload
      } = await getFieldsForWildcardRequest(ctx, request, response);
      const fields = payload.fields;
      const parsedParams = JSON.parse(params);
      const rollupIndex = parsedParams.rollup_index;
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(deps.elasticsearchService, request);
      const rollupFields = [];
      const fieldsFromFieldCapsApi = (0, _lodash.indexBy)(fields, 'name');
      const rollupIndexCapabilities = (0, _map_capabilities.getCapabilitiesForRollupIndices)((await callWithRequest('rollup.rollupIndexCapabilities', {
        indexPattern: rollupIndex
      })))[rollupIndex].aggs; // Keep meta fields

      metaFields.forEach(field => fieldsFromFieldCapsApi[field] && rollupFields.push(fieldsFromFieldCapsApi[field]));
      const mergedRollupFields = (0, _merge_capabilities_with_fields.mergeCapabilitiesWithFields)(rollupIndexCapabilities, fieldsFromFieldCapsApi, rollupFields);
      return response.ok({
        body: {
          fields: mergedRollupFields
        }
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

  deps.router.get({
    path: '/api/index_patterns/rollup/_fields_for_wildcard',
    validate: {
      query: _configSchema.schema.object({
        pattern: _configSchema.schema.string(),
        meta_fields: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
          defaultValue: []
        }),
        params: _configSchema.schema.string({
          validate(value) {
            try {
              const params = JSON.parse(value);
              const keys = Object.keys(params);
              const {
                rollup_index: rollupIndex
              } = params;

              if (!rollupIndex) {
                return '[request query.params]: "rollup_index" is required';
              } else if (keys.length > 1) {
                const invalidParams = keys.filter(key => key !== 'rollup_index');
                return `[request query.params]: ${invalidParams.join(', ')} is not allowed`;
              }
            } catch (err) {
              return '[request query.params]: expected JSON string';
            }
          }

        })
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(legacy, handler));
}