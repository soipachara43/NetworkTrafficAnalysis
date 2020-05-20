"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subtitle = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Wrapper = _styledComponents.default.div.withConfig({
  displayName: "Wrapper",
  componentId: "sc-8bh6h2-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["margin-top:", ";.siemSubtitle__item{color:", ";font-size:", ";line-height:", ";@media only screen and (min-width:", "){display:inline-block;margin-right:", ";&:last-child{margin-right:0;}}}"], theme.eui.euiSizeS, theme.eui.textColors.subdued, theme.eui.euiFontSizeXS, theme.eui.euiLineHeight, theme.eui.euiBreakpoints.s, theme.eui.euiSize);
});

Wrapper.displayName = 'Wrapper';

var SubtitleItem = _react.default.memo(function (_ref2) {
  var children = _ref2.children,
      _ref2$dataTestSubj = _ref2.dataTestSubj,
      dataTestSubj = _ref2$dataTestSubj === void 0 ? 'header-panel-subtitle' : _ref2$dataTestSubj;

  if (typeof children === 'string') {
    return _react.default.createElement("p", {
      className: "siemSubtitle__item siemSubtitle__item--text",
      "data-test-subj": dataTestSubj
    }, children);
  } else {
    return _react.default.createElement("div", {
      className: "siemSubtitle__item siemSubtitle__item--node",
      "data-test-subj": dataTestSubj
    }, children);
  }
});

SubtitleItem.displayName = 'SubtitleItem';

var Subtitle = _react.default.memo(function (_ref3) {
  var items = _ref3.items;
  return _react.default.createElement(Wrapper, {
    className: "siemSubtitle"
  }, Array.isArray(items) ? items.map(function (item, i) {
    return _react.default.createElement(SubtitleItem, {
      key: i
    }, item);
  }) : _react.default.createElement(SubtitleItem, null, items));
});

exports.Subtitle = Subtitle;
Subtitle.displayName = 'Subtitle';