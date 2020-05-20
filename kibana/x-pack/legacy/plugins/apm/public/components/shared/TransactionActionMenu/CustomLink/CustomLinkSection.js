"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomLinkSection = void 0;

var _eui = require("@elastic/eui");

var _mustache = _interopRequireDefault(require("mustache"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LinkContainer = _styledComponents.default.li.withConfig({
  displayName: "LinkContainer",
  componentId: "z4anlk-0"
})(["margin-top:", ";&:first-of-type{margin-top:0;}"], (0, _variables.px)(_variables.units.half));

var TruncateText = (0, _styledComponents.default)(_eui.EuiText).withConfig({
  displayName: "TruncateText",
  componentId: "z4anlk-1"
})(["font-weight:500;line-height:", ";", ""], (0, _variables.px)(_variables.units.unit), (0, _variables.truncate)((0, _variables.px)(_variables.units.unit * 25)));

var CustomLinkSection = function CustomLinkSection(_ref) {
  var customLinks = _ref.customLinks,
      transaction = _ref.transaction;
  return _react.default.createElement("ul", null, customLinks.map(function (link) {
    var href = link.url;

    try {
      href = _mustache.default.render(link.url, transaction);
    } catch (e) {// ignores any error that happens
    }

    return _react.default.createElement(LinkContainer, {
      key: link.id
    }, _react.default.createElement(_eui.EuiLink, {
      href: href,
      target: "_blank"
    }, _react.default.createElement(TruncateText, {
      size: "s"
    }, link.label)));
  }));
};

exports.CustomLinkSection = CustomLinkSection;