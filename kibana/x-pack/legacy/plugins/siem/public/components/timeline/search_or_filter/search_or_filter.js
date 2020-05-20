"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchOrFilter = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _query_bar = require("../query_bar");

var _helpers = require("./helpers");

var i18n = _interopRequireWildcard(require("./translations"));

var _pick_events = require("./pick_events");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .", " {\n    width: 350px !important;\n  }\n\n  .", "__popoverPanel {\n    width: ", ";\n\n    .euiSuperSelect__listbox {\n      width: ", " !important;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var timelineSelectModeItemsClassName = 'timelineSelectModeItemsClassName';
var searchOrFilterPopoverClassName = 'searchOrFilterPopover';
var searchOrFilterPopoverWidth = '352px'; // SIDE EFFECT: the following creates a global class selector

var SearchOrFilterGlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject(), timelineSelectModeItemsClassName, searchOrFilterPopoverClassName, searchOrFilterPopoverWidth, searchOrFilterPopoverWidth);

var SearchOrFilterContainer = _styledComponents.default.div.withConfig({
  displayName: "SearchOrFilterContainer",
  componentId: "yful7u-0"
})(["margin:5px 0 10px 0;user-select:none;.globalQueryBar{padding:0px;.kbnQueryBar{div:first-child{margin-right:0px;}}}"]);

SearchOrFilterContainer.displayName = 'SearchOrFilterContainer';
var ModeFlexItem = (0, _styledComponents.default)(_eui.EuiFlexItem).withConfig({
  displayName: "ModeFlexItem",
  componentId: "yful7u-1"
})(["user-select:none;"]);
ModeFlexItem.displayName = 'ModeFlexItem';

var SearchOrFilter = _react.default.memo(function (_ref) {
  var applyKqlFilterQuery = _ref.applyKqlFilterQuery,
      browserFields = _ref.browserFields,
      dataProviders = _ref.dataProviders,
      eventType = _ref.eventType,
      indexPattern = _ref.indexPattern,
      isRefreshPaused = _ref.isRefreshPaused,
      filters = _ref.filters,
      filterQuery = _ref.filterQuery,
      filterQueryDraft = _ref.filterQueryDraft,
      from = _ref.from,
      fromStr = _ref.fromStr,
      kqlMode = _ref.kqlMode,
      timelineId = _ref.timelineId,
      refreshInterval = _ref.refreshInterval,
      savedQueryId = _ref.savedQueryId,
      setFilters = _ref.setFilters,
      setKqlFilterQueryDraft = _ref.setKqlFilterQueryDraft,
      setSavedQueryId = _ref.setSavedQueryId,
      to = _ref.to,
      toStr = _ref.toStr,
      updateEventType = _ref.updateEventType,
      updateKqlMode = _ref.updateKqlMode,
      updateReduxTime = _ref.updateReduxTime;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(SearchOrFilterContainer, null, _react.default.createElement(_eui.EuiFlexGroup, {
    "data-test-subj": "timeline-search-or-filter",
    gutterSize: "xs"
  }, _react.default.createElement(ModeFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: i18n.FILTER_OR_SEARCH_WITH_KQL
  }, _react.default.createElement(_eui.EuiSuperSelect, {
    "data-test-subj": "timeline-select-search-or-filter",
    hasDividers: true,
    itemLayoutAlign: "top",
    itemClassName: timelineSelectModeItemsClassName,
    onChange: function onChange(mode) {
      return updateKqlMode({
        id: timelineId,
        kqlMode: mode
      });
    },
    options: _helpers.options,
    popoverClassName: searchOrFilterPopoverClassName,
    valueOfSelected: kqlMode
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "timeline-search-or-filter-search-container"
  }, _react.default.createElement(_query_bar.QueryBarTimeline, {
    applyKqlFilterQuery: applyKqlFilterQuery,
    browserFields: browserFields,
    dataProviders: dataProviders,
    filters: filters,
    filterQuery: filterQuery,
    filterQueryDraft: filterQueryDraft,
    from: from,
    fromStr: fromStr,
    kqlMode: kqlMode,
    indexPattern: indexPattern,
    isRefreshPaused: isRefreshPaused,
    refreshInterval: refreshInterval,
    savedQueryId: savedQueryId,
    setFilters: setFilters,
    setKqlFilterQueryDraft: setKqlFilterQueryDraft,
    setSavedQueryId: setSavedQueryId,
    timelineId: timelineId,
    to: to,
    toStr: toStr,
    updateReduxTime: updateReduxTime
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_pick_events.PickEventType, {
    eventType: eventType,
    onChangeEventType: updateEventType
  })))), _react.default.createElement(SearchOrFilterGlobalStyle, null));
});

exports.SearchOrFilter = SearchOrFilter;
SearchOrFilter.displayName = 'SearchOrFilter';