"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIM_RETENTION_EXECUTE = exports.UIM_RETENTION_SETTINGS_UPDATE = exports.UIM_POLICY_UPDATE = exports.UIM_POLICY_CREATE = exports.UIM_POLICY_DELETE_MANY = exports.UIM_POLICY_DELETE = exports.UIM_POLICY_EXECUTE = exports.UIM_POLICY_DETAIL_PANEL_HISTORY_TAB = exports.UIM_POLICY_DETAIL_PANEL_SUMMARY_TAB = exports.UIM_POLICY_SHOW_DETAILS_CLICK = exports.UIM_POLICY_LIST_LOAD = exports.UIM_RESTORE_LIST_EXPAND_INDEX = exports.UIM_RESTORE_LIST_LOAD = exports.UIM_RESTORE_CREATE = exports.UIM_SNAPSHOT_DELETE_MANY = exports.UIM_SNAPSHOT_DELETE = exports.UIM_SNAPSHOT_DETAIL_PANEL_FAILED_INDICES_TAB = exports.UIM_SNAPSHOT_DETAIL_PANEL_SUMMARY_TAB = exports.UIM_SNAPSHOT_SHOW_DETAILS_CLICK = exports.UIM_SNAPSHOT_LIST_LOAD = exports.UIM_REPOSITORY_DETAIL_PANEL_CLEANUP = exports.UIM_REPOSITORY_DETAIL_PANEL_VERIFY = exports.UIM_REPOSITORY_SHOW_DETAILS_CLICK = exports.UIM_REPOSITORY_DELETE_MANY = exports.UIM_REPOSITORY_DELETE = exports.UIM_REPOSITORY_UPDATE = exports.UIM_REPOSITORY_CREATE = exports.UIM_REPOSITORY_LIST_LOAD = exports.UIM_APP_NAME = exports.DEFAULT_RETENTION_FREQUENCY = exports.DEFAULT_RETENTION_SCHEDULE = exports.DEFAULT_POLICY_FREQUENCY = exports.DEFAULT_POLICY_SCHEDULE = exports.REMOVE_INDEX_SETTINGS_SUGGESTIONS = exports.MODIFY_INDEX_SETTINGS_SUGGESTIONS = exports.UNREMOVABLE_INDEX_SETTINGS = exports.UNMODIFIABLE_INDEX_SETTINGS = exports.SNAPSHOT_STATE = exports.REPOSITORY_DOC_PATHS = exports.MINIMUM_TIMEOUT_MS = exports.DEFAULT_SECTION = exports.BASE_PATH = void 0;

var _shared_imports = require("../../shared_imports");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BASE_PATH = '/management/elasticsearch/snapshot_restore';
exports.BASE_PATH = BASE_PATH;
var DEFAULT_SECTION = 'snapshots';
exports.DEFAULT_SECTION = DEFAULT_SECTION;
// Set a minimum request duration to avoid strange UI flickers
var MINIMUM_TIMEOUT_MS = 300;
exports.MINIMUM_TIMEOUT_MS = MINIMUM_TIMEOUT_MS;
var REPOSITORY_DOC_PATHS;
exports.REPOSITORY_DOC_PATHS = REPOSITORY_DOC_PATHS;

(function (REPOSITORY_DOC_PATHS) {
  REPOSITORY_DOC_PATHS["default"] = "snapshot-restore.html";
  REPOSITORY_DOC_PATHS["fs"] = "snapshots-register-repository.html#snapshots-filesystem-repository";
  REPOSITORY_DOC_PATHS["url"] = "snapshots-register-repository.html#snapshots-read-only-repository";
  REPOSITORY_DOC_PATHS["source"] = "snapshots-register-repository.html#snapshots-source-only-repository";
  REPOSITORY_DOC_PATHS["s3"] = "repository-s3.html";
  REPOSITORY_DOC_PATHS["hdfs"] = "repository-hdfs.html";
  REPOSITORY_DOC_PATHS["azure"] = "repository-azure.html";
  REPOSITORY_DOC_PATHS["gcs"] = "repository-gcs.html";
  REPOSITORY_DOC_PATHS["plugins"] = "repository.html";
})(REPOSITORY_DOC_PATHS || (exports.REPOSITORY_DOC_PATHS = REPOSITORY_DOC_PATHS = {}));

var SNAPSHOT_STATE;
exports.SNAPSHOT_STATE = SNAPSHOT_STATE;

(function (SNAPSHOT_STATE) {
  SNAPSHOT_STATE["IN_PROGRESS"] = "IN_PROGRESS";
  SNAPSHOT_STATE["SUCCESS"] = "SUCCESS";
  SNAPSHOT_STATE["FAILED"] = "FAILED";
  SNAPSHOT_STATE["PARTIAL"] = "PARTIAL";
  SNAPSHOT_STATE["INCOMPATIBLE"] = "INCOMPATIBLE";
})(SNAPSHOT_STATE || (exports.SNAPSHOT_STATE = SNAPSHOT_STATE = {}));

