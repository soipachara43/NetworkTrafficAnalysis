"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsPane = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _category = require("./category");

var _field_items = require("./field_items");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NoFieldsPanel = _styledComponents.default.div.withConfig({
  displayName: "NoFieldsPanel",
  componentId: "vzij45-0"
})(["background-color:", ";width:", "px;height:", "px;"], function (props) {
  return props.theme.eui.euiColorLightestShade;
}, _helpers.FIELDS_PANE_WIDTH, _helpers.TABLE_HEIGHT);

NoFieldsPanel.displayName = 'NoFieldsPanel';
var NoFieldsFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "NoFieldsFlexGroup",
  componentId: "vzij45-1"
})(["height:100%;"]);
NoFieldsFlexGroup.displayName = 'NoFieldsFlexGroup';

var FieldsPane = _react.default.memo(function (_ref) {
  var columnHeaders = _ref.columnHeaders,
      filteredBrowserFields = _ref.filteredBrowserFields,
      onCategorySelected = _ref.onCategorySelected,
      onUpdateColumns = _ref.onUpdateColumns,
      searchInput = _ref.searchInput,
      selectedCategoryId = _ref.selectedCategoryId,
      timelineId = _ref.timelineId,
      toggleColumn = _ref.toggleColumn,
      width = _ref.width;
  return _react.default.createElement(_react.default.Fragment, null, Object.keys(filteredBrowserFields).length > 0 ? _react.default.createElement(_category.Category, {
    categoryId: selectedCategoryId,
    "data-test-subj": "category",
    filteredBrowserFields: filteredBrowserFields,
    fieldItems: (0, _field_items.getFieldItems)({
      browserFields: filteredBrowserFields,
      category: filteredBrowserFields[selectedCategoryId],
      categoryId: selectedCategoryId,
      columnHeaders: columnHeaders,
      highlight: searchInput,
      onUpdateColumns: onUpdateColumns,
      timelineId: timelineId,
      toggleColumn: toggleColumn
    }),
    width: width,
    onCategorySelected: onCategorySelected,
    timelineId: timelineId
  }) : _react.default.createElement(NoFieldsPanel, null, _react.default.createElement(NoFieldsFlexGroup, {
    alignItems: "center",
    gutterSize: "none",
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("h3", {
    "data-test-subj": "no-fields-match"
  }, i18n.NO_FIELDS_MATCH_INPUT(searchInput))))));
});

exports.FieldsPane = FieldsPane;
FieldsPane.displayName = 'FieldsPane';