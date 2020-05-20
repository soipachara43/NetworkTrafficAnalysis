"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columns = void 0;

var _react = _interopRequireDefault(require("react"));

var _note_card = require("./note_card");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var Column = _react.default.memo(function (_ref) {
  var text = _ref.text;
  return _react.default.createElement("span", null, text);
});

Column.displayName = 'Column';
var columns = [{
  field: 'note',
  dataType: 'string',
  name: i18n.NOTE,
  sortable: true,
  truncateText: false,
  render: function render(_, _ref2) {
    var created = _ref2.created,
        note = _ref2.note,
        user = _ref2.user;
    return _react.default.createElement(_note_card.NoteCard, {
      created: created,
      rawNote: note,
      user: user
    });
  }
}];
exports.columns = columns;