"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenTimelineModalBody = exports.HeaderContainer = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _search_row = require("../search_row");

var _timelines_table = require("../timelines_table");

var _title_row = require("../title_row");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HeaderContainer = _styledComponents.default.div.withConfig({
  displayName: "HeaderContainer",
  componentId: "sc-1p38tvz-0"
})(["width:100%;"]);

exports.HeaderContainer = HeaderContainer;
HeaderContainer.displayName = 'HeaderContainer';
var OpenTimelineModalBody = (0, _react.memo)(function (_ref) {
  var deleteTimelines = _ref.deleteTimelines,
      defaultPageSize = _ref.defaultPageSize,
      _ref$hideActions = _ref.hideActions,
      hideActions = _ref$hideActions === void 0 ? [] : _ref$hideActions,
      isLoading = _ref.isLoading,
      itemIdToExpandedNotesRowMap = _ref.itemIdToExpandedNotesRowMap,
      onAddTimelinesToFavorites = _ref.onAddTimelinesToFavorites,
      onDeleteSelected = _ref.onDeleteSelected,
      onlyFavorites = _ref.onlyFavorites,
      onOpenTimeline = _ref.onOpenTimeline,
      onQueryChange = _ref.onQueryChange,
      onSelectionChange = _ref.onSelectionChange,
      onTableChange = _ref.onTableChange,
      onToggleOnlyFavorites = _ref.onToggleOnlyFavorites,
      onToggleShowNotes = _ref.onToggleShowNotes,
      pageIndex = _ref.pageIndex,
      pageSize = _ref.pageSize,
      query = _ref.query,
      searchResults = _ref.searchResults,
      selectedItems = _ref.selectedItems,
      sortDirection = _ref.sortDirection,
      sortField = _ref.sortField,
      title = _ref.title,
      totalSearchResultsCount = _ref.totalSearchResultsCount;
  var actionsToShow = (0, _react.useMemo)(function () {
    var actions = onDeleteSelected != null && deleteTimelines != null ? ['delete', 'duplicate'] : ['duplicate'];
    return actions.filter(function (action) {
      return !hideActions.includes(action);
    });
  }, [onDeleteSelected, deleteTimelines, hideActions]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(HeaderContainer, null, _react.default.createElement(_title_row.TitleRow, {
    "data-test-subj": "title-row",
    onAddTimelinesToFavorites: onAddTimelinesToFavorites,
    selectedTimelinesCount: selectedItems.length,
    title: title
  }), _react.default.createElement(_search_row.SearchRow, {
    "data-test-subj": "search-row",
    onlyFavorites: onlyFavorites,
    onQueryChange: onQueryChange,
    onToggleOnlyFavorites: onToggleOnlyFavorites,
    query: query,
    totalSearchResultsCount: totalSearchResultsCount
  }))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_timelines_table.TimelinesTable, {
    actionTimelineToShow: actionsToShow,
    "data-test-subj": "timelines-table",
    deleteTimelines: deleteTimelines,
    defaultPageSize: defaultPageSize,
    loading: isLoading,
    itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap,
    onOpenTimeline: onOpenTimeline,
    onSelectionChange: onSelectionChange,
    onTableChange: onTableChange,
    onToggleShowNotes: onToggleShowNotes,
    pageIndex: pageIndex,
    pageSize: pageSize,
    searchResults: searchResults,
    showExtendedColumns: false,
    sortDirection: sortDirection,
    sortField: sortField,
    totalSearchResultsCount: totalSearchResultsCount
  })));
});
exports.OpenTimelineModalBody = OpenTimelineModalBody;
OpenTimelineModalBody.displayName = 'OpenTimelineModalBody';