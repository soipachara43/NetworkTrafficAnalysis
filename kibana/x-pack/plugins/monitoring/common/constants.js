"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALERT_EMAIL_SERVICES = exports.MONITORING_CONFIG_ALERTING_EMAIL_ADDRESS = exports.NUMBER_OF_MIGRATED_ALERTS = exports.ALERT_ACTION_TYPE_EMAIL = exports.ALERT_TYPES = exports.ALERT_TYPE_LICENSE_EXPIRATION = exports.ALERT_TYPE_PREFIX = exports.KIBANA_ALERTING_ENABLED = exports.TELEMETRY_COLLECTION_INTERVAL = exports.REPORTING_SYSTEM_ID = exports.LOGSTASH_SYSTEM_ID = exports.APM_SYSTEM_ID = exports.BEATS_SYSTEM_ID = exports.KIBANA_SYSTEM_ID = exports.TELEMETRY_QUERY_SOURCE = exports.CODE_PATH_LOGS = exports.CODE_PATH_LICENSE = exports.CODE_PATH_APM = exports.CODE_PATH_LOGSTASH = exports.CODE_PATH_BEATS = exports.CODE_PATH_ML = exports.CODE_PATH_ELASTICSEARCH = exports.CODE_PATH_KIBANA = exports.CODE_PATH_ALERTS = exports.CODE_PATH_ALL = exports.INFRA_SOURCE_ID = exports.ELASTICSEARCH_SYSTEM_ID = exports.METRICBEAT_INDEX_NAME_UNIQUE_TOKEN = exports.INDEX_PATTERN_ELASTICSEARCH = exports.INDEX_ALERTS = exports.INDEX_PATTERN_BEATS = exports.INDEX_PATTERN_LOGSTASH = exports.INDEX_PATTERN_KIBANA = exports.INDEX_PATTERN = exports.STANDALONE_CLUSTER_CLUSTER_UUID = exports.CLUSTER_ALERTS_ADDRESS_CONFIG_KEY = exports.DEBOUNCE_FAST_MS = exports.DEBOUNCE_SLOW_MS = exports.LOGSTASH = exports.CLOUD_METADATA_SERVICES = exports.ML_SUPPORTED_LICENSES = exports.CALCULATE_DURATION_UNTIL = exports.CALCULATE_DURATION_SINCE = exports.FORMAT_DURATION_TEMPLATE_TINY = exports.FORMAT_DURATION_TEMPLATE_SHORT = exports.FORMAT_DURATION_TEMPLATE_LONG = exports.CLUSTER_ALERTS_SEARCH_SIZE = exports.CHART_TEXT_COLOR = exports.CHART_LINE_COLOR = exports.SORT_DESCENDING = exports.SORT_ASCENDING = exports.EUI_SORT_DESCENDING = exports.EUI_SORT_ASCENDING = exports.NORMALIZED_DERIVATIVE_UNIT = exports.STORAGE_KEY = exports.KIBANA_SETTINGS_TYPE = exports.KIBANA_STATS_TYPE_MONITORING = exports.MONITORING_SYSTEM_API_VERSION = exports.KIBANA_MONITORING_LOGGING_TAG = exports.LOGGING_TAG = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Helper string to add as a tag in every logging call
 */
const LOGGING_TAG = 'monitoring';
/**
 * Helper string to add as a tag in every logging call related to Kibana monitoring
 */

exports.LOGGING_TAG = LOGGING_TAG;
const KIBANA_MONITORING_LOGGING_TAG = 'kibana-monitoring';
/**
 * The Monitoring API version is the expected API format that we export and expect to import.
 * @type {string}
 */

exports.KIBANA_MONITORING_LOGGING_TAG = KIBANA_MONITORING_LOGGING_TAG;
const MONITORING_SYSTEM_API_VERSION = '7';
/**
 * The type name used within the Monitoring index to publish Kibana ops stats.
 * @type {string}
 */

exports.MONITORING_SYSTEM_API_VERSION = MONITORING_SYSTEM_API_VERSION;
const KIBANA_STATS_TYPE_MONITORING = 'kibana_stats'; // similar to KIBANA_STATS_TYPE but rolled up into 10s stats from 5s intervals through ops_buffer

/**
 * The type name used within the Monitoring index to publish Kibana stats.
 * @type {string}
 */

exports.KIBANA_STATS_TYPE_MONITORING = KIBANA_STATS_TYPE_MONITORING;
const KIBANA_SETTINGS_TYPE = 'kibana_settings';
/*
 * Key for the localStorage service
 */

