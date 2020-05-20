"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategoryColumns = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../event_details/helpers");

var _page = require("../page");

var _timeline_context = require("../timeline/timeline_context");

var _with_hover_actions = require("../with_hover_actions");

var _helpers2 = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var CategoryName = _styledComponents.default.span.withConfig({
  displayName: "CategoryName",
  componentId: "tv866n-0"
})([".euiText{font-weight:", ";}"], function (_ref) {
  var bold = _ref.bold;
  return bold ? 'bold' : 'normal';
});

CategoryName.displayName = 'CategoryName';
var HoverActionsContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "HoverActionsContainer",
  componentId: "tv866n-1"
})(["cursor:default;left:5px;padding:8px;position:absolute;top:-8px;"]);
HoverActionsContainer.displayName = 'HoverActionsContainer';
var HoverActionsFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "HoverActionsFlexGroup",
  componentId: "tv866n-2"
})(["cursor:pointer;"]);
HoverActionsFlexGroup.displayName = 'HoverActionsFlexGroup';

var LinkContainer = _styledComponents.default.div.withConfig({
  displayName: "LinkContainer",
  componentId: "tv866n-3"
})(["width:100%;.euiLink{width:100%;}"]);

LinkContainer.displayName = 'LinkContainer';

var ToolTip = _react.default.memo(function (_ref2) {
  var categoryId = _ref2.categoryId,
      browserFields = _ref2.browserFields,
      onUpdateColumns = _ref2.onUpdateColumns;
  var isLoading = (0, _react.useContext)(_timeline_context.TimelineContext);
  return _react.default.createElement(_eui.EuiToolTip, {
    content: i18n.VIEW_CATEGORY(categoryId)
  }, !isLoading ? _react.default.createElement(_eui.EuiIcon, {
    "aria-label": i18n.VIEW_CATEGORY(categoryId),
    color: "text",
    onClick: function onClick() {
      onUpdateColumns((0, _helpers.getColumnsWithTimestamp)({
        browserFields: browserFields,
        category: categoryId
      }));
    },
    type: "visTable"
  }) : _react.default.createElement(_helpers2.LoadingSpinner, {
    size: "m"
  }));
});

ToolTip.displayName = 'ToolTip';
/**
 * Returns the column definition for the (single) column that displays all the
 * category names in the field browser */

var getCategoryColumns = function getCategoryColumns(_ref3) {
  var browserFields = _ref3.browserFields,
      filteredBrowserFields = _ref3.filteredBrowserFields,
      onCategorySelected = _ref3.onCategorySelected,
      onUpdateColumns = _ref3.onUpdateColumns,
      selectedCategoryId = _ref3.selectedCategoryId,
      timelineId = _ref3.timelineId;
  return [{
    field: 'categoryId',
    name: '',
    sortable: true,
    truncateText: false,
    render: function render(categoryId, _) {
      return _react.default.createElement(LinkContainer, null, _react.default.createElement(_eui.EuiLink, {
        "data-test-subj": "category-link",
        onClick: function onClick() {
          return onCategorySelected(categoryId);
        }
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        gutterSize: "none",
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_with_hover_actions.WithHoverActions, {
        hoverContent: _react.default.createElement(HoverActionsContainer, {
          "data-test-subj": "hover-actions-container",
          paddingSize: "none"
        }, _react.default.createElement(HoverActionsFlexGroup, {
          alignItems: "center",
          direction: "row",
          gutterSize: "none",
          justifyContent: "spaceBetween"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(ToolTip, {
          categoryId: categoryId,
          browserFields: browserFields,
          onUpdateColumns: onUpdateColumns
        })))),
        render: function render() {
          return _react.default.createElement(CategoryName, {
            bold: categoryId === selectedCategoryId,
            className: (0, _helpers2.getCategoryPaneCategoryClassName)({
              categoryId: categoryId,
              timelineId: timelineId
            })
          }, _react.default.createElement(_eui.EuiText, {
            size: "xs"
          }, categoryId));
        }
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_page.CountBadge, {
        "data-test-subj": "".concat(categoryId, "-category-count"),
        color: "hollow"
      }, (0, _helpers2.getFieldCount)(filteredBrowserFields[categoryId]))))));
    }
  }];
};

exports.getCategoryColumns = getCategoryColumns;