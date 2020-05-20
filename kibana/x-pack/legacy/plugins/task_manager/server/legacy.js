"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTaskManagerSetup = getTaskManagerSetup;
exports.getTaskManagerStart = getTaskManagerStart;
exports.createLegacyApi = createLegacyApi;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Once all plugins are migrated to NP and we can remove Legacy TaskManager in version 8.0.0,
// this can be removed
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function getTaskManagerSetup(server) {
  var _server$newPlatform, _server$newPlatform$s, _server$newPlatform$s2;

  return server === null || server === void 0 ? void 0 : (_server$newPlatform = server.newPlatform) === null || _server$newPlatform === void 0 ? void 0 : (_server$newPlatform$s = _server$newPlatform.setup) === null || _server$newPlatform$s === void 0 ? void 0 : (_server$newPlatform$s2 = _server$newPlatform$s.plugins) === null || _server$newPlatform$s2 === void 0 ? void 0 : _server$newPlatform$s2.taskManager;
}

function getTaskManagerStart(server) {
  var _server$newPlatform2, _server$newPlatform2$, _server$newPlatform2$2;

  return server === null || server === void 0 ? void 0 : (_server$newPlatform2 = server.newPlatform) === null || _server$newPlatform2 === void 0 ? void 0 : (_server$newPlatform2$ = _server$newPlatform2.start) === null || _server$newPlatform2$ === void 0 ? void 0 : (_server$newPlatform2$2 = _server$newPlatform2$.plugins) === null || _server$newPlatform2$2 === void 0 ? void 0 : _server$newPlatform2$2.taskManager;
}

function createLegacyApi(legacyTaskManager) {
  return {
    addMiddleware: middleware => {
      legacyTaskManager.then(tm => tm.addMiddleware(middleware));
    },
    registerTaskDefinitions: taskDefinitions => {
      legacyTaskManager.then(tm => tm.registerTaskDefinitions(taskDefinitions));
    },
    fetch: opts => legacyTaskManager.then(tm => tm.fetch(opts)),
    get: id => legacyTaskManager.then(tm => tm.get(id)),
    remove: id => legacyTaskManager.then(tm => tm.remove(id)),
    schedule: (taskInstance, options) => legacyTaskManager.then(tm => tm.schedule(taskInstance, options)),
    runNow: taskId => legacyTaskManager.then(tm => tm.runNow(taskId)),
    ensureScheduled: (taskInstance, options) => legacyTaskManager.then(tm => tm.ensureScheduled(taskInstance, options))
  };
}