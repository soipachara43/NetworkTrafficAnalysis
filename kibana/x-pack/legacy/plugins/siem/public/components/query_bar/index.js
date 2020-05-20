"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _public = require("../../../../../../../src/plugins/data/public");

var _public2 = require("../../../../../../../src/plugins/kibana_utils/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var QueryBar = (0, _react.memo)(function (_ref) {
  var dateRangeFrom = _ref.dateRangeFrom,
      dateRangeTo = _ref.dateRangeTo,
      _ref$hideSavedQuery = _ref.hideSavedQuery,
      hideSavedQuery = _ref$hideSavedQuery === void 0 ? false : _ref$hideSavedQuery,
      indexPattern = _ref.indexPattern,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      isRefreshPaused = _ref.isRefreshPaused,
      filterQuery = _ref.filterQuery,
      filterManager = _ref.filterManager,
      filters = _ref.filters,
      onChangedQuery = _ref.onChangedQuery,
      onSubmitQuery = _ref.onSubmitQuery,
      refreshInterval = _ref.refreshInterval,
      savedQuery = _ref.savedQuery,
      onSavedQuery = _ref.onSavedQuery,
      dataTestSubj = _ref.dataTestSubj;

  var _useState = (0, _react.useState)(filterQuery),
      _useState2 = _slicedToArray(_useState, 2),
      draftQuery = _useState2[0],
      setDraftQuery = _useState2[1];

  (0, _react.useEffect)(function () {
    setDraftQuery(filterQuery);
  }, [filterQuery]);
  var onQuerySubmit = (0, _react.useCallback)(function (payload) {
    if (payload.query != null && !(0, _fastDeepEqual.default)(payload.query, filterQuery)) {
      onSubmitQuery(payload.query);
    }
  }, [filterQuery, onSubmitQuery]);
  var onQueryChange = (0, _react.useCallback)(function (payload) {
    if (payload.query != null && !(0, _fastDeepEqual.default)(payload.query, draftQuery)) {
      setDraftQuery(payload.query);
      onChangedQuery(payload.query);
    }
  }, [draftQuery, onChangedQuery, setDraftQuery]);
  var onSaved = (0, _react.useCallback)(function (newSavedQuery) {
    onSavedQuery(newSavedQuery);
  }, [onSavedQuery]);
  var onSavedQueryUpdated = (0, _react.useCallback)(function (savedQueryUpdated) {
    var _savedQueryUpdated$at = savedQueryUpdated.attributes,
        newQuery = _savedQueryUpdated$at.query,
        newFilters = _savedQueryUpdated$at.filters,
        timefilter = _savedQueryUpdated$at.timefilter;
    onSubmitQuery(newQuery, timefilter);
    filterManager.setFilters(newFilters || []);
    onSavedQuery(savedQueryUpdated);
  }, [filterManager, onSubmitQuery, onSavedQuery]);
  var onClearSavedQuery = (0, _react.useCallback)(function () {
    if (savedQuery != null) {
      onSubmitQuery({
        query: '',
        language: savedQuery.attributes.query.language
      });
      filterManager.setFilters([]);
      onSavedQuery(null);
    }
  }, [filterManager, onSubmitQuery, onSavedQuery, savedQuery]);
  var onFiltersUpdated = (0, _react.useCallback)(function (newFilters) {
    filterManager.setFilters(newFilters);
  }, [filterManager]);

  var CustomButton = _react.default.createElement(_react.default.Fragment, null, null);

  var indexPatterns = (0, _react.useMemo)(function () {
    return [indexPattern];
  }, [indexPattern]);
  var searchBarProps = savedQuery != null ? {
    savedQuery: savedQuery
  } : {};
  return _react.default.createElement(_public.SearchBar, _extends({
    customSubmitButton: CustomButton,
    dateRangeFrom: dateRangeFrom,
    dateRangeTo: dateRangeTo,
    filters: filters,
    indexPatterns: indexPatterns,
    isLoading: isLoading,
    isRefreshPaused: isRefreshPaused,
    query: draftQuery,
    onClearSavedQuery: onClearSavedQuery,
    onFiltersUpdated: onFiltersUpdated,
    onQueryChange: onQueryChange,
    onQuerySubmit: onQuerySubmit,
    onSaved: onSaved,
    onSavedQueryUpdated: onSavedQueryUpdated,
    refreshInterval: refreshInterval,
    showAutoRefreshOnly: false,
    showFilterBar: !hideSavedQuery,
    showDatePicker: false,
    showQueryBar: true,
    showQueryInput: true,
    showSaveQuery: true,
    timeHistory: new _public.TimeHistory(new _public2.Storage(localStorage)),
    dataTestSubj: dataTestSubj
  }, searchBarProps));
});
exports.QueryBar = QueryBar;