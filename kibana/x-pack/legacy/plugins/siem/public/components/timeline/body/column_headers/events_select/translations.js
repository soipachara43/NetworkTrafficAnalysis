"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNPIN_SELECTED = exports.SELECT_UNPINNED = exports.SELECT_PINNED = exports.SELECT_NONE = exports.SELECT_ALL = exports.PIN_SELECTED = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PIN_SELECTED = _i18n.i18n.translate('xpack.siem.timeline.eventsSelect.actions.pinSelected', {
  defaultMessage: 'Pin selected'
});

exports.PIN_SELECTED = PIN_SELECTED;

var SELECT_ALL = _i18n.i18n.translate('xpack.siem.timeline.eventsSelect.actions.selectAll', {
  defaultMessage: 'All'
});

exports.SELECT_ALL = SELECT_ALL;

var SELECT_NONE = _i18n.i18n.translate('xpack.siem.timeline.eventsSelect.actions.selectNone', {
  defaultMessage: 'None'
});

exports.SELECT_NONE = SELECT_NONE;

var SELECT_PINNED = _i18n.i18n.translate('xpack.siem.timeline.eventsSelect.actions.selectPinned', {
  defaultMessage: 'Pinned'
});

exports.SELECT_PINNED = SELECT_PINNED;

var SELECT_UNPINNED = _i18n.i18n.translate('xpack.siem.timeline.eventsSelect.actions.selectUnpinned', {
  defaultMessage: 'Unpinned'
});

exports.SELECT_UNPINNED = SELECT_UNPINNED;

var UNPIN_SELECTED = _i18n.i18n.translate('xpack.siem.timeline.eventsSelect.actions.unpinSelected', {
  defaultMessage: 'Unpin selected'
});

exports.UNPIN_SELECTED = UNPIN_SELECTED;