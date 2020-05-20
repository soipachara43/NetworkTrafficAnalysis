"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulEventsViewer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _store = require("../../store");

var _actions = require("../../store/actions");

var _kibana = require("../../lib/kibana");

var _events_viewer = require("./events_viewer");

var _fetch_index_patterns = require("../../containers/detection_engine/rules/fetch_index_patterns");

var _constants = require("../../../common/constants");

var _inspect = require("../inspect");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultTimelineTypeContext = {
  loadingText: i18n.LOADING_EVENTS
};

var StatefulEventsViewerComponent = function StatefulEventsViewerComponent(_ref) {
  var createTimeline = _ref.createTimeline,
      columns = _ref.columns,
      dataProviders = _ref.dataProviders,
      deletedEventIds = _ref.deletedEventIds,
      defaultIndices = _ref.defaultIndices,
      deleteEventQuery = _ref.deleteEventQuery,
      end = _ref.end,
      filters = _ref.filters,
      headerFilterGroup = _ref.headerFilterGroup,
      id = _ref.id,
      isLive = _ref.isLive,
      itemsPerPage = _ref.itemsPerPage,
      itemsPerPageOptions = _ref.itemsPerPageOptions,
      kqlMode = _ref.kqlMode,
      pageFilters = _ref.pageFilters,
      query = _ref.query,
      removeColumn = _ref.removeColumn,
      start = _ref.start,
      showCheckboxes = _ref.showCheckboxes,
      showRowRenderers = _ref.showRowRenderers,
      sort = _ref.sort,
      _ref$timelineTypeCont = _ref.timelineTypeContext,
      timelineTypeContext = _ref$timelineTypeCont === void 0 ? defaultTimelineTypeContext : _ref$timelineTypeCont,
      updateItemsPerPage = _ref.updateItemsPerPage,
      upsertColumn = _ref.upsertColumn,
      utilityBar = _ref.utilityBar;

  var _useFetchIndexPattern = (0, _fetch_index_patterns.useFetchIndexPatterns)(defaultIndices !== null && defaultIndices !== void 0 ? defaultIndices : (0, _kibana.useUiSetting)(_constants.DEFAULT_INDEX_KEY)),
      _useFetchIndexPattern2 = _slicedToArray(_useFetchIndexPattern, 1),
      _useFetchIndexPattern3 = _useFetchIndexPattern2[0],
      browserFields = _useFetchIndexPattern3.browserFields,
      indexPatterns = _useFetchIndexPattern3.indexPatterns;

  (0, _react.useEffect)(function () {
    if (createTimeline != null) {
      createTimeline({
        id: id,
        columns: columns,
        sort: sort,
        itemsPerPage: itemsPerPage,
        showCheckboxes: showCheckboxes,
        showRowRenderers: showRowRenderers
      });
    }

    return function () {
      deleteEventQuery({
        id: id,
        inputId: 'global'
      });
    };
  }, []);
  var onChangeItemsPerPage = (0, _react.useCallback)(function (itemsChangedPerPage) {
    return updateItemsPerPage({
      id: id,
      itemsPerPage: itemsChangedPerPage
    });
  }, [id, updateItemsPerPage]);
  var toggleColumn = (0, _react.useCallback)(function (column) {
    var exists = columns.findIndex(function (c) {
      return c.id === column.id;
    }) !== -1;

    if (!exists && upsertColumn != null) {
      upsertColumn({
        column: column,
        id: id,
        index: 1
      });
    }

    if (exists && removeColumn != null) {
      removeColumn({
        columnId: column.id,
        id: id
      });
    }
  }, [columns, id, upsertColumn, removeColumn]);
  var globalFilters = (0, _react.useMemo)(function () {
    return [].concat(_toConsumableArray(filters), _toConsumableArray(pageFilters !== null && pageFilters !== void 0 ? pageFilters : []));
  }, [filters, pageFilters]);
  return _react.default.createElement(_inspect.InspectButtonContainer, null, _react.default.createElement(_events_viewer.EventsViewer, {
    browserFields: browserFields,
    columns: columns,
    id: id,
    dataProviders: dataProviders,
    deletedEventIds: deletedEventIds,
    end: end,
    filters: globalFilters,
    headerFilterGroup: headerFilterGroup,
    indexPattern: indexPatterns,
    isLive: isLive,
    itemsPerPage: itemsPerPage,
    itemsPerPageOptions: itemsPerPageOptions,
    kqlMode: kqlMode,
    onChangeItemsPerPage: onChangeItemsPerPage,
    query: query,
    start: start,
    sort: sort,
    timelineTypeContext: timelineTypeContext,
    toggleColumn: toggleColumn,
    utilityBar: utilityBar
  }));
};

