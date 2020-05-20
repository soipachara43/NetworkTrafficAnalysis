"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HostWorkingDir = void 0;

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../draggables");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers = require("./helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HostWorkingDir = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      hostName = _ref.hostName,
      workingDirectory = _ref.workingDirectory;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "host.name",
    value: hostName
  })), workingDirectory != null && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, i18n.IN), _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.working_directory",
    value: workingDirectory,
    iconType: "folderOpen"
  })));
});

exports.HostWorkingDir = HostWorkingDir;
HostWorkingDir.displayName = 'HostWorkingDir';