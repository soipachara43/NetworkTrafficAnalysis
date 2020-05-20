"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulOpenTimeline = exports.StatefulOpenTimelineComponent = exports.getSelectedTimelineIds = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _default_headers = require("../../components/timeline/body/column_headers/default_headers");

var _persist = require("../../containers/timeline/delete/persist.gql_query");

var _all = require("../../containers/timeline/all");

var _index = require("../../containers/timeline/all/index.gql_query");

var _store = require("../../store");

var _defaults = require("../../store/timeline/defaults");

var _actions = require("../../store/timeline/actions");

var _open_timeline = require("./open_timeline");

var _helpers = require("./helpers");

var _open_timeline_modal_body = require("./open_timeline_modal/open_timeline_modal_body");

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/** Returns a collection of selected timeline ids */
var getSelectedTimelineIds = function getSelectedTimelineIds(selectedItems) {
  return selectedItems.reduce(function (validSelections, timelineResult) {
    return timelineResult.savedObjectId != null ? [].concat(_toConsumableArray(validSelections), [timelineResult.savedObjectId]) : validSelections;
  }, []);
};
/** Manages the state (e.g table selection) of the (pure) `OpenTimeline` component */


exports.getSelectedTimelineIds = getSelectedTimelineIds;

var StatefulOpenTimelineComponent = _react.default.memo(function (_ref) {
  var apolloClient = _ref.apolloClient,
      closeModalTimeline = _ref.closeModalTimeline,
      createNewTimeline = _ref.createNewTimeline,
      defaultPageSize = _ref.defaultPageSize,
      _ref$hideActions = _ref.hideActions,
      hideActions = _ref$hideActions === void 0 ? [] : _ref$hideActions,
      _ref$isModal = _ref.isModal,
      isModal = _ref$isModal === void 0 ? false : _ref$isModal,
      importDataModalToggle = _ref.importDataModalToggle,
      onOpenTimeline = _ref.onOpenTimeline,
      setImportDataModalToggle = _ref.setImportDataModalToggle,
      timeline = _ref.timeline,
      title = _ref.title,
      updateTimeline = _ref.updateTimeline,
      updateIsLoading = _ref.updateIsLoading;

  /** Required by EuiTable for expandable rows: a map of `TimelineResult.savedObjectId` to rendered notes */
  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      itemIdToExpandedNotesRowMap = _useState2[0],
      setItemIdToExpandedNotesRowMap = _useState2[1];
  /** Only query for favorite timelines when true */


  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      onlyFavorites = _useState4[0],
      setOnlyFavorites = _useState4[1];
  /** The requested page of results */


  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      pageIndex = _useState6[0],
      setPageIndex = _useState6[1];
  /** The requested size of each page of search results */


  var _useState7 = (0, _react.useState)(defaultPageSize),
      _useState8 = _slicedToArray(_useState7, 2),
      pageSize = _useState8[0],
      setPageSize = _useState8[1];
  /** The current search criteria */


  var _useState9 = (0, _react.useState)(''),
      _useState10 = _slicedToArray(_useState9, 2),
      search = _useState10[0],
      setSearch = _useState10[1];
  /** The currently-selected timelines in the table */


  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      selectedItems = _useState12[0],
      setSelectedItems = _useState12[1];
  /** The requested sort direction of the query results */


  var _useState13 = (0, _react.useState)(_constants.DEFAULT_SORT_DIRECTION),
      _useState14 = _slicedToArray(_useState13, 2),
      sortDirection = _useState14[0],
      setSortDirection = _useState14[1];
  /** The requested field to sort on */


  var _useState15 = (0, _react.useState)(_constants.DEFAULT_SORT_FIELD),
      _useState16 = _slicedToArray(_useState15, 2),
      sortField = _useState16[0],
      setSortField = _useState16[1];
  /** Invoked when the user presses enters to submit the text in the search input */


  var onQueryChange = (0, _react.useCallback)(function (query) {
    setSearch(query.queryText.trim());
  }, []);
  /** Focuses the input that filters the field browser */

  var focusInput = function focusInput() {
    var elements = document.querySelector(".".concat(_helpers.OPEN_TIMELINE_CLASS_NAME, " input"));

    if (elements != null) {
      elements.focus();
    }
  };
  /* This feature will be implemented in the near future, so we are keeping it to know what to do */

  /** Invoked when the user clicks the action to add the selected timelines to favorites */
  // const onAddTimelinesToFavorites: OnAddTimelinesToFavorites = () => {
  // const { addTimelinesToFavorites } = this.props;
  // const { selectedItems } = this.state;
  // if (addTimelinesToFavorites != null) {
  //   addTimelinesToFavorites(getSelectedTimelineIds(selectedItems));
  // TODO: it's not possible to clear the selection state of the newly-favorited
  // items, because we can't pass the selection state as props to the table.
  // See: https://github.com/elastic/eui/issues/1077
  // TODO: the query must re-execute to show the results of the mutation
  // }
  // };


  var onDeleteOneTimeline = (0, _react.useCallback)(function (timelineIds) {
    deleteTimelines(timelineIds, {
      search: search,
      pageInfo: {
        pageIndex: pageIndex + 1,
        pageSize: pageSize
      },
      sort: {
        sortField: sortField,
        sortOrder: sortDirection
      },
      onlyUserFavorite: onlyFavorites
    });
  }, [search, pageIndex, pageSize, sortField, sortDirection, onlyFavorites]);
  /** Invoked when the user clicks the action to delete the selected timelines */

  var onDeleteSelected = (0, _react.useCallback)(function () {
    deleteTimelines(getSelectedTimelineIds(selectedItems), {
      search: search,
      pageInfo: {
        pageIndex: pageIndex + 1,
        pageSize: pageSize
      },
      sort: {
        sortField: sortField,
        sortOrder: sortDirection
      },
      onlyUserFavorite: onlyFavorites
    }); // NOTE: we clear the selection state below, but if the server fails to
    // delete a timeline, it will remain selected in the table:

    resetSelectionState(); // TODO: the query must re-execute to show the results of the deletion
  }, [selectedItems, search, pageIndex, pageSize, sortField, sortDirection, onlyFavorites]);
  /** Invoked when the user selects (or de-selects) timelines */

  var onSelectionChange = (0, _react.useCallback)(function (newSelectedItems) {
    setSelectedItems(newSelectedItems); // <-- this is NOT passed down as props to the table: https://github.com/elastic/eui/issues/1077
  }, []);
  /** Invoked by the EUI table implementation when the user interacts with the table (i.e. to update sorting) */

  var onTableChange = (0, _react.useCallback)(function (_ref2) {
    var page = _ref2.page,
        sort = _ref2.sort;
    var index = page.index,
        size = page.size;
    var field = sort.field,
        direction = sort.direction;
    setPageIndex(index);
    setPageSize(size);
    setSortDirection(direction);
    setSortField(field);
  }, []);
  /** Invoked when the user toggles the option to only view favorite timelines */

  var onToggleOnlyFavorites = (0, _react.useCallback)(function () {
    setOnlyFavorites(!onlyFavorites);
  }, [onlyFavorites]);
  /** Invoked when the user toggles the expansion or collapse of inline notes in a table row */

  var onToggleShowNotes = (0, _react.useCallback)(function (newItemIdToExpandedNotesRowMap) {
    setItemIdToExpandedNotesRowMap(newItemIdToExpandedNotesRowMap);
  }, []);
  /** Resets the selection state such that all timelines are unselected */

  var resetSelectionState = (0, _react.useCallback)(function () {
    setSelectedItems([]);
  }, []);
  var openTimeline = (0, _react.useCallback)(function (_ref3) {
    var duplicate = _ref3.duplicate,
        timelineId = _ref3.timelineId;

    if (isModal && closeModalTimeline != null) {
      closeModalTimeline();
    }

    (0, _helpers.queryTimelineById)({
      apolloClient: apolloClient,
      duplicate: duplicate,
      onOpenTimeline: onOpenTimeline,
      timelineId: timelineId,
      updateIsLoading: updateIsLoading,
      updateTimeline: updateTimeline
    });
  }, [apolloClient, updateIsLoading, updateTimeline]);
  var deleteTimelines = (0, _react.useCallback)(function (timelineIds, variables) {
    if (timelineIds.includes(timeline.savedObjectId || '')) {
      createNewTimeline({
        id: 'timeline-1',
        columns: _default_headers.defaultHeaders,
        show: false
      });
    }

    apolloClient.mutate({
      mutation: _persist.deleteTimelineMutation,
      fetchPolicy: 'no-cache',
      variables: {
        id: timelineIds
      },
      refetchQueries: [{
        query: _index.allTimelinesQuery,
        variables: variables
      }]
    });
  }, [apolloClient, createNewTimeline, timeline]);
  (0, _react.useEffect)(function () {
    focusInput();
  }, []);
  return _react.default.createElement(_all.AllTimelinesQuery, {
    pageInfo: {
      pageIndex: pageIndex + 1,
      pageSize: pageSize
    },
    search: search,
    sort: {
      sortField: sortField,
      sortOrder: sortDirection
    },
    onlyUserFavorite: onlyFavorites
  }, function (_ref4) {
    var timelines = _ref4.timelines,
        loading = _ref4.loading,
        totalCount = _ref4.totalCount,
        refetch = _ref4.refetch;
    return !isModal ? _react.default.createElement(_open_timeline.OpenTimeline, {
      "data-test-subj": 'open-timeline',
      deleteTimelines: onDeleteOneTimeline,
      defaultPageSize: defaultPageSize,
      isLoading: loading,
      itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap,
      importDataModalToggle: importDataModalToggle,
      onAddTimelinesToFavorites: undefined,
      onDeleteSelected: onDeleteSelected,
      onlyFavorites: onlyFavorites,
      onOpenTimeline: openTimeline,
      onQueryChange: onQueryChange,
      onSelectionChange: onSelectionChange,
      onTableChange: onTableChange,
      onToggleOnlyFavorites: onToggleOnlyFavorites,
      onToggleShowNotes: onToggleShowNotes,
      pageIndex: pageIndex,
      pageSize: pageSize,
      query: search,
      refetch: refetch,
      searchResults: timelines,
      setImportDataModalToggle: setImportDataModalToggle,
      selectedItems: selectedItems,
      sortDirection: sortDirection,
      sortField: sortField,
      title: title,
      totalSearchResultsCount: totalCount
    }) : _react.default.createElement(_open_timeline_modal_body.OpenTimelineModalBody, {
      "data-test-subj": 'open-timeline-modal',
      deleteTimelines: onDeleteOneTimeline,
      defaultPageSize: defaultPageSize,
      hideActions: hideActions,
      isLoading: loading,
      itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap,
      onAddTimelinesToFavorites: undefined,
      onlyFavorites: onlyFavorites,
      onOpenTimeline: openTimeline,
      onQueryChange: onQueryChange,
      onSelectionChange: onSelectionChange,
      onTableChange: onTableChange,
      onToggleOnlyFavorites: onToggleOnlyFavorites,
      onToggleShowNotes: onToggleShowNotes,
      pageIndex: pageIndex,
      pageSize: pageSize,
      query: search,
      searchResults: timelines,
      selectedItems: selectedItems,
      sortDirection: sortDirection,
      sortField: sortField,
      title: title,
      totalSearchResultsCount: totalCount
    });
  });
});

