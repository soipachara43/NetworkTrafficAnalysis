"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ensureAllBrowsersDownloaded", {
  enumerable: true,
  get: function () {
    return _download.ensureAllBrowsersDownloaded;
  }
});
Object.defineProperty(exports, "createBrowserDriverFactory", {
  enumerable: true,
  get: function () {
    return _create_browser_driver_factory.createBrowserDriverFactory;
  }
});
Object.defineProperty(exports, "getDefaultChromiumSandboxDisabled", {
  enumerable: true,
  get: function () {
    return _default_chromium_sandbox_disabled.getDefaultChromiumSandboxDisabled;
  }
});
Object.defineProperty(exports, "HeadlessChromiumDriver", {
  enumerable: true,
  get: function () {
    return _driver.HeadlessChromiumDriver;
  }
});
Object.defineProperty(exports, "HeadlessChromiumDriverFactory", {
  enumerable: true,
  get: function () {
    return _driver_factory.HeadlessChromiumDriverFactory;
  }
});
exports.chromium = void 0;

var chromiumDefinition = _interopRequireWildcard(require("./chromium"));

var _download = require("./download");

var _create_browser_driver_factory = require("./create_browser_driver_factory");

var _default_chromium_sandbox_disabled = require("./default_chromium_sandbox_disabled");

var _driver = require("./chromium/driver");

var _driver_factory = require("./chromium/driver_factory");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const chromium = {
  paths: chromiumDefinition.paths,
  createDriverFactory: chromiumDefinition.createDriverFactory
};
exports.chromium = chromium;