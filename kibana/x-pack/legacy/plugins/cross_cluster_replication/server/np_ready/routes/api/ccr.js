"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCcrRoutes = void 0;

var _constants = require("../../../../common/constants");

var _call_with_request_factory = require("../../lib/call_with_request_factory");

var _ccr_stats_serialization = require("../../lib/ccr_stats_serialization");

var _license_pre_routing_factory = require("../../lib/license_pre_routing_factory");

var _map_to_kibana_http_error = require("../map_to_kibana_http_error");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
const registerCcrRoutes = ({
  router,
  __LEGACY
}) => {
  /**
   * Returns Auto-follow stats
   */
  router.get({
    path: `${_constants.API_BASE_PATH}/stats/auto_follow`,
    validate: false
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);

      try {
        const {
          auto_follow_stats: autoFollowStats
        } = await callWithRequest('ccr.stats');
        return response.ok({
          body: (0, _ccr_stats_serialization.deserializeAutoFollowStats)(autoFollowStats)
        });
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
  /**
   * Returns whether the user has CCR permissions
   */

  router.get({
    path: `${_constants.API_BASE_PATH}/permissions`,
    validate: false
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)({
    __LEGACY,
    requestHandler: async (ctx, request, response) => {
      const xpackMainPlugin = __LEGACY.server.plugins.xpack_main;
      const xpackInfo = xpackMainPlugin && xpackMainPlugin.info;

      if (!xpackInfo) {
        // xpackInfo is updated via poll, so it may not be available until polling has begun.
        // In this rare situation, tell the client the service is temporarily unavailable.
        return response.customError({
          statusCode: 503,
          body: 'Security info unavailable'
        });
      }

      const securityInfo = xpackInfo && xpackInfo.isAvailable() && xpackInfo.feature('security');

      if (!securityInfo || !securityInfo.isAvailable() || !securityInfo.isEnabled()) {
        // If security isn't enabled or available (in the case where security is enabled but license reverted to Basic) let the user use CCR.
        return response.ok({
          body: {
            hasPermission: true,
            missingClusterPrivileges: []
          }
        });
      }

      const callWithRequest = (0, _call_with_request_factory.callWithRequestFactory)(__LEGACY.server, request);

      try {
        const {
          has_all_requested: hasPermission,
          cluster
        } = await callWithRequest('ccr.permissions', {
          body: {
            cluster: ['manage', 'manage_ccr']
          }
        });
        const missingClusterPrivileges = Object.keys(cluster).reduce((permissions, permissionName) => {
          if (!cluster[permissionName]) {
            permissions.push(permissionName);
            return permissions;
          }
        }, []);
        return response.ok({
          body: {
            hasPermission,
            missingClusterPrivileges
          }
        });
      } catch (err) {
        return (0, _map_to_kibana_http_error.mapErrorToKibanaHttpResponse)(err);
      }
    }
  }));
};

exports.registerCcrRoutes = registerCcrRoutes;