var makeMapStateToProps = function makeMapStateToProps() {
  var getInputsTimeline = _store.inputsSelectors.getTimelineSelector();

  var getGlobalQuerySelector = _store.inputsSelectors.globalQuerySelector();

  var getGlobalFiltersQuerySelector = _store.inputsSelectors.globalFiltersQuerySelector();

  var getEvents = _store.timelineSelectors.getEventsByIdSelector();

  var mapStateToProps = function mapStateToProps(state, _ref2) {
    var _getEvents;

    var id = _ref2.id,
        defaultModel = _ref2.defaultModel;
    var input = getInputsTimeline(state);
    var events = (_getEvents = getEvents(state, id)) !== null && _getEvents !== void 0 ? _getEvents : defaultModel;
    var columns = events.columns,
        dataProviders = events.dataProviders,
        deletedEventIds = events.deletedEventIds,
        itemsPerPage = events.itemsPerPage,
        itemsPerPageOptions = events.itemsPerPageOptions,
        kqlMode = events.kqlMode,
        sort = events.sort,
        showCheckboxes = events.showCheckboxes,
        showRowRenderers = events.showRowRenderers;
    return {
      columns: columns,
      dataProviders: dataProviders,
      deletedEventIds: deletedEventIds,
      filters: getGlobalFiltersQuerySelector(state),
      id: id,
      isLive: input.policy.kind === 'interval',
      itemsPerPage: itemsPerPage,
      itemsPerPageOptions: itemsPerPageOptions,
      kqlMode: kqlMode,
      query: getGlobalQuerySelector(state),
      sort: sort,
      showCheckboxes: showCheckboxes,
      showRowRenderers: showRowRenderers
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  createTimeline: _actions.timelineActions.createTimeline,
  deleteEventQuery: _actions.inputsActions.deleteOneQuery,
  updateItemsPerPage: _actions.timelineActions.updateItemsPerPage,
  removeColumn: _actions.timelineActions.removeColumn,
  upsertColumn: _actions.timelineActions.upsertColumn
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var StatefulEventsViewer = connector(_react.default.memo(StatefulEventsViewerComponent, function (prevProps, nextProps) {
  return prevProps.id === nextProps.id && (0, _fastDeepEqual.default)(prevProps.columns, nextProps.columns) && (0, _fastDeepEqual.default)(prevProps.dataProviders, nextProps.dataProviders) && prevProps.deletedEventIds === nextProps.deletedEventIds && prevProps.end === nextProps.end && (0, _fastDeepEqual.default)(prevProps.filters, nextProps.filters) && prevProps.isLive === nextProps.isLive && prevProps.itemsPerPage === nextProps.itemsPerPage && (0, _fastDeepEqual.default)(prevProps.itemsPerPageOptions, nextProps.itemsPerPageOptions) && prevProps.kqlMode === nextProps.kqlMode && (0, _fastDeepEqual.default)(prevProps.query, nextProps.query) && (0, _fastDeepEqual.default)(prevProps.sort, nextProps.sort) && prevProps.start === nextProps.start && (0, _fastDeepEqual.default)(prevProps.pageFilters, nextProps.pageFilters) && prevProps.showCheckboxes === nextProps.showCheckboxes && prevProps.showRowRenderers === nextProps.showRowRenderers && prevProps.start === nextProps.start && (0, _fastDeepEqual.default)(prevProps.timelineTypeContext, nextProps.timelineTypeContext) && prevProps.utilityBar === nextProps.utilityBar;
}));
exports.StatefulEventsViewer = StatefulEventsViewer;