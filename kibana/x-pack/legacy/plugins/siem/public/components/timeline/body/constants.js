"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_TIMELINE_WIDTH = exports.DEFAULT_DATE_COLUMN_MIN_WIDTH = exports.DEFAULT_COLUMN_MIN_WIDTH = exports.SHOW_CHECK_BOXES_COLUMN_WIDTH = exports.EVENTS_VIEWER_ACTIONS_COLUMN_WIDTH = exports.DEFAULT_ACTIONS_COLUMN_WIDTH = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** The (fixed) width of the Actions column */
var DEFAULT_ACTIONS_COLUMN_WIDTH = 115; // px;

/**
 * The (fixed) width of the Actions column when the timeline body is used as
 * an events viewer, which has fewer actions than a regular events viewer
 */

exports.DEFAULT_ACTIONS_COLUMN_WIDTH = DEFAULT_ACTIONS_COLUMN_WIDTH;
var EVENTS_VIEWER_ACTIONS_COLUMN_WIDTH = 32; // px;

/** Additional column width to include when checkboxes are shown **/

exports.EVENTS_VIEWER_ACTIONS_COLUMN_WIDTH = EVENTS_VIEWER_ACTIONS_COLUMN_WIDTH;
var SHOW_CHECK_BOXES_COLUMN_WIDTH = 32; // px;

/** The default minimum width of a column (when a width for the column type is not specified) */

exports.SHOW_CHECK_BOXES_COLUMN_WIDTH = SHOW_CHECK_BOXES_COLUMN_WIDTH;
var DEFAULT_COLUMN_MIN_WIDTH = 180; // px

/** The default minimum width of a column of type `date` */

exports.DEFAULT_COLUMN_MIN_WIDTH = DEFAULT_COLUMN_MIN_WIDTH;
var DEFAULT_DATE_COLUMN_MIN_WIDTH = 190; // px

exports.DEFAULT_DATE_COLUMN_MIN_WIDTH = DEFAULT_DATE_COLUMN_MIN_WIDTH;
var DEFAULT_TIMELINE_WIDTH = 1100; // px

exports.DEFAULT_TIMELINE_WIDTH = DEFAULT_TIMELINE_WIDTH;