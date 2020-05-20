"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParentProcessDraggable = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../draggables");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ParentProcessDraggable = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      endgameParentProcessName = _ref.endgameParentProcessName,
      eventId = _ref.eventId,
      processPpid = _ref.processPpid,
      text = _ref.text;

  if ((0, _helpers.isNillEmptyOrNotFinite)(endgameParentProcessName) && (0, _helpers.isNillEmptyOrNotFinite)(processPpid)) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, !(0, _helpers.isNillEmptyOrNotFinite)(text) && _react.default.createElement(_helpers.TokensFlexItem, {
    "data-test-subj": "parent-process-draggable-text",
    grow: false,
    component: "span"
  }, text), !(0, _helpers.isNillEmptyOrNotFinite)(endgameParentProcessName) && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "endgame.parent_process_name",
    value: endgameParentProcessName
  })), !(0, _helpers.isNillEmptyOrNotFinite)(processPpid) && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.ppid",
    queryValue: String(processPpid),
    value: "(".concat(String(processPpid), ")")
  })));
});

exports.ParentProcessDraggable = ParentProcessDraggable;
ParentProcessDraggable.displayName = 'ParentProcessDraggable';