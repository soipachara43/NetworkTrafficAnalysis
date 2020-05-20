"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTimefilterWithGlobalState = exports.timefilter = void 0;

var _legacy_imports = require("../legacy_imports");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var uiSettings = _legacy_imports.npStart.core.uiSettings;
var timefilter = _legacy_imports.npStart.plugins.data.query.timefilter.timefilter;
exports.timefilter = timefilter;
uiSettings.overrideLocalDefault('timepicker:refreshIntervalDefaults', JSON.stringify({
  value: 10000,
  pause: false
}));
uiSettings.overrideLocalDefault('timepicker:timeDefaults', JSON.stringify({
  from: 'now-1h',
  to: 'now'
}));

var registerTimefilterWithGlobalState = function registerTimefilterWithGlobalState(app) {
  app.run(function (globalState, $rootScope) {
    globalState.fetch();
    globalState.$inheritedGlobalState = true;
    globalState.save();
    (0, _legacy_imports.registerTimefilterWithGlobalStateFactory)(timefilter, globalState, $rootScope);
  });
};

exports.registerTimefilterWithGlobalState = registerTimefilterWithGlobalState;