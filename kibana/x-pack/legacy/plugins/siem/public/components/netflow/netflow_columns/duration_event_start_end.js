"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurationEventStartEnd = exports.EVENT_END_FIELD_NAME = exports.EVENT_START_FIELD_NAME = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggables = require("../../draggables");

var _duration = require("../../duration");

var _formatted_date = require("../../formatted_date");

var _formatted_duration = require("../../formatted_duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EVENT_START_FIELD_NAME = 'event.start';
exports.EVENT_START_FIELD_NAME = EVENT_START_FIELD_NAME;
var EVENT_END_FIELD_NAME = 'event.end';
exports.EVENT_END_FIELD_NAME = EVENT_END_FIELD_NAME;
var TimeIcon = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "TimeIcon",
  componentId: "sc-1iyywdg-0"
})(["margin-right:3px;position:relative;top:-1px;"]);
TimeIcon.displayName = 'TimeIcon';
/**
 * Renders a column of draggable badges containing:
 * - `event.duration`
 * - `event.start`
 * - `event.end`
 */

var DurationEventStartEnd = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventDuration = _ref.eventDuration,
      eventId = _ref.eventId,
      eventEnd = _ref.eventEnd,
      eventStart = _ref.eventStart;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "flexStart",
    "data-test-subj": "duration-and-start-group",
    direction: "column",
    justifyContent: "center",
    gutterSize: "none"
  }, eventDuration != null ? (0, _fp.uniq)(eventDuration).map(function (duration) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: duration
    }, _react.default.createElement(_draggables.DefaultDraggable, {
      "data-test-subj": "event-duration",
      field: _duration.EVENT_DURATION_FIELD_NAME,
      id: "duration-event-start-end-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(_duration.EVENT_DURATION_FIELD_NAME, "-").concat(duration),
      name: name,
      tooltipContent: null,
      value: duration
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement(TimeIcon, {
      size: "m",
      type: "clock"
    }), _react.default.createElement(_formatted_duration.FormattedDuration, {
      maybeDurationNanoseconds: duration,
      tooltipTitle: _duration.EVENT_DURATION_FIELD_NAME
    }))));
  }) : null, eventStart != null ? (0, _fp.uniq)(eventStart).map(function (start) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: start
    }, _react.default.createElement(_draggables.DefaultDraggable, {
      "data-test-subj": "event-start",
      field: EVENT_START_FIELD_NAME,
      id: "duration-event-start-end-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(EVENT_START_FIELD_NAME, "-").concat(start),
      tooltipContent: null,
      value: start
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement(TimeIcon, {
      size: "m",
      type: "clock"
    }), _react.default.createElement(_formatted_date.FormattedDate, {
      fieldName: EVENT_START_FIELD_NAME,
      value: start
    }))));
  }) : null, eventEnd != null ? (0, _fp.uniq)(eventEnd).map(function (end) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: end
    }, _react.default.createElement(_draggables.DefaultDraggable, {
      "data-test-subj": "event-end",
      field: EVENT_END_FIELD_NAME,
      id: "duration-event-start-end-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(EVENT_END_FIELD_NAME, "-").concat(end),
      tooltipContent: null,
      value: end
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement(TimeIcon, {
      size: "m",
      type: "clock"
    }), _react.default.createElement(_formatted_date.FormattedDate, {
      fieldName: EVENT_END_FIELD_NAME,
      value: end
    }))));
  }) : null);
});

exports.DurationEventStartEnd = DurationEventStartEnd;
DurationEventStartEnd.displayName = 'DurationEventStartEnd';