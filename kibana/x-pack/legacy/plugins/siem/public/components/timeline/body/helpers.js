"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventType = exports.getEventIdToDataMapping = exports.getPinOnClick = exports.eventIsPinned = exports.getPinTooltip = exports.eventHasNotes = exports.stringifyEvent = exports.omitTypenameAndEmpty = void 0;

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var omitTypenameAndEmpty = function omitTypenameAndEmpty(k, v) {
  return k !== '__typename' && v != null ? v : undefined;
};

exports.omitTypenameAndEmpty = omitTypenameAndEmpty;

var stringifyEvent = function stringifyEvent(ecs) {
  return JSON.stringify(ecs, omitTypenameAndEmpty, 2);
};

exports.stringifyEvent = stringifyEvent;

var eventHasNotes = function eventHasNotes(noteIds) {
  return !(0, _fp.isEmpty)(noteIds);
};

exports.eventHasNotes = eventHasNotes;

var getPinTooltip = function getPinTooltip(_ref) {
  var isPinned = _ref.isPinned,
      eventHasNotes = _ref.eventHasNotes;
  return isPinned && eventHasNotes ? i18n.PINNED_WITH_NOTES : isPinned ? i18n.PINNED : i18n.UNPINNED;
};

exports.getPinTooltip = getPinTooltip;

var eventIsPinned = function eventIsPinned(_ref2) {
  var eventId = _ref2.eventId,
      pinnedEventIds = _ref2.pinnedEventIds;
  return pinnedEventIds[eventId] === true;
};

exports.eventIsPinned = eventIsPinned;

var getPinOnClick = function getPinOnClick(_ref3) {
  var allowUnpinning = _ref3.allowUnpinning,
      eventId = _ref3.eventId,
      onPinEvent = _ref3.onPinEvent,
      onUnPinEvent = _ref3.onUnPinEvent,
      isEventPinned = _ref3.isEventPinned;

  if (!allowUnpinning) {
    return _fp.noop;
  }

  return isEventPinned ? function () {
    return onUnPinEvent(eventId);
  } : function () {
    return onPinEvent(eventId);
  };
};
/**
 * Creates mapping of eventID -> fieldData for given fieldsToKeep. Used to store additional field
 * data necessary for custom timeline actions in conjunction with selection state
 * @param timelineData
 * @param eventIds
 * @param fieldsToKeep
 */


exports.getPinOnClick = getPinOnClick;

var getEventIdToDataMapping = function getEventIdToDataMapping(timelineData, eventIds, fieldsToKeep) {
  return timelineData.reduce(function (acc, v) {
    var fvm = eventIds.includes(v._id) ? _defineProperty({}, v._id, v.data.filter(function (ti) {
      return fieldsToKeep.includes(ti.field);
    })) : {};
    return _objectSpread({}, acc, {}, fvm);
  }, {});
};
/** Return eventType raw or signal */


exports.getEventIdToDataMapping = getEventIdToDataMapping;

var getEventType = function getEventType(event) {
  var _event$signal, _event$signal$rule;

  if (!(0, _fp.isEmpty)((_event$signal = event.signal) === null || _event$signal === void 0 ? void 0 : (_event$signal$rule = _event$signal.rule) === null || _event$signal$rule === void 0 ? void 0 : _event$signal$rule.id)) {
    return 'signal';
  }

  return 'raw';
};

exports.getEventType = getEventType;