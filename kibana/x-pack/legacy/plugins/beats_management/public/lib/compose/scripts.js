"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;

var _config_schemas = require("../../../common/config_schemas");

var _config_schemas_translations_map = require("../../../common/config_schemas_translations_map");

var _rest_beats_adapter = require("../adapters/beats/rest_beats_adapter");

var _rest_config_blocks_adapter = require("../adapters/configuration_blocks/rest_config_blocks_adapter");

var _memory = require("../adapters/elasticsearch/memory");

var _testing_framework_adapter = require("../adapters/framework/testing_framework_adapter");

var _node_axios_api_adapter = require("../adapters/rest_api/node_axios_api_adapter");

var _rest_tags_adapter = require("../adapters/tags/rest_tags_adapter");

var _rest_tokens_adapter = require("../adapters/tokens/rest_tokens_adapter");

var _beats = require("../beats");

var _configuration_blocks = require("../configuration_blocks");

var _elasticsearch = require("../elasticsearch");

var _framework = require("../framework");

var _tags = require("../tags");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function compose(basePath) {
  var api = new _node_axios_api_adapter.NodeAxiosAPIAdapter('elastic', 'changeme', basePath);
  var esAdapter = new _memory.MemoryElasticsearchAdapter(function () {
    return true;
  }, function () {
    return '';
  }, []);
  var elasticsearchLib = new _elasticsearch.ElasticsearchLib(esAdapter);
  var configBlocks = new _configuration_blocks.ConfigBlocksLib(new _rest_config_blocks_adapter.RestConfigBlocksAdapter(api), (0, _config_schemas_translations_map.translateConfigSchema)(_config_schemas.configBlockSchemas));
  var tags = new _tags.TagsLib(new _rest_tags_adapter.RestTagsAdapter(api), elasticsearchLib);
  var tokens = new _rest_tokens_adapter.RestTokensAdapter(api);
  var beats = new _beats.BeatsLib(new _rest_beats_adapter.RestBeatsAdapter(api), elasticsearchLib);
  var framework = new _framework.FrameworkLib(new _testing_framework_adapter.TestingFrameworkAdapter({
    basePath: basePath,
    license: {
      type: 'gold',
      expired: false,
      expiry_date_in_millis: 34353453452345
    },
    security: {
      enabled: true,
      available: true
    },
    settings: {
      encryptionKey: 'xpack_beats_default_encryptionKey',
      enrollmentTokensTtlInSeconds: 10 * 60,
      // 10 minutes
      defaultUserRoles: ['superuser']
    }
  }, {
    username: 'joeuser',
    roles: ['beats_admin'],
    enabled: true,
    full_name: null,
    email: null
  }, '6.7.0'));
  var libs = {
    framework: framework,
    elasticsearch: elasticsearchLib,
    tags: tags,
    tokens: tokens,
    beats: beats,
    configBlocks: configBlocks
  };
  return libs;
}