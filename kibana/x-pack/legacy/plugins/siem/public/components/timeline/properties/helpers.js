"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotesButton = exports.NewTimeline = exports.NewCase = exports.Name = exports.Description = exports.StarIcon = exports.newTimelineToolTip = exports.streamLiveToolTip = exports.historyToolTip = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _notes = require("../../notes");

var _notes_size = require("./notes_size");

var _styles = require("./styles");

var i18n = _interopRequireWildcard(require("./translations"));

var _types = require("../../../pages/home/types");

var _timeline = require("../../../store/timeline");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var historyToolTip = 'The chronological history of actions related to this timeline';
exports.historyToolTip = historyToolTip;
var streamLiveToolTip = 'Update the Timeline as new data arrives';
exports.streamLiveToolTip = streamLiveToolTip;
var newTimelineToolTip = 'Create a new timeline';
exports.newTimelineToolTip = newTimelineToolTip;
var NotesCountBadge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "NotesCountBadge",
  componentId: "aog25h-0"
})(["margin-left:5px;"]);
NotesCountBadge.displayName = 'NotesCountBadge';

var StarIcon = _react.default.memo(function (_ref) {
  var isFavorite = _ref.isFavorite,
      id = _ref.timelineId,
      updateIsFavorite = _ref.updateIsFavorite;
  return (// TODO: 1 error is: Visible, non-interactive elements with click handlers must have at least one keyboard listener
    // TODO: 2 error is: Elements with the 'button' interactive role must be focusable
    // TODO: Investigate this error
    // eslint-disable-next-line
    _react.default.createElement("div", {
      role: "button",
      onClick: function onClick() {
        return updateIsFavorite({
          id: id,
          isFavorite: !isFavorite
        });
      }
    }, isFavorite ? _react.default.createElement(_eui.EuiToolTip, {
      "data-test-subj": "timeline-favorite-filled-star-tool-tip",
      content: i18n.FAVORITE
    }, _react.default.createElement(_styles.StyledStar, {
      "data-test-subj": "timeline-favorite-filled-star",
      type: "starFilled",
      size: "l"
    })) : _react.default.createElement(_eui.EuiToolTip, {
      content: i18n.NOT_A_FAVORITE
    }, _react.default.createElement(_styles.StyledStar, {
      "data-test-subj": "timeline-favorite-empty-star",
      type: "starEmpty",
      size: "l"
    })))
  );
});

exports.StarIcon = StarIcon;
StarIcon.displayName = 'StarIcon';

var Description = _react.default.memo(function (_ref2) {
  var description = _ref2.description,
      timelineId = _ref2.timelineId,
      updateDescription = _ref2.updateDescription;
  return _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "timeline-description-tool-tip",
    content: i18n.DESCRIPTION_TOOL_TIP
  }, _react.default.createElement(_styles.DescriptionContainer, {
    "data-test-subj": "description-container"
  }, _react.default.createElement(_eui.EuiFieldText, {
    "aria-label": i18n.TIMELINE_DESCRIPTION,
    "data-test-subj": "timeline-description",
    fullWidth: true,
    onChange: function onChange(e) {
      return updateDescription({
        id: timelineId,
        description: e.target.value
      });
    },
    placeholder: i18n.DESCRIPTION,
    spellCheck: true,
    value: description
  })));
});

exports.Description = Description;
Description.displayName = 'Description';

var Name = _react.default.memo(function (_ref3) {
  var timelineId = _ref3.timelineId,
      title = _ref3.title,
      updateTitle = _ref3.updateTitle;
  return _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "timeline-title-tool-tip",
    content: i18n.TITLE
  }, _react.default.createElement(_styles.NameField, {
    "aria-label": i18n.TIMELINE_TITLE,
    "data-test-subj": "timeline-title",
    onChange: function onChange(e) {
      return updateTitle({
        id: timelineId,
        title: e.target.value
      });
    },
    placeholder: i18n.UNTITLED_TIMELINE,
    spellCheck: true,
    value: title
  }));
});

exports.Name = Name;
Name.displayName = 'Name';

var NewCase = _react.default.memo(function (_ref4) {
  var onClosePopover = _ref4.onClosePopover,
      timelineId = _ref4.timelineId,
      timelineTitle = _ref4.timelineTitle;
  var history = (0, _reactRouterDom.useHistory)();

  var _useSelector = (0, _reactRedux.useSelector)(function (state) {
    return _timeline.timelineSelectors.selectTimeline(state, timelineId);
  }),
      savedObjectId = _useSelector.savedObjectId;

  var handleClick = (0, _react.useCallback)(function () {
    onClosePopover();
    history.push({
      pathname: "/".concat(_types.SiemPageName.case, "/create"),
      state: {
        insertTimeline: {
          timelineId: timelineId,
          timelineSavedObjectId: savedObjectId,
          timelineTitle: timelineTitle.length > 0 ? timelineTitle : i18n.UNTITLED_TIMELINE
        }
      }
    });
  }, [onClosePopover, history, timelineId, timelineTitle]);
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "attach-timeline-case",
    color: "text",
    iconSide: "left",
    iconType: "paperClip",
    onClick: handleClick
  }, i18n.ATTACH_TIMELINE_TO_NEW_CASE);
});

