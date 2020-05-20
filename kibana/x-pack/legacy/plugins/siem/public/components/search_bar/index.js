"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SiemSearchBar = exports.connector = exports.dispatchUpdateSearch = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _rxjs = require("rxjs");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _inputs = require("../../store/inputs");

var _super_date_picker = require("../super_date_picker");

var _selectors = require("./selectors");

var _actions = require("../../store/actions");

var _kibana = require("../../lib/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchBarContainer = _styledComponents.default.div.withConfig({
  displayName: "SearchBarContainer",
  componentId: "sj125d-0"
})([".globalQueryBar{padding:0px;}"]);

var SearchBarComponent = (0, _react.memo)(function (_ref) {
  var end = _ref.end,
      filterQuery = _ref.filterQuery,
      fromStr = _ref.fromStr,
      id = _ref.id,
      indexPattern = _ref.indexPattern,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      queries = _ref.queries,
      savedQuery = _ref.savedQuery,
      setSavedQuery = _ref.setSavedQuery,
      setSearchBarFilter = _ref.setSearchBarFilter,
      start = _ref.start,
      toStr = _ref.toStr,
      updateSearch = _ref.updateSearch,
      dataTestSubj = _ref.dataTestSubj;
  var data = (0, _kibana.useKibana)().services.data;
  var _data$query = data.query,
      timefilter = _data$query.timefilter.timefilter,
      filterManager = _data$query.filterManager;

  if (fromStr != null && toStr != null) {
    timefilter.setTime({
      from: fromStr,
      to: toStr
    });
  } else if (start != null && end != null) {
    timefilter.setTime({
      from: new Date(start).toISOString(),
      to: new Date(end).toISOString()
    });
  }

  var onQuerySubmit = (0, _react.useCallback)(function (payload) {
    var isQuickSelection = payload.dateRange.from.includes('now') || payload.dateRange.to.includes('now');
    var updateSearchBar = {
      id: id,
      end: toStr != null ? toStr : new Date(end).toISOString(),
      start: fromStr != null ? fromStr : new Date(start).toISOString(),
      isInvalid: false,
      isQuickSelection: isQuickSelection,
      updateTime: false,
      filterManager: filterManager
    };
    var isStateUpdated = false;

    if (isQuickSelection && (fromStr !== payload.dateRange.from || toStr !== payload.dateRange.to) || !isQuickSelection && (start !== (0, _super_date_picker.formatDate)(payload.dateRange.from) || end !== (0, _super_date_picker.formatDate)(payload.dateRange.to))) {
      isStateUpdated = true;
      updateSearchBar.updateTime = true;
      updateSearchBar.end = payload.dateRange.to;
      updateSearchBar.start = payload.dateRange.from;
    }

    if (payload.query != null && !(0, _fastDeepEqual.default)(payload.query, filterQuery)) {
      isStateUpdated = true;
      updateSearchBar = (0, _fp.set)('query', payload.query, updateSearchBar);
    }

    if (!isStateUpdated) {
      // That mean we are doing a refresh!
      if (isQuickSelection) {
        updateSearchBar.updateTime = true;
        updateSearchBar.end = payload.dateRange.to;
        updateSearchBar.start = payload.dateRange.from;
      } else {
        queries.forEach(function (q) {
          return q.refetch && q.refetch();
        });
      }
    }

    window.setTimeout(function () {
      return updateSearch(updateSearchBar);
    }, 0);
  }, [id, end, filterQuery, fromStr, queries, start, toStr]);
  var onRefresh = (0, _react.useCallback)(function (payload) {
    if (payload.dateRange.from.includes('now') || payload.dateRange.to.includes('now')) {
      updateSearch({
        id: id,
        end: payload.dateRange.to,
        start: payload.dateRange.from,
        isInvalid: false,
        isQuickSelection: true,
        updateTime: true,
        filterManager: filterManager
      });
    } else {
      queries.forEach(function (q) {
        return q.refetch && q.refetch();
      });
    }
  }, [id, queries, filterManager]);
  var onSaved = (0, _react.useCallback)(function (newSavedQuery) {
    setSavedQuery({
      id: id,
      savedQuery: newSavedQuery
    });
  }, [id]);
  var onSavedQueryUpdated = (0, _react.useCallback)(function (savedQueryUpdated) {
    var isQuickSelection = savedQueryUpdated.attributes.timefilter ? savedQueryUpdated.attributes.timefilter.from.includes('now') || savedQueryUpdated.attributes.timefilter.to.includes('now') : false;
    var updateSearchBar = {
      id: id,
      filters: savedQueryUpdated.attributes.filters || [],
      end: toStr != null ? toStr : new Date(end).toISOString(),
      start: fromStr != null ? fromStr : new Date(start).toISOString(),
      isInvalid: false,
      isQuickSelection: isQuickSelection,
      updateTime: false,
      filterManager: filterManager
    };

    if (savedQueryUpdated.attributes.timefilter) {
      updateSearchBar.end = savedQueryUpdated.attributes.timefilter ? savedQueryUpdated.attributes.timefilter.to : updateSearchBar.end;
      updateSearchBar.start = savedQueryUpdated.attributes.timefilter ? savedQueryUpdated.attributes.timefilter.from : updateSearchBar.start;
      updateSearchBar.updateTime = true;
    }

    updateSearchBar = (0, _fp.set)('query', savedQueryUpdated.attributes.query, updateSearchBar);
    updateSearchBar = (0, _fp.set)('savedQuery', savedQueryUpdated, updateSearchBar);
    updateSearch(updateSearchBar);
  }, [id, end, fromStr, start, toStr]);
  var onClearSavedQuery = (0, _react.useCallback)(function () {
    if (savedQuery != null) {
      updateSearch({
        id: id,
        filters: [],
        end: toStr != null ? toStr : new Date(end).toISOString(),
        start: fromStr != null ? fromStr : new Date(start).toISOString(),
        isInvalid: false,
        isQuickSelection: false,
        updateTime: false,
        query: {
          query: '',
          language: savedQuery.attributes.query.language
        },
        resetSavedQuery: true,
        savedQuery: undefined,
        filterManager: filterManager
      });
    }
  }, [id, end, filterManager, fromStr, start, toStr, savedQuery]);
  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var subscriptions = new _rxjs.Subscription();
    subscriptions.add(filterManager.getUpdates$().subscribe({
      next: function next() {
        if (isSubscribed) {
          setSearchBarFilter({
            id: id,
            filters: filterManager.getFilters()
          });
        }
      }
    }));
    return function () {
      isSubscribed = false;
      subscriptions.unsubscribe();
    };
  }, []);
  var indexPatterns = (0, _react.useMemo)(function () {
    return [indexPattern];
  }, [indexPattern]);
  return _react.default.createElement(SearchBarContainer, {
    "data-test-subj": "".concat(id, "DatePicker")
  }, _react.default.createElement(data.ui.SearchBar, {
    appName: "siem",
    isLoading: isLoading,
    indexPatterns: indexPatterns,
    query: filterQuery,
    onClearSavedQuery: onClearSavedQuery,
    onQuerySubmit: onQuerySubmit,
    onRefresh: onRefresh,
    onSaved: onSaved,
    onSavedQueryUpdated: onSavedQueryUpdated,
    savedQuery: savedQuery,
    showFilterBar: true,
    showDatePicker: true,
    showQueryBar: true,
    showQueryInput: true,
    showSaveQuery: true,
    dataTestSubj: dataTestSubj
  }));
});

