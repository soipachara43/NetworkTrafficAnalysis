"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKibanaUrl = useKibanaUrl;

var _url = _interopRequireDefault(require("url"));

var _useApmPluginContext2 = require("./useApmPluginContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useKibanaUrl(
/** The path to the plugin */
path,
/** The hash path */
hash) {
  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      core = _useApmPluginContext.core;

  return _url.default.format({
    pathname: core.http.basePath.prepend(path),
    hash: hash
  });
}