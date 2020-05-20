"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAutoFollowPatternRoutes = void 0;

var _configSchema = require("@kbn/config-schema");

var _call_with_request_factory = require("../../lib/call_with_request_factory");

var _is_es_error = require("../../lib/is_es_error");

var _auto_follow_pattern_serialization = require("../../../../common/services/auto_follow_pattern_serialization");

var _license_pre_routing_factory = require("../../lib/license_pre_routing_factory");

var _constants = require("../../../../common/constants");

var _map_to_kibana_http_error = require("../map_to_kibana_http_error");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
const registerAutoFollowPatternRoutes = ({
  router,
  __LEGACY
}) => {
  /**
   * Returns a list of all auto-follow patterns
   */
  router.get({
    path: `${_constants.API_BASE_PATH}/auto_follow_patterns`,
    validate: false
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);

      try {
        const result = await callWithRequest('ccr.autoFollowPatterns');
        return response.ok({
          body: {
            patterns: (0, _auto_follow_pattern_serialization.deserializeListAutoFollowPatterns)(result.patterns)
          }
        });
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
  /**
   * Create an auto-follow pattern
   */

  router.post({
    path: `${_constants.API_BASE_PATH}/auto_follow_patterns`,
    validate: {
      body: _configSchema.schema.object({
        id: _configSchema.schema.string()
      }, {
        unknowns: 'allow'
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);
      const {
        id,
        ...rest
      } = request.body;
      const body = (0, _auto_follow_pattern_serialization.serializeAutoFollowPattern)(rest);
      /**
       * First let's make sur that an auto-follow pattern with
       * the same id does not exist.
       */

      try {
        await callWithRequest('ccr.autoFollowPattern', {
          id
        }); // If we get here it means that an auto-follow pattern with the same id exists

        return response.conflict({
          body: `An auto-follow pattern with the name "${id}" already exists.`
        });
      } catch (err) {
        if (err.statusCode !== 404) {
          return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
        }
      }

      try {
        return response.ok({
          body: await callWithRequest('ccr.saveAutoFollowPattern', {
            id,
            body
          })
        });
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
  /**
   * Update an auto-follow pattern
   */

  router.put({
    path: `${_constants.API_BASE_PATH}/auto_follow_patterns/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      }),
      body: _configSchema.schema.object({}, {
        unknowns: 'allow'
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);
      const {
        id
      } = request.params;
      const body = (0, _auto_follow_pattern_serialization.serializeAutoFollowPattern)(request.body);

      try {
        return response.ok({
          body: await callWithRequest('ccr.saveAutoFollowPattern', {
            id,
            body
          })
        });
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
  /**
   * Returns a single auto-follow pattern
   */

  router.get({
    path: `${_constants.API_BASE_PATH}/auto_follow_patterns/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);
      const {
        id
      } = request.params;

      try {
        const result = await callWithRequest('ccr.autoFollowPattern', {
          id
        });
        const autoFollowPattern = result.patterns[0];
        return response.ok({
          body: (0, _auto_follow_pattern_serialization.deserializeAutoFollowPattern)(autoFollowPattern)
        });
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
  /**
   * Delete an auto-follow pattern
   */

  router.delete({
    path: `${_constants.API_BASE_PATH}/auto_follow_patterns/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);
      const {
        id
      } = request.params;
      const ids = id.split(',');
      const itemsDeleted = [];
      const errors = [];
      await Promise.all(ids.map(_id => callWithRequest('ccr.deleteAutoFollowPattern', {
        id: _id
      }).then(() => itemsDeleted.push(_id)).catch(err => {
        if ((0, _is_es_error.isEsError)(err)) {
          errors.push({
            id: _id,
            error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
          });
        } else {
          errors.push({
            id: _id,
            error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
          });
        }
      })));
      return response.ok({
        body: {
          itemsDeleted,
          errors
        }
      });
    }
  }));
  /**
   * Pause auto-follow pattern(s)
   */

  router.post({
    path: `${_constants.API_BASE_PATH}/auto_follow_patterns/{id}/pause`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);
      const {
        id
      } = request.params;
      const ids = id.split(',');
      const itemsPaused = [];
      const errors = [];
      await Promise.all(ids.map(_id => callWithRequest('ccr.pauseAutoFollowPattern', {
        id: _id
      }).then(() => itemsPaused.push(_id)).catch(err => {
        if ((0, _is_es_error.isEsError)(err)) {
          errors.push({
            id: _id,
            error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
          });
        } else {
          errors.push({
            id: _id,
            error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
          });
        }
      })));
      return response.ok({
        body: {
          itemsPaused,
          errors
        }
      });
    }
  }));
  /**
   * Resume auto-follow pattern(s)
   */

  router.post({
    path: `${_constants.API_BASE_PATH}/auto_follow_patterns/{id}/resume`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);
      const {
        id
      } = request.params;
      const ids = id.split(',');
      const itemsResumed = [];
      const errors = [];
      await Promise.all(ids.map(_id => callWithRequest('ccr.resumeAutoFollowPattern', {
        id: _id
      }).then(() => itemsResumed.push(_id)).catch(err => {
        if ((0, _is_es_error.isEsError)(err)) {
          errors.push({
            id: _id,
            error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
          });
        } else {
          errors.push({
            id: _id,
            error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
          });
        }
      })));
      return response.ok({
        body: {
          itemsResumed,
          errors
        }
      });
    }
  }));
};

exports.registerAutoFollowPatternRoutes = registerAutoFollowPatternRoutes;