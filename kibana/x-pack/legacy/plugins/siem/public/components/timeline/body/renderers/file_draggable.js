"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileDraggable = void 0;

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
var FileDraggable = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      endgameFileName = _ref.endgameFileName,
      endgameFilePath = _ref.endgameFilePath,
      eventId = _ref.eventId,
      fileName = _ref.fileName,
      filePath = _ref.filePath;

  if ((0, _helpers.isNillEmptyOrNotFinite)(fileName) && (0, _helpers.isNillEmptyOrNotFinite)(endgameFileName) && (0, _helpers.isNillEmptyOrNotFinite)(filePath) && (0, _helpers.isNillEmptyOrNotFinite)(endgameFilePath)) {
    return null;
  }

  var filePathIsKnown = !(0, _helpers.isNillEmptyOrNotFinite)(filePath) || !(0, _helpers.isNillEmptyOrNotFinite)(endgameFilePath);
  return _react.default.createElement(_react.default.Fragment, null, !(0, _helpers.isNillEmptyOrNotFinite)(fileName) ? _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "file.name",
    value: fileName,
    iconType: "document"
  })) : !(0, _helpers.isNillEmptyOrNotFinite)(endgameFileName) ? _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "endgame.file_name",
    value: endgameFileName,
    iconType: "document"
  })) : null, filePathIsKnown && _react.default.createElement(_helpers.TokensFlexItem, {
    "data-test-subj": "in",
    grow: false,
    component: "span"
  }, i18n.IN), !(0, _helpers.isNillEmptyOrNotFinite)(filePath) ? _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "file.path",
    value: filePath,
    iconType: "document"
  })) : !(0, _helpers.isNillEmptyOrNotFinite)(endgameFilePath) ? _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "span"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "endgame.file_path",
    value: endgameFilePath,
    iconType: "document"
  })) : null);
});

exports.FileDraggable = FileDraggable;
FileDraggable.displayName = 'FileDraggable';