"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CasesTableFilters = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fp = require("lodash/fp");

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

var _use_get_tags = require("../../../../containers/case/use_get_tags");

var _use_get_reporters = require("../../../../containers/case/use_get_reporters");

var _filter_popover = require("../../../../components/filter_popover");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Collection of filters for filtering data within the CasesTable. Contains search bar,
 * and tag selection
 *
 * @param onFilterChanged change listener to be notified on filter changes
 */
var defaultInitial = {
  search: '',
  reporters: [],
  status: 'open',
  tags: []
};

var CasesTableFiltersComponent = function CasesTableFiltersComponent(_ref) {
  var countClosedCases = _ref.countClosedCases,
      countOpenCases = _ref.countOpenCases,
      onFilterChanged = _ref.onFilterChanged,
      _ref$initial = _ref.initial,
      initial = _ref$initial === void 0 ? defaultInitial : _ref$initial,
      setFilterRefetch = _ref.setFilterRefetch;

  var _useState = (0, _react.useState)(initial.reporters.map(function (r) {
    var _ref2, _r$full_name;

    return (_ref2 = (_r$full_name = r.full_name) !== null && _r$full_name !== void 0 ? _r$full_name : r.username) !== null && _ref2 !== void 0 ? _ref2 : '';
  })),
      _useState2 = _slicedToArray(_useState, 2),
      selectedReporters = _useState2[0],
      setselectedReporters = _useState2[1];

  var _useState3 = (0, _react.useState)(initial.search),
      _useState4 = _slicedToArray(_useState3, 2),
      search = _useState4[0],
      setSearch = _useState4[1];

  var _useState5 = (0, _react.useState)(initial.tags),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedTags = _useState6[0],
      setSelectedTags = _useState6[1];

  var _useState7 = (0, _react.useState)(initial.status === 'open'),
      _useState8 = _slicedToArray(_useState7, 2),
      showOpenCases = _useState8[0],
      setShowOpenCases = _useState8[1];

  var _useGetTags = (0, _use_get_tags.useGetTags)(),
      tags = _useGetTags.tags,
      fetchTags = _useGetTags.fetchTags;

  var _useGetReporters = (0, _use_get_reporters.useGetReporters)(),
      reporters = _useGetReporters.reporters,
      respReporters = _useGetReporters.respReporters,
      fetchReporters = _useGetReporters.fetchReporters;

  var refetch = (0, _react.useCallback)(function () {
    fetchTags();
    fetchReporters();
  }, [fetchReporters, fetchTags]);
  (0, _react.useEffect)(function () {
    if (setFilterRefetch != null) {
      setFilterRefetch(refetch);
    }
  }, [refetch, setFilterRefetch]);
  (0, _react.useEffect)(function () {
    if (selectedReporters.length) {
      var newReporters = selectedReporters.filter(function (r) {
        return reporters.includes(r);
      });
      handleSelectedReporters(newReporters);
    }
  }, [reporters]);
  (0, _react.useEffect)(function () {
    if (selectedTags.length) {
      var newTags = selectedTags.filter(function (t) {
        return tags.includes(t);
      });
      handleSelectedTags(newTags);
    }
  }, [tags]);
  var handleSelectedReporters = (0, _react.useCallback)(function (newReporters) {
    if (!(0, _fp.isEqual)(newReporters, selectedReporters)) {
      setselectedReporters(newReporters);
      var reportersObj = respReporters.filter(function (r) {
        return newReporters.includes(r.username) || newReporters.includes(r.full_name);
      });
      onFilterChanged({
        reporters: reportersObj
      });
    }
  }, [selectedReporters, respReporters]);
  var handleSelectedTags = (0, _react.useCallback)(function (newTags) {
    if (!(0, _fp.isEqual)(newTags, selectedTags)) {
      setSelectedTags(newTags);
      onFilterChanged({
        tags: newTags
      });
    }
  }, [selectedTags]);
  var handleOnSearch = (0, _react.useCallback)(function (newSearch) {
    var trimSearch = newSearch.trim();

    if (!(0, _fp.isEqual)(trimSearch, search)) {
      setSearch(trimSearch);
      onFilterChanged({
        search: trimSearch
      });
    }
  }, [search]);
  var handleToggleFilter = (0, _react.useCallback)(function (showOpen) {
    if (showOpen !== showOpenCases) {
      setShowOpenCases(showOpen);
      onFilterChanged({
        status: showOpen ? 'open' : 'closed'
      });
    }
  }, [showOpenCases]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiFieldSearch, {
    "aria-label": i18n.SEARCH_CASES,
    fullWidth: true,
    incremental: false,
    placeholder: i18n.SEARCH_PLACEHOLDER,
    onSearch: handleOnSearch
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiFilterButton, {
    withNext: true,
    hasActiveFilters: showOpenCases,
    onClick: handleToggleFilter.bind(null, true)
  }, i18n.OPEN_CASES, countOpenCases != null ? " (".concat(countOpenCases, ")") : ''), _react.default.createElement(_eui.EuiFilterButton, {
    hasActiveFilters: !showOpenCases,
    onClick: handleToggleFilter.bind(null, false)
  }, i18n.CLOSED_CASES, countClosedCases != null ? " (".concat(countClosedCases, ")") : ''), _react.default.createElement(_filter_popover.FilterPopover, {
    buttonLabel: i18n.REPORTER,
    onSelectedOptionsChanged: handleSelectedReporters,
    selectedOptions: selectedReporters,
    options: reporters,
    optionsEmptyLabel: i18n.NO_REPORTERS_AVAILABLE
  }), _react.default.createElement(_filter_popover.FilterPopover, {
    buttonLabel: i18n.TAGS,
    onSelectedOptionsChanged: handleSelectedTags,
    selectedOptions: selectedTags,
    options: tags,
    optionsEmptyLabel: i18n.NO_TAGS_AVAILABLE
  }))));
};

CasesTableFiltersComponent.displayName = 'CasesTableFiltersComponent';

var CasesTableFilters = _react.default.memo(CasesTableFiltersComponent);

exports.CasesTableFilters = CasesTableFilters;
CasesTableFilters.displayName = 'CasesTableFilters';