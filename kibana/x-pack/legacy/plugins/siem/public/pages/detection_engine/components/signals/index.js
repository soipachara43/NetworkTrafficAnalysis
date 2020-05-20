"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalsTable = exports.SIGNALS_PAGE_TIMELINE_ID = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _public = require("../../../../../../../../../src/plugins/data/public");

var _fetch_index_patterns = require("../../../../containers/detection_engine/rules/fetch_index_patterns");

var _events_viewer = require("../../../../components/events_viewer");

var _header_section = require("../../../../components/header_section");

var _helpers = require("../../../../components/timeline/helpers");

var _kibana = require("../../../../lib/kibana");

var _store = require("../../../../store");

var _timeline = require("../../../../store/timeline");

var _defaults = require("../../../../store/timeline/defaults");

var _apollo_context = require("../../../../utils/apollo_context");

var _actions = require("./actions");

var _default_config = require("./default_config");

var _signals_filter_group = require("./signals_filter_group");

var _signals_utility_bar = require("./signals_utility_bar");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers2 = require("../../../../components/open_timeline/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SIGNALS_PAGE_TIMELINE_ID = 'signals-page';
exports.SIGNALS_PAGE_TIMELINE_ID = SIGNALS_PAGE_TIMELINE_ID;

var SignalsTableComponent = function SignalsTableComponent(_ref) {
  var canUserCRUD = _ref.canUserCRUD,
      clearEventsDeleted = _ref.clearEventsDeleted,
      clearEventsLoading = _ref.clearEventsLoading,
      clearSelected = _ref.clearSelected,
      defaultFilters = _ref.defaultFilters,
      from = _ref.from,
      globalFilters = _ref.globalFilters,
      globalQuery = _ref.globalQuery,
      hasIndexWrite = _ref.hasIndexWrite,
      isSelectAllChecked = _ref.isSelectAllChecked,
      loading = _ref.loading,
      loadingEventIds = _ref.loadingEventIds,
      selectedEventIds = _ref.selectedEventIds,
      setEventsDeleted = _ref.setEventsDeleted,
      setEventsLoading = _ref.setEventsLoading,
      signalsIndex = _ref.signalsIndex,
      to = _ref.to,
      updateTimeline = _ref.updateTimeline,
      updateTimelineIsLoading = _ref.updateTimelineIsLoading;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      selectAll = _useState2[0],
      setSelectAll = _useState2[1];

  var apolloClient = (0, _apollo_context.useApolloClient)();

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showClearSelectionAction = _useState4[0],
      setShowClearSelectionAction = _useState4[1];

  var _useState5 = (0, _react.useState)(_signals_filter_group.FILTER_OPEN),
      _useState6 = _slicedToArray(_useState5, 2),
      filterGroup = _useState6[0],
      setFilterGroup = _useState6[1];

  var _useFetchIndexPattern = (0, _fetch_index_patterns.useFetchIndexPatterns)(signalsIndex !== '' ? [signalsIndex] : []),
      _useFetchIndexPattern2 = _slicedToArray(_useFetchIndexPattern, 1),
      _useFetchIndexPattern3 = _useFetchIndexPattern2[0],
      browserFields = _useFetchIndexPattern3.browserFields,
      indexPatterns = _useFetchIndexPattern3.indexPatterns;

  var kibana = (0, _kibana.useKibana)();
  var getGlobalQuery = (0, _react.useCallback)(function () {
    if (browserFields != null && indexPatterns != null) {
      return (0, _helpers.combineQueries)({
        config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
        dataProviders: [],
        indexPattern: indexPatterns,
        browserFields: browserFields,
        filters: (0, _fp.isEmpty)(defaultFilters) ? globalFilters : [].concat(_toConsumableArray(defaultFilters !== null && defaultFilters !== void 0 ? defaultFilters : []), _toConsumableArray(globalFilters)),
        kqlQuery: globalQuery,
        kqlMode: globalQuery.language,
        start: from,
        end: to,
        isEventViewer: true
      });
    }

    return null;
  }, [browserFields, globalFilters, globalQuery, indexPatterns, kibana, to, from]); // Callback for creating a new timeline -- utilized by row/batch actions

  var createTimelineCallback = (0, _react.useCallback)(function (_ref2) {
    var fromTimeline = _ref2.from,
        timeline = _ref2.timeline,
        toTimeline = _ref2.to,
        ruleNote = _ref2.ruleNote;
    updateTimelineIsLoading({
      id: 'timeline-1',
      isLoading: false
    });
    updateTimeline({
      duplicate: true,
      from: fromTimeline,
      id: 'timeline-1',
      notes: [],
      timeline: _objectSpread({}, timeline, {
        show: true
      }),
      to: toTimeline,
      ruleNote: ruleNote
    })();
  }, [updateTimeline, updateTimelineIsLoading]);
  var setEventsLoadingCallback = (0, _react.useCallback)(function (_ref3) {
    var eventIds = _ref3.eventIds,
        isLoading = _ref3.isLoading;
    setEventsLoading({
      id: SIGNALS_PAGE_TIMELINE_ID,
      eventIds: eventIds,
      isLoading: isLoading
    });
  }, [setEventsLoading, SIGNALS_PAGE_TIMELINE_ID]);
  var setEventsDeletedCallback = (0, _react.useCallback)(function (_ref4) {
    var eventIds = _ref4.eventIds,
        isDeleted = _ref4.isDeleted;
    setEventsDeleted({
      id: SIGNALS_PAGE_TIMELINE_ID,
      eventIds: eventIds,
      isDeleted: isDeleted
    });
  }, [setEventsDeleted, SIGNALS_PAGE_TIMELINE_ID]); // Catches state change isSelectAllChecked->false upon user selection change to reset utility bar

  (0, _react.useEffect)(function () {
    if (!isSelectAllChecked) {
      setShowClearSelectionAction(false);
    } else {
      setSelectAll(false);
    }
  }, [isSelectAllChecked]); // Callback for when open/closed filter changes

  var onFilterGroupChangedCallback = (0, _react.useCallback)(function (newFilterGroup) {
    clearEventsLoading({
      id: SIGNALS_PAGE_TIMELINE_ID
    });
    clearEventsDeleted({
      id: SIGNALS_PAGE_TIMELINE_ID
    });
    clearSelected({
      id: SIGNALS_PAGE_TIMELINE_ID
    });
    setFilterGroup(newFilterGroup);
  }, [clearEventsLoading, clearEventsDeleted, clearSelected, setFilterGroup]); // Callback for clearing entire selection from utility bar

  var clearSelectionCallback = (0, _react.useCallback)(function () {
    clearSelected({
      id: SIGNALS_PAGE_TIMELINE_ID
    });
    setSelectAll(false);
    setShowClearSelectionAction(false);
  }, [clearSelected, setSelectAll, setShowClearSelectionAction]); // Callback for selecting all events on all pages from utility bar
  // Dispatches to stateful_body's selectAll via TimelineTypeContext props
  // as scope of response data required to actually set selectedEvents

  var selectAllCallback = (0, _react.useCallback)(function () {
    setSelectAll(true);
    setShowClearSelectionAction(true);
  }, [setSelectAll, setShowClearSelectionAction]);
  var updateSignalsStatusCallback = (0, _react.useCallback)(
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(refetchQuery, _ref6) {
      var _getGlobalQuery;

      var signalIds, status;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              signalIds = _ref6.signalIds, status = _ref6.status;
              _context.next = 3;
              return (0, _actions.updateSignalStatusAction)({
                query: showClearSelectionAction ? (_getGlobalQuery = getGlobalQuery()) === null || _getGlobalQuery === void 0 ? void 0 : _getGlobalQuery.filterQuery : undefined,
                signalIds: Object.keys(selectedEventIds),
                status: status,
                setEventsDeleted: setEventsDeletedCallback,
                setEventsLoading: setEventsLoadingCallback
              });

            case 3:
              refetchQuery();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref5.apply(this, arguments);
    };
  }(), [getGlobalQuery, selectedEventIds, setEventsDeletedCallback, setEventsLoadingCallback, showClearSelectionAction]); // Callback for creating the SignalUtilityBar which receives totalCount from EventsViewer component

  var utilityBarCallback = (0, _react.useCallback)(function (refetchQuery, totalCount) {
    return _react.default.createElement(_signals_utility_bar.SignalsUtilityBar, {
      canUserCRUD: canUserCRUD,
      areEventsLoading: loadingEventIds.length > 0,
      clearSelection: clearSelectionCallback,
      hasIndexWrite: hasIndexWrite,
      isFilteredToOpen: filterGroup === _signals_filter_group.FILTER_OPEN,
      selectAll: selectAllCallback,
      selectedEventIds: selectedEventIds,
      showClearSelection: showClearSelectionAction,
      totalCount: totalCount,
      updateSignalsStatus: updateSignalsStatusCallback.bind(null, refetchQuery)
    });
  }, [canUserCRUD, hasIndexWrite, clearSelectionCallback, filterGroup, loadingEventIds.length, selectAllCallback, selectedEventIds, showClearSelectionAction, updateSignalsStatusCallback]); // Send to Timeline / Update Signal Status Actions for each table row

  var additionalActions = (0, _react.useMemo)(function () {
    return (0, _default_config.getSignalsActions)({
      apolloClient: apolloClient,
      canUserCRUD: canUserCRUD,
      hasIndexWrite: hasIndexWrite,
      createTimeline: createTimelineCallback,
      setEventsLoading: setEventsLoadingCallback,
      setEventsDeleted: setEventsDeletedCallback,
      status: filterGroup === _signals_filter_group.FILTER_OPEN ? _signals_filter_group.FILTER_CLOSED : _signals_filter_group.FILTER_OPEN,
      updateTimelineIsLoading: updateTimelineIsLoading
    });
  }, [apolloClient, canUserCRUD, createTimelineCallback, hasIndexWrite, filterGroup, setEventsLoadingCallback, setEventsDeletedCallback, updateTimelineIsLoading]);
  var defaultIndices = (0, _react.useMemo)(function () {
    return [signalsIndex];
  }, [signalsIndex]);
  var defaultFiltersMemo = (0, _react.useMemo)(function () {
    if ((0, _fp.isEmpty)(defaultFilters)) {
      return filterGroup === _signals_filter_group.FILTER_OPEN ? _default_config.signalsOpenFilters : _default_config.signalsClosedFilters;
    } else if (defaultFilters != null && !(0, _fp.isEmpty)(defaultFilters)) {
      return [].concat(_toConsumableArray(defaultFilters), _toConsumableArray(filterGroup === _signals_filter_group.FILTER_OPEN ? _default_config.signalsOpenFilters : _default_config.signalsClosedFilters));
    }
  }, [defaultFilters, filterGroup]);
  var timelineTypeContext = (0, _react.useMemo)(function () {
    return {
      documentType: i18n.SIGNALS_DOCUMENT_TYPE,
      footerText: i18n.TOTAL_COUNT_OF_SIGNALS,
      loadingText: i18n.LOADING_SIGNALS,
      queryFields: _default_config.requiredFieldsForActions,
      timelineActions: additionalActions,
      title: i18n.SIGNALS_TABLE_TITLE,
      selectAll: canUserCRUD ? selectAll : false
    };
  }, [additionalActions, canUserCRUD, selectAll]);
  var headerFilterGroup = (0, _react.useMemo)(function () {
    return _react.default.createElement(_signals_filter_group.SignalsTableFilterGroup, {
      onFilterGroupChanged: onFilterGroupChangedCallback
    });
  }, [onFilterGroupChangedCallback]);

  if (loading || (0, _fp.isEmpty)(signalsIndex)) {
    return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_header_section.HeaderSection, {
      title: i18n.SIGNALS_TABLE_TITLE
    }), _react.default.createElement(_eui.EuiLoadingContent, {
      "data-test-subj": "loading-signals-panel"
    }));
  }

  return _react.default.createElement(_events_viewer.StatefulEventsViewer, {
    defaultIndices: defaultIndices,
    pageFilters: defaultFiltersMemo,
    defaultModel: _default_config.signalsDefaultModel,
    end: to,
    headerFilterGroup: headerFilterGroup,
    id: SIGNALS_PAGE_TIMELINE_ID,
    start: from,
    timelineTypeContext: timelineTypeContext,
    utilityBar: utilityBarCallback
  });
};

