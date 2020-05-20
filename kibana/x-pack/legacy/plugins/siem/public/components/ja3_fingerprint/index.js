"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ja3Fingerprint = exports.JA3_HASH_FIELD_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggables = require("../draggables");

var _external_link_icon = require("../external_link_icon");

var _links = require("../links");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JA3_HASH_FIELD_NAME = 'tls.fingerprints.ja3.hash';
exports.JA3_HASH_FIELD_NAME = JA3_HASH_FIELD_NAME;

var Ja3FingerprintLabel = _styledComponents.default.span.withConfig({
  displayName: "Ja3FingerprintLabel",
  componentId: "sc-1gqkehp-0"
})(["margin-right:5px;"]);

Ja3FingerprintLabel.displayName = 'Ja3FingerprintLabel';
/**
 * Renders a ja3 fingerprint, which enables (some) clients and servers communicating
 * using TLS traffic to be identified, which is possible because SSL
 * negotiations happen in the clear
 */

var Ja3Fingerprint = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      fieldName = _ref.fieldName,
      value = _ref.value;
  return _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    "data-test-subj": "ja3-hash",
    eventId: eventId,
    field: fieldName,
    iconType: "snowflake",
    value: value
  }, _react.default.createElement(Ja3FingerprintLabel, {
    "data-test-subj": "ja3-fingerprint-label"
  }, i18n.JA3_FINGERPRINT_LABEL), _react.default.createElement(_links.Ja3FingerprintLink, {
    "data-test-subj": "ja3-hash-link",
    ja3Fingerprint: value || ''
  }), _react.default.createElement(_external_link_icon.ExternalLinkIcon, null));
});

exports.Ja3Fingerprint = Ja3Fingerprint;
Ja3Fingerprint.displayName = 'Ja3Fingerprint';