var makeMapStateToProps = function makeMapStateToProps() {
  var getEndSelector = (0, _selectors.endSelector)();
  var getFromStrSelector = (0, _selectors.fromStrSelector)();
  var getIsLoadingSelector = (0, _selectors.isLoadingSelector)();
  var getKindSelector = (0, _selectors.kindSelector)();
  var getQueriesSelector = (0, _selectors.queriesSelector)();
  var getStartSelector = (0, _selectors.startSelector)();
  var getToStrSelector = (0, _selectors.toStrSelector)();
  var getFilterQuerySelector = (0, _selectors.filterQuerySelector)();
  var getSavedQuerySelector = (0, _selectors.savedQuerySelector)();
  return function (state, _ref2) {
    var id = _ref2.id;
    var inputsRange = (0, _fp.getOr)({}, "inputs.".concat(id), state);
    return {
      end: getEndSelector(inputsRange),
      fromStr: getFromStrSelector(inputsRange),
      filterQuery: getFilterQuerySelector(inputsRange),
      isLoading: getIsLoadingSelector(inputsRange),
      kind: getKindSelector(inputsRange),
      queries: getQueriesSelector(inputsRange),
      savedQuery: getSavedQuerySelector(inputsRange),
      start: getStartSelector(inputsRange),
      toStr: getToStrSelector(inputsRange)
    };
  };
};

