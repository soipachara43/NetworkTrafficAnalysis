"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Actions = exports.CloseButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styles = require("../../../styles");

var _timeline_context = require("../../../timeline_context");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** Given a `header`, returns the `SortDirection` applicable to it */
var CloseButton = _react.default.memo(function (_ref) {
  var columnId = _ref.columnId,
      onColumnRemoved = _ref.onColumnRemoved;
  return _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": i18n.REMOVE_COLUMN,
    color: "text",
    "data-test-subj": "remove-column",
    iconType: "cross",
    onClick: function onClick(event) {
      // To avoid a re-sorting when you delete a column
      event.preventDefault();
      event.stopPropagation();
      onColumnRemoved(columnId);
    }
  });
});

exports.CloseButton = CloseButton;
CloseButton.displayName = 'CloseButton';

var Actions = _react.default.memo(function (_ref2) {
  var header = _ref2.header,
      onColumnRemoved = _ref2.onColumnRemoved,
      sort = _ref2.sort;
  var isLoading = (0, _timeline_context.useTimelineContext)();
  return _react.default.createElement(_react.default.Fragment, null, sort.columnId === header.id && isLoading ? _react.default.createElement(_styles.EventsHeadingExtra, {
    className: "siemEventsHeading__extra--loading"
  }, _react.default.createElement(_styles.EventsLoading, null)) : _react.default.createElement(_styles.EventsHeadingExtra, {
    className: "siemEventsHeading__extra--close"
  }, _react.default.createElement(CloseButton, {
    columnId: header.id,
    onColumnRemoved: onColumnRemoved
  })));
});

exports.Actions = Actions;
Actions.displayName = 'Actions';