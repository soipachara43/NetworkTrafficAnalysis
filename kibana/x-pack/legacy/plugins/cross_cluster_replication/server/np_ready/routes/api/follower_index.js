"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFollowerIndexRoutes = void 0;

var _configSchema = require("@kbn/config-schema");

var _follower_index_serialization = require("../../../../common/services/follower_index_serialization");

var _constants = require("../../../../common/constants");

var _utils = require("../../../../common/services/utils");

var _call_with_request_factory = require("../../lib/call_with_request_factory");

var _license_pre_routing_factory = require("../../lib/license_pre_routing_factory");

var _map_to_kibana_http_error = require("../map_to_kibana_http_error");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
const registerFollowerIndexRoutes = ({
  router,
  __LEGACY
}) => {
  /**
   * Returns a list of all follower indices
   */
  router.get({
    path: `${_constants.API_BASE_PATH}/follower_indices`,
    validate: false
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);

      try {
        const {
          follower_indices: followerIndices
        } = await callWithRequest('ccr.info', {
          id: '_all'
        });
        const {
          follow_stats: {
            indices: followerIndicesStats
          }
        } = await callWithRequest('ccr.stats');
        const followerIndicesStatsMap = followerIndicesStats.reduce((map, stats) => {
          map[stats.index] = stats;
          return map;
        }, {});
        const collatedFollowerIndices = followerIndices.map(followerIndex => {
          return { ...followerIndex,
            ...followerIndicesStatsMap[followerIndex.follower_index]
          };
        });
        return response.ok({
          body: {
            indices: (0, _follower_index_serialization.deserializeListFollowerIndices)(collatedFollowerIndices)
          }
        });
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
  /**
   * Returns a single follower index pattern
   */

  router.get({
    path: `${_constants.API_BASE_PATH}/follower_indices/{id}`,
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
        const {
          follower_indices: followerIndices
        } = await callWithRequest('ccr.info', {
          id
        });
        const followerIndexInfo = followerIndices && followerIndices[0];

        if (!followerIndexInfo) {
          return response.notFound({
            body: `The follower index "${id}" does not exist.`
          });
        } // If this follower is paused, skip call to ES stats api since it will return 404


        if (followerIndexInfo.status === 'paused') {
          return response.ok({
            body: (0, _follower_index_serialization.deserializeFollowerIndex)({ ...followerIndexInfo
            })
          });
        } else {
          const {
            indices: followerIndicesStats
          } = await callWithRequest('ccr.followerIndexStats', {
            id
          });
          return response.ok({
            body: (0, _follower_index_serialization.deserializeFollowerIndex)({ ...followerIndexInfo,
              ...(followerIndicesStats ? followerIndicesStats[0] : {})
            })
          });
        }
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
  /**
   * Create a follower index
   */

  router.post({
    path: `${_constants.API_BASE_PATH}/follower_indices`,
    validate: {
      body: _configSchema.schema.object({
        name: _configSchema.schema.string()
      }, {
        unknowns: 'allow'
      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);
      const {
        name,
        ...rest
      } = request.body;
      const body = (0, _utils.removeEmptyFields)((0, _follower_index_serialization.serializeFollowerIndex)(rest));

      try {
        return response.ok({
          body: await callWithRequest('ccr.saveFollowerIndex', {
            name,
            body
          })
        });
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
  /**
   * Edit a follower index
   */

  router.put({
    path: `${_constants.API_BASE_PATH}/follower_indices/{id}`,
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      }),
      body: _configSchema.schema.object({
        maxReadRequestOperationCount: _configSchema.schema.maybe(_configSchema.schema.number()),
        maxOutstandingReadRequests: _configSchema.schema.maybe(_configSchema.schema.number()),
        maxReadRequestSize: _configSchema.schema.maybe(_configSchema.schema.string()),
        // byte value
        maxWriteRequestOperationCount: _configSchema.schema.maybe(_configSchema.schema.number()),
        maxWriteRequestSize: _configSchema.schema.maybe(_configSchema.schema.string()),
        // byte value
        maxOutstandingWriteRequests: _configSchema.schema.maybe(_configSchema.schema.number()),
        maxWriteBufferCount: _configSchema.schema.maybe(_configSchema.schema.number()),
        maxWriteBufferSize: _configSchema.schema.maybe(_configSchema.schema.string()),
        // byte value
        maxRetryDelay: _configSchema.schema.maybe(_configSchema.schema.string()),
        // time value
        readPollTimeout: _configSchema.schema.maybe(_configSchema.schema.string()) // time value

      })
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);
      const {
        id
      } = request.params; // We need to first pause the follower and then resume it passing the advanced settings

      try {
        const {
          follower_indices: followerIndices
        } = await callWithRequest('ccr.info', {
          id
        });
        const followerIndexInfo = followerIndices && followerIndices[0];

        if (!followerIndexInfo) {
          return response.notFound({
            body: `The follower index "${id}" does not exist.`
          });
        } // Retrieve paused state instead of pulling it from the payload to ensure it's not stale.


        const isPaused = followerIndexInfo.status === 'paused'; // Pause follower if not already paused

        if (!isPaused) {
          await callWithRequest('ccr.pauseFollowerIndex', {
            id
          });
        } // Resume follower


        const body = (0, _utils.removeEmptyFields)((0, _follower_index_serialization.serializeAdvancedSettings)(request.body));
        return response.ok({
          body: await callWithRequest('ccr.resumeFollowerIndex', {
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
   * Pauses a follower index
   */

  router.put({
    path: `${_constants.API_BASE_PATH}/follower_indices/{id}/pause`,
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
      await Promise.all(ids.map(_id => callWithRequest('ccr.pauseFollowerIndex', {
        id: _id
      }).then(() => itemsPaused.push(_id)).catch(err => {
        errors.push({
          id: _id,
          error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
        });
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
   * Resumes a follower index
   */

  router.put({
    path: `${_constants.API_BASE_PATH}/follower_indices/{id}/resume`,
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
      await Promise.all(ids.map(_id => callWithRequest('ccr.resumeFollowerIndex', {
        id: _id
      }).then(() => itemsResumed.push(_id)).catch(err => {
        errors.push({
          id: _id,
          error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
        });
      })));
      return response.ok({
        body: {
          itemsResumed,
          errors
        }
      });
    }
  }));
  /**
   * Unfollow follower index's leader index
   */

  router.put({
    path: `${_constants.API_BASE_PATH}/follower_indices/{id}/unfollow`,
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
      const itemsUnfollowed = [];
      const itemsNotOpen = [];
      const errors = [];
      await Promise.all(ids.map(async _id => {
        try {
          // Try to pause follower, let it fail silently since it may already be paused
          try {
            await callWithRequest('ccr.pauseFollowerIndex', {
              id: _id
            });
          } catch (e) {} // Swallow errors
          // Close index


          await callWithRequest('indices.close', {
            index: _id
          }); // Unfollow leader

          await callWithRequest('ccr.unfollowLeaderIndex', {
            id: _id
          }); // Try to re-open the index, store failures in a separate array to surface warnings in the UI
          // This will allow users to query their index normally after unfollowing

          try {
            await callWithRequest('indices.open', {
              index: _id
            });
          } catch (e) {
            itemsNotOpen.push(_id);
          } // Push success


          itemsUnfollowed.push(_id);
        } catch (err) {
          errors.push({
            id: _id,
            error: (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err)
          });
        }
      }));
      return response.ok({
        body: {
          itemsUnfollowed,
          itemsNotOpen,
          errors
        }
      });
    }
  }));
};

exports.registerFollowerIndexRoutes = registerFollowerIndexRoutes;