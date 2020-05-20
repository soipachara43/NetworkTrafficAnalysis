"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateMaxContentLength = validateMaxContentLength;

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const KIBANA_MAX_SIZE_BYTES_PATH = 'xpack.reporting.csv.maxSizeBytes';
const ES_MAX_SIZE_BYTES_PATH = 'http.max_content_length';

async function validateMaxContentLength(server, elasticsearch, logger) {
  const config = server.config();
  const {
    callAsInternalUser
  } = elasticsearch.dataClient;
  const elasticClusterSettingsResponse = await callAsInternalUser('cluster.getSettings', {
    includeDefaults: true
  });
  const {
    persistent,
    transient,
    defaults: defaultSettings
  } = elasticClusterSettingsResponse;
  const elasticClusterSettings = (0, _lodash.defaults)({}, persistent, transient, defaultSettings);
  const elasticSearchMaxContent = (0, _lodash.get)(elasticClusterSettings, 'http.max_content_length', '100mb');
  const elasticSearchMaxContentBytes = (0, _numeral.default)().unformat(elasticSearchMaxContent.toUpperCase());
  const kibanaMaxContentBytes = config.get(KIBANA_MAX_SIZE_BYTES_PATH);

  if (kibanaMaxContentBytes > elasticSearchMaxContentBytes) {
    // TODO this should simply throw an error and let the handler conver it to a warning mesasge. See validateServerHost.
    logger.warning(`${KIBANA_MAX_SIZE_BYTES_PATH} (${kibanaMaxContentBytes}) is higher than ElasticSearch's ${ES_MAX_SIZE_BYTES_PATH} (${elasticSearchMaxContentBytes}). ` + `Please set ${ES_MAX_SIZE_BYTES_PATH} in ElasticSearch to match, or lower your ${KIBANA_MAX_SIZE_BYTES_PATH} in Kibana to avoid this warning.`);
  }
}