"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceDestinationArrows = exports.DESTINATION_PACKETS_FIELD_NAME = exports.DESTINATION_BYTES_FIELD_NAME = exports.SOURCE_PACKETS_FIELD_NAME = exports.SOURCE_BYTES_FIELD_NAME = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _arrows = require("../arrows");

var _helpers = require("../arrows/helpers");

var _draggables = require("../draggables");

var _formatted_bytes = require("../formatted_bytes");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SOURCE_BYTES_FIELD_NAME = 'source.bytes';
exports.SOURCE_BYTES_FIELD_NAME = SOURCE_BYTES_FIELD_NAME;
var SOURCE_PACKETS_FIELD_NAME = 'source.packets';
exports.SOURCE_PACKETS_FIELD_NAME = SOURCE_PACKETS_FIELD_NAME;
var DESTINATION_BYTES_FIELD_NAME = 'destination.bytes';
exports.DESTINATION_BYTES_FIELD_NAME = DESTINATION_BYTES_FIELD_NAME;
var DESTINATION_PACKETS_FIELD_NAME = 'destination.packets';
exports.DESTINATION_PACKETS_FIELD_NAME = DESTINATION_PACKETS_FIELD_NAME;

var Percent = _styledComponents.default.span.withConfig({
  displayName: "Percent",
  componentId: "sc-19dc9rw-0"
})(["margin-right:5px;"]);

Percent.displayName = 'Percent';
var SourceDestinationArrowsContainer = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "SourceDestinationArrowsContainer",
  componentId: "sc-19dc9rw-1"
})(["margin:0 2px;"]);
SourceDestinationArrowsContainer.displayName = 'SourceDestinationArrowsContainer';
var Data = (0, _styledComponents.default)(_eui.EuiText).withConfig({
  displayName: "Data",
  componentId: "sc-19dc9rw-2"
})(["margin:0 5px;"]);
Data.displayName = 'Data';
/**
 * Visualizes the communication from a source as an arrow with draggable badges
 */

var SourceArrow = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      sourceBytes = _ref.sourceBytes,
      sourceBytesPercent = _ref.sourceBytesPercent,
      sourcePackets = _ref.sourcePackets;
  var sourceArrowHeight = sourceBytesPercent != null ? (0, _helpers.getArrowHeightFromPercent)(sourceBytesPercent) : _helpers.DEFAULT_ARROW_HEIGHT;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none",
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_arrows.ArrowBody, {
    height: sourceArrowHeight
  })), sourceBytes != null && !isNaN(Number(sourceBytes)) ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_draggables.DefaultDraggable, {
    field: SOURCE_BYTES_FIELD_NAME,
    id: "source-arrow-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(SOURCE_BYTES_FIELD_NAME, "-").concat(sourceBytes),
    value: sourceBytes
  }, _react.default.createElement(Data, {
    size: "xs"
  }, sourceBytesPercent != null ? _react.default.createElement(Percent, {
    "data-test-subj": "source-bytes-percent"
  }, "(".concat((0, _numeral.default)(sourceBytesPercent).format('0.00'), "%)")) : null, _react.default.createElement("span", {
    "data-test-subj": "source-bytes"
  }, _react.default.createElement(_formatted_bytes.PreferenceFormattedBytes, {
    value: sourceBytes
  }))))) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_arrows.ArrowBody, {
    "data-test-subj": "source-arrow",
    height: sourceArrowHeight
  })), sourcePackets != null && !isNaN(Number(sourcePackets)) ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_draggables.DefaultDraggable, {
    field: SOURCE_PACKETS_FIELD_NAME,
    id: "source-arrow-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(SOURCE_PACKETS_FIELD_NAME, "-").concat(sourcePackets),
    value: sourcePackets
  }, _react.default.createElement(Data, {
    size: "xs"
  }, _react.default.createElement("span", {
    "data-test-subj": "source-packets"
  }, "".concat(sourcePackets, " ").concat(i18n.PACKETS))))) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_arrows.ArrowBody, {
    height: sourceArrowHeight
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_arrows.ArrowHead, {
    direction: "arrowRight"
  })));
});

SourceArrow.displayName = 'SourceArrow';
/**
 * Visualizes the communication from a destination as an arrow with draggable
 * badges
 */

