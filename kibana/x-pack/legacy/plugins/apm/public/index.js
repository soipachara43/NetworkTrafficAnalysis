"use strict";

var _new_platform = require("ui/new_platform");

require("react-vis/dist/style.css");

require("ui/autoload/all");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _newPlatform = require("./new-platform");

var _plugin = require("./new-platform/plugin");

require("./style/global_overrides.css");

var _index = _interopRequireDefault(require("./templates/index.html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// This will be moved to core.application.register when the new platform
// migration is complete.
// @ts-ignore
_chrome.default.setRootTemplate(_index.default);

var checkForRoot = function checkForRoot() {
  return new Promise(function (resolve) {
    var ready = !!document.getElementById(_plugin.REACT_APP_ROOT_ID);

    if (ready) {
      resolve();
    } else {
      setTimeout(function () {
        return resolve(checkForRoot());
      }, 10);
    }
  });
};

checkForRoot().then(function () {
  var pluginInstance = (0, _newPlatform.plugin)({});
  pluginInstance.setup(_new_platform.npSetup.core, _new_platform.npSetup.plugins);
  pluginInstance.start(_new_platform.npStart.core, _new_platform.npStart.plugins);
});