"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Markdown = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var TableHeader = _styledComponents.default.thead.withConfig({
  displayName: "TableHeader",
  componentId: "dlpmsp-0"
})(["font-weight:bold;"]);

var MyBlockquote = _styledComponents.default.div.withConfig({
  displayName: "MyBlockquote",
  componentId: "dlpmsp-1"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["padding:0 ", ";color:", ";border-left:", " solid ", ";"], theme.eui.euiSize, theme.eui.euiColorMediumShade, theme.eui.euiSizeXS, theme.eui.euiColorLightShade);
});

TableHeader.displayName = 'TableHeader';
/** prevents links to the new pages from accessing `window.opener` */

var REL_NOOPENER = 'noopener';
/** prevents search engine manipulation by noting the linked document is not trusted or endorsed by us */

var REL_NOFOLLOW = 'nofollow';
/** prevents the browser from sending the current address as referrer via the Referer HTTP header */

var REL_NOREFERRER = 'noreferrer';

var Markdown = _react.default.memo(function (_ref2) {
  var _ref2$disableLinks = _ref2.disableLinks,
      disableLinks = _ref2$disableLinks === void 0 ? false : _ref2$disableLinks,
      raw = _ref2.raw,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 's' : _ref2$size;
  var markdownRenderers = {
    root: function root(_ref3) {
      var children = _ref3.children;
      return _react.default.createElement(_eui.EuiText, {
        "data-test-subj": "markdown-root",
        grow: true,
        size: size
      }, children);
    },
    table: function table(_ref4) {
      var children = _ref4.children;
      return _react.default.createElement("table", {
        "data-test-subj": "markdown-table",
        className: "euiTable euiTable--responsive"
      }, children);
    },
    tableHead: function tableHead(_ref5) {
      var children = _ref5.children;
      return _react.default.createElement(TableHeader, {
        "data-test-subj": "markdown-table-header"
      }, children);
    },
    tableRow: function tableRow(_ref6) {
      var children = _ref6.children;
      return _react.default.createElement(_eui.EuiTableRow, {
        "data-test-subj": "markdown-table-row"
      }, children);
    },
    tableCell: function tableCell(_ref7) {
      var children = _ref7.children;
      return _react.default.createElement(_eui.EuiTableRowCell, {
        "data-test-subj": "markdown-table-cell"
      }, children);
    },
    link: function link(_ref8) {
      var children = _ref8.children,
          href = _ref8.href;
      return _react.default.createElement(_eui.EuiToolTip, {
        content: href
      }, _react.default.createElement(_eui.EuiLink, {
        href: disableLinks ? undefined : href,
        "data-test-subj": "markdown-link",
        rel: "".concat(REL_NOOPENER, " ").concat(REL_NOFOLLOW, " ").concat(REL_NOREFERRER),
        target: "_blank"
      }, children));
    },
    blockquote: function blockquote(_ref9) {
      var children = _ref9.children;
      return _react.default.createElement(MyBlockquote, null, children);
    }
  };
  return _react.default.createElement(_reactMarkdown.default, {
    "data-test-subj": "markdown",
    linkTarget: "_blank",
    renderers: markdownRenderers,
    source: raw
  });
});

exports.Markdown = Markdown;
Markdown.displayName = 'Markdown';