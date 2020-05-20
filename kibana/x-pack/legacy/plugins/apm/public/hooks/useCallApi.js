"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCallApi = useCallApi;

var _react = require("react");

var _callApi = require("../services/rest/callApi");

var _useApmPluginContext = require("./useApmPluginContext");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useCallApi() {
  var http = (0, _useApmPluginContext.useApmPluginContext)().core.http;
  return (0, _react.useMemo)(function () {
    return function (options) {
      return (0, _callApi.callApi)(http, options);
    };
  }, [http]);
}