"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuricataSignature = exports.DraggableSignatureId = exports.Tokens = exports.SURICATA_SIGNATURE_ID_FIELD_NAME = exports.SURICATA_SIGNATURE_FIELD_NAME = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _draggable_wrapper = require("../../../../drag_and_drop/draggable_wrapper");

var _helpers = require("../../../../drag_and_drop/helpers");

var _external_link_icon = require("../../../../external_link_icon");

var _links = require("../../../../links");

var _provider = require("../../../../timeline/data_providers/provider");

var _helpers2 = require("../helpers");

var _suricata_links = require("./suricata_links");

var _draggables = require("../../../../draggables");

var _data_provider = require("../../../data_providers/data_provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SURICATA_SIGNATURE_FIELD_NAME = 'suricata.eve.alert.signature';
exports.SURICATA_SIGNATURE_FIELD_NAME = SURICATA_SIGNATURE_FIELD_NAME;
var SURICATA_SIGNATURE_ID_FIELD_NAME = 'suricata.eve.alert.signature_id';
exports.SURICATA_SIGNATURE_ID_FIELD_NAME = SURICATA_SIGNATURE_ID_FIELD_NAME;
var SignatureFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "SignatureFlexItem",
  componentId: "sc-1eyuffi-0"
})(["min-width:77px;"]);
SignatureFlexItem.displayName = 'SignatureFlexItem';
var Badge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "Badge",
  componentId: "sc-1eyuffi-1"
})(["vertical-align:top;"]);
Badge.displayName = 'Badge';
var LinkFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "LinkFlexItem",
  componentId: "sc-1eyuffi-2"
})(["margin-left:6px;"]);
LinkFlexItem.displayName = 'LinkFlexItem';

var Tokens = _react.default.memo(function (_ref) {
  var tokens = _ref.tokens;
  return _react.default.createElement(_react.default.Fragment, null, tokens.map(function (token) {
    return _react.default.createElement(_helpers2.TokensFlexItem, {
      key: token,
      grow: false
    }, _react.default.createElement(_eui.EuiBadge, {
      iconType: "tag",
      color: "hollow"
    }, token));
  }));
});

exports.Tokens = Tokens;
Tokens.displayName = 'Tokens';

var DraggableSignatureId = _react.default.memo(function (_ref2) {
  var id = _ref2.id,
      signatureId = _ref2.signatureId;
  return _react.default.createElement(SignatureFlexItem, {
    grow: false
  }, _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
    dataProvider: {
      and: [],
      enabled: true,
      id: (0, _helpers.escapeDataProviderId)("suricata-draggable-signature-id-".concat(id, "-sig-").concat(signatureId)),
      name: String(signatureId),
      excluded: false,
      kqlQuery: '',
      queryMatch: {
        field: SURICATA_SIGNATURE_ID_FIELD_NAME,
        value: signatureId,
        operator: _data_provider.IS_OPERATOR
      }
    },
    render: function render(dataProvider, _, snapshot) {
      return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
        dataProvider: dataProvider
      })) : _react.default.createElement(_eui.EuiToolTip, {
        "data-test-subj": "signature-id-tooltip",
        content: SURICATA_SIGNATURE_ID_FIELD_NAME
      }, _react.default.createElement(Badge, {
        iconType: "number",
        color: "hollow"
      }, signatureId));
    }
  }));
});

exports.DraggableSignatureId = DraggableSignatureId;
DraggableSignatureId.displayName = 'DraggableSignatureId';

var SuricataSignature = _react.default.memo(function (_ref3) {
  var contextId = _ref3.contextId,
      id = _ref3.id,
      signature = _ref3.signature,
      signatureId = _ref3.signatureId;
  var tokens = (0, _suricata_links.getBeginningTokens)(signature);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    gutterSize: "none",
    wrap: true
  }, _react.default.createElement(DraggableSignatureId, {
    id: "draggable-signature-id-".concat(contextId, "-").concat(id),
    signatureId: signatureId
  }), _react.default.createElement(Tokens, {
    tokens: tokens
  }), _react.default.createElement(LinkFlexItem, {
    grow: false
  }, _react.default.createElement(_draggables.DefaultDraggable, {
    "data-test-subj": "draggable-signature-link",
    field: SURICATA_SIGNATURE_FIELD_NAME,
    id: "suricata-signature-default-draggable-".concat(contextId, "-").concat(id, "-").concat(SURICATA_SIGNATURE_FIELD_NAME),
    value: signature
  }, _react.default.createElement("div", null, _react.default.createElement(_links.GoogleLink, {
    link: signature
  }, signature.split(' ').splice(tokens.length).join(' ')), _react.default.createElement(_external_link_icon.ExternalLinkIcon, null)))));
});

exports.SuricataSignature = SuricataSignature;
SuricataSignature.displayName = 'SuricataSignature';