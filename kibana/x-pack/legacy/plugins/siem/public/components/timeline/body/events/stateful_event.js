"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulEvent = exports.getNewNoteId = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var _reactVisibilitySensor = _interopRequireDefault(require("react-visibility-sensor"));

var _details = require("../../../../containers/timeline/details");

var _scheduler = require("../../../../lib/helpers/scheduler");

var _skeleton_row = require("../../../skeleton_row");

var _expandable_event = require("../../expandable_event");

var _helpers = require("../../helpers");

var _styles = require("../../styles");

var _get_row_renderer = require("../renderers/get_row_renderer");

var _helpers2 = require("../helpers");

var _note_cards = require("../../../notes/note_cards");

var _event_details_width_context = require("../../../events_viewer/event_details_width_context");

var _event_column_view = require("./event_column_view");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getNewNoteId = function getNewNoteId() {
  return _uuid.default.v4();
};

exports.getNewNoteId = getNewNoteId;
var emptyDetails = [];
/**
 * This is the default row height whenever it is a plain row renderer and not a custom row height.
 * We use this value when we do not know the height of a particular row.
 */

var DEFAULT_ROW_HEIGHT = '32px';
/**
 * This is the top offset in pixels of the top part of the timeline. The UI area where you do your
 * drag and drop and filtering.  It is a positive number in pixels of _PART_ of the header but not
 * the entire header. We leave room for some rows to render behind the drag and drop so they might be
 * visible by the time the user scrolls upwards. All other DOM elements are replaced with their "blank"
 * rows.
 */

var TOP_OFFSET = 50;
/**
 * This is the bottom offset in pixels of the bottom part of the timeline. The UI area right below the
 * timeline which is the footer.  Since the footer is so incredibly small we don't have enough room to
 * render around 5 rows below the timeline to get the user the best chance of always scrolling without seeing
 * "blank rows". The negative number is to give the bottom of the browser window a bit of invisible space to
 * keep around 5 rows rendering below it. All other DOM elements are replaced with their "blank"
 * rows.
 */

var BOTTOM_OFFSET = -500;
var emptyNotes = [];

var EventsTrSupplementContainerWrapper = _react.default.memo(function (_ref) {
  var children = _ref.children;
  var width = (0, _event_details_width_context.useEventDetailsWidthContext)();
  return _react.default.createElement(_styles.EventsTrSupplementContainer, {
    width: width
  }, children);
});

EventsTrSupplementContainerWrapper.displayName = 'EventsTrSupplementContainerWrapper';

