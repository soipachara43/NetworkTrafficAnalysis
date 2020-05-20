"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIELDS_BROWSER_SYSTEM_CATEGORIES_COUNT = exports.FIELDS_BROWSER_SELECTED_CATEGORY_TITLE = exports.FIELDS_BROWSER_SELECTED_CATEGORY_COUNT = exports.FIELDS_BROWSER_TITLE = exports.FIELDS_BROWSER_RESET_FIELDS = exports.FIELDS_BROWSER_MESSAGE_HEADER = exports.FIELDS_BROWSER_MESSAGE_CHECKBOX = exports.FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_HEADER = exports.FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_CHECKBOX = exports.FIELDS_BROWSER_HEADER_HOST_GEO_CONTINENT_NAME_HEADER = exports.FIELDS_BROWSER_HOST_GEO_CONTINENT_NAME_CHECKBOX = exports.FIELDS_BROWSER_HOST_GEO_CITY_NAME_HEADER = exports.FIELDS_BROWSER_HOST_GEO_CITY_NAME_CHECKBOX = exports.FIELDS_BROWSER_HOST_CATEGORIES_COUNT = exports.FIELDS_BROWSER_HEADER_DROP_AREA = exports.FIELDS_BROWSER_FILTER_INPUT = exports.FIELDS_BROWSER_FIELDS_COUNT = exports.FIELDS_BROWSER_DRAGGABLE_HOST_GEO_COUNTRY_NAME_HEADER = exports.FIELDS_BROWSER_CONTAINER = exports.FIELDS_BROWSER_CHECKBOX = exports.FIELDS_BROWSER_CATEGORIES_COUNT = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const FIELDS_BROWSER_CATEGORIES_COUNT = '[data-test-subj="categories-count"]';
exports.FIELDS_BROWSER_CATEGORIES_COUNT = FIELDS_BROWSER_CATEGORIES_COUNT;

const FIELDS_BROWSER_CHECKBOX = id => {
  return `[data-test-subj="field-${id}-checkbox`;
};

exports.FIELDS_BROWSER_CHECKBOX = FIELDS_BROWSER_CHECKBOX;
const FIELDS_BROWSER_CONTAINER = '[data-test-subj="fields-browser-container"]';
exports.FIELDS_BROWSER_CONTAINER = FIELDS_BROWSER_CONTAINER;
const FIELDS_BROWSER_DRAGGABLE_HOST_GEO_COUNTRY_NAME_HEADER = '[data-test-subj="timeline"] [data-test-subj="field-name-host.geo.country_name"]';
exports.FIELDS_BROWSER_DRAGGABLE_HOST_GEO_COUNTRY_NAME_HEADER = FIELDS_BROWSER_DRAGGABLE_HOST_GEO_COUNTRY_NAME_HEADER;
const FIELDS_BROWSER_FIELDS_COUNT = '[data-test-subj="fields-count"]';
exports.FIELDS_BROWSER_FIELDS_COUNT = FIELDS_BROWSER_FIELDS_COUNT;
const FIELDS_BROWSER_FILTER_INPUT = '[data-test-subj="field-search"]';
exports.FIELDS_BROWSER_FILTER_INPUT = FIELDS_BROWSER_FILTER_INPUT;
const FIELDS_BROWSER_HEADER_DROP_AREA = '[data-test-subj="timeline"] [data-test-subj="headers-group"]';
exports.FIELDS_BROWSER_HEADER_DROP_AREA = FIELDS_BROWSER_HEADER_DROP_AREA;
const FIELDS_BROWSER_HOST_CATEGORIES_COUNT = '[data-test-subj="host-category-count"]';
exports.FIELDS_BROWSER_HOST_CATEGORIES_COUNT = FIELDS_BROWSER_HOST_CATEGORIES_COUNT;
const FIELDS_BROWSER_HOST_GEO_CITY_NAME_CHECKBOX = '[data-test-subj="field-host.geo.city_name-checkbox"]';
exports.FIELDS_BROWSER_HOST_GEO_CITY_NAME_CHECKBOX = FIELDS_BROWSER_HOST_GEO_CITY_NAME_CHECKBOX;
const FIELDS_BROWSER_HOST_GEO_CITY_NAME_HEADER = '[data-test-subj="header-text-host.geo.city_name"]';
exports.FIELDS_BROWSER_HOST_GEO_CITY_NAME_HEADER = FIELDS_BROWSER_HOST_GEO_CITY_NAME_HEADER;
const FIELDS_BROWSER_HOST_GEO_CONTINENT_NAME_CHECKBOX = '[data-test-subj="field-host.geo.continent_name-checkbox"]';
exports.FIELDS_BROWSER_HOST_GEO_CONTINENT_NAME_CHECKBOX = FIELDS_BROWSER_HOST_GEO_CONTINENT_NAME_CHECKBOX;
const FIELDS_BROWSER_HEADER_HOST_GEO_CONTINENT_NAME_HEADER = '[data-test-subj="header-text-host.geo.continent_name"]';
exports.FIELDS_BROWSER_HEADER_HOST_GEO_CONTINENT_NAME_HEADER = FIELDS_BROWSER_HEADER_HOST_GEO_CONTINENT_NAME_HEADER;
const FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_CHECKBOX = '[data-test-subj="field-host.geo.country_name-checkbox"]';
exports.FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_CHECKBOX = FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_CHECKBOX;
const FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_HEADER = '[data-test-subj="header-text-host.geo.country_name"]';
exports.FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_HEADER = FIELDS_BROWSER_HOST_GEO_COUNTRY_NAME_HEADER;
const FIELDS_BROWSER_MESSAGE_CHECKBOX = '[data-test-subj="timeline"] [data-test-subj="field-message-checkbox"]';
exports.FIELDS_BROWSER_MESSAGE_CHECKBOX = FIELDS_BROWSER_MESSAGE_CHECKBOX;
const FIELDS_BROWSER_MESSAGE_HEADER = '[data-test-subj="timeline"] [data-test-subj="header-text-message"]';
exports.FIELDS_BROWSER_MESSAGE_HEADER = FIELDS_BROWSER_MESSAGE_HEADER;
const FIELDS_BROWSER_RESET_FIELDS = '[data-test-subj="timeline"] [data-test-subj="reset-fields"]';
exports.FIELDS_BROWSER_RESET_FIELDS = FIELDS_BROWSER_RESET_FIELDS;
const FIELDS_BROWSER_TITLE = '[data-test-subj="field-browser-title"]';
exports.FIELDS_BROWSER_TITLE = FIELDS_BROWSER_TITLE;
const FIELDS_BROWSER_SELECTED_CATEGORY_COUNT = '[data-test-subj="selected-category-count-badge"]';
exports.FIELDS_BROWSER_SELECTED_CATEGORY_COUNT = FIELDS_BROWSER_SELECTED_CATEGORY_COUNT;
const FIELDS_BROWSER_SELECTED_CATEGORY_TITLE = '[data-test-subj="selected-category-title"]';
exports.FIELDS_BROWSER_SELECTED_CATEGORY_TITLE = FIELDS_BROWSER_SELECTED_CATEGORY_TITLE;
const FIELDS_BROWSER_SYSTEM_CATEGORIES_COUNT = '[data-test-subj="system-category-count"]';
exports.FIELDS_BROWSER_SYSTEM_CATEGORIES_COUNT = FIELDS_BROWSER_SYSTEM_CATEGORIES_COUNT;