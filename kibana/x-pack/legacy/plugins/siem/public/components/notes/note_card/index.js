"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteCard = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _note_card_body = require("./note_card_body");

var _note_card_header = require("./note_card_header");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NoteCardContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "NoteCardContainer",
  componentId: "fl7s71-0"
})(["width:100%;"]);
NoteCardContainer.displayName = 'NoteCardContainer';

var NoteCard = _react.default.memo(function (_ref) {
  var created = _ref.created,
      rawNote = _ref.rawNote,
      user = _ref.user;
  return _react.default.createElement(NoteCardContainer, {
    "data-test-subj": "note-card",
    hasShadow: false,
    paddingSize: "none"
  }, _react.default.createElement(_note_card_header.NoteCardHeader, {
    created: created,
    user: user
  }), _react.default.createElement(_note_card_body.NoteCardBody, {
    rawNote: rawNote
  }));
});

exports.NoteCard = NoteCard;
NoteCard.displayName = 'NoteCard';