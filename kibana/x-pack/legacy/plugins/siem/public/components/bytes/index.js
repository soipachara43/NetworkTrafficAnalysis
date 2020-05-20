"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bytes = exports.BYTES_FORMAT = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../draggables");

var _formatted_bytes = require("../formatted_bytes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BYTES_FORMAT = 'bytes';
/**
 * Renders draggable text containing the value of a field representing a
 * duration of time, (e.g. `event.duration`)
 */

exports.BYTES_FORMAT = BYTES_FORMAT;

var Bytes = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      fieldName = _ref.fieldName,
      value = _ref.value;
  return _react.default.createElement(_draggables.DefaultDraggable, {
    id: "bytes-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value),
    name: name,
    field: fieldName,
    tooltipContent: null,
    value: value
  }, _react.default.createElement(_formatted_bytes.PreferenceFormattedBytes, {
    value: "".concat(value)
  }));
});

exports.Bytes = Bytes;
Bytes.displayName = 'Bytes';