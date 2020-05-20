"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandableEvent = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _stateful_event_details = require("../../event_details/stateful_event_details");

var _lazy_accordion = require("../../lazy_accordion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ExpandableDetails = _styledComponents.default.div.withConfig({
  displayName: "ExpandableDetails",
  componentId: "sc-1x0up5l-0"
})(["", ";"], function (_ref) {
  var hideExpandButton = _ref.hideExpandButton;
  return hideExpandButton ? "\n  .euiAccordion__button {\n    display: none;\n  }\n  " : '';
});

ExpandableDetails.displayName = 'ExpandableDetails';

var ExpandableEvent = _react.default.memo(function (_ref2) {
  var browserFields = _ref2.browserFields,
      columnHeaders = _ref2.columnHeaders,
      event = _ref2.event,
      _ref2$forceExpand = _ref2.forceExpand,
      forceExpand = _ref2$forceExpand === void 0 ? false : _ref2$forceExpand,
      id = _ref2.id,
      timelineId = _ref2.timelineId,
      toggleColumn = _ref2.toggleColumn,
      onUpdateColumns = _ref2.onUpdateColumns;
  return _react.default.createElement(ExpandableDetails, {
    hideExpandButton: true
  }, _react.default.createElement(_lazy_accordion.LazyAccordion, {
    id: "timeline-".concat(timelineId, "-row-").concat(id),
    renderExpandedContent: function renderExpandedContent() {
      return _react.default.createElement(_stateful_event_details.StatefulEventDetails, {
        browserFields: browserFields,
        columnHeaders: columnHeaders,
        data: event,
        id: id,
        onUpdateColumns: onUpdateColumns,
        timelineId: timelineId,
        toggleColumn: toggleColumn
      });
    },
    forceExpand: forceExpand,
    paddingSize: "none"
  }));
});

exports.ExpandableEvent = ExpandableEvent;
ExpandableEvent.displayName = 'ExpandableEvent';