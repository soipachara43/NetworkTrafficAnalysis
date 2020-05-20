"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorizedUserPreRoutingFactory = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _get_user = require("../../lib/get_user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const superuserRole = 'superuser';

const authorizedUserPreRoutingFactory = function authorizedUserPreRoutingFn(server, plugins, logger) {
  const getUser = (0, _get_user.getUserFactory)(server, plugins.security);
  const config = server.config();
  return async function authorizedUserPreRouting(request) {
    const xpackInfo = server.plugins.xpack_main.info;

    if (!xpackInfo || !xpackInfo.isAvailable()) {
      logger.warn('Unable to authorize user before xpack info is available.', ['authorizedUserPreRouting']);
      return _boom.default.notFound();
    }

    const security = xpackInfo.feature('security');

    if (!security.isEnabled() || !security.isAvailable()) {
      return null;
    }

    const user = await getUser(request);

    if (!user) {
      return _boom.default.unauthorized(`Sorry, you aren't authenticated`);
    }

    const authorizedRoles = [superuserRole, ...config.get('xpack.reporting.roles.allow')];

    if (!user.roles.find(role => authorizedRoles.includes(role))) {
      return _boom.default.forbidden(`Sorry, you don't have access to Reporting`);
    }

    return user;
  };
};

exports.authorizedUserPreRoutingFactory = authorizedUserPreRoutingFactory;