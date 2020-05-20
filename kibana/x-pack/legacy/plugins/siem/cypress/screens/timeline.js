"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOGGLE_TIMELINE_EXPAND_EVENT = exports.TIMESTAMP_TOGGLE_FIELD = exports.TIMESTAMP_HEADER_FIELD = exports.TIMELINE_TITLE = exports.TIMELINE_SETTINGS_ICON = exports.TIMELINE_NOT_READY_TO_DROP_BUTTON = exports.TIMELINE_INSPECT_BUTTON = exports.TIMELINE_FLYOUT_BODY = exports.TIMELINE_FLYOUT_HEADER = exports.TIMELINE_FIELDS_BUTTON = exports.TIMELINE_DROPPED_DATA_PROVIDERS = exports.TIMELINE_DESCRIPTION = exports.TIMELINE_DATA_PROVIDERS_EMPTY = exports.TIMELINE_DATA_PROVIDERS = exports.SERVER_SIDE_EVENT_COUNT = exports.SEARCH_OR_FILTER_CONTAINER = exports.PROVIDER_BADGE = exports.ID_TOGGLE_FIELD = exports.ID_FIELD = exports.ID_HEADER_FIELD = exports.CREATE_NEW_TIMELINE = exports.CLOSE_TIMELINE_BTN = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CLOSE_TIMELINE_BTN = '[data-test-subj="close-timeline"]';
exports.CLOSE_TIMELINE_BTN = CLOSE_TIMELINE_BTN;
const CREATE_NEW_TIMELINE = '[data-test-subj="timeline-new"]';
exports.CREATE_NEW_TIMELINE = CREATE_NEW_TIMELINE;
const ID_HEADER_FIELD = '[data-test-subj="timeline"] [data-test-subj="header-text-_id"]';
exports.ID_HEADER_FIELD = ID_HEADER_FIELD;
const ID_FIELD = '[data-test-subj="timeline"] [data-test-subj="field-name-_id"]';
exports.ID_FIELD = ID_FIELD;
const ID_TOGGLE_FIELD = '[data-test-subj="toggle-field-_id"]';
exports.ID_TOGGLE_FIELD = ID_TOGGLE_FIELD;
const PROVIDER_BADGE = '[data-test-subj="providerBadge"]';
exports.PROVIDER_BADGE = PROVIDER_BADGE;
const SEARCH_OR_FILTER_CONTAINER = '[data-test-subj="timeline-search-or-filter-search-container"]';
exports.SEARCH_OR_FILTER_CONTAINER = SEARCH_OR_FILTER_CONTAINER;
const SERVER_SIDE_EVENT_COUNT = '[data-test-subj="server-side-event-count"]';
exports.SERVER_SIDE_EVENT_COUNT = SERVER_SIDE_EVENT_COUNT;
const TIMELINE_DATA_PROVIDERS = '[data-test-subj="dataProviders"]';
exports.TIMELINE_DATA_PROVIDERS = TIMELINE_DATA_PROVIDERS;
const TIMELINE_DATA_PROVIDERS_EMPTY = '[data-test-subj="dataProviders"] [data-test-subj="empty"]';
exports.TIMELINE_DATA_PROVIDERS_EMPTY = TIMELINE_DATA_PROVIDERS_EMPTY;
const TIMELINE_DESCRIPTION = '[data-test-subj="timeline-description"]';
exports.TIMELINE_DESCRIPTION = TIMELINE_DESCRIPTION;
const TIMELINE_DROPPED_DATA_PROVIDERS = '[data-test-subj="providerContainer"]';
exports.TIMELINE_DROPPED_DATA_PROVIDERS = TIMELINE_DROPPED_DATA_PROVIDERS;
const TIMELINE_FIELDS_BUTTON = '[data-test-subj="timeline"] [data-test-subj="show-field-browser"]';
exports.TIMELINE_FIELDS_BUTTON = TIMELINE_FIELDS_BUTTON;
const TIMELINE_FLYOUT_HEADER = '[data-test-subj="eui-flyout-header"]';
exports.TIMELINE_FLYOUT_HEADER = TIMELINE_FLYOUT_HEADER;
const TIMELINE_FLYOUT_BODY = '[data-test-subj="eui-flyout-body"]';
exports.TIMELINE_FLYOUT_BODY = TIMELINE_FLYOUT_BODY;
const TIMELINE_INSPECT_BUTTON = '[data-test-subj="inspect-empty-button"]';
exports.TIMELINE_INSPECT_BUTTON = TIMELINE_INSPECT_BUTTON;
const TIMELINE_NOT_READY_TO_DROP_BUTTON = '[data-test-subj="flyout-button-not-ready-to-drop"]';
exports.TIMELINE_NOT_READY_TO_DROP_BUTTON = TIMELINE_NOT_READY_TO_DROP_BUTTON;
const TIMELINE_SETTINGS_ICON = '[data-test-subj="settings-gear"]';
exports.TIMELINE_SETTINGS_ICON = TIMELINE_SETTINGS_ICON;
const TIMELINE_TITLE = '[data-test-subj="timeline-title"]';
exports.TIMELINE_TITLE = TIMELINE_TITLE;
const TIMESTAMP_HEADER_FIELD = '[data-test-subj="header-text-@timestamp"]';
exports.TIMESTAMP_HEADER_FIELD = TIMESTAMP_HEADER_FIELD;
const TIMESTAMP_TOGGLE_FIELD = '[data-test-subj="toggle-field-@timestamp"]';
exports.TIMESTAMP_TOGGLE_FIELD = TIMESTAMP_TOGGLE_FIELD;
const TOGGLE_TIMELINE_EXPAND_EVENT = '[data-test-subj="expand-event"]';
exports.TOGGLE_TIMELINE_EXPAND_EVENT = TOGGLE_TIMELINE_EXPAND_EVENT;