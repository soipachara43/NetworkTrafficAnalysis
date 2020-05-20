"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZeekDetails = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _netflow = require("../netflow");

var _zeek_signature = require("./zeek_signature");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Details = _styledComponents.default.div.withConfig({
  displayName: "Details",
  componentId: "e7cscz-0"
})(["margin:5px 0;"]);

Details.displayName = 'Details';

var ZeekDetails = _react.default.memo(function (_ref) {
  var data = _ref.data,
      timelineId = _ref.timelineId;
  return data.zeek != null ? _react.default.createElement(Details, null, _react.default.createElement(_zeek_signature.ZeekSignature, {
    data: data,
    timelineId: timelineId
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_netflow.NetflowRenderer, {
    data: data,
    timelineId: timelineId
  })) : null;
});

exports.ZeekDetails = ZeekDetails;
ZeekDetails.displayName = 'ZeekDetails';