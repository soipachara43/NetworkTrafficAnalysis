"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertiesRight = exports.PropertiesRightStyle = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _helpers = require("./helpers");

var _open_timeline_modal_button = require("../../open_timeline/open_timeline_modal/open_timeline_modal_button");

var _open_timeline_modal = require("../../open_timeline/open_timeline_modal");

var _inspect = require("../../inspect");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PropertiesRightStyle = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "PropertiesRightStyle",
  componentId: "sc-1n0aqkw-0"
})(["margin-right:5px;"]);
exports.PropertiesRightStyle = PropertiesRightStyle;
PropertiesRightStyle.displayName = 'PropertiesRightStyle';

var DescriptionPopoverMenuContainer = _styledComponents.default.div.withConfig({
  displayName: "DescriptionPopoverMenuContainer",
  componentId: "sc-1n0aqkw-1"
})(["margin-top:15px;"]);

DescriptionPopoverMenuContainer.displayName = 'DescriptionPopoverMenuContainer';
var SettingsIcon = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "SettingsIcon",
  componentId: "sc-1n0aqkw-2"
})(["margin-left:4px;cursor:pointer;"]);
SettingsIcon.displayName = 'SettingsIcon';
var HiddenFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "HiddenFlexItem",
  componentId: "sc-1n0aqkw-3"
})(["display:none;"]);
HiddenFlexItem.displayName = 'HiddenFlexItem';
var Avatar = (0, _styledComponents.default)(_eui.EuiAvatar).withConfig({
  displayName: "Avatar",
  componentId: "sc-1n0aqkw-4"
})(["margin-left:5px;"]);
Avatar.displayName = 'Avatar';

var PropertiesRightComponent = function PropertiesRightComponent(_ref) {
  var onButtonClick = _ref.onButtonClick,
      showActions = _ref.showActions,
      onClosePopover = _ref.onClosePopover,
      createTimeline = _ref.createTimeline,
      timelineId = _ref.timelineId,
      isDataInTimeline = _ref.isDataInTimeline,
      showNotesFromWidth = _ref.showNotesFromWidth,
      showNotes = _ref.showNotes,
      showDescription = _ref.showDescription,
      showUsersView = _ref.showUsersView,
      usersViewing = _ref.usersViewing,
      description = _ref.description,
      updateDescription = _ref.updateDescription,
      associateNote = _ref.associateNote,
      getNotesByIds = _ref.getNotesByIds,
      noteIds = _ref.noteIds,
      onToggleShowNotes = _ref.onToggleShowNotes,
      updateNote = _ref.updateNote,
      showTimelineModal = _ref.showTimelineModal,
      onCloseTimelineModal = _ref.onCloseTimelineModal,
      onOpenTimelineModal = _ref.onOpenTimelineModal,
      title = _ref.title;
  return _react.default.createElement(PropertiesRightStyle, {
    alignItems: "flexStart",
    "data-test-subj": "properties-right",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_inspect.InspectButtonContainer, null, _react.default.createElement(_eui.EuiPopover, {
    anchorPosition: "downRight",
    button: _react.default.createElement(SettingsIcon, {
      "data-test-subj": "settings-gear",
      type: "gear",
      size: "l",
      onClick: onButtonClick
    }),
    id: "timelineSettingsPopover",
    isOpen: showActions,
    closePopover: onClosePopover
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "flexStart",
    direction: "column",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_helpers.NewTimeline, {
    createTimeline: createTimeline,
    onClosePopover: onClosePopover,
    timelineId: timelineId
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_open_timeline_modal_button.OpenTimelineModalButton, {
    onClick: onOpenTimelineModal
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_helpers.NewCase, {
    onClosePopover: onClosePopover,
    timelineId: timelineId,
    timelineTitle: title
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_inspect.InspectButton, {
    queryId: timelineId,
    inputId: "timeline",
    inspectIndex: 0,
    isDisabled: !isDataInTimeline,
    onCloseInspect: onClosePopover,
    title: i18n.INSPECT_TIMELINE_TITLE
  })), showNotesFromWidth ? _react.default.createElement(_eui.EuiFlexItem, {
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
  })) : null, showDescription ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(DescriptionPopoverMenuContainer, null, _react.default.createElement(_helpers.Description, {
    description: description,
    timelineId: timelineId,
    updateDescription: updateDescription
  }))) : null)))), showUsersView ? usersViewing.map(function (user) {
    return (// Hide the hard-coded elastic user avatar as the 7.2 release does not implement
      // support for multi-user-collaboration as proposed in elastic/ingest-dev#395
      _react.default.createElement(HiddenFlexItem, {
        key: user
      }, _react.default.createElement(_eui.EuiToolTip, {
        "data-test-subj": "timeline-action-pin-tool-tip",
        content: "".concat(user, " ").concat(i18n.IS_VIEWING)
      }, _react.default.createElement(Avatar, {
        "data-test-subj": "avatar",
        size: "s",
        name: user
      })))
    );
  }) : null, showTimelineModal ? _react.default.createElement(_open_timeline_modal.OpenTimelineModal, {
    onClose: onCloseTimelineModal
  }) : null);
};

var PropertiesRight = _react.default.memo(PropertiesRightComponent);

exports.PropertiesRight = PropertiesRight;