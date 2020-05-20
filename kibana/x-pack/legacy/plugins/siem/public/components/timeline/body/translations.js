"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLLAPSE = exports.EXPAND = exports.PINNED_WITH_NOTES = exports.PINNED = exports.UNPINNED = exports.COPY_TO_CLIPBOARD = exports.NOTES_TOOLTIP = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NOTES_TOOLTIP = _i18n.i18n.translate('xpack.siem.timeline.body.notes.addOrViewNotesForThisEventTooltip', {
  defaultMessage: 'Add or view notes for this event'
});

exports.NOTES_TOOLTIP = NOTES_TOOLTIP;

var COPY_TO_CLIPBOARD = _i18n.i18n.translate('xpack.siem.timeline.body.copyToClipboardButtonLabel', {
  defaultMessage: 'Copy to Clipboard'
});

exports.COPY_TO_CLIPBOARD = COPY_TO_CLIPBOARD;

var UNPINNED = _i18n.i18n.translate('xpack.siem.timeline.body.pinning.unpinnedTooltip', {
  defaultMessage: 'Unpinned event'
});

exports.UNPINNED = UNPINNED;

var PINNED = _i18n.i18n.translate('xpack.siem.timeline.body.pinning.pinnedTooltip', {
  defaultMessage: 'Pinned event'
});

exports.PINNED = PINNED;

var PINNED_WITH_NOTES = _i18n.i18n.translate('xpack.siem.timeline.body.pinning.pinnnedWithNotesTooltip', {
  defaultMessage: 'This event cannot be unpinned because it has notes'
});

exports.PINNED_WITH_NOTES = PINNED_WITH_NOTES;

var EXPAND = _i18n.i18n.translate('xpack.siem.timeline.body.actions.expandAriaLabel', {
  defaultMessage: 'Expand'
});

exports.EXPAND = EXPAND;

var COLLAPSE = _i18n.i18n.translate('xpack.siem.timeline.body.actions.collapseAriaLabel', {
  defaultMessage: 'Collapse'
});

exports.COLLAPSE = COLLAPSE;