exports.StatefulOpenTimelineComponent = StatefulOpenTimelineComponent;

var makeMapStateToProps = function makeMapStateToProps() {
  var getTimeline = _store.timelineSelectors.getTimelineByIdSelector();

  var mapStateToProps = function mapStateToProps(state) {
    var _getTimeline;

    var timeline = (_getTimeline = getTimeline(state, 'timeline-1')) !== null && _getTimeline !== void 0 ? _getTimeline : _defaults.timelineDefaults;
    return {
      timeline: timeline
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    createNewTimeline: function createNewTimeline(_ref5) {
      var id = _ref5.id,
          columns = _ref5.columns,
          show = _ref5.show;
      return dispatch((0, _actions.createTimeline)({
        id: id,
        columns: columns,
        show: show
      }));
    },
    updateIsLoading: function updateIsLoading(_ref6) {
      var id = _ref6.id,
          isLoading = _ref6.isLoading;
      return dispatch((0, _actions.updateIsLoading)({
        id: id,
        isLoading: isLoading
      }));
    },
    updateTimeline: (0, _helpers.dispatchUpdateTimeline)(dispatch)
  };
};

var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var StatefulOpenTimeline = connector(StatefulOpenTimelineComponent);
exports.StatefulOpenTimeline = StatefulOpenTimeline;