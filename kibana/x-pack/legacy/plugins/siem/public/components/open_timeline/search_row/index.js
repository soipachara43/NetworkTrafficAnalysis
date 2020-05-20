"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchRow = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SearchRowContainer = _styledComponents.default.div.withConfig({
  displayName: "SearchRowContainer",
  componentId: "sc-1allm2m-0"
})(["&:not(:last-child){margin-bottom:", ";}"], function (props) {
  return props.theme.eui.euiSizeL;
});

SearchRowContainer.displayName = 'SearchRowContainer';
var SearchRowFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "SearchRowFlexGroup",
  componentId: "sc-1allm2m-1"
})(["margin-bottom:", ";"], function (props) {
  return props.theme.eui.euiSizeXS;
});
SearchRowFlexGroup.displayName = 'SearchRowFlexGroup';
var searchBox = {
  placeholder: i18n.SEARCH_PLACEHOLDER,
  incremental: false
};
/**
 * Renders the row containing the search input and Only Favorites filter
 */

var SearchRow = _react.default.memo(function (_ref) {
  var onlyFavorites = _ref.onlyFavorites,
      onQueryChange = _ref.onQueryChange,
      onToggleOnlyFavorites = _ref.onToggleOnlyFavorites,
      query = _ref.query,
      totalSearchResultsCount = _ref.totalSearchResultsCount;
  return _react.default.createElement(SearchRowContainer, null, _react.default.createElement(SearchRowFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSearchBar, {
    "data-test-subj": "search-bar",
    box: searchBox,
    onChange: onQueryChange
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiFilterButton, {
    "data-test-subj": "only-favorites-toggle",
    hasActiveFilters: onlyFavorites,
    onClick: onToggleOnlyFavorites
  }, i18n.ONLY_FAVORITES)))));
});

exports.SearchRow = SearchRow;
SearchRow.displayName = 'SearchRow';