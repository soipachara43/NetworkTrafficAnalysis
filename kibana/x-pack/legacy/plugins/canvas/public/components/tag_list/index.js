"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagList = void 0;

var _recompose = require("recompose");

var _tags_registry = require("../../lib/tags_registry");

var _tag_list = require("./tag_list");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TagList = (0, _recompose.compose)((0, _recompose.withProps)(function () {
  return {
    getTag: function getTag(tag) {
      return _tags_registry.tagsRegistry.get(tag) || {
        name: tag,
        color: undefined
      };
    }
  };
}))(_tag_list.TagList);
exports.TagList = TagList;