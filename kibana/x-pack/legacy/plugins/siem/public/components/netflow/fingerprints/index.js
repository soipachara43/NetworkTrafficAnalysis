"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fingerprints = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _certificate_fingerprint = require("../../certificate_fingerprint");

var _ja3_fingerprint = require("../../ja3_fingerprint");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Renders rows of draggable badges containing ja3 and certificate fingerprints
 * (i.e. sha1 hashes)
 */
var Fingerprints = _react.default.memo(function (_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      tlsClientCertificateFingerprintSha1 = _ref.tlsClientCertificateFingerprintSha1,
      tlsFingerprintsJa3Hash = _ref.tlsFingerprintsJa3Hash,
      tlsServerCertificateFingerprintSha1 = _ref.tlsServerCertificateFingerprintSha1;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    "data-test-subj": "fingerprints-group",
    direction: "column",
    justifyContent: "center",
    gutterSize: "none"
  }, tlsFingerprintsJa3Hash != null ? (0, _fp.uniq)(tlsFingerprintsJa3Hash).map(function (ja3) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: ja3
    }, _react.default.createElement(_ja3_fingerprint.Ja3Fingerprint, {
      eventId: eventId,
      fieldName: _ja3_fingerprint.JA3_HASH_FIELD_NAME,
      contextId: contextId,
      value: ja3
    }));
  }) : null, tlsClientCertificateFingerprintSha1 != null ? (0, _fp.uniq)(tlsClientCertificateFingerprintSha1).map(function (clientCert) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: clientCert
    }, _react.default.createElement(_certificate_fingerprint.CertificateFingerprint, {
      eventId: eventId,
      certificateType: "client",
      contextId: contextId,
      fieldName: _certificate_fingerprint.TLS_CLIENT_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME,
      value: clientCert
    }));
  }) : null, tlsServerCertificateFingerprintSha1 != null ? (0, _fp.uniq)(tlsServerCertificateFingerprintSha1).map(function (serverCert) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: serverCert
    }, _react.default.createElement(_certificate_fingerprint.CertificateFingerprint, {
      eventId: eventId,
      certificateType: "server",
      contextId: contextId,
      fieldName: _certificate_fingerprint.TLS_SERVER_CERTIFICATE_FINGERPRINT_SHA1_FIELD_NAME,
      value: serverCert
    }));
  }) : null);
});

exports.Fingerprints = Fingerprints;
Fingerprints.displayName = 'Fingerprints';