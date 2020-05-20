"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobsTableFilters = exports.JobsTableFiltersComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var i18n = _interopRequireWildcard(require("./translations"));

var _groups_filter_popover = require("./groups_filter_popover");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Collection of filters for filtering data within the JobsTable. Contains search bar, Elastic/Custom
 * Jobs filter button toggle, and groups selection
 *
 * @param siemJobs jobs to fetch groups from to display for filtering
 * @param onFilterChanged change listener to be notified on filter changes
 */
var JobsTableFiltersComponent = function JobsTableFiltersComponent(_ref) {
  var siemJobs = _ref.siemJobs,
      onFilterChanged = _ref.onFilterChanged;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      filterQuery = _useState2[0],
      setFilterQuery = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedGroups = _useState4[0],
      setSelectedGroups = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showCustomJobs = _useState6[0],
      setShowCustomJobs = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showElasticJobs = _useState8[0],
      setShowElasticJobs = _useState8[1]; // Propagate filter changes to parent


  (0, _react.useEffect)(function () {
    onFilterChanged({
      filterQuery: filterQuery,
      showCustomJobs: showCustomJobs,
      showElasticJobs: showElasticJobs,
      selectedGroups: selectedGroups
    });
  }, [filterQuery, selectedGroups, showCustomJobs, showElasticJobs, onFilterChanged]);
  var handleChange = (0, _react.useCallback)(function (query) {
    return setFilterQuery(query.queryText.trim());
  }, [setFilterQuery]);
  var handleElasticJobsClick = (0, _react.useCallback)(function () {
    setShowElasticJobs(!showElasticJobs);
    setShowCustomJobs(false);
  }, [setShowElasticJobs, showElasticJobs, setShowCustomJobs]);
  var handleCustomJobsClick = (0, _react.useCallback)(function () {
    setShowCustomJobs(!showCustomJobs);
    setShowElasticJobs(false);
  }, [setShowElasticJobs, showCustomJobs, setShowCustomJobs]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiSearchBar, {
    "data-test-subj": "jobs-filter-bar",
    box: {
      placeholder: i18n.FILTER_PLACEHOLDER,
      incremental: true
    },
    onChange: handleChange
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_groups_filter_popover.GroupsFilterPopover, {
    siemJobs: siemJobs,
    onSelectedGroupsChanged: setSelectedGroups
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiFilterButton, {
    hasActiveFilters: showElasticJobs,
    onClick: handleElasticJobsClick,
    "data-test-subj": "show-elastic-jobs-filter-button",
    withNext: true
  }, i18n.SHOW_ELASTIC_JOBS), _react.default.createElement(_eui.EuiFilterButton, {
    hasActiveFilters: showCustomJobs,
    onClick: handleCustomJobsClick,
    "data-test-subj": "show-custom-jobs-filter-button"
  }, i18n.SHOW_CUSTOM_JOBS))));
};

exports.JobsTableFiltersComponent = JobsTableFiltersComponent;
JobsTableFiltersComponent.displayName = 'JobsTableFiltersComponent';

var JobsTableFilters = _react.default.memo(JobsTableFiltersComponent);

exports.JobsTableFilters = JobsTableFilters;
JobsTableFilters.displayName = 'JobsTableFilters';