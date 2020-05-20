"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IMPORT_FAILED_DETAILED = exports.IMPORT_TIMELINE = exports.IMPORT_FAILED = exports.SUCCESSFULLY_IMPORTED_TIMELINES = exports.OVERWRITE_WITH_SAME_NAME = exports.INITIAL_PROMPT_TEXT = exports.SELECT_TIMELINE = exports.IMPORT_TIMELINE_BTN_TITLE = exports.SUCCESSFULLY_EXPORTED_TIMELINES = exports.SHOWING = exports.SELECTED_TIMELINES = exports.ZERO_TIMELINES_MATCH = exports.WITH = exports.UNTITLED_TIMELINE = exports.TIMELINE_NAME = exports.SEARCH_PLACEHOLDER = exports.REFRESH = exports.POSTED = exports.PINNED_EVENTS = exports.OPEN_TIMELINE_TITLE = exports.OPEN_TIMELINE = exports.OPEN_AS_DUPLICATE = exports.ONLY_FAVORITES = exports.NOTES = exports.MODIFIED_BY = exports.MISSING_SAVED_OBJECT_ID = exports.LAST_MODIFIED = exports.FAVORITES = exports.FAVORITE_SELECTED = exports.EXPORT_SELECTED = exports.EXPORT_FILENAME = exports.EXPAND = exports.DESCRIPTION = exports.DELETE_WARNING = exports.DELETE_SELECTED = exports.DELETE = exports.COLLAPSE = exports.CANCEL = exports.BATCH_ACTIONS = exports.ALL_ACTIONS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ALL_ACTIONS = _i18n.i18n.translate('xpack.siem.open.timeline.allActionsTooltip', {
  defaultMessage: 'All actions'
});

exports.ALL_ACTIONS = ALL_ACTIONS;

var BATCH_ACTIONS = _i18n.i18n.translate('xpack.siem.open.timeline.batchActionsTitle', {
  defaultMessage: 'Bulk actions'
});

exports.BATCH_ACTIONS = BATCH_ACTIONS;

var CANCEL = _i18n.i18n.translate('xpack.siem.open.timeline.cancelButton', {
  defaultMessage: 'Cancel'
});

exports.CANCEL = CANCEL;

var COLLAPSE = _i18n.i18n.translate('xpack.siem.open.timeline.collapseButton', {
  defaultMessage: 'Collapse'
});

exports.COLLAPSE = COLLAPSE;

var DELETE = _i18n.i18n.translate('xpack.siem.open.timeline.deleteButton', {
  defaultMessage: 'Delete'
});

exports.DELETE = DELETE;

var DELETE_SELECTED = _i18n.i18n.translate('xpack.siem.open.timeline.deleteSelectedButton', {
  defaultMessage: 'Delete selected'
});

exports.DELETE_SELECTED = DELETE_SELECTED;

var DELETE_WARNING = _i18n.i18n.translate('xpack.siem.open.timeline.deleteWarningLabel', {
  defaultMessage: 'You will not be able to recover this timeline or its notes once deleted.'
});

exports.DELETE_WARNING = DELETE_WARNING;

var DESCRIPTION = _i18n.i18n.translate('xpack.siem.open.timeline.descriptionTableHeader', {
  defaultMessage: 'Description'
});

exports.DESCRIPTION = DESCRIPTION;

var EXPAND = _i18n.i18n.translate('xpack.siem.open.timeline.expandButton', {
  defaultMessage: 'Expand'
});

exports.EXPAND = EXPAND;

var EXPORT_FILENAME = _i18n.i18n.translate('xpack.siem.open.timeline.exportFileNameTitle', {
  defaultMessage: 'timelines_export'
});

exports.EXPORT_FILENAME = EXPORT_FILENAME;

var EXPORT_SELECTED = _i18n.i18n.translate('xpack.siem.open.timeline.exportSelectedButton', {
  defaultMessage: 'Export selected'
});

exports.EXPORT_SELECTED = EXPORT_SELECTED;

var FAVORITE_SELECTED = _i18n.i18n.translate('xpack.siem.open.timeline.favoriteSelectedButton', {
  defaultMessage: 'Favorite selected'
});

