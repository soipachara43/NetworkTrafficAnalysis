"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotePreview = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _empty_value = require("../../empty_value");

var _formatted_date = require("../../formatted_date");

var _markdown = require("../../markdown");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NotePreviewGroup = _styledComponents.default.article.withConfig({
  displayName: "NotePreviewGroup",
  componentId: "pm8761-0"
})(["& + &{margin-top:", ";}"], function (props) {
  return props.theme.eui.euiSizeL;
});

NotePreviewGroup.displayName = 'NotePreviewGroup';

var NotePreviewHeader = _styledComponents.default.header.withConfig({
  displayName: "NotePreviewHeader",
  componentId: "pm8761-1"
})(["margin-bottom:", ";"], function (props) {
  return props.theme.eui.euiSizeS;
});

NotePreviewHeader.displayName = 'NotePreviewHeader';
/**
 * Renders a preview of a note in the All / Open Timelines table
 */

var NotePreview = _react2.default.memo(function (_ref) {
  var note = _ref.note,
      updated = _ref.updated,
      updatedBy = _ref.updatedBy;
  return _react2.default.createElement(NotePreviewGroup, null, _react2.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    responsive: false
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiAvatar, {
    "data-test-subj": "avatar",
    name: updatedBy != null ? updatedBy : '?',
    size: "l"
  })), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(NotePreviewHeader, null, _react2.default.createElement(_eui.EuiTitle, {
    "data-test-subj": "updated-by",
    size: "xxs"
  }, _react2.default.createElement("h6", null, (0, _empty_value.defaultToEmptyTag)(updatedBy))), _react2.default.createElement(_eui.EuiText, {
    color: "subdued",
    "data-test-subj": "posted",
    size: "xs"
  }, _react2.default.createElement("p", null, i18n.POSTED, ' ', updated != null ? _react2.default.createElement(_eui.EuiToolTip, {
    content: _react2.default.createElement(_formatted_date.FormattedDate, {
      fieldName: "",
      value: updated
    })
  }, _react2.default.createElement(_react.FormattedRelative, {
    "data-test-subj": "updated",
    value: new Date(updated)
  })) : (0, _empty_value.getEmptyValue)()))), _react2.default.createElement(_markdown.Markdown, {
    raw: note || '',
    size: "s"
  }))));
});

exports.NotePreview = NotePreview;
NotePreview.displayName = 'NotePreview';