var DestinationArrow = _react.default.memo(function (_ref2) {
  var contextId = _ref2.contextId,
      eventId = _ref2.eventId,
      destinationBytes = _ref2.destinationBytes,
      destinationBytesPercent = _ref2.destinationBytesPercent,
      destinationPackets = _ref2.destinationPackets;
  var destinationArrowHeight = destinationBytesPercent != null ? (0, _helpers.getArrowHeightFromPercent)(destinationBytesPercent) : _helpers.DEFAULT_ARROW_HEIGHT;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "none",
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_arrows.ArrowHead, {
    direction: "arrowLeft"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_arrows.ArrowBody, {
    height: destinationArrowHeight
  })), destinationBytes != null && !isNaN(Number(destinationBytes)) ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_draggables.DefaultDraggable, {
    field: DESTINATION_BYTES_FIELD_NAME,
    id: "destination-arrow-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(DESTINATION_BYTES_FIELD_NAME, "-").concat(destinationBytes),
    value: destinationBytes
  }, _react.default.createElement(Data, {
    size: "xs"
  }, destinationBytesPercent != null ? _react.default.createElement(Percent, {
    "data-test-subj": "destination-bytes-percent"
  }, "(".concat((0, _numeral.default)(destinationBytesPercent).format('0.00'), "%)")) : null, _react.default.createElement("span", {
    "data-test-subj": "destination-bytes"
  }, _react.default.createElement(_formatted_bytes.PreferenceFormattedBytes, {
    value: destinationBytes
  }))))) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_arrows.ArrowBody, {
    height: destinationArrowHeight
  })), destinationPackets != null && !isNaN(Number(destinationPackets)) ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_draggables.DefaultDraggable, {
    field: DESTINATION_PACKETS_FIELD_NAME,
    id: "destination-arrow-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(DESTINATION_PACKETS_FIELD_NAME, "-").concat(destinationPackets),
    value: destinationPackets
  }, _react.default.createElement(Data, {
    size: "xs"
  }, _react.default.createElement("span", {
    "data-test-subj": "destination-packets"
  }, "".concat((0, _numeral.default)(destinationPackets).format('0,0'), " ").concat(i18n.PACKETS))))) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_arrows.ArrowBody, {
    height: destinationArrowHeight
  })));
});

DestinationArrow.displayName = 'DestinationArrow';
/**
 * Visualizes the communication between a source and a destination using arrows
 * that grow in thickness based on the percentage of bytes transferred, and stats badges
 */

var SourceDestinationArrows = _react.default.memo(function (_ref3) {
  var contextId = _ref3.contextId,
      destinationBytes = _ref3.destinationBytes,
      destinationPackets = _ref3.destinationPackets,
      eventId = _ref3.eventId,
      sourceBytes = _ref3.sourceBytes,
      sourcePackets = _ref3.sourcePackets;
  var maybeSourceBytes = sourceBytes != null && (0, _helpers.hasOneValue)(sourceBytes) ? sourceBytes[0] : undefined;
  var maybeSourcePackets = sourcePackets != null && (0, _helpers.hasOneValue)(sourcePackets) ? sourcePackets[0] : undefined;
  var maybeDestinationBytes = destinationBytes != null && (0, _helpers.hasOneValue)(destinationBytes) ? destinationBytes[0] : undefined;
  var maybeDestinationPackets = destinationPackets != null && (0, _helpers.hasOneValue)(destinationPackets) ? destinationPackets[0] : undefined;
  var maybeSourceBytesPercent = maybeSourceBytes != null && maybeDestinationBytes != null ? (0, _helpers.getPercent)({
    numerator: Number(maybeSourceBytes),
    denominator: Number(maybeSourceBytes) + Number(maybeDestinationBytes)
  }) : undefined;
  var maybeDestinationBytesPercent = maybeSourceBytesPercent != null ? 100 - maybeSourceBytesPercent : undefined;
  return _react.default.createElement(SourceDestinationArrowsContainer, {
    alignItems: "center",
    "data-test-subj": "source-destination-arrows-container",
    justifyContent: "center",
    direction: "column",
    gutterSize: "none"
  }, maybeSourceBytes != null ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(SourceArrow, {
    contextId: contextId,
    sourceBytes: maybeSourceBytes,
    sourcePackets: maybeSourcePackets,
    sourceBytesPercent: maybeSourceBytesPercent,
    eventId: eventId
  })) : null, maybeDestinationBytes != null ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(DestinationArrow, {
    contextId: contextId,
    destinationBytes: maybeDestinationBytes,
    destinationPackets: maybeDestinationPackets,
    destinationBytesPercent: maybeDestinationBytesPercent,
    eventId: eventId
  })) : null);
});

exports.SourceDestinationArrows = SourceDestinationArrows;
SourceDestinationArrows.displayName = 'SourceDestinationArrows';