var INDEX_SETTING_SUGGESTIONS = ['index.number_of_shards', 'index.shard.check_on_startup', 'index.codec', 'index.routing_partition_size', 'index.load_fixed_bitset_filters_eagerly', 'index.number_of_replicas', 'index.auto_expand_replicas', 'index.search.idle.after', 'index.refresh_interval', 'index.max_result_window', 'index.max_inner_result_window', 'index.max_rescore_window', 'index.max_docvalue_fields_search', 'index.max_script_fields', 'index.max_ngram_diff', 'index.max_shingle_diff', 'index.blocks.read_only', 'index.blocks.read_only_allow_delete', 'index.blocks.read', 'index.blocks.write', 'index.blocks.metadata', 'index.max_refresh_listeners', 'index.analyze.max_token_count', 'index.highlight.max_analyzed_offset', 'index.max_terms_count', 'index.max_regex_length', 'index.routing.allocation.enable', 'index.routing.rebalance.enable', 'index.gc_deletes', 'index.default_pipeline'];
var UNMODIFIABLE_INDEX_SETTINGS = ['index.number_of_shards', 'index.version.created', 'index.uuid', 'index.creation_date'];
exports.UNMODIFIABLE_INDEX_SETTINGS = UNMODIFIABLE_INDEX_SETTINGS;
var UNREMOVABLE_INDEX_SETTINGS = [].concat(UNMODIFIABLE_INDEX_SETTINGS, ['index.number_of_replicas', 'index.auto_expand_replicas', 'index.version.upgraded']);
exports.UNREMOVABLE_INDEX_SETTINGS = UNREMOVABLE_INDEX_SETTINGS;
var MODIFY_INDEX_SETTINGS_SUGGESTIONS = INDEX_SETTING_SUGGESTIONS.filter(function (setting) {
  return !UNMODIFIABLE_INDEX_SETTINGS.includes(setting);
});
exports.MODIFY_INDEX_SETTINGS_SUGGESTIONS = MODIFY_INDEX_SETTINGS_SUGGESTIONS;
var REMOVE_INDEX_SETTINGS_SUGGESTIONS = INDEX_SETTING_SUGGESTIONS.filter(function (setting) {
  return !UNREMOVABLE_INDEX_SETTINGS.includes(setting);
});
exports.REMOVE_INDEX_SETTINGS_SUGGESTIONS = REMOVE_INDEX_SETTINGS_SUGGESTIONS;
var DEFAULT_POLICY_SCHEDULE = '0 30 1 * * ?';
exports.DEFAULT_POLICY_SCHEDULE = DEFAULT_POLICY_SCHEDULE;
var DEFAULT_POLICY_FREQUENCY = _shared_imports.DAY;
exports.DEFAULT_POLICY_FREQUENCY = DEFAULT_POLICY_FREQUENCY;
var DEFAULT_RETENTION_SCHEDULE = '0 30 1 * * ?';
exports.DEFAULT_RETENTION_SCHEDULE = DEFAULT_RETENTION_SCHEDULE;
var DEFAULT_RETENTION_FREQUENCY = _shared_imports.DAY; // UI Metric constants

