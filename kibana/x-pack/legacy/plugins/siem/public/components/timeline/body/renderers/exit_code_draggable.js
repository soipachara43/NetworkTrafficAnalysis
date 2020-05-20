"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitCodeDraggable = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../draggables");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ExitCodeDraggable = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      endgameExitCode = _ref.endgameExitCode,
      eventId = _ref.eventId,
      text = _ref.text;

  if ((0, _helpers.isNillEmptyOrNotFinite)(endgameExitCode)) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, !(0, _helpers.isNillEmptyOrNotFinite)(text) && _react.default.createElement(_helpers.TokensFlexItem, {
    "data-test-subj": "exit-code-draggable-text",
    grow: false,
    component: "span"
  }, text), _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "endgame.exit_code",
    value: endgameExitCode
  })));
});

exports.ExitCodeDraggable = ExitCodeDraggable;
ExitCodeDraggable.displayName = 'ExitCodeDraggable';