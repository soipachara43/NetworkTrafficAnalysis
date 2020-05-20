"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteCardBody = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _with_copy_to_clipboard = require("../../../lib/clipboard/with_copy_to_clipboard");

var _markdown = require("../../markdown");

var _with_hover_actions = require("../../with_hover_actions");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BodyContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "BodyContainer",
  componentId: "sc-1qdnlu5-0"
})(["border:none;"]);
BodyContainer.displayName = 'BodyContainer';
var HoverActionsContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "HoverActionsContainer",
  componentId: "sc-1qdnlu5-1"
})(["align-items:center;display:flex;flex-direction:row;height:25px;justify-content:center;left:5px;position:absolute;top:-5px;width:30px;"]);
HoverActionsContainer.displayName = 'HoverActionsContainer';

var NoteCardBody = _react.default.memo(function (_ref) {
  var rawNote = _ref.rawNote;
  return _react.default.createElement(BodyContainer, {
    "data-test-subj": "note-card-body",
    hasShadow: false,
    paddingSize: "s"
  }, _react.default.createElement(_with_hover_actions.WithHoverActions, {
    hoverContent: _react.default.createElement(HoverActionsContainer, {
      "data-test-subj": "hover-actions-container"
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: i18n.COPY_TO_CLIPBOARD
    }, _react.default.createElement(_with_copy_to_clipboard.WithCopyToClipboard, {
      text: rawNote,
      titleSummary: i18n.NOTE.toLowerCase()
    }))),
    render: function render() {
      return _react.default.createElement(_markdown.Markdown, {
        raw: rawNote
      });
    }
  }));
});

exports.NoteCardBody = NoteCardBody;
NoteCardBody.displayName = 'NoteCardBody';