exports.FAVORITE_SELECTED = FAVORITE_SELECTED;

var FAVORITES = _i18n.i18n.translate('xpack.siem.open.timeline.favoritesTooltip', {
  defaultMessage: 'Favorites'
});

exports.FAVORITES = FAVORITES;

var LAST_MODIFIED = _i18n.i18n.translate('xpack.siem.open.timeline.lastModifiedTableHeader', {
  defaultMessage: 'Last modified'
});

exports.LAST_MODIFIED = LAST_MODIFIED;

var MISSING_SAVED_OBJECT_ID = _i18n.i18n.translate('xpack.siem.open.timeline.missingSavedObjectIdTooltip', {
  defaultMessage: 'Missing savedObjectId'
});

exports.MISSING_SAVED_OBJECT_ID = MISSING_SAVED_OBJECT_ID;

var MODIFIED_BY = _i18n.i18n.translate('xpack.siem.open.timeline.modifiedByTableHeader', {
  defaultMessage: 'Modified by'
});

exports.MODIFIED_BY = MODIFIED_BY;

var NOTES = _i18n.i18n.translate('xpack.siem.open.timeline.notesTooltip', {
  defaultMessage: 'Notes'
});

exports.NOTES = NOTES;

var ONLY_FAVORITES = _i18n.i18n.translate('xpack.siem.open.timeline.onlyFavoritesButtonLabel', {
  defaultMessage: 'Only favorites'
});

exports.ONLY_FAVORITES = ONLY_FAVORITES;

var OPEN_AS_DUPLICATE = _i18n.i18n.translate('xpack.siem.open.timeline.openAsDuplicateTooltip', {
  defaultMessage: 'Duplicate timeline'
});

exports.OPEN_AS_DUPLICATE = OPEN_AS_DUPLICATE;

var OPEN_TIMELINE = _i18n.i18n.translate('xpack.siem.open.timeline.openTimelineButton', {
  defaultMessage: 'Open Timeline…'
});

exports.OPEN_TIMELINE = OPEN_TIMELINE;

var OPEN_TIMELINE_TITLE = _i18n.i18n.translate('xpack.siem.open.timeline.openTimelineTitle', {
  defaultMessage: 'Open Timeline'
});

exports.OPEN_TIMELINE_TITLE = OPEN_TIMELINE_TITLE;

var PINNED_EVENTS = _i18n.i18n.translate('xpack.siem.open.timeline.pinnedEventsTooltip', {
  defaultMessage: 'Pinned events'
});

exports.PINNED_EVENTS = PINNED_EVENTS;

var POSTED = _i18n.i18n.translate('xpack.siem.open.timeline.postedLabel', {
  defaultMessage: 'Posted:'
});

exports.POSTED = POSTED;

var REFRESH = _i18n.i18n.translate('xpack.siem.open.timeline.refreshTitle', {
  defaultMessage: 'Refresh'
});

exports.REFRESH = REFRESH;

var SEARCH_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.open.timeline.searchPlaceholder', {
  defaultMessage: 'e.g. timeline name, or description'
});

exports.SEARCH_PLACEHOLDER = SEARCH_PLACEHOLDER;

var TIMELINE_NAME = _i18n.i18n.translate('xpack.siem.open.timeline.timelineNameTableHeader', {
  defaultMessage: 'Timeline name'
});

exports.TIMELINE_NAME = TIMELINE_NAME;

var UNTITLED_TIMELINE = _i18n.i18n.translate('xpack.siem.open.timeline.untitledTimelineLabel', {
  defaultMessage: 'Untitled timeline'
});

exports.UNTITLED_TIMELINE = UNTITLED_TIMELINE;

var WITH = _i18n.i18n.translate('xpack.siem.open.timeline.withLabel', {
  defaultMessage: 'with'
});

exports.WITH = WITH;

var ZERO_TIMELINES_MATCH = _i18n.i18n.translate('xpack.siem.open.timeline.zeroTimelinesMatchLabel', {
  defaultMessage: '0 timelines match the search criteria'
});

exports.ZERO_TIMELINES_MATCH = ZERO_TIMELINES_MATCH;

