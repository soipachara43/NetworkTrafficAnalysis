"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessDraggableWithNonExistentProcess = exports.ProcessDraggable = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../draggables");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ProcessDraggable = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      endgamePid = _ref.endgamePid,
      endgameProcessName = _ref.endgameProcessName,
      eventId = _ref.eventId,
      processExecutable = _ref.processExecutable,
      processName = _ref.processName,
      processPid = _ref.processPid;

  if ((0, _helpers.isNillEmptyOrNotFinite)(processName) && (0, _helpers.isNillEmptyOrNotFinite)(processExecutable) && (0, _helpers.isNillEmptyOrNotFinite)(endgameProcessName) && (0, _helpers.isNillEmptyOrNotFinite)(processPid) && (0, _helpers.isNillEmptyOrNotFinite)(endgamePid)) {
    return null;
  }

  return _react.default.createElement("div", null, !(0, _helpers.isNillEmptyOrNotFinite)(processName) ? _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.name",
    value: processName,
    iconType: "console"
  }) : !(0, _helpers.isNillEmptyOrNotFinite)(processExecutable) ? _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.executable",
    value: processExecutable,
    iconType: "console"
  }) : !(0, _helpers.isNillEmptyOrNotFinite)(endgameProcessName) ? _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "endgame.process_name",
    value: endgameProcessName,
    iconType: "console"
  }) : null, !(0, _helpers.isNillEmptyOrNotFinite)(processPid) ? _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.pid",
    queryValue: String(processPid),
    value: "(".concat(String(processPid), ")")
  }) : !(0, _helpers.isNillEmptyOrNotFinite)(endgamePid) ? _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "endgame.pid",
    queryValue: String(endgamePid),
    value: "(".concat(String(endgamePid), ")")
  }) : null);
});

exports.ProcessDraggable = ProcessDraggable;
ProcessDraggable.displayName = 'ProcessDraggable';

var ProcessDraggableWithNonExistentProcess = _react.default.memo(function (_ref2) {
  var contextId = _ref2.contextId,
      endgamePid = _ref2.endgamePid,
      endgameProcessName = _ref2.endgameProcessName,
      eventId = _ref2.eventId,
      processExecutable = _ref2.processExecutable,
      processName = _ref2.processName,
      processPid = _ref2.processPid;

  if (endgamePid == null && endgameProcessName == null && processExecutable == null && processName == null && processPid == null) {
    return _react.default.createElement(_react.default.Fragment, null, i18n.NON_EXISTENT);
  } else {
    return _react.default.createElement(ProcessDraggable, {
      contextId: contextId,
      endgamePid: endgamePid,
      endgameProcessName: endgameProcessName,
      eventId: eventId,
      processExecutable: processExecutable,
      processName: processName,
      processPid: processPid
    });
  }
});

exports.ProcessDraggableWithNonExistentProcess = ProcessDraggableWithNonExistentProcess;
ProcessDraggableWithNonExistentProcess.displayName = 'ProcessDraggableWithNonExistentProcess';