var makeMapStateToProps = function makeMapStateToProps() {
  var getTimeline = _timeline.timelineSelectors.getTimelineByIdSelector();

  var getGlobalInputs = _store.inputsSelectors.globalSelector();

  var mapStateToProps = function mapStateToProps(state) {
    var _getTimeline;

    var timeline = (_getTimeline = getTimeline(state, SIGNALS_PAGE_TIMELINE_ID)) !== null && _getTimeline !== void 0 ? _getTimeline : _defaults.timelineDefaults;
    var deletedEventIds = timeline.deletedEventIds,
        isSelectAllChecked = timeline.isSelectAllChecked,
        loadingEventIds = timeline.loadingEventIds,
        selectedEventIds = timeline.selectedEventIds;
    var globalInputs = getGlobalInputs(state);
    var query = globalInputs.query,
        filters = globalInputs.filters;
    return {
      globalQuery: query,
      globalFilters: filters,
      deletedEventIds: deletedEventIds,
      isSelectAllChecked: isSelectAllChecked,
      loadingEventIds: loadingEventIds,
      selectedEventIds: selectedEventIds
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    clearSelected: function clearSelected(_ref7) {
      var id = _ref7.id;
      return dispatch(_timeline.timelineActions.clearSelected({
        id: id
      }));
    },
    setEventsLoading: function setEventsLoading(_ref8) {
      var id = _ref8.id,
          eventIds = _ref8.eventIds,
          isLoading = _ref8.isLoading;
      return dispatch(_timeline.timelineActions.setEventsLoading({
        id: id,
        eventIds: eventIds,
        isLoading: isLoading
      }));
    },
    clearEventsLoading: function clearEventsLoading(_ref9) {
      var id = _ref9.id;
      return dispatch(_timeline.timelineActions.clearEventsLoading({
        id: id
      }));
    },
    setEventsDeleted: function setEventsDeleted(_ref10) {
      var id = _ref10.id,
          eventIds = _ref10.eventIds,
          isDeleted = _ref10.isDeleted;
      return dispatch(_timeline.timelineActions.setEventsDeleted({
        id: id,
        eventIds: eventIds,
        isDeleted: isDeleted
      }));
    },
    clearEventsDeleted: function clearEventsDeleted(_ref11) {
      var id = _ref11.id;
      return dispatch(_timeline.timelineActions.clearEventsDeleted({
        id: id
      }));
    },
    updateTimelineIsLoading: function updateTimelineIsLoading(_ref12) {
      var id = _ref12.id,
          isLoading = _ref12.isLoading;
      return dispatch(_timeline.timelineActions.updateIsLoading({
        id: id,
        isLoading: isLoading
      }));
    },
    updateTimeline: (0, _helpers2.dispatchUpdateTimeline)(dispatch)
  };
};

var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var SignalsTable = connector(_react.default.memo(SignalsTableComponent));
exports.SignalsTable = SignalsTable;