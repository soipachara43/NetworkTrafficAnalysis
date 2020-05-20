"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _category_title = require("./category_title");

var _field_items = require("./field_items");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TableContainer = _styledComponents.default.div.withConfig({
  displayName: "TableContainer",
  componentId: "joosk6-0"
})(["", ";overflow-x:hidden;overflow-y:auto;", ";"], function (_ref) {
  var height = _ref.height;
  return "height: ".concat(height, "px");
}, function (_ref2) {
  var width = _ref2.width;
  return "width: ".concat(width, "px");
});

TableContainer.displayName = 'TableContainer';

var Category = _react.default.memo(function (_ref3) {
  var categoryId = _ref3.categoryId,
      filteredBrowserFields = _ref3.filteredBrowserFields,
      fieldItems = _ref3.fieldItems,
      timelineId = _ref3.timelineId,
      width = _ref3.width;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_category_title.CategoryTitle, {
    categoryId: categoryId,
    filteredBrowserFields: filteredBrowserFields,
    timelineId: timelineId
  }), _react.default.createElement(TableContainer, {
    className: "euiTable--compressed",
    "data-test-subj": "category-table-container",
    height: _helpers.TABLE_HEIGHT,
    width: width
  }, _react.default.createElement(_eui.EuiInMemoryTable, {
    items: fieldItems,
    columns: (0, _field_items.getFieldColumns)(),
    pagination: false,
    sorting: true
  })));
});

exports.Category = Category;
Category.displayName = 'Category';