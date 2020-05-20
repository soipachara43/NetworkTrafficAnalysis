"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsBrowser = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _categories_pane = require("./categories_pane");

var _fields_pane = require("./fields_pane");

var _header = require("./header");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FieldsBrowserContainer = _styledComponents.default.div.withConfig({
  displayName: "FieldsBrowserContainer",
  componentId: "sc-14w4fm4-0"
})(["background-color:", ";border:", " solid ", ";border-radius:", ";left:0;padding:", " ", " ", ";position:absolute;top:calc(100% + ", ");width:", "px;z-index:9990;"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiColorLightestShade;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.eui.euiBorderWidthThin;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.eui.euiColorMediumShade;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.eui.euiBorderRadius;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.eui.paddingSizes.s;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.eui.paddingSizes.s;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.eui.paddingSizes.m;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.eui.euiSize;
}, function (_ref9) {
  var width = _ref9.width;
  return width;
});

FieldsBrowserContainer.displayName = 'FieldsBrowserContainer';
var PanesFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "PanesFlexGroup",
  componentId: "sc-14w4fm4-1"
})(["width:", "px;"], _helpers.PANES_FLEX_GROUP_WIDTH);
PanesFlexGroup.displayName = 'PanesFlexGroup';

/**
 * This component has no internal state, but it uses lifecycle methods to
 * set focus to the search input, scroll to the selected category, etc
 */
var FieldsBrowserComponent = function FieldsBrowserComponent(_ref10) {
  var browserFields = _ref10.browserFields,
      columnHeaders = _ref10.columnHeaders,
      filteredBrowserFields = _ref10.filteredBrowserFields,
      isEventViewer = _ref10.isEventViewer,
      isSearching = _ref10.isSearching,
      onCategorySelected = _ref10.onCategorySelected,
      onFieldSelected = _ref10.onFieldSelected,
      onHideFieldBrowser = _ref10.onHideFieldBrowser,
      onSearchInputChange = _ref10.onSearchInputChange,
      onOutsideClick = _ref10.onOutsideClick,
      onUpdateColumns = _ref10.onUpdateColumns,
      searchInput = _ref10.searchInput,
      selectedCategoryId = _ref10.selectedCategoryId,
      timelineId = _ref10.timelineId,
      toggleColumn = _ref10.toggleColumn,
      width = _ref10.width;

  /** Focuses the input that filters the field browser */
  var focusInput = function focusInput() {
    var elements = document.getElementsByClassName((0, _helpers.getFieldBrowserSearchInputClassName)(timelineId));

    if (elements.length > 0) {
      elements[0].focus(); // this cast is required because focus() does not exist on every `Element` returned by `getElementsByClassName`
    }
  };
  /** Invoked when the user types in the input to filter the field browser */


  var onInputChange = (0, _react.useCallback)(function (event) {
    onSearchInputChange(event.target.value);
  }, [onSearchInputChange]);
  var selectFieldAndHide = (0, _react.useCallback)(function (fieldId) {
    if (onFieldSelected != null) {
      onFieldSelected(fieldId);
    }

    onHideFieldBrowser();
  }, [onFieldSelected, onHideFieldBrowser]);

  var scrollViews = function scrollViews() {
    if (selectedCategoryId !== '') {
      var categoryPaneTitles = document.getElementsByClassName((0, _helpers.getCategoryPaneCategoryClassName)({
        categoryId: selectedCategoryId,
        timelineId: timelineId
      }));

      if (categoryPaneTitles.length > 0) {
        categoryPaneTitles[0].scrollIntoView();
      }

      var fieldPaneTitles = document.getElementsByClassName((0, _helpers.getFieldBrowserCategoryTitleClassName)({
        categoryId: selectedCategoryId,
        timelineId: timelineId
      }));

      if (fieldPaneTitles.length > 0) {
        fieldPaneTitles[0].scrollIntoView();
      }
    }

    focusInput(); // always re-focus the input to enable additional filtering
  };

  (0, _react.useEffect)(function () {
    scrollViews();
  }, [selectedCategoryId, timelineId]);
  return _react.default.createElement(_eui.EuiOutsideClickDetector, {
    "data-test-subj": "outside-click-detector",
    onOutsideClick: onFieldSelected != null ? _fp.noop : onOutsideClick,
    isDisabled: false
  }, _react.default.createElement(FieldsBrowserContainer, {
    "data-test-subj": "fields-browser-container",
    width: width
  }, _react.default.createElement(_header.Header, {
    "data-test-subj": "header",
    filteredBrowserFields: filteredBrowserFields,
    isEventViewer: isEventViewer,
    isSearching: isSearching,
    onOutsideClick: onOutsideClick,
    onSearchInputChange: onInputChange,
    onUpdateColumns: onUpdateColumns,
    searchInput: searchInput,
    timelineId: timelineId
  }), _react.default.createElement(PanesFlexGroup, {
    alignItems: "flexStart",
    gutterSize: "none",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_categories_pane.CategoriesPane, {
    browserFields: browserFields,
    "data-test-subj": "left-categories-pane",
    filteredBrowserFields: filteredBrowserFields,
    width: _helpers.CATEGORY_PANE_WIDTH,
    onCategorySelected: onCategorySelected,
    onUpdateColumns: onUpdateColumns,
    selectedCategoryId: selectedCategoryId,
    timelineId: timelineId
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_fields_pane.FieldsPane, {
    columnHeaders: columnHeaders,
    "data-test-subj": "fields-pane",
    filteredBrowserFields: filteredBrowserFields,
    onCategorySelected: onCategorySelected,
    onFieldSelected: selectFieldAndHide,
    onUpdateColumns: onUpdateColumns,
    searchInput: searchInput,
    selectedCategoryId: selectedCategoryId,
    timelineId: timelineId,
    toggleColumn: toggleColumn,
    width: _helpers.FIELDS_PANE_WIDTH
  })))));
};

var FieldsBrowser = _react.default.memo(FieldsBrowserComponent);

exports.FieldsBrowser = FieldsBrowser;