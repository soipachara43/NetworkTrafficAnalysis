"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderContent = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireDefault(require("react"));

var _truncatable_text = require("../../../../truncatable_text");

var _styles = require("../../../styles");

var _timeline_context = require("../../../timeline_context");

var _sort_indicator = require("../../sort/sort_indicator");

var _header_tooltip_content = require("../header_tooltip_content");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HeaderContentComponent = function HeaderContentComponent(_ref) {
  var _header$label, _header$label2;

  var children = _ref.children,
      header = _ref.header,
      isResizing = _ref.isResizing,
      onClick = _ref.onClick,
      sort = _ref.sort;
  var isLoading = (0, _timeline_context.useTimelineContext)();
  return _react.default.createElement(_styles.EventsHeading, {
    "data-test-subj": "header",
    isLoading: isLoading
  }, header.aggregatable ? _react.default.createElement(_styles.EventsHeadingTitleButton, {
    "data-test-subj": "header-sort-button",
    onClick: !isResizing && !isLoading ? onClick : _fp.noop
  }, _react.default.createElement(_truncatable_text.TruncatableText, {
    "data-test-subj": "header-text-".concat(header.id)
  }, _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "header-tooltip",
    content: _react.default.createElement(_header_tooltip_content.HeaderToolTipContent, {
      header: header
    })
  }, _react.default.createElement(_react.default.Fragment, null, (_header$label = header.label) !== null && _header$label !== void 0 ? _header$label : header.id))), _react.default.createElement(_sort_indicator.SortIndicator, {
    "data-test-subj": "header-sort-indicator",
    sortDirection: (0, _helpers.getSortDirection)({
      header: header,
      sort: sort
    })
  })) : _react.default.createElement(_styles.EventsHeadingTitleSpan, null, _react.default.createElement(_truncatable_text.TruncatableText, {
    "data-test-subj": "header-text-".concat(header.id)
  }, _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "header-tooltip",
    content: _react.default.createElement(_header_tooltip_content.HeaderToolTipContent, {
      header: header
    })
  }, _react.default.createElement(_react.default.Fragment, null, (_header$label2 = header.label) !== null && _header$label2 !== void 0 ? _header$label2 : header.id)))), children);
};

var HeaderContent = _react.default.memo(HeaderContentComponent);

exports.HeaderContent = HeaderContent;