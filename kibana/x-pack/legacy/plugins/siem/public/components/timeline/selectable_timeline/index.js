"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectableTimeline = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _all = require("../../../containers/timeline/all");

var _types = require("../../../graphql/types");

var _helpers = require("../../open_timeline/helpers");

var i18nTimeline = _interopRequireWildcard(require("../../open_timeline/translations"));

var _empty_value = require("../../empty_value");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MyEuiFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "MyEuiFlexItem",
  componentId: "ssh43k-0"
})(["display:inline-block;max-width:296px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
var MyEuiFlexGroup = (0, _styledComponents.default)(_eui.EuiFlexGroup).withConfig({
  displayName: "MyEuiFlexGroup",
  componentId: "ssh43k-1"
})(["padding 0px 4px;"]);

var EuiSelectableContainer = _styledComponents.default.div.withConfig({
  displayName: "EuiSelectableContainer",
  componentId: "ssh43k-2"
})([".euiSelectable{.euiFormControlLayout__childrenWrapper{display:flex;}", "}"], function (_ref) {
  var isLoading = _ref.isLoading;
  return "".concat(isLoading ? "\n      .euiFormControlLayoutIcons {\n        display: none;\n      }\n      .euiFormControlLayoutIcons.euiFormControlLayoutIcons--right {\n        display: block;\n        left: 12px;\n        top: 12px;\n      }" : '', "\n    ");
});

var ORIGINAL_PAGE_SIZE = 50;
var POPOVER_HEIGHT = 260;
var TIMELINE_ITEM_HEIGHT = 50;

var SelectableTimelineComponent = function SelectableTimelineComponent(_ref2) {
  var _ref2$hideUntitled = _ref2.hideUntitled,
      hideUntitled = _ref2$hideUntitled === void 0 ? false : _ref2$hideUntitled,
      getSelectableOptions = _ref2.getSelectableOptions,
      onClosePopover = _ref2.onClosePopover,
      onTimelineChange = _ref2.onTimelineChange;

  var _useState = (0, _react.useState)(ORIGINAL_PAGE_SIZE),
      _useState2 = _slicedToArray(_useState, 2),
      pageSize = _useState2[0],
      setPageSize = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      heightTrigger = _useState4[0],
      setHeightTrigger = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      searchTimelineValue = _useState6[0],
      setSearchTimelineValue = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      onlyFavorites = _useState8[0],
      setOnlyFavorites = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      searchRef = _useState10[0],
      setSearchRef = _useState10[1];

  var onSearchTimeline = (0, _react.useCallback)(function (val) {
    setSearchTimelineValue(val);
  }, []);
  var handleOnToggleOnlyFavorites = (0, _react.useCallback)(function () {
    setOnlyFavorites(!onlyFavorites);
  }, [onlyFavorites]);
  var handleOnScroll = (0, _react.useCallback)(function (totalTimelines, totalCount, _ref3) {
    var clientHeight = _ref3.clientHeight,
        scrollHeight = _ref3.scrollHeight,
        scrollTop = _ref3.scrollTop;

    if (totalTimelines < totalCount) {
      var clientHeightTrigger = clientHeight * 1.2;

      if (scrollTop > 10 && scrollHeight - scrollTop < clientHeightTrigger && scrollHeight > heightTrigger) {
        setHeightTrigger(scrollHeight);
        setPageSize(pageSize + ORIGINAL_PAGE_SIZE);
      }
    }
  }, [heightTrigger, pageSize]);
  var renderTimelineOption = (0, _react.useCallback)(function (option, searchValue) {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      justifyContent: "spaceBetween",
      alignItems: "center",
      responsive: false
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "".concat(option.checked === 'on' ? 'check' : 'none'),
      color: "primary"
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "none",
      direction: "column"
    }, _react.default.createElement(MyEuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiHighlight, {
      search: searchValue
    }, (0, _helpers.isUntitled)(option) ? i18nTimeline.UNTITLED_TIMELINE : option.title)), _react.default.createElement(MyEuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiTextColor, {
      color: "subdued",
      component: "span"
    }, _react.default.createElement("small", null, option.description != null && option.description.trim().length > 0 ? option.description : (0, _empty_value.getEmptyTagValue)()))))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "".concat(option.favorite != null && (0, _fp.isEmpty)(option.favorite) ? 'starEmpty' : 'starFilled')
    })));
  }, []);
  var handleTimelineChange = (0, _react.useCallback)(function (options) {
    var selectedTimeline = options.filter(function (option) {
      return option.checked === 'on';
    });

    if (selectedTimeline != null && selectedTimeline.length > 0) {
      onTimelineChange((0, _fp.isEmpty)(selectedTimeline[0].title) ? i18nTimeline.UNTITLED_TIMELINE : selectedTimeline[0].title, selectedTimeline[0].id === '-1' ? null : selectedTimeline[0].id);
    }

    onClosePopover();
  }, [onClosePopover, onTimelineChange]);
  var favoritePortal = (0, _react.useMemo)(function () {
    return searchRef != null ? _react.default.createElement(_eui.EuiPortal, {
      insert: {
        sibling: searchRef,
        position: 'after'
      }
    }, _react.default.createElement(MyEuiFlexGroup, {
      gutterSize: "xs",
      justifyContent: "flexEnd"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiFilterButton, {
      size: "l",
      "data-test-subj": "only-favorites-toggle",
      hasActiveFilters: onlyFavorites,
      onClick: handleOnToggleOnlyFavorites
    }, i18nTimeline.ONLY_FAVORITES))))) : null;
  }, [searchRef, onlyFavorites, handleOnToggleOnlyFavorites]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_all.AllTimelinesQuery, {
    pageInfo: {
      pageIndex: 1,
      pageSize: pageSize
    },
    search: searchTimelineValue,
    sort: {
      sortField: _types.SortFieldTimeline.updated,
      sortOrder: _types.Direction.desc
    },
    onlyUserFavorite: onlyFavorites
  }, function (_ref4) {
    var timelines = _ref4.timelines,
        loading = _ref4.loading,
        totalCount = _ref4.totalCount;
    return _react.default.createElement(EuiSelectableContainer, {
      isLoading: loading
    }, _react.default.createElement(_eui.EuiSelectable, {
      height: POPOVER_HEIGHT,
      isLoading: loading && timelines.length === 0,
      listProps: {
        rowHeight: TIMELINE_ITEM_HEIGHT,
        showIcons: false,
        virtualizedProps: {
          onScroll: handleOnScroll.bind(null, timelines.filter(function (t) {
            return !hideUntitled || t.title !== '';
          }).length, totalCount)
        }
      },
      renderOption: renderTimelineOption,
      onChange: handleTimelineChange,
      searchable: true,
      searchProps: {
        'data-test-subj': 'timeline-super-select-search-box',
        isLoading: loading,
        placeholder: i18n.SEARCH_BOX_TIMELINE_PLACEHOLDER,
        onSearch: onSearchTimeline,
        incremental: false,
        inputRef: function inputRef(ref) {
          setSearchRef(ref);
        }
      },
      singleSelection: true,
      options: getSelectableOptions({
        timelines: timelines,
        onlyFavorites: onlyFavorites,
        searchTimelineValue: searchTimelineValue
      })
    }, function (list, search) {
      return _react.default.createElement(_react.default.Fragment, null, search, favoritePortal, list);
    }));
  }));
};

var SelectableTimeline = (0, _react.memo)(SelectableTimelineComponent);
exports.SelectableTimeline = SelectableTimeline;