SearchBarComponent.displayName = 'SiemSearchBar';

var dispatchUpdateSearch = function dispatchUpdateSearch(dispatch) {
  return function (_ref3) {
    var end = _ref3.end,
        filters = _ref3.filters,
        id = _ref3.id,
        isQuickSelection = _ref3.isQuickSelection,
        query = _ref3.query,
        resetSavedQuery = _ref3.resetSavedQuery,
        savedQuery = _ref3.savedQuery,
        start = _ref3.start,
        timelineId = _ref3.timelineId,
        filterManager = _ref3.filterManager,
        _ref3$updateTime = _ref3.updateTime,
        updateTime = _ref3$updateTime === void 0 ? false : _ref3$updateTime;

    if (updateTime) {
      var fromDate = (0, _super_date_picker.formatDate)(start);
      var toDate = (0, _super_date_picker.formatDate)(end, {
        roundUp: true
      });

      if (isQuickSelection) {
        dispatch(_inputs.inputsActions.setRelativeRangeDatePicker({
          id: id,
          fromStr: start,
          toStr: end,
          from: fromDate,
          to: toDate
        }));
      } else {
        toDate = (0, _super_date_picker.formatDate)(end);
        dispatch(_inputs.inputsActions.setAbsoluteRangeDatePicker({
          id: id,
          from: (0, _super_date_picker.formatDate)(start),
          to: (0, _super_date_picker.formatDate)(end)
        }));
      }

      if (timelineId != null) {
        dispatch(_actions.timelineActions.updateRange({
          id: timelineId,
          start: fromDate,
          end: toDate
        }));
      }
    }

    if (query != null) {
      dispatch(_inputs.inputsActions.setFilterQuery(_objectSpread({
        id: id
      }, query)));
    }

    if (filters != null) {
      filterManager.setFilters(filters);
    }

    if (savedQuery != null || resetSavedQuery) {
      dispatch(_inputs.inputsActions.setSavedQuery({
        id: id,
        savedQuery: savedQuery
      }));
    }

    dispatch(_actions.hostsActions.setHostTablesActivePageToZero());
    dispatch(_actions.networkActions.setNetworkTablesActivePageToZero());
  };
};

exports.dispatchUpdateSearch = dispatchUpdateSearch;

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateSearch: dispatchUpdateSearch(dispatch),
    setSavedQuery: function setSavedQuery(_ref4) {
      var id = _ref4.id,
          savedQuery = _ref4.savedQuery;
      return dispatch(_inputs.inputsActions.setSavedQuery({
        id: id,
        savedQuery: savedQuery
      }));
    },
    setSearchBarFilter: function setSearchBarFilter(_ref5) {
      var id = _ref5.id,
          filters = _ref5.filters;
      return dispatch(_inputs.inputsActions.setSearchBarFilter({
        id: id,
        filters: filters
      }));
    }
  };
};

var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
exports.connector = connector;
var SiemSearchBar = connector(SearchBarComponent);
exports.SiemSearchBar = SiemSearchBar;