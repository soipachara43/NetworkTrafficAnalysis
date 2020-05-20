"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initEnterSpaceView = initEnterSpaceView;

var _constants = require("../../../../../../plugins/spaces/common/constants");

var _errors = require("../../lib/errors");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initEnterSpaceView(server) {
  server.route({
    method: 'GET',
    path: _constants.ENTER_SPACE_PATH,

    async handler(request, h) {
      try {
        const uiSettings = request.getUiSettingsService();
        const defaultRoute = await uiSettings.get('defaultRoute');
        const basePath = server.newPlatform.setup.core.http.basePath.get(request);
        const url = `${basePath}${defaultRoute}`;
        return h.redirect(url);
      } catch (e) {
        server.log(['spaces', 'error'], `Error navigating to space: ${e}`);
        return (0, _errors.wrapError)(e);
      }
    }

  });
}