exports.KIBANA_SETTINGS_TYPE = KIBANA_SETTINGS_TYPE;
const STORAGE_KEY = 'xpack.monitoring.data';
/**
 * Units for derivative metric values
 */

exports.STORAGE_KEY = STORAGE_KEY;
const NORMALIZED_DERIVATIVE_UNIT = '1s';
/*
 * Values for column sorting in table options
 * @type {number} 1 or -1
 */

exports.NORMALIZED_DERIVATIVE_UNIT = NORMALIZED_DERIVATIVE_UNIT;
const EUI_SORT_ASCENDING = 'asc';
exports.EUI_SORT_ASCENDING = EUI_SORT_ASCENDING;
const EUI_SORT_DESCENDING = 'desc';
exports.EUI_SORT_DESCENDING = EUI_SORT_DESCENDING;
const SORT_ASCENDING = 1;
exports.SORT_ASCENDING = SORT_ASCENDING;
const SORT_DESCENDING = -1;
/*
 * Chart colors
 * @type {string}
 */

exports.SORT_DESCENDING = SORT_DESCENDING;
const CHART_LINE_COLOR = '#d2d2d2';
exports.CHART_LINE_COLOR = CHART_LINE_COLOR;
const CHART_TEXT_COLOR = '#9c9c9c';
/*
 * Number of cluster alerts to show on overview page
 * @type {number}
 */

exports.CHART_TEXT_COLOR = CHART_TEXT_COLOR;
const CLUSTER_ALERTS_SEARCH_SIZE = 3;
/*
 * Format for moment-duration-format timestamp-to-duration template if the time diffs are gte 1 month
 * @type {string}
 */

exports.CLUSTER_ALERTS_SEARCH_SIZE = CLUSTER_ALERTS_SEARCH_SIZE;
const FORMAT_DURATION_TEMPLATE_LONG = 'M [months] d [days]';
/*
 * Format for moment-duration-format timestamp-to-duration template if the time diffs are lt 1 month but gt 1 minute
 * @type {string}
 */

exports.FORMAT_DURATION_TEMPLATE_LONG = FORMAT_DURATION_TEMPLATE_LONG;
const FORMAT_DURATION_TEMPLATE_SHORT = ' d [days] h [hrs] m [min]';
/*
 * Format for moment-duration-format timestamp-to-duration template if the time diffs are lt 1 minute
 * @type {string}
 */

exports.FORMAT_DURATION_TEMPLATE_SHORT = FORMAT_DURATION_TEMPLATE_SHORT;
const FORMAT_DURATION_TEMPLATE_TINY = ' s [seconds]';
/*
 * Simple unique values for Timestamp to duration flags. These are used for
 * determining if calculation should be formatted as "time until" (now to
 * timestamp) or "time since" (timestamp to now)
 */

exports.FORMAT_DURATION_TEMPLATE_TINY = FORMAT_DURATION_TEMPLATE_TINY;
const CALCULATE_DURATION_SINCE = 'since';
exports.CALCULATE_DURATION_SINCE = CALCULATE_DURATION_SINCE;
const CALCULATE_DURATION_UNTIL = 'until';
/**
 * In order to show ML Jobs tab in the Elasticsearch section / tab navigation, license must be supported
 */

exports.CALCULATE_DURATION_UNTIL = CALCULATE_DURATION_UNTIL;
const ML_SUPPORTED_LICENSES = ['trial', 'platinum', 'enterprise'];
/**
 * Metadata service URLs for the different cloud services that have constant URLs (e.g., unlike GCP, which is a constant prefix).
 *
 * @type {Object}
 */

exports.ML_SUPPORTED_LICENSES = ML_SUPPORTED_LICENSES;
const CLOUD_METADATA_SERVICES = {
  // We explicitly call out the version, 2016-09-02, rather than 'latest' to avoid unexpected changes
  AWS_URL: 'http://169.254.169.254/2016-09-02/dynamic/instance-identity/document',
  // 2017-04-02 is the first GA release of this API
  AZURE_URL: 'http://169.254.169.254/metadata/instance?api-version=2017-04-02',
  // GCP documentation shows both 'metadata.google.internal' (mostly) and '169.254.169.254' (sometimes)
  // To bypass potential DNS changes, the IP was used because it's shared with other cloud services
  GCP_URL_PREFIX: 'http://169.254.169.254/computeMetadata/v1/instance'
};
/**
 * Constants used by Logstash monitoring code
 */

