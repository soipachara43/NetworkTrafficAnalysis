"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;

var _lodash = require("lodash");

var _constants = require("../../../common/constants");

var _plugin = require("../../../common/constants/plugin");

var _elasticsearch_beats_adapter = require("../adapters/beats/elasticsearch_beats_adapter");

var _elasticsearch_configuration_block_adapter = require("../adapters/configuration_blocks/elasticsearch_configuration_block_adapter");

var _kibana_database_adapter = require("../adapters/database/kibana_database_adapter");

var _elasticsearch_beat_events_adapter = require("../adapters/events/elasticsearch_beat_events_adapter");

var _kibana_framework_adapter = require("../adapters/framework/kibana_framework_adapter");

var _elasticsearch_tags_adapter = require("../adapters/tags/elasticsearch_tags_adapter");

var _elasticsearch_tokens_adapter = require("../adapters/tokens/elasticsearch_tokens_adapter");

var _beat_events = require("../beat_events");

var _beats = require("../beats");

var _configuration_blocks = require("../configuration_blocks");

var _tags = require("../tags");

var _tokens = require("../tokens");

var _framework = require("./../framework");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function compose(server) {
  const framework = new _framework.BackendFrameworkLib(new _kibana_framework_adapter.KibanaBackendFrameworkAdapter((0, _lodash.camelCase)(_constants.PLUGIN.ID), server, _plugin.CONFIG_PREFIX));
  const database = new _kibana_database_adapter.KibanaDatabaseAdapter(server.plugins.elasticsearch);
  const beatsAdapter = new _elasticsearch_beats_adapter.ElasticsearchBeatsAdapter(database);
  const configAdapter = new _elasticsearch_configuration_block_adapter.ElasticsearchConfigurationBlockAdapter(database);
  const tags = new _tags.CMTagsDomain(new _elasticsearch_tags_adapter.ElasticsearchTagsAdapter(database), configAdapter, beatsAdapter);
  const configurationBlocks = new _configuration_blocks.ConfigurationBlocksLib(configAdapter, tags);
  const tokens = new _tokens.CMTokensDomain(new _elasticsearch_tokens_adapter.ElasticsearchTokensAdapter(database), {
    framework
  });
  const beats = new _beats.CMBeatsDomain(beatsAdapter, {
    tags,
    tokens,
    framework
  });
  const beatEvents = new _beat_events.BeatEventsLib(new _elasticsearch_beat_events_adapter.ElasticsearchBeatEventsAdapter(database), beats);
  const libs = {
    beatEvents,
    framework,
    database,
    beats,
    tags,
    tokens,
    configurationBlocks
  };
  return libs;
}