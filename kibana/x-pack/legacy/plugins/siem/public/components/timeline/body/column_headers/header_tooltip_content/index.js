"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderToolTipContent = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../../../../event_details/helpers");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IconType = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "IconType",
  componentId: "sc-1mrqkae-0"
})(["margin-right:3px;position:relative;top:-2px;"]);
IconType.displayName = 'IconType';

var P = _styledComponents.default.p.withConfig({
  displayName: "P",
  componentId: "sc-1mrqkae-1"
})(["margin-bottom:5px;"]);

P.displayName = 'P';

var ToolTipTableMetadata = _styledComponents.default.span.withConfig({
  displayName: "ToolTipTableMetadata",
  componentId: "sc-1mrqkae-2"
})(["margin-right:5px;"]);

ToolTipTableMetadata.displayName = 'ToolTipTableMetadata';

var ToolTipTableValue = _styledComponents.default.span.withConfig({
  displayName: "ToolTipTableValue",
  componentId: "sc-1mrqkae-3"
})(["word-wrap:break-word;"]);

ToolTipTableValue.displayName = 'ToolTipTableValue';

var HeaderToolTipContent = _react.default.memo(function (_ref) {
  var header = _ref.header;
  return _react.default.createElement(_react.default.Fragment, null, !(0, _fp.isEmpty)(header.category) && _react.default.createElement(P, null, _react.default.createElement(ToolTipTableMetadata, {
    "data-test-subj": "category"
  }, i18n.CATEGORY, ':'), _react.default.createElement(ToolTipTableValue, {
    "data-test-subj": "category-value"
  }, header.category)), _react.default.createElement(P, null, _react.default.createElement(ToolTipTableMetadata, {
    "data-test-subj": "field"
  }, i18n.FIELD, ':'), _react.default.createElement(ToolTipTableValue, {
    "data-test-subj": "field-value"
  }, header.id)), _react.default.createElement(P, null, _react.default.createElement(ToolTipTableMetadata, {
    "data-test-subj": "type"
  }, i18n.TYPE, ':'), _react.default.createElement(ToolTipTableValue, null, _react.default.createElement(IconType, {
    "data-test-subj": "type-icon",
    type: (0, _helpers.getIconFromType)(header.type)
  }), _react.default.createElement("span", {
    "data-test-subj": "type-value"
  }, header.type))), !(0, _fp.isEmpty)(header.description) && _react.default.createElement(P, null, _react.default.createElement(ToolTipTableMetadata, {
    "data-test-subj": "description"
  }, i18n.DESCRIPTION, ':'), _react.default.createElement(ToolTipTableValue, {
    "data-test-subj": "description-value"
  }, header.description)));
});

exports.HeaderToolTipContent = HeaderToolTipContent;
HeaderToolTipContent.displayName = 'HeaderToolTipContent';