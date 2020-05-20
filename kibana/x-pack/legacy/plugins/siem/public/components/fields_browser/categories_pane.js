"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesPane = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _category_columns = require("./category_columns");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CategoryNames = _styledComponents.default.div.withConfig({
  displayName: "CategoryNames",
  componentId: "sc-3gi5zq-0"
})(["", ";overflow:auto;padding:5px;", ";thead{display:none;}"], function (_ref) {
  var height = _ref.height;
  return "height: ".concat(height, "px");
}, function (_ref2) {
  var width = _ref2.width;
  return "width: ".concat(width, "px");
});

CategoryNames.displayName = 'CategoryNames';
var Title = (0, _styledComponents.default)(_eui.EuiTitle).withConfig({
  displayName: "Title",
  componentId: "sc-3gi5zq-1"
})(["padding-left:5px;"]);
Title.displayName = 'Title';

var CategoriesPane = _react.default.memo(function (_ref3) {
  var browserFields = _ref3.browserFields,
      filteredBrowserFields = _ref3.filteredBrowserFields,
      onCategorySelected = _ref3.onCategorySelected,
      onUpdateColumns = _ref3.onUpdateColumns,
      selectedCategoryId = _ref3.selectedCategoryId,
      timelineId = _ref3.timelineId,
      width = _ref3.width;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Title, {
    size: "xxs"
  }, _react.default.createElement("h5", {
    "data-test-subj": "categories-pane-title"
  }, i18n.CATEGORIES)), _react.default.createElement(CategoryNames, {
    className: "euiTable--compressed",
    "data-test-subj": "categories-container",
    height: _helpers.TABLE_HEIGHT,
    width: width
  }, _react.default.createElement(_eui.EuiInMemoryTable, {
    columns: (0, _category_columns.getCategoryColumns)({
      browserFields: browserFields,
      filteredBrowserFields: filteredBrowserFields,
      onCategorySelected: onCategorySelected,
      onUpdateColumns: onUpdateColumns,
      selectedCategoryId: selectedCategoryId,
      timelineId: timelineId
    }),
    items: Object.keys(filteredBrowserFields).sort().map(function (categoryId) {
      return {
        categoryId: categoryId
      };
    }),
    message: i18n.NO_FIELDS_MATCH,
    pagination: false,
    sorting: false
  })));
});

exports.CategoriesPane = CategoriesPane;
CategoriesPane.displayName = 'CategoriesPane';