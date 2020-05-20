"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Duration = exports.EVENT_DURATION_FIELD_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../draggables");

var _formatted_duration = require("../formatted_duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EVENT_DURATION_FIELD_NAME = 'event.duration';
/**
 * Renders draggable text containing the value of a field representing a
 * duration of time, (e.g. `event.duration`)
 */

exports.EVENT_DURATION_FIELD_NAME = EVENT_DURATION_FIELD_NAME;

var Duration = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      fieldName = _ref.fieldName,
      value = _ref.value;
  return _react.default.createElement(_draggables.DefaultDraggable, {
    id: "duration-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value),
    name: name,
    field: fieldName,
    tooltipContent: null,
    value: value
  }, _react.default.createElement(_formatted_duration.FormattedDuration, {
    maybeDurationNanoseconds: value,
    tooltipTitle: fieldName
  }));
});

exports.Duration = Duration;
Duration.displayName = 'Duration';