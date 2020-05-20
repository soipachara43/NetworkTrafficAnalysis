"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGNAL_CHECKBOX = exports.SIGNAL_ID = exports.SIGNALS = exports.SHOWING_SIGNALS = exports.SEND_SIGNAL_TO_TIMELINE_BTN = exports.SELECTED_SIGNALS = exports.OPENED_SIGNALS_BTN = exports.OPEN_CLOSE_SIGNALS_BTN = exports.OPEN_CLOSE_SIGNAL_BTN = exports.NUMBER_OF_SIGNALS = exports.MANAGE_SIGNAL_DETECTION_RULES_BTN = exports.LOADING_SIGNALS_PANEL = exports.EXPAND_SIGNAL_BTN = exports.CLOSED_SIGNALS_BTN = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CLOSED_SIGNALS_BTN = '[data-test-subj="closedSignals"]';
exports.CLOSED_SIGNALS_BTN = CLOSED_SIGNALS_BTN;
const EXPAND_SIGNAL_BTN = '[data-test-subj="expand-event"]';
exports.EXPAND_SIGNAL_BTN = EXPAND_SIGNAL_BTN;
const LOADING_SIGNALS_PANEL = '[data-test-subj="loading-signals-panel"]';
exports.LOADING_SIGNALS_PANEL = LOADING_SIGNALS_PANEL;
const MANAGE_SIGNAL_DETECTION_RULES_BTN = '[data-test-subj="manage-signal-detection-rules"]';
exports.MANAGE_SIGNAL_DETECTION_RULES_BTN = MANAGE_SIGNAL_DETECTION_RULES_BTN;
const NUMBER_OF_SIGNALS = '[data-test-subj="server-side-event-count"] .euiBadge__text';
exports.NUMBER_OF_SIGNALS = NUMBER_OF_SIGNALS;
const OPEN_CLOSE_SIGNAL_BTN = '[data-test-subj="update-signal-status-button"]';
exports.OPEN_CLOSE_SIGNAL_BTN = OPEN_CLOSE_SIGNAL_BTN;
const OPEN_CLOSE_SIGNALS_BTN = '[data-test-subj="openCloseSignal"] button';
exports.OPEN_CLOSE_SIGNALS_BTN = OPEN_CLOSE_SIGNALS_BTN;
const OPENED_SIGNALS_BTN = '[data-test-subj="openSignals"]';
exports.OPENED_SIGNALS_BTN = OPENED_SIGNALS_BTN;
const SELECTED_SIGNALS = '[data-test-subj="selectedSignals"]';
exports.SELECTED_SIGNALS = SELECTED_SIGNALS;
const SEND_SIGNAL_TO_TIMELINE_BTN = '[data-test-subj="send-signal-to-timeline-button"]';
exports.SEND_SIGNAL_TO_TIMELINE_BTN = SEND_SIGNAL_TO_TIMELINE_BTN;
const SHOWING_SIGNALS = '[data-test-subj="showingSignals"]';
exports.SHOWING_SIGNALS = SHOWING_SIGNALS;
const SIGNALS = '[data-test-subj="event"]';
exports.SIGNALS = SIGNALS;
const SIGNAL_ID = '[data-test-subj="draggable-content-_id"]';
exports.SIGNAL_ID = SIGNAL_ID;
const SIGNAL_CHECKBOX = '[data-test-subj="select-event-container"] .euiCheckbox__input';
exports.SIGNAL_CHECKBOX = SIGNAL_CHECKBOX;