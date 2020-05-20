"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertiesLeft = exports.DatePicker = exports.LockIconContainer = exports.PropertiesLeftStyle = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("./helpers");

var _super_date_picker = require("../../super_date_picker");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PropertiesLeftStyle = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "PropertiesLeftStyle",
  componentId: "sc-14zwx7n-0"
})(["width:100%;"]);
exports.PropertiesLeftStyle = PropertiesLeftStyle;
PropertiesLeftStyle.displayName = 'PropertiesLeftStyle';
var LockIconContainer = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "LockIconContainer",
  componentId: "sc-14zwx7n-1"
})(["margin-right:2px;"]);
exports.LockIconContainer = LockIconContainer;
LockIconContainer.displayName = 'LockIconContainer';
var DatePicker = (0, _styledComponents.default)(_eui.EuiFlexItem).attrs(function (_ref) {
  var width = _ref.width;
  return {
    style: {
      width: "".concat(width, "px")
    }
  };
}).withConfig({
  displayName: "DatePicker",
  componentId: "sc-14zwx7n-2"
})([".euiSuperDatePicker__flexWrapper{max-width:none;width:auto;}"]);
exports.DatePicker = DatePicker;
DatePicker.displayName = 'DatePicker';

var PropertiesLeft = _react.default.memo(function (_ref2) {
  var isFavorite = _ref2.isFavorite,
      timelineId = _ref2.timelineId,
      updateIsFavorite = _ref2.updateIsFavorite,
      showDescription = _ref2.showDescription,
      description = _ref2.description,
      title = _ref2.title,
      updateTitle = _ref2.updateTitle,
      updateDescription = _ref2.updateDescription,
      showNotes = _ref2.showNotes,
      showNotesFromWidth = _ref2.showNotesFromWidth,
      associateNote = _ref2.associateNote,
      getNotesByIds = _ref2.getNotesByIds,
      noteIds = _ref2.noteIds,
      onToggleShowNotes = _ref2.onToggleShowNotes,
      updateNote = _ref2.updateNote,
      isDatepickerLocked = _ref2.isDatepickerLocked,
      toggleLock = _ref2.toggleLock,
      datePickerWidth = _ref2.datePickerWidth;
  return _react.default.createElement(PropertiesLeftStyle, {
    alignItems: "center",
    "data-test-subj": "properties-left",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_helpers.StarIcon, {
    isFavorite: isFavorite,
    timelineId: timelineId,
    updateIsFavorite: updateIsFavorite
  })), _react.default.createElement(_helpers.Name, {
    timelineId: timelineId,
    title: title,
    updateTitle: updateTitle
  }), showDescription ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_helpers.Description, {
    description: description,
    timelineId: timelineId,
    updateDescription: updateDescription
  })) : null, showNotesFromWidth ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_helpers.NotesButton, {
    animate: true,
    associateNote: associateNote,
    getNotesByIds: getNotesByIds,
    noteIds: noteIds,
    showNotes: showNotes,
    size: "l",
    text: i18n.NOTES,
    toggleShowNotes: onToggleShowNotes,
    toolTip: i18n.NOTES_TOOL_TIP,
    updateNote: updateNote
  })) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none",
    "data-test-subj": "timeline-date-picker-container"
  }, _react.default.createElement(LockIconContainer, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "timeline-date-picker-lock-tooltip",
    position: "top",
    content: isDatepickerLocked ? i18n.LOCK_SYNC_MAIN_DATE_PICKER_TOOL_TIP : i18n.UNLOCK_SYNC_MAIN_DATE_PICKER_TOOL_TIP
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "data-test-subj": "timeline-date-picker-".concat(isDatepickerLocked ? 'lock' : 'unlock', "-button"),
    color: "primary",
    onClick: toggleLock,
    iconType: isDatepickerLocked ? 'lock' : 'lockOpen',
    "aria-label": isDatepickerLocked ? i18n.UNLOCK_SYNC_MAIN_DATE_PICKER_ARIA : i18n.LOCK_SYNC_MAIN_DATE_PICKER_ARIA
  }))), _react.default.createElement(DatePicker, {
    grow: 1,
    width: datePickerWidth
  }, _react.default.createElement(_super_date_picker.SuperDatePicker, {
    id: "timeline",
    timelineId: timelineId
  })))));
});

exports.PropertiesLeft = PropertiesLeft;
PropertiesLeft.displayName = 'PropertiesLeft';