exports.DEFAULT_RETENTION_FREQUENCY = DEFAULT_RETENTION_FREQUENCY;
var UIM_APP_NAME = 'snapshot_restore';
exports.UIM_APP_NAME = UIM_APP_NAME;
var UIM_REPOSITORY_LIST_LOAD = 'repository_list_load';
exports.UIM_REPOSITORY_LIST_LOAD = UIM_REPOSITORY_LIST_LOAD;
var UIM_REPOSITORY_CREATE = 'repository_create';
exports.UIM_REPOSITORY_CREATE = UIM_REPOSITORY_CREATE;
var UIM_REPOSITORY_UPDATE = 'repository_update';
exports.UIM_REPOSITORY_UPDATE = UIM_REPOSITORY_UPDATE;
var UIM_REPOSITORY_DELETE = 'repository_delete';
exports.UIM_REPOSITORY_DELETE = UIM_REPOSITORY_DELETE;
var UIM_REPOSITORY_DELETE_MANY = 'repository_delete_many';
exports.UIM_REPOSITORY_DELETE_MANY = UIM_REPOSITORY_DELETE_MANY;
var UIM_REPOSITORY_SHOW_DETAILS_CLICK = 'repository_show_details_click';
exports.UIM_REPOSITORY_SHOW_DETAILS_CLICK = UIM_REPOSITORY_SHOW_DETAILS_CLICK;
var UIM_REPOSITORY_DETAIL_PANEL_VERIFY = 'repository_detail_panel_verify';
exports.UIM_REPOSITORY_DETAIL_PANEL_VERIFY = UIM_REPOSITORY_DETAIL_PANEL_VERIFY;
var UIM_REPOSITORY_DETAIL_PANEL_CLEANUP = 'repository_detail_panel_cleanup';
exports.UIM_REPOSITORY_DETAIL_PANEL_CLEANUP = UIM_REPOSITORY_DETAIL_PANEL_CLEANUP;
var UIM_SNAPSHOT_LIST_LOAD = 'snapshot_list_load';
exports.UIM_SNAPSHOT_LIST_LOAD = UIM_SNAPSHOT_LIST_LOAD;
var UIM_SNAPSHOT_SHOW_DETAILS_CLICK = 'snapshot_show_details_click';
exports.UIM_SNAPSHOT_SHOW_DETAILS_CLICK = UIM_SNAPSHOT_SHOW_DETAILS_CLICK;
var UIM_SNAPSHOT_DETAIL_PANEL_SUMMARY_TAB = 'snapshot_detail_panel_summary_tab';
exports.UIM_SNAPSHOT_DETAIL_PANEL_SUMMARY_TAB = UIM_SNAPSHOT_DETAIL_PANEL_SUMMARY_TAB;
var UIM_SNAPSHOT_DETAIL_PANEL_FAILED_INDICES_TAB = 'snapshot_detail_panel_failed_indices_tab';
exports.UIM_SNAPSHOT_DETAIL_PANEL_FAILED_INDICES_TAB = UIM_SNAPSHOT_DETAIL_PANEL_FAILED_INDICES_TAB;
var UIM_SNAPSHOT_DELETE = 'snapshot_delete';
exports.UIM_SNAPSHOT_DELETE = UIM_SNAPSHOT_DELETE;
var UIM_SNAPSHOT_DELETE_MANY = 'snapshot_delete_many';
exports.UIM_SNAPSHOT_DELETE_MANY = UIM_SNAPSHOT_DELETE_MANY;
var UIM_RESTORE_CREATE = 'restore_create';
exports.UIM_RESTORE_CREATE = UIM_RESTORE_CREATE;
var UIM_RESTORE_LIST_LOAD = 'restore_list_load';
exports.UIM_RESTORE_LIST_LOAD = UIM_RESTORE_LIST_LOAD;
var UIM_RESTORE_LIST_EXPAND_INDEX = 'restore_list_expand_index';
exports.UIM_RESTORE_LIST_EXPAND_INDEX = UIM_RESTORE_LIST_EXPAND_INDEX;
var UIM_POLICY_LIST_LOAD = 'policy_list_load';
exports.UIM_POLICY_LIST_LOAD = UIM_POLICY_LIST_LOAD;
var UIM_POLICY_SHOW_DETAILS_CLICK = 'policy_show_details_click';
exports.UIM_POLICY_SHOW_DETAILS_CLICK = UIM_POLICY_SHOW_DETAILS_CLICK;
var UIM_POLICY_DETAIL_PANEL_SUMMARY_TAB = 'policy_detail_panel_summary_tab';
exports.UIM_POLICY_DETAIL_PANEL_SUMMARY_TAB = UIM_POLICY_DETAIL_PANEL_SUMMARY_TAB;
var UIM_POLICY_DETAIL_PANEL_HISTORY_TAB = 'policy_detail_panel_last_success_tab';
exports.UIM_POLICY_DETAIL_PANEL_HISTORY_TAB = UIM_POLICY_DETAIL_PANEL_HISTORY_TAB;
var UIM_POLICY_EXECUTE = 'policy_execute';
exports.UIM_POLICY_EXECUTE = UIM_POLICY_EXECUTE;
var UIM_POLICY_DELETE = 'policy_delete';
exports.UIM_POLICY_DELETE = UIM_POLICY_DELETE;
var UIM_POLICY_DELETE_MANY = 'policy_delete_many';
exports.UIM_POLICY_DELETE_MANY = UIM_POLICY_DELETE_MANY;
var UIM_POLICY_CREATE = 'policy_create';
exports.UIM_POLICY_CREATE = UIM_POLICY_CREATE;
var UIM_POLICY_UPDATE = 'policy_update';
exports.UIM_POLICY_UPDATE = UIM_POLICY_UPDATE;
var UIM_RETENTION_SETTINGS_UPDATE = 'retention_settings_update';
exports.UIM_RETENTION_SETTINGS_UPDATE = UIM_RETENTION_SETTINGS_UPDATE;
var UIM_RETENTION_EXECUTE = 'retention_execute';
exports.UIM_RETENTION_EXECUTE = UIM_RETENTION_EXECUTE;