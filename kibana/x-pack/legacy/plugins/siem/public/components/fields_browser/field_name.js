"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldName = exports.FieldNameContainer = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _with_copy_to_clipboard = require("../../lib/clipboard/with_copy_to_clipboard");

var _timeline_context = require("../timeline/timeline_context");

var _with_hover_actions = require("../with_hover_actions");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * The name of a (draggable) field
 */
var FieldNameContainer = _styledComponents.default.span.withConfig({
  displayName: "FieldNameContainer",
  componentId: "sc-15tygnh-0"
})(["border-radius:4px;padding:0 4px 0 8px;position:relative;&::before{background-image:linear-gradient( 135deg,", " 25%,transparent 25% ),linear-gradient(-135deg,", " 25%,transparent 25%),linear-gradient(135deg,transparent 75%,", " 75%),linear-gradient(-135deg,transparent 75%,", " 75%);background-position:0 0,1px 0,1px -1px,0px 1px;background-size:2px 2px;bottom:2px;content:'';display:block;left:2px;position:absolute;top:2px;width:4px;}&:hover,&:focus{transition:background-color 0.7s ease;background-color:#000;color:#fff;&::before{background-image:linear-gradient(135deg,#fff 25%,transparent 25%),linear-gradient( -135deg,", " 25%,transparent 25% ),linear-gradient( 135deg,transparent 75%,", " 75% ),linear-gradient( -135deg,transparent 75%,", " 75% );}}"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiColorMediumShade;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiColorMediumShade;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiColorMediumShade;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.eui.euiColorMediumShade;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.eui.euiColorLightestShade;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.eui.euiColorLightestShade;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.eui.euiColorLightestShade;
});

exports.FieldNameContainer = FieldNameContainer;
FieldNameContainer.displayName = 'FieldNameContainer';
var HoverActionsContainer = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "HoverActionsContainer",
  componentId: "sc-15tygnh-1"
})(["cursor:default;left:5px;padding:4px;position:absolute;top:-6px;"]);
HoverActionsContainer.displayName = 'HoverActionsContainer';
var HoverActionsFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "HoverActionsFlexGroup",
  componentId: "sc-15tygnh-2"
})(["cursor:pointer;"]);
HoverActionsFlexGroup.displayName = 'HoverActionsFlexGroup';
var ViewCategoryIcon = (0, _styledComponents.default)(_eui.EuiIcon).withConfig({
  displayName: "ViewCategoryIcon",
  componentId: "sc-15tygnh-3"
})(["margin-left:5px;"]);
ViewCategoryIcon.displayName = 'ViewCategoryIcon';

var ViewCategory = _react.default.memo(function (_ref8) {
  var categoryId = _ref8.categoryId,
      onUpdateColumns = _ref8.onUpdateColumns,
      categoryColumns = _ref8.categoryColumns;
  var isLoading = (0, _react.useContext)(_timeline_context.TimelineContext);
  return _react.default.createElement(_eui.EuiToolTip, {
    content: i18n.VIEW_CATEGORY(categoryId)
  }, !isLoading ? _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": i18n.VIEW_CATEGORY(categoryId),
    color: "text",
    "data-test-subj": "view-category",
    onClick: function onClick() {
      onUpdateColumns(categoryColumns);
    },
    iconType: "visTable"
  }) : _react.default.createElement(_helpers.LoadingSpinner, {
    size: "m"
  }));
});

ViewCategory.displayName = 'ViewCategory';
/** Renders a field name in it's non-dragging state */

var FieldName = _react.default.memo(function (_ref9) {
  var categoryId = _ref9.categoryId,
      categoryColumns = _ref9.categoryColumns,
      fieldId = _ref9.fieldId,
      _ref9$highlight = _ref9.highlight,
      highlight = _ref9$highlight === void 0 ? '' : _ref9$highlight,
      onUpdateColumns = _ref9.onUpdateColumns;
  return _react.default.createElement(_with_hover_actions.WithHoverActions, {
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
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: i18n.COPY_TO_CLIPBOARD
    }, _react.default.createElement(_with_copy_to_clipboard.WithCopyToClipboard, {
      "data-test-subj": "copy-to-clipboard",
      text: fieldId,
      titleSummary: i18n.FIELD
    }))), categoryColumns.length > 0 && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(ViewCategory, {
      categoryId: categoryId,
      categoryColumns: categoryColumns,
      onUpdateColumns: onUpdateColumns
    })))),
    render: function render() {
      return _react.default.createElement(FieldNameContainer, null, _react.default.createElement(_eui.EuiText, {
        size: "xs"
      }, _react.default.createElement(_eui.EuiHighlight, {
        "data-test-subj": "field-name-".concat(fieldId),
        search: highlight
      }, fieldId)));
    }
  });
});

exports.FieldName = FieldName;
FieldName.displayName = 'FieldName';