exports.CLOUD_METADATA_SERVICES = CLOUD_METADATA_SERVICES;
const LOGSTASH = {
  MAJOR_VER_REQD_FOR_PIPELINES: 6,

  /*
   * Names ES keys on for different Logstash pipeline queues.
   * @type {string}
   */
  QUEUE_TYPES: {
    MEMORY: 'memory',
    PERSISTED: 'persisted'
  }
};
exports.LOGSTASH = LOGSTASH;
const DEBOUNCE_SLOW_MS = 17; // roughly how long it takes to render a frame at 60fps

exports.DEBOUNCE_SLOW_MS = DEBOUNCE_SLOW_MS;
const DEBOUNCE_FAST_MS = 10; // roughly how long it takes to render a frame at 100fps

/**
 * Configuration key for setting the email address used for cluster alert notifications.
 */

exports.DEBOUNCE_FAST_MS = DEBOUNCE_FAST_MS;
const CLUSTER_ALERTS_ADDRESS_CONFIG_KEY = 'cluster_alerts.email_notifications.email_address';
exports.CLUSTER_ALERTS_ADDRESS_CONFIG_KEY = CLUSTER_ALERTS_ADDRESS_CONFIG_KEY;
const STANDALONE_CLUSTER_CLUSTER_UUID = '__standalone_cluster__';
exports.STANDALONE_CLUSTER_CLUSTER_UUID = STANDALONE_CLUSTER_CLUSTER_UUID;
const INDEX_PATTERN = '.monitoring-*-6-*,.monitoring-*-7-*';
exports.INDEX_PATTERN = INDEX_PATTERN;
const INDEX_PATTERN_KIBANA = '.monitoring-kibana-6-*,.monitoring-kibana-7-*';
exports.INDEX_PATTERN_KIBANA = INDEX_PATTERN_KIBANA;
const INDEX_PATTERN_LOGSTASH = '.monitoring-logstash-6-*,.monitoring-logstash-7-*';
exports.INDEX_PATTERN_LOGSTASH = INDEX_PATTERN_LOGSTASH;
const INDEX_PATTERN_BEATS = '.monitoring-beats-6-*,.monitoring-beats-7-*';
exports.INDEX_PATTERN_BEATS = INDEX_PATTERN_BEATS;
const INDEX_ALERTS = '.monitoring-alerts-6,.monitoring-alerts-7';
exports.INDEX_ALERTS = INDEX_ALERTS;
const INDEX_PATTERN_ELASTICSEARCH = '.monitoring-es-6-*,.monitoring-es-7-*'; // This is the unique token that exists in monitoring indices collected by metricbeat

exports.INDEX_PATTERN_ELASTICSEARCH = INDEX_PATTERN_ELASTICSEARCH;
const METRICBEAT_INDEX_NAME_UNIQUE_TOKEN = '-mb-'; // We use this for metricbeat migration to identify specific products that we do not have constants for

exports.METRICBEAT_INDEX_NAME_UNIQUE_TOKEN = METRICBEAT_INDEX_NAME_UNIQUE_TOKEN;
const ELASTICSEARCH_SYSTEM_ID = 'elasticsearch';
/**
 * The id of the infra source owned by the monitoring plugin.
 */

exports.ELASTICSEARCH_SYSTEM_ID = ELASTICSEARCH_SYSTEM_ID;
const INFRA_SOURCE_ID = 'internal-stack-monitoring';
/*
 * These constants represent code paths within `getClustersFromRequest`
 * that an api call wants to invoke. This is meant as an optimization to
 * avoid unnecessary ES queries (looking at you logstash) when the data
 * is not used. In the long term, it'd be nice to have separate api calls
 * instead of this path logic.
 */

exports.INFRA_SOURCE_ID = INFRA_SOURCE_ID;
const CODE_PATH_ALL = 'all';
exports.CODE_PATH_ALL = CODE_PATH_ALL;
const CODE_PATH_ALERTS = 'alerts';
exports.CODE_PATH_ALERTS = CODE_PATH_ALERTS;
const CODE_PATH_KIBANA = 'kibana';
exports.CODE_PATH_KIBANA = CODE_PATH_KIBANA;
const CODE_PATH_ELASTICSEARCH = 'elasticsearch';
exports.CODE_PATH_ELASTICSEARCH = CODE_PATH_ELASTICSEARCH;
const CODE_PATH_ML = 'ml';
exports.CODE_PATH_ML = CODE_PATH_ML;
const CODE_PATH_BEATS = 'beats';
exports.CODE_PATH_BEATS = CODE_PATH_BEATS;
const CODE_PATH_LOGSTASH = 'logstash';
exports.CODE_PATH_LOGSTASH = CODE_PATH_LOGSTASH;
const CODE_PATH_APM = 'apm';
exports.CODE_PATH_APM = CODE_PATH_APM;
const CODE_PATH_LICENSE = 'license';
exports.CODE_PATH_LICENSE = CODE_PATH_LICENSE;
const CODE_PATH_LOGS = 'logs';
/**
 * The header sent by telemetry service when hitting Elasticsearch to identify query source
 * @type {string}
 */

