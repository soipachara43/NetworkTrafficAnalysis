"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutHeader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fp = require("lodash/fp");

var _store = require("../../../store");

var _default_headers = require("../../timeline/body/column_headers/default_headers");

var _properties = require("../../timeline/properties");

var _app = require("../../../store/app");

var _inputs = require("../../../store/inputs");

var _actions = require("../../../store/actions");

var _defaults = require("../../../store/timeline/defaults");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StatefulFlyoutHeader = _react.default.memo(function (_ref) {
  var associateNote = _ref.associateNote,
      createTimeline = _ref.createTimeline,
      description = _ref.description,
      isFavorite = _ref.isFavorite,
      isDataInTimeline = _ref.isDataInTimeline,
      isDatepickerLocked = _ref.isDatepickerLocked,
      title = _ref.title,
      noteIds = _ref.noteIds,
      notesById = _ref.notesById,
      timelineId = _ref.timelineId,
      toggleLock = _ref.toggleLock,
      updateDescription = _ref.updateDescription,
      updateIsFavorite = _ref.updateIsFavorite,
      updateNote = _ref.updateNote,
      updateTitle = _ref.updateTitle,
      usersViewing = _ref.usersViewing;
  var getNotesByIds = (0, _react.useCallback)(function (noteIdsVar) {
    return _store.appSelectors.getNotes(notesById, noteIdsVar);
  }, [notesById]);
  return _react.default.createElement(_properties.Properties, {
    associateNote: associateNote,
    createTimeline: createTimeline,
    description: description,
    getNotesByIds: getNotesByIds,
    isDataInTimeline: isDataInTimeline,
    isDatepickerLocked: isDatepickerLocked,
    isFavorite: isFavorite,
    title: title,
    noteIds: noteIds,
    timelineId: timelineId,
    toggleLock: toggleLock,
    updateDescription: updateDescription,
    updateIsFavorite: updateIsFavorite,
    updateTitle: updateTitle,
    updateNote: updateNote,
    usersViewing: usersViewing
  });
});

StatefulFlyoutHeader.displayName = 'StatefulFlyoutHeader';
var emptyHistory = []; // stable reference

var emptyNotesId = []; // stable reference

var makeMapStateToProps = function makeMapStateToProps() {
  var getTimeline = _store.timelineSelectors.getTimelineByIdSelector();

  var getNotesByIds = _store.appSelectors.notesByIdsSelector();

  var getGlobalInput = _store.inputsSelectors.globalSelector();

  var mapStateToProps = function mapStateToProps(state, _ref2) {
    var _getTimeline;

    var timelineId = _ref2.timelineId;
    var timeline = (_getTimeline = getTimeline(state, timelineId)) !== null && _getTimeline !== void 0 ? _getTimeline : _defaults.timelineDefaults;
    var globalInput = getGlobalInput(state);
    var dataProviders = timeline.dataProviders,
        _timeline$description = timeline.description,
        description = _timeline$description === void 0 ? '' : _timeline$description,
        _timeline$isFavorite = timeline.isFavorite,
        isFavorite = _timeline$isFavorite === void 0 ? false : _timeline$isFavorite,
        kqlQuery = timeline.kqlQuery,
        _timeline$title = timeline.title,
        title = _timeline$title === void 0 ? '' : _timeline$title,
        _timeline$noteIds = timeline.noteIds,
        noteIds = _timeline$noteIds === void 0 ? emptyNotesId : _timeline$noteIds;
    var history = emptyHistory; // TODO: get history from store via selector

    return {
      description: description,
      notesById: getNotesByIds(state),
      history: history,
      isDataInTimeline: !(0, _fp.isEmpty)(dataProviders) || !(0, _fp.isEmpty)((0, _fp.get)('filterQuery.kuery.expression', kqlQuery)),
      isFavorite: isFavorite,
      isDatepickerLocked: globalInput.linkTo.includes('timeline'),
      noteIds: noteIds,
      title: title
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref3) {
  var timelineId = _ref3.timelineId;
  return {
    associateNote: function associateNote(noteId) {
      return dispatch(_actions.timelineActions.addNote({
        id: timelineId,
        noteId: noteId
      }));
    },
    createTimeline: function createTimeline(_ref4) {
      var id = _ref4.id,
          show = _ref4.show;
      return dispatch(_actions.timelineActions.createTimeline({
        id: id,
        columns: _default_headers.defaultHeaders,
        show: show
      }));
    },
    updateDescription: function updateDescription(_ref5) {
      var id = _ref5.id,
          description = _ref5.description;
      return dispatch(_actions.timelineActions.updateDescription({
        id: id,
        description: description
      }));
    },
    updateIsFavorite: function updateIsFavorite(_ref6) {
      var id = _ref6.id,
          isFavorite = _ref6.isFavorite;
      return dispatch(_actions.timelineActions.updateIsFavorite({
        id: id,
        isFavorite: isFavorite
      }));
    },
    updateIsLive: function updateIsLive(_ref7) {
      var id = _ref7.id,
          isLive = _ref7.isLive;
      return dispatch(_actions.timelineActions.updateIsLive({
        id: id,
        isLive: isLive
      }));
    },
    updateNote: function updateNote(note) {
      return dispatch(_app.appActions.updateNote({
        note: note
      }));
    },
    updateTitle: function updateTitle(_ref8) {
      var id = _ref8.id,
          title = _ref8.title;
      return dispatch(_actions.timelineActions.updateTitle({
        id: id,
        title: title
      }));
    },
    toggleLock: function toggleLock(_ref9) {
      var linkToId = _ref9.linkToId;
      return dispatch(_inputs.inputsActions.toggleTimelineLinkTo({
        linkToId: linkToId
      }));
    }
  };
};

var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var FlyoutHeader = connector(StatefulFlyoutHeader);
exports.FlyoutHeader = FlyoutHeader;