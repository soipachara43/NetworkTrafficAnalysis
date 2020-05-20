"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;

require("ui/autoload/all");

var _management = require("ui/management");

var _modules = require("ui/modules");

var _routes = _interopRequireDefault(require("ui/routes"));

var _config_schemas = require("../../../common/config_schemas");

var _config_schemas_translations_map = require("../../../common/config_schemas_translations_map");

var _memory_beats_adapter = require("../adapters/beats/memory_beats_adapter");

var _kibana_framework_adapter = require("../adapters/framework/kibana_framework_adapter");

var _memory_tags_adapter = require("../adapters/tags/memory_tags_adapter");

var _memory_tokens_adapter = require("../adapters/tokens/memory_tokens_adapter");

var _beats = require("../beats");

var _configuration_blocks = require("../configuration_blocks");

var _framework = require("../framework");

var _tags = require("../tags");

var _memory = require("./../adapters/elasticsearch/memory");

var _elasticsearch = require("./../elasticsearch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore: path dynamic for kibana
// @ts-ignore: path dynamic for kibana
// @ts-ignore: path dynamic for kibana
// @ts-ignore: path dynamic for kibana
var onKibanaReady = _modules.uiModules.get('kibana').run;

function compose(mockIsKueryValid, mockKueryToEsQuery, suggestions) {
  var esAdapter = new _memory.MemoryElasticsearchAdapter(mockIsKueryValid, mockKueryToEsQuery, suggestions);
  var elasticsearchLib = new _elasticsearch.ElasticsearchLib(esAdapter);
  var configBlocks = new _configuration_blocks.ConfigBlocksLib({}, (0, _config_schemas_translations_map.translateConfigSchema)(_config_schemas.configBlockSchemas));
  var tags = new _tags.TagsLib(new _memory_tags_adapter.MemoryTagsAdapter([]), elasticsearchLib);
  var tokens = new _memory_tokens_adapter.MemoryTokensAdapter();
  var beats = new _beats.BeatsLib(new _memory_beats_adapter.MemoryBeatsAdapter([]), elasticsearchLib);

  var pluginUIModule = _modules.uiModules.get('app/beats_management');

  var framework = new _framework.FrameworkLib(new _kibana_framework_adapter.KibanaFrameworkAdapter(pluginUIModule, _management.management, _routes.default, function () {
    return '';
  }, onKibanaReady, null, '7.0.0'));
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