exports.NewCase = NewCase;
NewCase.displayName = 'NewCase';

var NewTimeline = _react.default.memo(function (_ref5) {
  var createTimeline = _ref5.createTimeline,
      onClosePopover = _ref5.onClosePopover,
      timelineId = _ref5.timelineId;
  var handleClick = (0, _react.useCallback)(function () {
    createTimeline({
      id: timelineId,
      show: true
    });
    onClosePopover();
  }, [createTimeline, timelineId, onClosePopover]);
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "timeline-new",
    color: "text",
    iconSide: "left",
    iconType: "plusInCircle",
    onClick: handleClick
  }, i18n.NEW_TIMELINE);
});

exports.NewTimeline = NewTimeline;
NewTimeline.displayName = 'NewTimeline';

var getNewNoteId = function getNewNoteId() {
  return _uuid.default.v4();
};

var LargeNotesButton = _react.default.memo(function (_ref6) {
  var noteIds = _ref6.noteIds,
      text = _ref6.text,
      toggleShowNotes = _ref6.toggleShowNotes;
  return _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "timeline-notes-button-large",
    onClick: function onClick() {
      return toggleShowNotes();
    },
    size: "m"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none",
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    color: "subdued",
    size: "m",
    type: "editorComment"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, text && text.length ? _react.default.createElement(_styles.LabelText, null, text) : null), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(NotesCountBadge, {
    "data-test-subj": "timeline-notes-count",
    color: "hollow"
  }, noteIds.length))));
});

LargeNotesButton.displayName = 'LargeNotesButton';

var SmallNotesButton = _react.default.memo(function (_ref7) {
  var noteIds = _ref7.noteIds,
      toggleShowNotes = _ref7.toggleShowNotes;
  return _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": i18n.NOTES,
    "data-test-subj": "timeline-notes-button-small",
    iconType: "editorComment",
    onClick: function onClick() {
      return toggleShowNotes();
    }
  });
});

SmallNotesButton.displayName = 'SmallNotesButton';
/**
 * The internal implementation of the `NotesButton`
 */

var NotesButtonComponent = _react.default.memo(function (_ref8) {
  var _ref8$animate = _ref8.animate,
      animate = _ref8$animate === void 0 ? true : _ref8$animate,
      associateNote = _ref8.associateNote,
      getNotesByIds = _ref8.getNotesByIds,
      noteIds = _ref8.noteIds,
      showNotes = _ref8.showNotes,
      size = _ref8.size,
      toggleShowNotes = _ref8.toggleShowNotes,
      text = _ref8.text,
      updateNote = _ref8.updateNote;
  return _react.default.createElement(_styles.ButtonContainer, {
    animate: animate,
    "data-test-subj": "timeline-notes-button-container"
  }, _react.default.createElement(_react.default.Fragment, null, size === 'l' ? _react.default.createElement(LargeNotesButton, {
    noteIds: noteIds,
    text: text,
    toggleShowNotes: toggleShowNotes
  }) : _react.default.createElement(SmallNotesButton, {
    noteIds: noteIds,
    toggleShowNotes: toggleShowNotes
  }), size === 'l' && showNotes ? _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    maxWidth: _notes_size.NOTES_PANEL_WIDTH,
    onClose: toggleShowNotes
  }, _react.default.createElement(_notes.Notes, {
    associateNote: associateNote,
    getNotesByIds: getNotesByIds,
    noteIds: noteIds,
    getNewNoteId: getNewNoteId,
    updateNote: updateNote
  }))) : null));
});

NotesButtonComponent.displayName = 'NotesButtonComponent';

var NotesButton = _react.default.memo(function (_ref9) {
  var _ref9$animate = _ref9.animate,
      animate = _ref9$animate === void 0 ? true : _ref9$animate,
      associateNote = _ref9.associateNote,
      getNotesByIds = _ref9.getNotesByIds,
      noteIds = _ref9.noteIds,
      showNotes = _ref9.showNotes,
      size = _ref9.size,
      toggleShowNotes = _ref9.toggleShowNotes,
      toolTip = _ref9.toolTip,
      text = _ref9.text,
      updateNote = _ref9.updateNote;
  return showNotes ? _react.default.createElement(NotesButtonComponent, {
    animate: animate,
    associateNote: associateNote,
    getNotesByIds: getNotesByIds,
    noteIds: noteIds,
    showNotes: showNotes,
    size: size,
    toggleShowNotes: toggleShowNotes,
    text: text,
    updateNote: updateNote
  }) : _react.default.createElement(_eui.EuiToolTip, {
    content: toolTip || '',
    "data-test-subj": "timeline-notes-tool-tip"
  }, _react.default.createElement(NotesButtonComponent, {
    animate: animate,
    associateNote: associateNote,
    getNotesByIds: getNotesByIds,
    noteIds: noteIds,
    showNotes: showNotes,
    size: size,
    toggleShowNotes: toggleShowNotes,
    text: text,
    updateNote: updateNote
  }));
});

exports.NotesButton = NotesButton;
NotesButton.displayName = 'NotesButton';