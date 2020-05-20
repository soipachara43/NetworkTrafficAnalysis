"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Properties = exports.showDescriptionThreshold = exports.showNotesThreshold = exports.datePickerThreshold = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../../utils");

var _styles = require("./styles");

var _properties_right = require("./properties_right");

var _properties_left = require("./properties_left");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var rightGutter = 60; // px

var datePickerThreshold = 600;
exports.datePickerThreshold = datePickerThreshold;
var showNotesThreshold = 810;
exports.showNotesThreshold = showNotesThreshold;
var showDescriptionThreshold = 970;
exports.showDescriptionThreshold = showDescriptionThreshold;
var starIconWidth = 30;
var nameWidth = 155;
var descriptionWidth = 165;
var noteWidth = 130;
var settingsWidth = 55;
/** Displays the properties of a timeline, i.e. name, description, notes, etc */

var Properties = _react.default.memo(function (_ref) {
  var associateNote = _ref.associateNote,
      createTimeline = _ref.createTimeline,
      description = _ref.description,
      getNotesByIds = _ref.getNotesByIds,
      isDataInTimeline = _ref.isDataInTimeline,
      isDatepickerLocked = _ref.isDatepickerLocked,
      isFavorite = _ref.isFavorite,
      noteIds = _ref.noteIds,
      timelineId = _ref.timelineId,
      title = _ref.title,
      toggleLock = _ref.toggleLock,
      updateDescription = _ref.updateDescription,
      updateIsFavorite = _ref.updateIsFavorite,
      updateNote = _ref.updateNote,
      updateTitle = _ref.updateTitle,
      usersViewing = _ref.usersViewing;

  var _useThrottledResizeOb = (0, _utils.useThrottledResizeObserver)(300),
      ref = _useThrottledResizeOb.ref,
      _useThrottledResizeOb2 = _useThrottledResizeOb.width,
      width = _useThrottledResizeOb2 === void 0 ? 0 : _useThrottledResizeOb2;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showActions = _useState2[0],
      setShowActions = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showNotes = _useState4[0],
      setShowNotes = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showTimelineModal = _useState6[0],
      setShowTimelineModal = _useState6[1];

  var onButtonClick = (0, _react.useCallback)(function () {
    return setShowActions(!showActions);
  }, [showActions]);
  var onToggleShowNotes = (0, _react.useCallback)(function () {
    return setShowNotes(!showNotes);
  }, [showNotes]);
  var onClosePopover = (0, _react.useCallback)(function () {
    return setShowActions(false);
  }, []);
  var onCloseTimelineModal = (0, _react.useCallback)(function () {
    return setShowTimelineModal(false);
  }, []);
  var onToggleLock = (0, _react.useCallback)(function () {
    return toggleLock({
      linkToId: 'timeline'
    });
  }, [toggleLock]);
  var onOpenTimelineModal = (0, _react.useCallback)(function () {
    onClosePopover();
    setShowTimelineModal(true);
  }, []);
  var datePickerWidth = (0, _react.useMemo)(function () {
    return width - rightGutter - starIconWidth - nameWidth - (width >= showDescriptionThreshold ? descriptionWidth : 0) - noteWidth - settingsWidth;
  }, [width]);
  return _react.default.createElement(_styles.TimelineProperties, {
    ref: ref,
    "data-test-subj": "timeline-properties"
  }, _react.default.createElement(_properties_left.PropertiesLeft, {
    associateNote: associateNote,
    datePickerWidth: datePickerWidth > datePickerThreshold ? datePickerThreshold : datePickerWidth,
    description: description,
    getNotesByIds: getNotesByIds,
    isDatepickerLocked: isDatepickerLocked,
    isFavorite: isFavorite,
    noteIds: noteIds,
    onToggleShowNotes: onToggleShowNotes,
    showDescription: width >= showDescriptionThreshold,
    showNotes: showNotes,
    showNotesFromWidth: width >= showNotesThreshold,
    timelineId: timelineId,
    title: title,
    toggleLock: onToggleLock,
    updateDescription: updateDescription,
    updateIsFavorite: updateIsFavorite,
    updateNote: updateNote,
    updateTitle: updateTitle
  }), _react.default.createElement(_properties_right.PropertiesRight, {
    associateNote: associateNote,
    createTimeline: createTimeline,
    description: description,
    getNotesByIds: getNotesByIds,
    isDataInTimeline: isDataInTimeline,
    noteIds: noteIds,
    onButtonClick: onButtonClick,
    onClosePopover: onClosePopover,
    onCloseTimelineModal: onCloseTimelineModal,
    onOpenTimelineModal: onOpenTimelineModal,
    onToggleShowNotes: onToggleShowNotes,
    showActions: showActions,
    showDescription: width < showDescriptionThreshold,
    showNotes: showNotes,
    showNotesFromWidth: width < showNotesThreshold,
    showTimelineModal: showTimelineModal,
    showUsersView: title.length > 0,
    timelineId: timelineId,
    title: title,
    updateDescription: updateDescription,
    updateNote: updateNote,
    usersViewing: usersViewing
  }));
});

exports.Properties = Properties;
Properties.displayName = 'Properties';