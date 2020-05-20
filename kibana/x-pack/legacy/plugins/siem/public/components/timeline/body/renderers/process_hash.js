"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessHash = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggables = require("../../../draggables");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HashFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "HashFlexGroup",
  componentId: "olsjk7-0"
})(["margin:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiSizeXS;
});

var ProcessHash = _react.default.memo(function (_ref2) {
  var contextId = _ref2.contextId,
      eventId = _ref2.eventId,
      processHashMd5 = _ref2.processHashMd5,
      processHashSha1 = _ref2.processHashSha1,
      processHashSha256 = _ref2.processHashSha256;

  if ((0, _helpers.isNillEmptyOrNotFinite)(processHashSha256) && (0, _helpers.isNillEmptyOrNotFinite)(processHashSha1) && (0, _helpers.isNillEmptyOrNotFinite)(processHashMd5)) {
    return null;
  }

  return _react.default.createElement(HashFlexGroup, {
    alignItems: "center",
    direction: "column",
    gutterSize: "none"
  }, !(0, _helpers.isNillEmptyOrNotFinite)(processHashSha256) && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "div"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.hash.sha256",
    iconType: "number",
    value: processHashSha256
  })), !(0, _helpers.isNillEmptyOrNotFinite)(processHashSha1) && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "div"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.hash.sha1",
    iconType: "number",
    value: processHashSha1
  })), !(0, _helpers.isNillEmptyOrNotFinite)(processHashMd5) && _react.default.createElement(_helpers.TokensFlexItem, {
    grow: false,
    component: "div"
  }, _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    eventId: eventId,
    field: "process.hash.md5",
    iconType: "number",
    value: processHashMd5
  })));
});

exports.ProcessHash = ProcessHash;
ProcessHash.displayName = 'ProcessHash';