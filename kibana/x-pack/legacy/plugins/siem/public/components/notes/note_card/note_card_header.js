"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteCardHeader = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("../translations"));

var _note_created = require("./note_created");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Action = _styledComponents.default.span.withConfig({
  displayName: "Action",
  componentId: "c7wyfp-0"
})(["margin-right:5px;"]);

Action.displayName = 'Action';
var Avatar = (0, _styledComponents.default)(_eui.EuiAvatar).withConfig({
  displayName: "Avatar",
  componentId: "c7wyfp-1"
})(["margin-right:5px;"]);
Avatar.displayName = 'Avatar';

var HeaderContainer = _styledComponents.default.div.withConfig({
  displayName: "HeaderContainer",
  componentId: "c7wyfp-2"
})(["align-items:center;display:flex;user-select:none;"]);

HeaderContainer.displayName = 'HeaderContainer';

var User = _styledComponents.default.span.withConfig({
  displayName: "User",
  componentId: "c7wyfp-3"
})(["font-weight:700;margin:5px;"]);

var NoteCardHeader = _react.default.memo(function (_ref) {
  var created = _ref.created,
      user = _ref.user;
  return _react.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "note-card-header",
    hasShadow: false,
    paddingSize: "s"
  }, _react.default.createElement(HeaderContainer, null, _react.default.createElement(Avatar, {
    "data-test-subj": "avatar",
    size: "s",
    name: user
  }), _react.default.createElement(User, {
    "data-test-subj": "user"
  }, user), _react.default.createElement(Action, {
    "data-test-subj": "action"
  }, i18n.ADDED_A_NOTE), _react.default.createElement(_note_created.NoteCreated, {
    "data-test-subj": "created",
    created: created
  })));
});

exports.NoteCardHeader = NoteCardHeader;
NoteCardHeader.displayName = 'NoteCardHeader';