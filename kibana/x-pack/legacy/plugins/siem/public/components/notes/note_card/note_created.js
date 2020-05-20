"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteCreated = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _localized_date_tooltip = require("../../localized_date_tooltip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NoteCreatedContainer = _styledComponents.default.span.withConfig({
  displayName: "NoteCreatedContainer",
  componentId: "uhvru2-0"
})(["user-select:none;"]);

NoteCreatedContainer.displayName = 'NoteCreatedContainer';

var NoteCreated = _react2.default.memo(function (_ref) {
  var created = _ref.created;
  return _react2.default.createElement(NoteCreatedContainer, {
    "data-test-subj": "note-created"
  }, _react2.default.createElement(_localized_date_tooltip.LocalizedDateTooltip, {
    date: created
  }, _react2.default.createElement(_react.FormattedRelative, {
    value: created
  })));
});

exports.NoteCreated = NoteCreated;
NoteCreated.displayName = 'NoteCreated';