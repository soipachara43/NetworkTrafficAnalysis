"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;

var _memory_beats_adapter = require("../adapters/beats/memory_beats_adapter");

var _memory_tags_adapter = require("../adapters/configuration_blocks/memory_tags_adapter");

var _hapi_framework_adapter = require("../adapters/framework/hapi_framework_adapter");

var _memory_tags_adapter2 = require("../adapters/tags/memory_tags_adapter");

var _memory_tokens_adapter = require("../adapters/tokens/memory_tokens_adapter");

var _beat_events = require("../beat_events");

var _beats = require("../beats");

var _configuration_blocks = require("../configuration_blocks");

var _framework = require("../framework");

var _tags = require("../tags");

var _tokens = require("../tokens");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function compose(server) {
  const framework = new _framework.BackendFrameworkLib(new _hapi_framework_adapter.HapiBackendFrameworkAdapter(undefined, server));
  const beatsAdapter = new _memory_beats_adapter.MemoryBeatsAdapter(server.beatsDB || []);
  const configAdapter = new _memory_tags_adapter.MemoryConfigurationBlockAdapter(server.configsDB || []);
  const tags = new _tags.CMTagsDomain(new _memory_tags_adapter2.MemoryTagsAdapter(server.tagsDB || []), configAdapter, beatsAdapter);
  const configurationBlocks = new _configuration_blocks.ConfigurationBlocksLib(configAdapter, tags);
  const tokens = new _tokens.CMTokensDomain(new _memory_tokens_adapter.MemoryTokensAdapter(server.tokensDB || []), {
    framework
  });
  const beats = new _beats.CMBeatsDomain(beatsAdapter, {
    tags,
    tokens,
    framework
  });
  const beatEvents = new _beat_events.BeatEventsLib({}, beats);
  const libs = {
    beatEvents,
    framework,
    beats,
    tags,
    tokens,
    configurationBlocks
  };
  return libs;
}