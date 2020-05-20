"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryTitle = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("./helpers");

var _page = require("../page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CountBadgeContainer = _styledComponents.default.div.withConfig({
  displayName: "CountBadgeContainer",
  componentId: "bai2wm-0"
})(["position:relative;top:-3px;"]);

CountBadgeContainer.displayName = 'CountBadgeContainer';

var CategoryTitle = _react.default.memo(function (_ref) {
  var filteredBrowserFields = _ref.filteredBrowserFields,
      categoryId = _ref.categoryId,
      timelineId = _ref.timelineId;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    "data-test-subj": "category-title-container",
    gutterSize: "none"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    className: (0, _helpers.getFieldBrowserCategoryTitleClassName)({
      categoryId: categoryId,
      timelineId: timelineId
    }),
    "data-test-subj": "selected-category-title",
    size: "xxs"
  }, _react.default.createElement("h5", null, categoryId))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(CountBadgeContainer, null, _react.default.createElement(_page.CountBadge, {
    "data-test-subj": "selected-category-count-badge",
    color: "hollow"
  }, (0, _helpers.getFieldCount)(filteredBrowserFields[categoryId])))));
});

exports.CategoryTitle = CategoryTitle;
CategoryTitle.displayName = 'CategoryTitle';