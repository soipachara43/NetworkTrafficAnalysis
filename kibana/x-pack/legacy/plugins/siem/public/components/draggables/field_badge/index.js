"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableFieldBadge = void 0;

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Field = _styledComponents.default.div.attrs(function (_ref) {
  var width = _ref.width;

  if (width) {
    return {
      style: {
        width: "".concat(width, "px")
      }
    };
  }
}).withConfig({
  displayName: "Field",
  componentId: "x83y5l-0"
})(["background-color:", ";border:", ";box-shadow:0 2px 2px -1px ", ",0 1px 5px -2px ", ";font-size:", ";font-weight:", ";line-height:", ";padding:", ";"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiColorEmptyShade;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiBorderThin;
}, function (_ref4) {
  var theme = _ref4.theme;
  return (0, _polished.rgba)(theme.eui.euiColorMediumShade, 0.3);
}, function (_ref5) {
  var theme = _ref5.theme;
  return (0, _polished.rgba)(theme.eui.euiColorMediumShade, 0.3);
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.eui.euiFontSizeXS;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.eui.euiFontWeightSemiBold;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.eui.euiLineHeight;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.eui.paddingSizes.xs;
});

Field.displayName = 'Field';
/**
 * Renders a field (e.g. `event.action`) as a draggable badge
 */

var DraggableFieldBadge = _react.default.memo(function (_ref10) {
  var fieldId = _ref10.fieldId,
      fieldWidth = _ref10.fieldWidth;
  return _react.default.createElement(Field, {
    "data-test-subj": "field",
    width: fieldWidth
  }, fieldId);
});

exports.DraggableFieldBadge = DraggableFieldBadge;
DraggableFieldBadge.displayName = 'DraggableFieldBadge';