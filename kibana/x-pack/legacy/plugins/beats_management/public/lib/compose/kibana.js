"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;

var _lodash = require("lodash");

var _xpack_info = require("plugins/xpack_main/services/xpack_info");

require("ui/autoload/all");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _management = require("ui/management");

var _routes = _interopRequireDefault(require("ui/routes"));

var _config_schemas = require("../../../common/config_schemas");

var _config_schemas_translations_map = require("../../../common/config_schemas_translations_map");

var _index_names = require("../../../common/constants/index_names");

var _rest_beats_adapter = require("../adapters/beats/rest_beats_adapter");

var _rest_config_blocks_adapter = require("../adapters/configuration_blocks/rest_config_blocks_adapter");

var _rest = require("../adapters/elasticsearch/rest");

var _kibana_framework_adapter = require("../adapters/framework/kibana_framework_adapter");

var _axios_rest_api_adapter = require("../adapters/rest_api/axios_rest_api_adapter");

var _rest_tags_adapter = require("../adapters/tags/rest_tags_adapter");

var _rest_tokens_adapter = require("../adapters/tokens/rest_tokens_adapter");

var _beats = require("../beats");

var _configuration_blocks = require("../configuration_blocks");

var _elasticsearch = require("../elasticsearch");

var _tags = require("../tags");

var _plugin = require("./../../../common/constants/plugin");

var _framework = require("./../framework");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore not typed yet
// @ts-ignore not typed yet
// A super early spot in kibana loading that we can use to hook before most other things
var onKibanaReady = _chrome.default.dangerouslyGetActiveInjector;

function compose() {
  var api = new _axios_rest_api_adapter.AxiosRestAPIAdapter(_chrome.default.getXsrfToken(), _chrome.default.getBasePath());
  var esAdapter = new _rest.RestElasticsearchAdapter(_index_names.INDEX_NAMES.BEATS);
  var elasticsearchLib = new _elasticsearch.ElasticsearchLib(esAdapter);
  var configBlocks = new _configuration_blocks.ConfigBlocksLib(new _rest_config_blocks_adapter.RestConfigBlocksAdapter(api), (0, _config_schemas_translations_map.translateConfigSchema)(_config_schemas.configBlockSchemas));
  var tags = new _tags.TagsLib(new _rest_tags_adapter.RestTagsAdapter(api), elasticsearchLib);
  var tokens = new _rest_tokens_adapter.RestTokensAdapter(api);
  var beats = new _beats.BeatsLib(new _rest_beats_adapter.RestBeatsAdapter(api), elasticsearchLib);
  var framework = new _framework.FrameworkLib(new _kibana_framework_adapter.KibanaFrameworkAdapter((0, _lodash.camelCase)(_plugin.PLUGIN.ID), _management.management, _routes.default, _chrome.default.getBasePath, onKibanaReady, _xpack_info.xpackInfo, _chrome.default.getKibanaVersion()));
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