exports.CODE_PATH_LOGS = CODE_PATH_LOGS;
const TELEMETRY_QUERY_SOURCE = 'TELEMETRY';
/**
 * The name of the Kibana System ID used to publish and look up Kibana stats through the Monitoring system.
 * @type {string}
 */

exports.TELEMETRY_QUERY_SOURCE = TELEMETRY_QUERY_SOURCE;
const KIBANA_SYSTEM_ID = 'kibana';
/**
 * The name of the Beats System ID used to publish and look up Beats stats through the Monitoring system.
 * @type {string}
 */

exports.KIBANA_SYSTEM_ID = KIBANA_SYSTEM_ID;
const BEATS_SYSTEM_ID = 'beats';
/**
 * The name of the Apm System ID used to publish and look up Apm stats through the Monitoring system.
 * @type {string}
 */

exports.BEATS_SYSTEM_ID = BEATS_SYSTEM_ID;
const APM_SYSTEM_ID = 'apm';
/**
 * The name of the Kibana System ID used to look up Logstash stats through the Monitoring system.
 * @type {string}
 */

exports.APM_SYSTEM_ID = APM_SYSTEM_ID;
const LOGSTASH_SYSTEM_ID = 'logstash';
/**
 * The name of the Kibana System ID used to look up Reporting stats through the Monitoring system.
 * @type {string}
 */

exports.LOGSTASH_SYSTEM_ID = LOGSTASH_SYSTEM_ID;
const REPORTING_SYSTEM_ID = 'reporting';
/**
 * The amount of time, in milliseconds, to wait between collecting kibana stats from es.
 *
 * Currently 24 hours kept in sync with reporting interval.
 * @type {Number}
 */

exports.REPORTING_SYSTEM_ID = REPORTING_SYSTEM_ID;
const TELEMETRY_COLLECTION_INTERVAL = 86400000;
/**
 * We want to slowly rollout the migration from watcher-based cluster alerts to
 * kibana alerts and we only want to enable the kibana alerts once all
 * watcher-based cluster alerts have been migrated so this flag will serve
 * as the only way to see the new UI and actually run Kibana alerts. It will
 * be false until all alerts have been migrated, then it will be removed
 */

exports.TELEMETRY_COLLECTION_INTERVAL = TELEMETRY_COLLECTION_INTERVAL;
const KIBANA_ALERTING_ENABLED = false;
/**
 * The prefix for all alert types used by monitoring
 */

exports.KIBANA_ALERTING_ENABLED = KIBANA_ALERTING_ENABLED;
const ALERT_TYPE_PREFIX = 'monitoring_';
/**
 * This is the alert type id for the license expiration alert
 */

exports.ALERT_TYPE_PREFIX = ALERT_TYPE_PREFIX;
const ALERT_TYPE_LICENSE_EXPIRATION = `${ALERT_TYPE_PREFIX}alert_type_license_expiration`;
/**
 * A listing of all alert types
 */

exports.ALERT_TYPE_LICENSE_EXPIRATION = ALERT_TYPE_LICENSE_EXPIRATION;
const ALERT_TYPES = [ALERT_TYPE_LICENSE_EXPIRATION];
/**
 * Matches the id for the built-in in email action type
 * See x-pack/legacy/plugins/actions/server/builtin_action_types/email.ts
 */

exports.ALERT_TYPES = ALERT_TYPES;
const ALERT_ACTION_TYPE_EMAIL = '.email';
/**
 * The number of alerts that have been migrated
 */

exports.ALERT_ACTION_TYPE_EMAIL = ALERT_ACTION_TYPE_EMAIL;
const NUMBER_OF_MIGRATED_ALERTS = 1;
/**
 * The advanced settings config name for the email address
 */

exports.NUMBER_OF_MIGRATED_ALERTS = NUMBER_OF_MIGRATED_ALERTS;
const MONITORING_CONFIG_ALERTING_EMAIL_ADDRESS = 'monitoring:alertingEmailAddress';
exports.MONITORING_CONFIG_ALERTING_EMAIL_ADDRESS = MONITORING_CONFIG_ALERTING_EMAIL_ADDRESS;
const ALERT_EMAIL_SERVICES = ['gmail', 'hotmail', 'icloud', 'outlook365', 'ses', 'yahoo'];
exports.ALERT_EMAIL_SERVICES = ALERT_EMAIL_SERVICES;