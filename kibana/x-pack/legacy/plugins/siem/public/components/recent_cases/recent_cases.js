"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentCases = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _redirect_to_case = require("../link_to/redirect_to_case");

var _markdown = require("../markdown");

var _use_get_url_search = require("../navigation/use_get_url_search");

var _home_navigations = require("../../pages/home/home_navigations");

var _counts = require("../recent_timelines/counts");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MarkdownContainer = _styledComponents.default.div.withConfig({
  displayName: "MarkdownContainer",
  componentId: "sc-1dlnznp-0"
})(["max-height:150px;overflow-y:auto;width:300px;"]);

var RecentCasesComponent = function RecentCasesComponent(_ref) {
  var cases = _ref.cases;
  var search = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);
  return _react.default.createElement(_react.default.Fragment, null, cases.map(function (c, i) {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      key: c.id,
      gutterSize: "none",
      justifyContent: "spaceBetween"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_eui.EuiLink, {
      href: (0, _redirect_to_case.getCaseDetailsUrl)({
        id: c.id,
        search: search
      })
    }, c.title)), _react.default.createElement(_counts.IconWithCount, {
      count: c.totalComment,
      icon: 'editorComment',
      tooltip: i18n.COMMENTS
    }), c.description && c.description.length && _react.default.createElement(MarkdownContainer, null, _react.default.createElement(_eui.EuiText, {
      color: "subdued",
      size: "xs"
    }, _react.default.createElement(_markdown.Markdown, {
      disableLinks: true,
      raw: c.description
    }))), i !== cases.length - 1 && _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    })));
  }));
};

RecentCasesComponent.displayName = 'RecentCasesComponent';

var RecentCases = _react.default.memo(RecentCasesComponent);

exports.RecentCases = RecentCases;