"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Actions = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _pin = require("../../../pin");

var _helpers = require("../../properties/helpers");

var _styles = require("../../styles");

var _helpers2 = require("../helpers");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var emptyNotes = [];

var Actions = _react.default.memo(function (_ref) {
  var actionsColumnWidth = _ref.actionsColumnWidth,
      additionalActions = _ref.additionalActions,
      associateNote = _ref.associateNote,
      checked = _ref.checked,
      expanded = _ref.expanded,
      eventId = _ref.eventId,
      eventIsPinned = _ref.eventIsPinned,
      getNotesByIds = _ref.getNotesByIds,
      _ref$isEventViewer = _ref.isEventViewer,
      isEventViewer = _ref$isEventViewer === void 0 ? false : _ref$isEventViewer,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      loadingEventIds = _ref.loadingEventIds,
      noteIds = _ref.noteIds,
      onEventToggled = _ref.onEventToggled,
      onPinClicked = _ref.onPinClicked,
      onRowSelected = _ref.onRowSelected,
      showCheckboxes = _ref.showCheckboxes,
      showNotes = _ref.showNotes,
      toggleShowNotes = _ref.toggleShowNotes,
      updateNote = _ref.updateNote;
  return _react.default.createElement(_styles.EventsTdGroupActions, {
    actionsColumnWidth: actionsColumnWidth,
    "data-test-subj": "event-actions-container"
  }, showCheckboxes && _react.default.createElement(_styles.EventsTd, {
    "data-test-subj": "select-event-container"
  }, _react.default.createElement(_styles.EventsTdContent, {
    textAlign: "center"
  }, loadingEventIds.includes(eventId) ? _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m",
    "data-test-subj": "event-loader"
  }) : _react.default.createElement(_eui.EuiCheckbox, {
    "data-test-subj": "select-event",
    id: eventId,
    checked: checked,
    onChange: function onChange(event) {
      onRowSelected({
        eventIds: [eventId],
        isSelected: event.currentTarget.checked
      });
    }
  }))), _react.default.createElement(_react.default.Fragment, null, additionalActions), _react.default.createElement(_styles.EventsTd, null, _react.default.createElement(_styles.EventsTdContent, {
    textAlign: "center"
  }, loading && _react.default.createElement(_styles.EventsLoading, null), !loading && _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": expanded ? i18n.COLLAPSE : i18n.EXPAND,
    "data-test-subj": "expand-event",
    iconType: expanded ? 'arrowDown' : 'arrowRight',
    id: eventId,
    onClick: onEventToggled
  }))), !isEventViewer && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_styles.EventsTd, null, _react.default.createElement(_styles.EventsTdContent, {
    textAlign: "center"
  }, _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "timeline-action-pin-tool-tip",
    content: (0, _helpers2.getPinTooltip)({
      isPinned: eventIsPinned,
      eventHasNotes: (0, _helpers2.eventHasNotes)(noteIds)
    })
  }, _react.default.createElement(_pin.Pin, {
    allowUnpinning: !(0, _helpers2.eventHasNotes)(noteIds),
    "data-test-subj": "pin-event",
    onClick: onPinClicked,
    pinned: eventIsPinned
  })))), _react.default.createElement(_styles.EventsTd, null, _react.default.createElement(_styles.EventsTdContent, {
    textAlign: "center"
  }, _react.default.createElement(_helpers.NotesButton, {
    animate: false,
    associateNote: associateNote,
    "data-test-subj": "add-note",
    getNotesByIds: getNotesByIds,
    noteIds: noteIds || emptyNotes,
    showNotes: showNotes,
    size: "s",
    toggleShowNotes: toggleShowNotes,
    toolTip: i18n.NOTES_TOOLTIP,
    updateNote: updateNote
  })))));
}, function (nextProps, prevProps) {
  return prevProps.actionsColumnWidth === nextProps.actionsColumnWidth && prevProps.checked === nextProps.checked && prevProps.expanded === nextProps.expanded && prevProps.eventId === nextProps.eventId && prevProps.eventIsPinned === nextProps.eventIsPinned && prevProps.loading === nextProps.loading && prevProps.loadingEventIds === nextProps.loadingEventIds && prevProps.noteIds === nextProps.noteIds && prevProps.onRowSelected === nextProps.onRowSelected && prevProps.showCheckboxes === nextProps.showCheckboxes && prevProps.showNotes === nextProps.showNotes;
});

exports.Actions = Actions;
Actions.displayName = 'Actions';