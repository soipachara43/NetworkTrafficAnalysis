"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RulesTableFilters = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var i18n = _interopRequireWildcard(require("../../translations"));

var _use_tags = require("../../../../../containers/detection_engine/rules/use_tags");

var _tags_filter_popover = require("./tags_filter_popover");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Collection of filters for filtering data within the RulesTable. Contains search bar, Elastic/Custom
 * Rules filter button toggle, and tag selection
 *
 * @param onFilterChanged change listener to be notified on filter changes
 */
var RulesTableFiltersComponent = function RulesTableFiltersComponent(_ref) {
  var onFilterChanged = _ref.onFilterChanged,
      rulesCustomInstalled = _ref.rulesCustomInstalled,
      rulesInstalled = _ref.rulesInstalled;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedTags = _useState4[0],
      setSelectedTags = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showCustomRules = _useState6[0],
      setShowCustomRules = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showElasticRules = _useState8[0],
      setShowElasticRules = _useState8[1];

  var _useTags = (0, _use_tags.useTags)(),
      _useTags2 = _slicedToArray(_useTags, 3),
      isLoadingTags = _useTags2[0],
      tags = _useTags2[1],
      reFetchTags = _useTags2[2];

  (0, _react.useEffect)(function () {
    reFetchTags();
  }, [rulesCustomInstalled, rulesInstalled]); // Propagate filter changes to parent

  (0, _react.useEffect)(function () {
    onFilterChanged({
      filter: filter,
      showCustomRules: showCustomRules,
      showElasticRules: showElasticRules,
      tags: selectedTags
    });
  }, [filter, selectedTags, showCustomRules, showElasticRules, onFilterChanged]);
  var handleOnSearch = (0, _react.useCallback)(function (filterString) {
    return setFilter(filterString.trim());
  }, [setFilter]);
  var handleElasticRulesClick = (0, _react.useCallback)(function () {
    setShowElasticRules(!showElasticRules);
    setShowCustomRules(false);
  }, [setShowElasticRules, showElasticRules, setShowCustomRules]);
  var handleCustomRulesClick = (0, _react.useCallback)(function () {
    setShowCustomRules(!showCustomRules);
    setShowElasticRules(false);
  }, [setShowElasticRules, showCustomRules, setShowCustomRules]);
  var handleSelectedTags = (0, _react.useCallback)(function (newTags) {
    if (!(0, _fp.isEqual)(newTags, selectedTags)) {
      setSelectedTags(newTags);
    }
  }, [selectedTags]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiFieldSearch, {
    "aria-label": i18n.SEARCH_RULES,
    fullWidth: true,
    incremental: false,
    placeholder: i18n.SEARCH_PLACEHOLDER,
    onSearch: handleOnSearch
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_tags_filter_popover.TagsFilterPopover, {
    isLoading: isLoadingTags,
    onSelectedTagsChanged: handleSelectedTags,
    selectedTags: selectedTags,
    tags: tags
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiFilterButton, {
    hasActiveFilters: showElasticRules,
    onClick: handleElasticRulesClick,
    "data-test-subj": "show-elastic-rules-filter-button",
    withNext: true
  }, i18n.ELASTIC_RULES, rulesInstalled != null ? " (".concat(rulesInstalled, ")") : ''), _react.default.createElement(_eui.EuiFilterButton, {
    hasActiveFilters: showCustomRules,
    onClick: handleCustomRulesClick,
    "data-test-subj": "show-custom-rules-filter-button"
  }, _react.default.createElement(_react.default.Fragment, null, i18n.CUSTOM_RULES, rulesCustomInstalled != null ? " (".concat(rulesCustomInstalled, ")") : '')))));
};

RulesTableFiltersComponent.displayName = 'RulesTableFiltersComponent';

var RulesTableFilters = _react.default.memo(RulesTableFiltersComponent);

exports.RulesTableFilters = RulesTableFilters;
RulesTableFilters.displayName = 'RulesTableFilters';