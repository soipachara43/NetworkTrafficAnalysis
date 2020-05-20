"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuricataDetails = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _netflow = require("../netflow");

var _suricata_signature = require("./suricata_signature");

var _suricata_refs = require("./suricata_refs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Details = _styledComponents.default.div.withConfig({
  displayName: "Details",
  componentId: "nhaahu-0"
})(["margin:5px 0;"]);

Details.displayName = 'Details';

var SuricataDetails = _react.default.memo(function (_ref) {
  var data = _ref.data,
      timelineId = _ref.timelineId;
  var signature = (0, _fp.get)('suricata.eve.alert.signature[0]', data);
  var signatureId = (0, _fp.get)('suricata.eve.alert.signature_id[0]', data);

  if (signatureId != null && signature != null) {
    return _react.default.createElement(Details, null, _react.default.createElement(_suricata_signature.SuricataSignature, {
      contextId: "suricata-signature-".concat(timelineId, "-").concat(data._id),
      id: data._id,
      signature: signature,
      signatureId: signatureId
    }), _react.default.createElement(_suricata_refs.SuricataRefs, {
      signatureId: signatureId
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_netflow.NetflowRenderer, {
      data: data,
      timelineId: timelineId
    }));
  } else {
    return null;
  }
});

exports.SuricataDetails = SuricataDetails;
SuricataDetails.displayName = 'SuricataDetails';