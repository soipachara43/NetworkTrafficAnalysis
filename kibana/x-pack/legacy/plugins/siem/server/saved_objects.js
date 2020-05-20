"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "noteSavedObjectType", {
  enumerable: true,
  get: function () {
    return _saved_object_mappings.noteSavedObjectType;
  }
});
Object.defineProperty(exports, "pinnedEventSavedObjectType", {
  enumerable: true,
  get: function () {
    return _saved_object_mappings2.pinnedEventSavedObjectType;
  }
});
Object.defineProperty(exports, "timelineSavedObjectType", {
  enumerable: true,
  get: function () {
    return _saved_object_mappings3.timelineSavedObjectType;
  }
});
Object.defineProperty(exports, "ruleStatusSavedObjectType", {
  enumerable: true,
  get: function () {
    return _saved_object_mappings4.ruleStatusSavedObjectType;
  }
});
Object.defineProperty(exports, "ruleActionsSavedObjectType", {
  enumerable: true,
  get: function () {
    return _saved_object_mappings5.ruleActionsSavedObjectType;
  }
});
exports.savedObjectMappings = void 0;

var _saved_object_mappings = require("./lib/note/saved_object_mappings");

var _saved_object_mappings2 = require("./lib/pinned_event/saved_object_mappings");

var _saved_object_mappings3 = require("./lib/timeline/saved_object_mappings");

var _saved_object_mappings4 = require("./lib/detection_engine/rules/saved_object_mappings");

var _saved_object_mappings5 = require("./lib/detection_engine/rule_actions/saved_object_mappings");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const savedObjectMappings = { ..._saved_object_mappings3.timelineSavedObjectMappings,
  ..._saved_object_mappings.noteSavedObjectMappings,
  ..._saved_object_mappings2.pinnedEventSavedObjectMappings,
  ..._saved_object_mappings4.ruleStatusSavedObjectMappings,
  ..._saved_object_mappings5.ruleActionsSavedObjectMappings
};
exports.savedObjectMappings = savedObjectMappings;