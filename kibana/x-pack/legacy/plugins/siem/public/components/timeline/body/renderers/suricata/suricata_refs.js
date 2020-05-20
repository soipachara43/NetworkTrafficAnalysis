"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuricataRefs = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _external_link_icon = require("../../../../external_link_icon");

var _suricata_links = require("./suricata_links");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LinkEuiFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "LinkEuiFlexItem",
  componentId: "sc-1islbaw-0"
})(["display:inline;"]);
LinkEuiFlexItem.displayName = 'LinkEuiFlexItem';

var SuricataRefs = _react.default.memo(function (_ref) {
  var signatureId = _ref.signatureId;
  var links = (0, _suricata_links.getLinksFromSignature)(signatureId);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    justifyContent: "center",
    wrap: true
  }, links.map(function (link) {
    return _react.default.createElement(LinkEuiFlexItem, {
      key: link,
      grow: false
    }, _react.default.createElement(_eui.EuiLink, {
      href: link,
      color: "subdued",
      target: "_blank"
    }, link), _react.default.createElement(_external_link_icon.ExternalLinkIcon, null));
  }));
});

exports.SuricataRefs = SuricataRefs;
SuricataRefs.displayName = 'SuricataRefs';