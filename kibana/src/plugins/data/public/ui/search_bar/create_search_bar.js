"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSearchBar = createSearchBar;

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../kibana_react/public");

var _search_bar = require("./search_bar");

var _use_filter_manager = require("./lib/use_filter_manager");

var _use_timefilter = require("./lib/use_timefilter");

var _use_saved_query = require("./lib/use_saved_query");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Respond to user changing the filters
var defaultFiltersUpdated = function defaultFiltersUpdated(queryService) {
  return function (filters) {
    queryService.filterManager.setFilters(filters);
  };
}; // Respond to user changing the refresh settings


var defaultOnRefreshChange = function defaultOnRefreshChange(queryService) {
  var timefilter = queryService.timefilter.timefilter;
  return function (options) {
    timefilter.setRefreshInterval({
      value: options.refreshInterval,
      pause: options.isPaused
    });
  };
}; // Respond to user changing the query string or time settings


var defaultOnQuerySubmit = function defaultOnQuerySubmit(props, queryService, currentQuery, setQueryStringState) {
  if (!props.useDefaultBehaviors) return props.onQuerySubmit;
  var timefilter = queryService.timefilter.timefilter;
  return function (payload) {
    var isUpdate = !_.isEqual(timefilter.getTime(), payload.dateRange) || !_.isEqual(payload.query, currentQuery);

    if (isUpdate) {
      timefilter.setTime(payload.dateRange);
      setQueryStringState(payload.query);
    } else {
      // Refresh button triggered for an update
      if (props.onQuerySubmit) props.onQuerySubmit({
        dateRange: timefilter.getTime(),
        query: currentQuery
      }, false);
    }
  };
}; // Respond to user clearing a saved query


var defaultOnClearSavedQuery = function defaultOnClearSavedQuery(props, clearSavedQuery) {
  if (!props.useDefaultBehaviors) return props.onClearSavedQuery;
  return function () {
    clearSavedQuery();
    if (props.onSavedQueryIdChange) props.onSavedQueryIdChange();
  };
}; // Respond to user saving or updating a saved query


var defaultOnSavedQueryUpdated = function defaultOnSavedQueryUpdated(props, setSavedQuery) {
  if (!props.useDefaultBehaviors) return props.onSavedQueryUpdated;
  return function (savedQuery) {
    setSavedQuery(savedQuery);
    if (props.onSavedQueryIdChange) props.onSavedQueryIdChange(savedQuery.id);
  };
};

var overrideDefaultBehaviors = function overrideDefaultBehaviors(props) {
  return props.useDefaultBehaviors ? {} : props;
};

function createSearchBar(_ref) {
  var core = _ref.core,
      storage = _ref.storage,
      data = _ref.data;
  // App name should come from the core application service.
  // Until it's available, we'll ask the user to provide it for the pre-wired component.
  return function (props) {
    var useDefaultBehaviors = props.useDefaultBehaviors; // Handle queries

    var queryRef = (0, _react.useRef)(props.query);
    var onQuerySubmitRef = (0, _react.useRef)(props.onQuerySubmit);
    var defaultQuery = {
      query: '',
      language: storage.get('kibana.userQueryLanguage') || core.uiSettings.get('search:queryLanguage')
    };

    var _useState = (0, _react.useState)(props.query || defaultQuery),
        _useState2 = _slicedToArray(_useState, 2),
        query = _useState2[0],
        setQuery = _useState2[1];

    (0, _react.useEffect)(function () {
      if (props.query !== queryRef.current) {
        queryRef.current = props.query;
        setQuery(props.query || defaultQuery);
      }
    }, [defaultQuery, props.query]);
    (0, _react.useEffect)(function () {
      if (props.onQuerySubmit !== onQuerySubmitRef.current) {
        onQuerySubmitRef.current = props.onQuerySubmit;
      }
    }, [props.onQuerySubmit]); // handle service state updates.
    // i.e. filters being added from a visualization directly to filterManager.

    var _useFilterManager = (0, _use_filter_manager.useFilterManager)({
      filters: props.filters,
      filterManager: data.query.filterManager
    }),
        filters = _useFilterManager.filters;

    var _useTimefilter = (0, _use_timefilter.useTimefilter)({
      dateRangeFrom: props.dateRangeFrom,
      dateRangeTo: props.dateRangeTo,
      refreshInterval: props.refreshInterval,
      isRefreshPaused: props.isRefreshPaused,
      timefilter: data.query.timefilter.timefilter
    }),
        timeRange = _useTimefilter.timeRange,
        refreshInterval = _useTimefilter.refreshInterval; // Fetch and update UI from saved query


    var _useSavedQuery = (0, _use_saved_query.useSavedQuery)({
      queryService: data.query,
      setQuery: setQuery,
      savedQueryId: props.savedQueryId,
      notifications: core.notifications,
      defaultLanguage: defaultQuery.language
    }),
        savedQuery = _useSavedQuery.savedQuery,
        setSavedQuery = _useSavedQuery.setSavedQuery,
        clearSavedQuery = _useSavedQuery.clearSavedQuery; // Fire onQuerySubmit on query or timerange change


    (0, _react.useEffect)(function () {
      if (!useDefaultBehaviors || !onQuerySubmitRef.current) return;
      onQuerySubmitRef.current({
        dateRange: timeRange,
        query: query
      }, true);
    }, [query, timeRange, useDefaultBehaviors]);
    return _react.default.createElement(_public.KibanaContextProvider, {
      services: _objectSpread({
        appName: props.appName,
        data: data,
        storage: storage
      }, core)
    }, _react.default.createElement(_search_bar.SearchBar, _extends({
      showAutoRefreshOnly: props.showAutoRefreshOnly,
      showDatePicker: props.showDatePicker,
      showFilterBar: props.showFilterBar,
      showQueryBar: props.showQueryBar,
      showQueryInput: props.showQueryInput,
      showSaveQuery: props.showSaveQuery,
      screenTitle: props.screenTitle,
      indexPatterns: props.indexPatterns,
      timeHistory: data.query.timefilter.history,
      dateRangeFrom: timeRange.from,
      dateRangeTo: timeRange.to,
      refreshInterval: refreshInterval.value,
      isRefreshPaused: refreshInterval.pause,
      filters: filters,
      query: query,
      onFiltersUpdated: defaultFiltersUpdated(data.query),
      onRefreshChange: defaultOnRefreshChange(data.query),
      savedQuery: savedQuery,
      onQuerySubmit: defaultOnQuerySubmit(props, data.query, query, setQuery),
      onClearSavedQuery: defaultOnClearSavedQuery(props, clearSavedQuery),
      onSavedQueryUpdated: defaultOnSavedQueryUpdated(props, setSavedQuery),
      onSaved: defaultOnSavedQueryUpdated(props, setSavedQuery)
    }, overrideDefaultBehaviors(props))));
  };
}