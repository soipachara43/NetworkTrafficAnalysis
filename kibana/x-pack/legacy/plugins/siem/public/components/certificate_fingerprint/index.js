"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CertificateFingerprint = exports.TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME = exports.TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME = void 0;

var _eui = require("@elastic/eui");

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
var TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME = 'tls.client_certificate.fingerprint.sha1';
exports.TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME = TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME;
var TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME = 'tls.server_certificate.fingerprint.sha1';
exports.TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME = TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME;

var FingerprintLabel = _styledComponents.default.span.withConfig({
  displayName: "FingerprintLabel",
  componentId: "sc-1d0en54-0"
})(["margin-right:5px;"]);

FingerprintLabel.displayName = 'FingerprintLabel';
/**
 * Represents a field containing a certificate fingerprint (e.g. a sha1), with
 * a link to an external site, which in-turn compares the fingerprint against a
 * set of known fingerprints
 * Examples:
 * 'tls.client_certificate.fingerprint.sha1'
 * 'tls.server_certificate.fingerprint.sha1'
 */

var CertificateFingerprint = _react.default.memo(function (_ref) {
  var eventId = _ref.eventId,
      certificateType = _ref.certificateType,
      contextId = _ref.contextId,
      fieldName = _ref.fieldName,
      value = _ref.value;
  return _react.default.createElement(_draggables.DraggableBadge, {
    contextId: contextId,
    "data-test-subj": "".concat(certificateType, "-certificate-fingerprint"),
    eventId: eventId,
    field: fieldName,
    iconType: "snowflake",
    tooltipContent: _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement("span", null, fieldName)),
    value: value
  }, _react.default.createElement(FingerprintLabel, {
    "data-test-subj": "fingerprint-label"
  }, certificateType === 'client' ? i18n.CLIENT_CERT : i18n.SERVER_CERT), _react.default.createElement(_links.CertificateFingerprintLink, {
    certificateFingerprint: value || ''
  }), _react.default.createElement(_external_link_icon.ExternalLinkIcon, null));
});

exports.CertificateFingerprint = CertificateFingerprint;
CertificateFingerprint.displayName = 'CertificateFingerprint';