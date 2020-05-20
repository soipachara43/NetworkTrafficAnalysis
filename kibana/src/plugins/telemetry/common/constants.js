"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KIBANA_STATS_TYPE = exports.KIBANA_USAGE_TYPE = exports.KIBANA_STACK_MANAGEMENT_STATS_TYPE = exports.APPLICATION_USAGE_TYPE = exports.UI_METRIC_USAGE_TYPE = exports.ENDPOINT_VERSION = exports.TELEMETRY_STATS_TYPE = exports.PRIVACY_STATEMENT_URL = exports.PATH_TO_ADVANCED_SETTINGS = exports.LOCALSTORAGE_KEY = exports.REPORT_INTERVAL_MS = exports.getConfigTelemetryDesc = exports.CONFIG_TELEMETRY = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * config options opt into telemetry
 */
const CONFIG_TELEMETRY = 'telemetry:optIn';
/**
 * config description for opting into telemetry
 */

exports.CONFIG_TELEMETRY = CONFIG_TELEMETRY;

const getConfigTelemetryDesc = () => {
  // Can't find where it's used but copying it over from the legacy code just in case...
  return _i18n.i18n.translate('telemetry.telemetryConfigDescription', {
    defaultMessage: 'Help us improve the Elastic Stack by providing usage statistics for basic features. We will not share this data outside of Elastic.'
  });
};
/**
 * The amount of time, in milliseconds, to wait between reports when enabled.
 * Currently 24 hours.
 */


exports.getConfigTelemetryDesc = getConfigTelemetryDesc;
const REPORT_INTERVAL_MS = 86400000;
/**
 * Key for the localStorage service
 */

exports.REPORT_INTERVAL_MS = REPORT_INTERVAL_MS;
const LOCALSTORAGE_KEY = 'telemetry.data';
/**
 * Link to Advanced Settings.
 */

exports.LOCALSTORAGE_KEY = LOCALSTORAGE_KEY;
const PATH_TO_ADVANCED_SETTINGS = 'kibana#/management/kibana/settings';
/**
 * Link to the Elastic Telemetry privacy statement.
 */

exports.PATH_TO_ADVANCED_SETTINGS = PATH_TO_ADVANCED_SETTINGS;
const PRIVACY_STATEMENT_URL = `https://www.elastic.co/legal/privacy-statement`;
/**
 * The type name used to publish telemetry plugin stats.
 */

exports.PRIVACY_STATEMENT_URL = PRIVACY_STATEMENT_URL;
const TELEMETRY_STATS_TYPE = 'telemetry';
/**
 * The endpoint version when hitting the remote telemetry service
 */

exports.TELEMETRY_STATS_TYPE = TELEMETRY_STATS_TYPE;
const ENDPOINT_VERSION = 'v2';
/**
 * UI metric usage type
 */

exports.ENDPOINT_VERSION = ENDPOINT_VERSION;
const UI_METRIC_USAGE_TYPE = 'ui_metric';
/**
 * Application Usage type
 */

exports.UI_METRIC_USAGE_TYPE = UI_METRIC_USAGE_TYPE;
const APPLICATION_USAGE_TYPE = 'application_usage';
/**
 * The type name used within the Monitoring index to publish management stats.
 */

exports.APPLICATION_USAGE_TYPE = APPLICATION_USAGE_TYPE;
const KIBANA_STACK_MANAGEMENT_STATS_TYPE = 'stack_management';
/**
 * The type name used to publish Kibana usage stats.
 * NOTE: this string shows as-is in the stats API as a field name for the kibana usage stats
 */

exports.KIBANA_STACK_MANAGEMENT_STATS_TYPE = KIBANA_STACK_MANAGEMENT_STATS_TYPE;
const KIBANA_USAGE_TYPE = 'kibana';
/**
 * The type name used to publish Kibana usage stats in the formatted as bulk.
 */

exports.KIBANA_USAGE_TYPE = KIBANA_USAGE_TYPE;
const KIBANA_STATS_TYPE = 'kibana_stats';
exports.KIBANA_STATS_TYPE = KIBANA_STATS_TYPE;