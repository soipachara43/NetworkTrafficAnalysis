"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ip = exports.DESTINATION_IP_FIELD_NAME = exports.SOURCE_IP_FIELD_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _formatted_field = require("../timeline/body/renderers/formatted_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SOURCE_IP_FIELD_NAME = 'source.ip';
exports.SOURCE_IP_FIELD_NAME = SOURCE_IP_FIELD_NAME;
var DESTINATION_IP_FIELD_NAME = 'destination.ip';
exports.DESTINATION_IP_FIELD_NAME = DESTINATION_IP_FIELD_NAME;
var IP_FIELD_TYPE = 'ip';
/**
 * Renders text containing a draggable IP address (e.g. `source.ip`,
 * `destination.ip`) that contains a hyperlink
 */

var Ip = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      fieldName = _ref.fieldName,
      value = _ref.value;
  return _react.default.createElement(_formatted_field.FormattedFieldValue, {
    contextId: contextId,
    "data-test-subj": "formatted-ip",
    eventId: eventId,
    fieldName: fieldName,
    fieldType: IP_FIELD_TYPE,
    value: value
  });
});

exports.Ip = Ip;
Ip.displayName = 'Ip';