var SELECTED_TIMELINES = function SELECTED_TIMELINES(selectedTimelines) {
  return _i18n.i18n.translate('xpack.siem.open.timeline.selectedTimelinesTitle', {
    values: {
      selectedTimelines: selectedTimelines
    },
    defaultMessage: 'Selected {selectedTimelines} {selectedTimelines, plural, =1 {timeline} other {timelines}}'
  });
};

exports.SELECTED_TIMELINES = SELECTED_TIMELINES;

var SHOWING = _i18n.i18n.translate('xpack.siem.open.timeline.showingLabel', {
  defaultMessage: 'Showing:'
});

exports.SHOWING = SHOWING;

var SUCCESSFULLY_EXPORTED_TIMELINES = function SUCCESSFULLY_EXPORTED_TIMELINES(totalTimelines) {
  return _i18n.i18n.translate('xpack.siem.open.timeline.successfullyExportedTimelinesTitle', {
    values: {
      totalTimelines: totalTimelines
    },
    defaultMessage: 'Successfully exported {totalTimelines, plural, =0 {all timelines} =1 {{totalTimelines} timeline} other {{totalTimelines} timelines}}'
  });
};

exports.SUCCESSFULLY_EXPORTED_TIMELINES = SUCCESSFULLY_EXPORTED_TIMELINES;

var IMPORT_TIMELINE_BTN_TITLE = _i18n.i18n.translate('xpack.siem.timelines.components.importTimelineModal.importTimelineTitle', {
  defaultMessage: 'Import timeline'
});

exports.IMPORT_TIMELINE_BTN_TITLE = IMPORT_TIMELINE_BTN_TITLE;

var SELECT_TIMELINE = _i18n.i18n.translate('xpack.siem.timelines.components.importTimelineModal.selectTimelineDescription', {
  defaultMessage: 'Select a SIEM timeline (as exported from the Timeline view) to import'
});

exports.SELECT_TIMELINE = SELECT_TIMELINE;

var INITIAL_PROMPT_TEXT = _i18n.i18n.translate('xpack.siem.timelines.components.importTimelineModal.initialPromptTextDescription', {
  defaultMessage: 'Select or drag and drop a valid timelines_export.ndjson file'
});

exports.INITIAL_PROMPT_TEXT = INITIAL_PROMPT_TEXT;

var OVERWRITE_WITH_SAME_NAME = _i18n.i18n.translate('xpack.siem.timelines.components.importTimelineModal.overwriteDescription', {
  defaultMessage: 'Automatically overwrite saved objects with the same timeline ID'
});

exports.OVERWRITE_WITH_SAME_NAME = OVERWRITE_WITH_SAME_NAME;

var SUCCESSFULLY_IMPORTED_TIMELINES = function SUCCESSFULLY_IMPORTED_TIMELINES(totalCount) {
  return _i18n.i18n.translate('xpack.siem.timelines.components.importTimelineModal.successfullyImportedTimelinesTitle', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: 'Successfully imported {totalCount} {totalCount, plural, =1 {timeline} other {timelines}}'
  });
};

exports.SUCCESSFULLY_IMPORTED_TIMELINES = SUCCESSFULLY_IMPORTED_TIMELINES;

var IMPORT_FAILED = _i18n.i18n.translate('xpack.siem.timelines.components.importTimelineModal.importFailedTitle', {
  defaultMessage: 'Failed to import timelines'
});

exports.IMPORT_FAILED = IMPORT_FAILED;

var IMPORT_TIMELINE = _i18n.i18n.translate('xpack.siem.timelines.components.importTimelineModal.importTitle', {
  defaultMessage: 'Import timeline…'
});

exports.IMPORT_TIMELINE = IMPORT_TIMELINE;

var IMPORT_FAILED_DETAILED = function IMPORT_FAILED_DETAILED(id, statusCode, message) {
  return _i18n.i18n.translate('xpack.siem.timelines.components.importTimelineModal.importFailedDetailedTitle', {
    values: {
      id: id,
      statusCode: statusCode,
      message: message
    },
    defaultMessage: 'Timeline ID: {id}\n Status Code: {statusCode}\n Message: {message}'
  });
};

exports.IMPORT_FAILED_DETAILED = IMPORT_FAILED_DETAILED;