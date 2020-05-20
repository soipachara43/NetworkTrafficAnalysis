"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouter = exports.callRoute = void 0;

var _server = require("../../../../../../../../../src/core/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const callRoute = (route, ctx = {}, request = {}, response = _server.kibanaResponseFactory) => {
  return route(ctx, request, response);
};

exports.callRoute = callRoute;

const createRouter = indexToActionMap => {
  let index = 0;
  const routeHandlers = {};

  const addHandler = (ignoreCtxForNow, handler) => {
    // Save handler and increment index
    routeHandlers[indexToActionMap[index]] = handler;
    index++;
  };

  return {
    getRoutes: () => routeHandlers,
    router: {
      get: addHandler,
      post: addHandler,
      put: addHandler,
      delete: addHandler
    }
  };
};

exports.createRouter = createRouter;