var StatefulEventComponent = function StatefulEventComponent(_ref2) {
  var actionsColumnWidth = _ref2.actionsColumnWidth,
      addNoteToEvent = _ref2.addNoteToEvent,
      browserFields = _ref2.browserFields,
      containerElementRef = _ref2.containerElementRef,
      columnHeaders = _ref2.columnHeaders,
      columnRenderers = _ref2.columnRenderers,
      event = _ref2.event,
      eventIdToNoteIds = _ref2.eventIdToNoteIds,
      getNotesByIds = _ref2.getNotesByIds,
      _ref2$isEventViewer = _ref2.isEventViewer,
      isEventViewer = _ref2$isEventViewer === void 0 ? false : _ref2$isEventViewer,
      _ref2$isEventPinned = _ref2.isEventPinned,
      isEventPinned = _ref2$isEventPinned === void 0 ? false : _ref2$isEventPinned,
      loadingEventIds = _ref2.loadingEventIds,
      _ref2$maxDelay = _ref2.maxDelay,
      maxDelay = _ref2$maxDelay === void 0 ? 0 : _ref2$maxDelay,
      onColumnResized = _ref2.onColumnResized,
      onPinEvent = _ref2.onPinEvent,
      onRowSelected = _ref2.onRowSelected,
      onUnPinEvent = _ref2.onUnPinEvent,
      onUpdateColumns = _ref2.onUpdateColumns,
      rowRenderers = _ref2.rowRenderers,
      selectedEventIds = _ref2.selectedEventIds,
      showCheckboxes = _ref2.showCheckboxes,
      timelineId = _ref2.timelineId,
      toggleColumn = _ref2.toggleColumn,
      updateNote = _ref2.updateNote;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      initialRender = _useState4[0],
      setInitialRender = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      showNotes = _useState6[0],
      setShowNotes = _useState6[1];

  var divElement = (0, _react.useRef)(null);
  var onToggleShowNotes = (0, _react.useCallback)(function () {
    var eventId = event._id;
    setShowNotes(_objectSpread({}, showNotes, _defineProperty({}, eventId, !showNotes[eventId])));
  }, [event, showNotes]);
  var onToggleExpanded = (0, _react.useCallback)(function () {
    var eventId = event._id;
    setExpanded(_objectSpread({}, expanded, _defineProperty({}, eventId, !expanded[eventId])));
  }, [event, expanded]);
  var associateNote = (0, _react.useCallback)(function (noteId) {
    addNoteToEvent({
      eventId: event._id,
      noteId: noteId
    });

    if (!isEventPinned) {
      onPinEvent(event._id); // pin the event, because it has notes
    }
  }, [addNoteToEvent, event, isEventPinned, onPinEvent]);
  /**
   * Incrementally loads the events when it mounts by trying to
   * see if it resides within a window frame and if it is it will
   * indicate to React that it should render its self by setting
   * its initialRender to true.
   */

  (0, _react.useEffect)(function () {
    var _isMounted = true;
    (0, _scheduler.requestIdleCallbackViaScheduler)(function () {
      if (!initialRender && _isMounted) {
        setInitialRender(true);
      }
    }, {
      timeout: maxDelay
    });
    return function () {
      _isMounted = false;
    };
  }, []); // Number of current columns plus one for actions.

  var columnCount = columnHeaders.length + 1; // If we are not ready to render yet, just return null
  // see useEffect() for when it schedules the first
  // time this stateful component should be rendered.

  if (!initialRender) {
    return _react.default.createElement(_skeleton_row.SkeletonRow, {
      cellCount: columnCount
    });
  }

  return _react.default.createElement(_reactVisibilitySensor.default, {
    partialVisibility: true,
    scrollCheck: true,
    containment: containerElementRef,
    offset: {
      top: TOP_OFFSET,
      bottom: BOTTOM_OFFSET
    }
  }, function (_ref3) {
    var isVisible = _ref3.isVisible;

    if (isVisible) {
      return _react.default.createElement(_details.TimelineDetailsQuery, {
        sourceId: "default",
        indexName: event._index,
        eventId: event._id,
        executeQuery: !!expanded[event._id]
      }, function (_ref4) {
        var detailsData = _ref4.detailsData,
            loading = _ref4.loading;
        return _react.default.createElement(_styles.EventsTrGroup, {
          className: _helpers.STATEFUL_EVENT_CSS_CLASS_NAME,
          "data-test-subj": "event",
          eventType: (0, _helpers2.getEventType)(event.ecs),
          showLeftBorder: !isEventViewer,
          ref: divElement
        }, _react.default.createElement(_event_column_view.EventColumnView, {
          id: event._id,
          actionsColumnWidth: actionsColumnWidth,
          associateNote: associateNote,
          columnHeaders: columnHeaders,
          columnRenderers: columnRenderers,
          data: event.data,
          ecsData: event.ecs,
          expanded: !!expanded[event._id],
          eventIdToNoteIds: eventIdToNoteIds,
          getNotesByIds: getNotesByIds,
          isEventPinned: isEventPinned,
          isEventViewer: isEventViewer,
          loading: loading,
          loadingEventIds: loadingEventIds,
          onColumnResized: onColumnResized,
          onEventToggled: onToggleExpanded,
          onPinEvent: onPinEvent,
          onRowSelected: onRowSelected,
          onUnPinEvent: onUnPinEvent,
          selectedEventIds: selectedEventIds,
          showCheckboxes: showCheckboxes,
          showNotes: !!showNotes[event._id],
          timelineId: timelineId,
          toggleShowNotes: onToggleShowNotes,
          updateNote: updateNote
        }), _react.default.createElement(EventsTrSupplementContainerWrapper, null, _react.default.createElement(_styles.EventsTrSupplement, {
          className: "siemEventsTable__trSupplement--notes",
          "data-test-subj": "event-notes-flex-item"
        }, _react.default.createElement(_note_cards.NoteCards, {
          associateNote: associateNote,
          "data-test-subj": "note-cards",
          getNewNoteId: getNewNoteId,
          getNotesByIds: getNotesByIds,
          noteIds: eventIdToNoteIds[event._id] || emptyNotes,
          showAddNote: !!showNotes[event._id],
          toggleShowAddNote: onToggleShowNotes,
          updateNote: updateNote
        })), (0, _get_row_renderer.getRowRenderer)(event.ecs, rowRenderers).renderRow({
          browserFields: browserFields,
          data: event.ecs,
          timelineId: timelineId
        }), _react.default.createElement(_styles.EventsTrSupplement, {
          className: "siemEventsTable__trSupplement--attributes",
          "data-test-subj": "event-details"
        }, _react.default.createElement(_expandable_event.ExpandableEvent, {
          browserFields: browserFields,
          columnHeaders: columnHeaders,
          event: detailsData || emptyDetails,
          forceExpand: !!expanded[event._id] && !loading,
          id: event._id,
          onUpdateColumns: onUpdateColumns,
          timelineId: timelineId,
          toggleColumn: toggleColumn
        }))));
      });
    } else {
      // Height place holder for visibility detection as well as re-rendering sections.
      var height = divElement.current != null && divElement.current.clientHeight ? "".concat(divElement.current.clientHeight, "px") : DEFAULT_ROW_HEIGHT;
      return _react.default.createElement(_skeleton_row.SkeletonRow, {
        cellCount: columnCount,
        rowHeight: height
      });
    }
  });
};

var StatefulEvent = _react.default.memo(StatefulEventComponent);

exports.StatefulEvent = StatefulEvent;