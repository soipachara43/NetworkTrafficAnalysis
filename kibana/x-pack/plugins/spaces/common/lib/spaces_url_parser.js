"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpaceIdFromPath = getSpaceIdFromPath;
exports.addSpaceIdToPath = addSpaceIdToPath;

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getSpaceIdFromPath(requestBasePath = '/', serverBasePath = '/') {
  let pathToCheck = requestBasePath;

  if (serverBasePath && serverBasePath !== '/' && requestBasePath.startsWith(serverBasePath)) {
    pathToCheck = requestBasePath.substr(serverBasePath.length);
  } // Look for `/s/space-url-context` in the base path


  const matchResult = pathToCheck.match(/^\/s\/([a-z0-9_\-]+)/);

  if (!matchResult || matchResult.length === 0) {
    return _constants.DEFAULT_SPACE_ID;
  } // Ignoring first result, we only want the capture group result at index 1


  const [, spaceId] = matchResult;

  if (!spaceId) {
    throw new Error(`Unable to determine Space ID from request path: ${requestBasePath}`);
  }

  return spaceId;
}

function addSpaceIdToPath(basePath = '/', spaceId = '', requestedPath = '') {
  if (requestedPath && !requestedPath.startsWith('/')) {
    throw new Error(`path must start with a /`);
  }

  if (spaceId && spaceId !== _constants.DEFAULT_SPACE_ID) {
    return `${basePath}/s/${spaceId}${requestedPath}`;
  }

  return `${basePath}${requestedPath}`;
}