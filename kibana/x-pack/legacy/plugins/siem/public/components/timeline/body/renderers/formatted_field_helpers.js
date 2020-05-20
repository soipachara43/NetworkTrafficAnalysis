"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderRulReference = exports.renderEventModule = exports.renderRuleName = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _draggables = require("../../../draggables");

var _empty_value = require("../../../empty_value");

var _redirect_to_detection_engine = require("../../../link_to/redirect_to_detection_engine");

var _truncatable_text = require("../../../truncatable_text");

var _helpers = require("../../../../pages/detection_engine/rules/components/step_about_rule/helpers");

var _color = _interopRequireDefault(require("../../../../utils/logo_endpoint/64_color.svg"));

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var renderRuleName = function renderRuleName(_ref) {
  var contextId = _ref.contextId,
      eventId = _ref.eventId,
      fieldName = _ref.fieldName,
      linkValue = _ref.linkValue,
      truncate = _ref.truncate,
      value = _ref.value;
  var ruleName = "".concat(value);
  var ruleId = linkValue;
  var content = truncate ? _react.default.createElement(_truncatable_text.TruncatableText, null, value) : value;
  return (0, _fp.isString)(value) && ruleName.length > 0 && ruleId != null ? _react.default.createElement(_draggables.DefaultDraggable, {
    field: fieldName,
    id: "event-details-value-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value, "-").concat(ruleId),
    tooltipContent: value,
    value: value
  }, _react.default.createElement(_eui.EuiLink, {
    href: (0, _redirect_to_detection_engine.getRuleDetailsUrl)(ruleId)
  }, content)) : (0, _empty_value.getEmptyTagValue)();
};

exports.renderRuleName = renderRuleName;

var canYouAddEndpointLogo = function canYouAddEndpointLogo(moduleName, endpointUrl) {
  return moduleName.trim().toLocaleLowerCase() === 'endgame' && endpointUrl != null && !(0, _fp.isEmpty)(endpointUrl) && !(0, _helpers.isUrlInvalid)(endpointUrl) && endpointUrl.includes('/alerts/');
};

var renderEventModule = function renderEventModule(_ref2) {
  var contextId = _ref2.contextId,
      eventId = _ref2.eventId,
      fieldName = _ref2.fieldName,
      linkValue = _ref2.linkValue,
      truncate = _ref2.truncate,
      value = _ref2.value;
  var moduleName = "".concat(value);
  var endpointRefUrl = linkValue;
  var content = truncate ? _react.default.createElement(_truncatable_text.TruncatableText, null, value) : value;
  return (0, _fp.isString)(value) && moduleName.length > 0 ? _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none",
    alignItems: "center",
    justifyContent: endpointRefUrl != null && !(0, _fp.isEmpty)(endpointRefUrl) ? 'flexStart' : 'spaceBetween'
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_draggables.DefaultDraggable, {
    field: fieldName,
    id: "event-details-value-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value, "-").concat(moduleName),
    tooltipContent: value,
    value: value
  }, content)), endpointRefUrl != null && canYouAddEndpointLogo(moduleName, endpointRefUrl) && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "event-module-link-to-elastic-endpoint-security",
    content: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, i18n.LINK_ELASTIC_ENDPOINT_SECURITY), _react.default.createElement("p", null, endpointRefUrl))
  }, _react.default.createElement(_eui.EuiLink, {
    href: endpointRefUrl,
    target: "_blank"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: _color.default,
    size: "m"
  }))))) : (0, _empty_value.getEmptyTagValue)();
};

exports.renderEventModule = renderEventModule;

var renderRulReference = function renderRulReference(_ref3) {
  var contextId = _ref3.contextId,
      eventId = _ref3.eventId,
      fieldName = _ref3.fieldName,
      linkValue = _ref3.linkValue,
      truncate = _ref3.truncate,
      value = _ref3.value;
  var referenceUrlName = "".concat(value);
  var content = truncate ? _react.default.createElement(_truncatable_text.TruncatableText, null, value) : value;
  return (0, _fp.isString)(value) && referenceUrlName.length > 0 ? _react.default.createElement(_draggables.DefaultDraggable, {
    field: fieldName,
    id: "event-details-value-default-draggable-".concat(contextId, "-").concat(eventId, "-").concat(fieldName, "-").concat(value, "-").concat(referenceUrlName),
    tooltipContent: value,
    value: value
  }, !(0, _helpers.isUrlInvalid)(referenceUrlName) && _react.default.createElement(_eui.EuiLink, {
    target: "_blank",
    href: referenceUrlName
  }, content), (0, _helpers.isUrlInvalid)(referenceUrlName) && _react.default.createElement(_react.default.Fragment, null, content)) : (0, _empty_value.getEmptyTagValue)();
};

exports.renderRulReference = renderRulReference;