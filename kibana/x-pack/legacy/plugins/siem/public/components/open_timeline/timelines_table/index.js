"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelinesTable = exports.getTimelinesTableColumns = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var i18n = _interopRequireWildcard(require("../translations"));

var _actions_columns = require("./actions_columns");

var _common_columns = require("./common_columns");

var _extended_columns = require("./extended_columns");

var _icon_header_columns = require("./icon_header_columns");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// there are a number of type mismatches across this file
var EuiBasicTable = _eui.EuiBasicTable; // eslint-disable-line @typescript-eslint/no-explicit-any

var BasicTable = (0, _styledComponents.default)(EuiBasicTable).withConfig({
  displayName: "BasicTable",
  componentId: "sc-1aobq6e-0"
})([".euiTableCellContent{animation:none;}.euiTableRow-isExpandedRow .euiTableCellContent__text{width:100%;}"]);
BasicTable.displayName = 'BasicTable';

var getExtendedColumnsIfEnabled = function getExtendedColumnsIfEnabled(showExtendedColumns) {
  return showExtendedColumns ? _toConsumableArray((0, _extended_columns.getExtendedColumns)()) : [];
};
/**
 * Returns the column definitions (passed as the `columns` prop to
 * `EuiBasicTable`) that are displayed in the compact `Open Timeline` modal
 * view, and the full view shown in the `All Timelines` view of the
 * `Timelines` page
 */


var getTimelinesTableColumns = function getTimelinesTableColumns(_ref) {
  var actionTimelineToShow = _ref.actionTimelineToShow,
      deleteTimelines = _ref.deleteTimelines,
      enableExportTimelineDownloader = _ref.enableExportTimelineDownloader,
      itemIdToExpandedNotesRowMap = _ref.itemIdToExpandedNotesRowMap,
      onOpenDeleteTimelineModal = _ref.onOpenDeleteTimelineModal,
      onOpenTimeline = _ref.onOpenTimeline,
      onToggleShowNotes = _ref.onToggleShowNotes,
      showExtendedColumns = _ref.showExtendedColumns;
  return [].concat(_toConsumableArray((0, _common_columns.getCommonColumns)({
    itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap,
    onOpenTimeline: onOpenTimeline,
    onToggleShowNotes: onToggleShowNotes
  })), _toConsumableArray(getExtendedColumnsIfEnabled(showExtendedColumns)), _toConsumableArray((0, _icon_header_columns.getIconHeaderColumns)()), _toConsumableArray((0, _actions_columns.getActionsColumns)({
    actionTimelineToShow: actionTimelineToShow,
    deleteTimelines: deleteTimelines,
    enableExportTimelineDownloader: enableExportTimelineDownloader,
    onOpenDeleteTimelineModal: onOpenDeleteTimelineModal,
    onOpenTimeline: onOpenTimeline
  })));
};

exports.getTimelinesTableColumns = getTimelinesTableColumns;

/**
 * Renders a table that displays metadata about timelines, (i.e. name,
 * description, etc.)
 */
var TimelinesTable = _react.default.memo(function (_ref2) {
  var actionTimelineToShow = _ref2.actionTimelineToShow,
      deleteTimelines = _ref2.deleteTimelines,
      defaultPageSize = _ref2.defaultPageSize,
      isLoading = _ref2.loading,
      itemIdToExpandedNotesRowMap = _ref2.itemIdToExpandedNotesRowMap,
      enableExportTimelineDownloader = _ref2.enableExportTimelineDownloader,
      onOpenDeleteTimelineModal = _ref2.onOpenDeleteTimelineModal,
      onOpenTimeline = _ref2.onOpenTimeline,
      onSelectionChange = _ref2.onSelectionChange,
      onTableChange = _ref2.onTableChange,
      onToggleShowNotes = _ref2.onToggleShowNotes,
      pageIndex = _ref2.pageIndex,
      pageSize = _ref2.pageSize,
      searchResults = _ref2.searchResults,
      showExtendedColumns = _ref2.showExtendedColumns,
      sortField = _ref2.sortField,
      sortDirection = _ref2.sortDirection,
      tableRef = _ref2.tableRef,
      totalSearchResultsCount = _ref2.totalSearchResultsCount;
  var pagination = {
    hidePerPageOptions: !showExtendedColumns,
    pageIndex: pageIndex,
    pageSize: pageSize,
    pageSizeOptions: [Math.floor(Math.max(defaultPageSize, 1) / 2), defaultPageSize, defaultPageSize * 2],
    totalItemCount: totalSearchResultsCount
  };
  var sorting = {
    sort: {
      field: sortField,
      direction: sortDirection
    }
  };
  var selection = {
    selectable: function selectable(timelineResult) {
      return timelineResult.savedObjectId != null;
    },
    selectableMessage: function selectableMessage(selectable) {
      return !selectable ? i18n.MISSING_SAVED_OBJECT_ID : undefined;
    },
    onSelectionChange: onSelectionChange
  };
  var basicTableProps = tableRef != null ? {
    ref: tableRef
  } : {};
  return _react.default.createElement(BasicTable, _extends({
    columns: getTimelinesTableColumns({
      actionTimelineToShow: actionTimelineToShow,
      deleteTimelines: deleteTimelines,
      itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap,
      enableExportTimelineDownloader: enableExportTimelineDownloader,
      onOpenDeleteTimelineModal: onOpenDeleteTimelineModal,
      onOpenTimeline: onOpenTimeline,
      onSelectionChange: onSelectionChange,
      onToggleShowNotes: onToggleShowNotes,
      showExtendedColumns: showExtendedColumns
    }),
    compressed: true,
    "data-test-subj": "timelines-table",
    isExpandable: true,
    isSelectable: actionTimelineToShow.includes('selectable'),
    itemId: "savedObjectId",
    itemIdToExpandedRowMap: itemIdToExpandedNotesRowMap,
    items: searchResults,
    loading: isLoading,
    noItemsMessage: i18n.ZERO_TIMELINES_MATCH,
    onChange: onTableChange,
    pagination: pagination,
    selection: actionTimelineToShow.includes('selectable') ? selection : undefined,
    sorting: sorting
  }, basicTableProps));
});

exports.TimelinesTable = TimelinesTable;
TimelinesTable.displayName = 'TimelinesTable';