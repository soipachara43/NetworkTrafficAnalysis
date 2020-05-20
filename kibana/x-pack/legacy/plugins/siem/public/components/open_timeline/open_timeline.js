"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenTimeline = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _helpers = require("./helpers");

var _search_row = require("./search_row");

var _timelines_table = require("./timelines_table");

var _title_row = require("./title_row");

var _import_data_modal = require("../import_data_modal");

var i18n = _interopRequireWildcard(require("./translations"));

var _api = require("../../containers/timeline/all/api");

var _utility_bar = require("../utility_bar");

var _edit_timeline_batch_actions = require("./edit_timeline_batch_actions");

var _edit_timeline_actions = require("./edit_timeline_actions");

var _export_timeline = require("./export_timeline");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OpenTimeline = _react.default.memo(function (_ref) {
  var _ref2;

  var deleteTimelines = _ref.deleteTimelines,
      defaultPageSize = _ref.defaultPageSize,
      isLoading = _ref.isLoading,
      itemIdToExpandedNotesRowMap = _ref.itemIdToExpandedNotesRowMap,
      importDataModalToggle = _ref.importDataModalToggle,
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
      refetch = _ref.refetch,
      searchResults = _ref.searchResults,
      selectedItems = _ref.selectedItems,
      sortDirection = _ref.sortDirection,
      setImportDataModalToggle = _ref.setImportDataModalToggle,
      sortField = _ref.sortField,
      title = _ref.title,
      totalSearchResultsCount = _ref.totalSearchResultsCount;
  var tableRef = (0, _react.useRef)();

  var _useEditTimelineActio = (0, _edit_timeline_actions.useEditTimelineActions)(),
      actionItem = _useEditTimelineActio.actionItem,
      enableExportTimelineDownloader = _useEditTimelineActio.enableExportTimelineDownloader,
      isEnableDownloader = _useEditTimelineActio.isEnableDownloader,
      isDeleteTimelineModalOpen = _useEditTimelineActio.isDeleteTimelineModalOpen,
      onOpenDeleteTimelineModal = _useEditTimelineActio.onOpenDeleteTimelineModal,
      onCompleteEditTimelineAction = _useEditTimelineActio.onCompleteEditTimelineAction;

  var _useEditTimelinBatchA = (0, _edit_timeline_batch_actions.useEditTimelinBatchActions)({
    deleteTimelines: deleteTimelines,
    selectedItems: selectedItems,
    tableRef: tableRef
  }),
      getBatchItemsPopoverContent = _useEditTimelinBatchA.getBatchItemsPopoverContent;

  var nTimelines = (0, _react.useMemo)(function () {
    return _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.siem.open.timeline.showingNTimelinesLabel",
      defaultMessage: "{totalSearchResultsCount} {totalSearchResultsCount, plural, one {timeline} other {timelines}} {with}",
      values: {
        totalSearchResultsCount: totalSearchResultsCount,
        with: _react.default.createElement("span", {
          "data-test-subj": "selectable-query-text"
        }, query.trim().length ? "".concat(i18n.WITH, " \"").concat(query.trim(), "\"") : '')
      }
    });
  }, [totalSearchResultsCount, query]);
  var actionItemId = (0, _react.useMemo)(function () {
    return actionItem != null && actionItem.savedObjectId != null ? [actionItem.savedObjectId] : [];
  }, [actionItem]);
  var onRefreshBtnClick = (0, _react.useCallback)(function () {
    if (refetch != null) {
      refetch();
    }
  }, [refetch]);
  var handleCloseModal = (0, _react.useCallback)(function () {
    if (setImportDataModalToggle != null) {
      setImportDataModalToggle(false);
    }
  }, [setImportDataModalToggle]);
  var handleComplete = (0, _react.useCallback)(function () {
    if (setImportDataModalToggle != null) {
      setImportDataModalToggle(false);
    }

    if (refetch != null) {
      refetch();
    }
  }, [setImportDataModalToggle, refetch]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_export_timeline.EditOneTimelineAction, {
    deleteTimelines: deleteTimelines,
    ids: actionItemId,
    isDeleteTimelineModalOpen: isDeleteTimelineModalOpen,
    isEnableDownloader: isEnableDownloader,
    onComplete: onCompleteEditTimelineAction,
    title: (_ref2 = actionItem === null || actionItem === void 0 ? void 0 : actionItem.title) !== null && _ref2 !== void 0 ? _ref2 : i18n.UNTITLED_TIMELINE
  }), _react.default.createElement(_import_data_modal.ImportDataModal, {
    checkBoxLabel: i18n.OVERWRITE_WITH_SAME_NAME,
    closeModal: handleCloseModal,
    description: i18n.SELECT_TIMELINE,
    errorMessage: i18n.IMPORT_FAILED,
    failedDetailed: i18n.IMPORT_FAILED_DETAILED,
    importComplete: handleComplete,
    importData: _api.importTimelines,
    successMessage: i18n.SUCCESSFULLY_IMPORTED_TIMELINES,
    showCheckBox: false,
    showModal: importDataModalToggle !== null && importDataModalToggle !== void 0 ? importDataModalToggle : false,
    submitBtnText: i18n.IMPORT_TIMELINE_BTN_TITLE,
    subtitle: i18n.INITIAL_PROMPT_TEXT,
    title: i18n.IMPORT_TIMELINE
  }), _react.default.createElement(_eui.EuiPanel, {
    className: _helpers.OPEN_TIMELINE_CLASS_NAME
  }, _react.default.createElement(_title_row.TitleRow, {
    "data-test-subj": "title-row",
    onAddTimelinesToFavorites: onAddTimelinesToFavorites,
    selectedTimelinesCount: selectedItems.length,
    title: title
  }, _react.default.createElement(_search_row.SearchRow, {
    "data-test-subj": "search-row",
    onlyFavorites: onlyFavorites,
    onQueryChange: onQueryChange,
    onToggleOnlyFavorites: onToggleOnlyFavorites,
    query: query,
    totalSearchResultsCount: totalSearchResultsCount
  })), _react.default.createElement(_utility_bar.UtilityBar, {
    border: true
  }, _react.default.createElement(_utility_bar.UtilityBarSection, null, _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, {
    "data-test-subj": "query-message"
  }, _react.default.createElement(_react.default.Fragment, null, i18n.SHOWING, " ", nTimelines))), _react.default.createElement(_utility_bar.UtilityBarGroup, null, _react.default.createElement(_utility_bar.UtilityBarText, null, i18n.SELECTED_TIMELINES(selectedItems.length)), _react.default.createElement(_utility_bar.UtilityBarAction, {
    iconSide: "right",
    iconType: "arrowDown",
    popoverContent: getBatchItemsPopoverContent
  }, i18n.BATCH_ACTIONS), _react.default.createElement(_utility_bar.UtilityBarAction, {
    iconSide: "right",
    iconType: "refresh",
    onClick: onRefreshBtnClick
  }, i18n.REFRESH)))), _react.default.createElement(_timelines_table.TimelinesTable, {
    actionTimelineToShow: (0, _react.useMemo)(function () {
      return onDeleteSelected != null && deleteTimelines != null ? ['delete', 'duplicate', 'export', 'selectable'] : ['duplicate', 'export', 'selectable'];
    }, [onDeleteSelected, deleteTimelines]),
    "data-test-subj": "timelines-table",
    deleteTimelines: deleteTimelines,
    defaultPageSize: defaultPageSize,
    loading: isLoading,
    itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap,
    enableExportTimelineDownloader: enableExportTimelineDownloader,
    onOpenDeleteTimelineModal: onOpenDeleteTimelineModal,
    onOpenTimeline: onOpenTimeline,
    onSelectionChange: onSelectionChange,
    onTableChange: onTableChange,
    onToggleShowNotes: onToggleShowNotes,
    pageIndex: pageIndex,
    pageSize: pageSize,
    searchResults: searchResults,
    showExtendedColumns: true,
    sortDirection: sortDirection,
    sortField: sortField,
    tableRef: tableRef,
    totalSearchResultsCount: totalSearchResultsCount
  })));
});

exports.OpenTimeline = OpenTimeline;
OpenTimeline.displayName = 'OpenTimeline';