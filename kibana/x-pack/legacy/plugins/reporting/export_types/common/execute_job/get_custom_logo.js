"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomLogo = void 0;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Logo is PDF only
const getCustomLogo = async ({
  reporting,
  server,
  job,
  conditionalHeaders
}) => {
  const serverBasePath = server.config().get('server.basePath');
  const fakeRequest = {
    headers: conditionalHeaders.headers,
    // This is used by the spaces SavedObjectClientWrapper to determine the existing space.
    // We use the basePath from the saved job, which we'll have post spaces being implemented;
    // or we use the server base path, which uses the default space
    getBasePath: () => job.basePath || serverBasePath,
    path: '/',
    route: {
      settings: {}
    },
    url: {
      href: '/'
    },
    raw: {
      req: {
        url: '/'
      }
    }
  };
  const savedObjectsClient = await reporting.getSavedObjectsClient(fakeRequest);
  const uiSettings = await reporting.getUiSettingsServiceFactory(savedObjectsClient);
  const logo = await uiSettings.get(_constants.UI_SETTINGS_CUSTOM_PDF_LOGO);
  return {
    conditionalHeaders,
    logo
  };
};

exports.getCustomLogo = getCustomLogo;