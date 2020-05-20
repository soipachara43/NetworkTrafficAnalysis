"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = exports.TimelineComponent = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _header_with_close_button = require("../flyout/header_with_close_button");

var _timeline = require("../../containers/timeline");

var _kibana = require("../../lib/kibana");

var _default_headers = require("./body/column_headers/default_headers");

var _stateful_body = require("./body/stateful_body");

var _fetch_kql_timeline = require("./fetch_kql_timeline");

var _footer = require("./footer");

var _header = require("./header");

var _helpers = require("./helpers");

var _refetch_timeline = require("./refetch_timeline");

var _timeline_context = require("./timeline_context");

var _public = require("../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TimelineContainer = _styledComponents.default.div.withConfig({
  displayName: "TimelineContainer",
  componentId: "kux443-0"
})(["height:100%;display:flex;flex-direction:column;"]);

var TimelineHeaderContainer = _styledComponents.default.div.withConfig({
  displayName: "TimelineHeaderContainer",
  componentId: "kux443-1"
})(["margin-top:6px;width:100%;"]);

TimelineHeaderContainer.displayName = 'TimelineHeaderContainer';
var StyledEuiFlyoutHeader = (0, _styledComponents.default)(_eui.EuiFlyoutHeader).withConfig({
  displayName: "StyledEuiFlyoutHeader",
  componentId: "kux443-2"
})(["align-items:center;box-shadow:none;display:flex;flex-direction:column;padding:14px 10px 0 12px;"]);
var StyledEuiFlyoutBody = (0, _styledComponents.default)(_eui.EuiFlyoutBody).withConfig({
  displayName: "StyledEuiFlyoutBody",
  componentId: "kux443-3"
})(["overflow-y:hidden;flex:1;.euiFlyoutBody__overflow{overflow:hidden;mask-image:none;}.euiFlyoutBody__overflowContent{padding:0 10px 0 12px;height:100%;display:flex;}"]);
var StyledEuiFlyoutFooter = (0, _styledComponents.default)(_eui.EuiFlyoutFooter).withConfig({
  displayName: "StyledEuiFlyoutFooter",
  componentId: "kux443-4"
})(["background:none;padding:0 10px 5px 12px;"]);

/** The parent Timeline component */
var TimelineComponent = function TimelineComponent(_ref) {
  var browserFields = _ref.browserFields,
      columns = _ref.columns,
      dataProviders = _ref.dataProviders,
      end = _ref.end,
      eventType = _ref.eventType,
      filters = _ref.filters,
      id = _ref.id,
      indexPattern = _ref.indexPattern,
      indexToAdd = _ref.indexToAdd,
      isLive = _ref.isLive,
      itemsPerPage = _ref.itemsPerPage,
      itemsPerPageOptions = _ref.itemsPerPageOptions,
      kqlMode = _ref.kqlMode,
      kqlQueryExpression = _ref.kqlQueryExpression,
      loadingIndexName = _ref.loadingIndexName,
      onChangeDataProviderKqlQuery = _ref.onChangeDataProviderKqlQuery,
      onChangeDroppableAndProvider = _ref.onChangeDroppableAndProvider,
      onChangeItemsPerPage = _ref.onChangeItemsPerPage,
      onClose = _ref.onClose,
      onDataProviderEdited = _ref.onDataProviderEdited,
      onDataProviderRemoved = _ref.onDataProviderRemoved,
      onToggleDataProviderEnabled = _ref.onToggleDataProviderEnabled,
      onToggleDataProviderExcluded = _ref.onToggleDataProviderExcluded,
      show = _ref.show,
      showCallOutUnauthorizedMsg = _ref.showCallOutUnauthorizedMsg,
      start = _ref.start,
      sort = _ref.sort,
      toggleColumn = _ref.toggleColumn,
      usersViewing = _ref.usersViewing;
  var kibana = (0, _kibana.useKibana)();
  var combinedQueries = (0, _helpers.combineQueries)({
    config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
    dataProviders: dataProviders,
    indexPattern: indexPattern,
    browserFields: browserFields,
    filters: filters,
    kqlQuery: {
      query: kqlQueryExpression,
      language: 'kuery'
    },
    kqlMode: kqlMode,
    start: start,
    end: end
  });
  var columnsHeader = (0, _fp.isEmpty)(columns) ? _default_headers.defaultHeaders : columns;
  var timelineQueryFields = (0, _react.useMemo)(function () {
    return columnsHeader.map(function (c) {
      return c.id;
    });
  }, [columnsHeader]);
  var timelineQuerySortField = (0, _react.useMemo)(function () {
    return {
      sortFieldId: sort.columnId,
      direction: sort.sortDirection
    };
  }, [sort.columnId, sort.sortDirection]);
  return _react.default.createElement(TimelineContainer, {
    "data-test-subj": "timeline"
  }, _react.default.createElement(StyledEuiFlyoutHeader, {
    "data-test-subj": "eui-flyout-header",
    hasBorder: false
  }, _react.default.createElement(_header_with_close_button.FlyoutHeaderWithCloseButton, {
    onClose: onClose,
    timelineId: id,
    usersViewing: usersViewing
  }), _react.default.createElement(TimelineHeaderContainer, {
    "data-test-subj": "timelineHeader"
  }, _react.default.createElement(_header.TimelineHeader, {
    browserFields: browserFields,
    id: id,
    indexPattern: indexPattern,
    dataProviders: dataProviders,
    onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery,
    onChangeDroppableAndProvider: onChangeDroppableAndProvider,
    onDataProviderEdited: onDataProviderEdited,
    onDataProviderRemoved: onDataProviderRemoved,
    onToggleDataProviderEnabled: onToggleDataProviderEnabled,
    onToggleDataProviderExcluded: onToggleDataProviderExcluded,
    show: show,
    showCallOutUnauthorizedMsg: showCallOutUnauthorizedMsg
  }))), _react.default.createElement(_fetch_kql_timeline.TimelineKqlFetch, {
    id: id,
    indexPattern: indexPattern,
    inputId: "timeline"
  }), combinedQueries != null ? _react.default.createElement(_timeline.TimelineQuery, {
    eventType: eventType,
    id: id,
    indexToAdd: indexToAdd,
    fields: timelineQueryFields,
    sourceId: "default",
    limit: itemsPerPage,
    filterQuery: combinedQueries.filterQuery,
    sortField: timelineQuerySortField
  }, function (_ref2) {
    var events = _ref2.events,
        inspect = _ref2.inspect,
        loading = _ref2.loading,
        totalCount = _ref2.totalCount,
        pageInfo = _ref2.pageInfo,
        loadMore = _ref2.loadMore,
        getUpdatedAt = _ref2.getUpdatedAt,
        refetch = _ref2.refetch;
    return _react.default.createElement(_timeline_context.ManageTimelineContext, {
      loading: loading || loadingIndexName
    }, _react.default.createElement(_refetch_timeline.TimelineRefetch, {
      id: id,
      inputId: "timeline",
      inspect: inspect,
      loading: loading,
      refetch: refetch
    }), _react.default.createElement(StyledEuiFlyoutBody, {
      "data-test-subj": "eui-flyout-body",
      className: "timeline-flyout-body"
    }, _react.default.createElement(_stateful_body.StatefulBody, {
      browserFields: browserFields,
      data: events,
      id: id,
      sort: sort,
      toggleColumn: toggleColumn
    })), _react.default.createElement(StyledEuiFlyoutFooter, {
      "data-test-subj": "eui-flyout-footer",
      className: "timeline-flyout-footer"
    }, _react.default.createElement(_footer.Footer, {
      serverSideEventCount: totalCount,
      hasNextPage: (0, _fp.getOr)(false, 'hasNextPage', pageInfo),
      height: _footer.footerHeight,
      isLive: isLive,
      isLoading: loading || loadingIndexName,
      itemsCount: events.length,
      itemsPerPage: itemsPerPage,
      itemsPerPageOptions: itemsPerPageOptions,
      onChangeItemsPerPage: onChangeItemsPerPage,
      onLoadMore: loadMore,
      nextCursor: (0, _fp.getOr)(null, 'endCursor.value', pageInfo),
      tieBreaker: (0, _fp.getOr)(null, 'endCursor.tiebreaker', pageInfo),
      getUpdatedAt: getUpdatedAt
    })));
  }) : null);
};

exports.TimelineComponent = TimelineComponent;

var Timeline = _react.default.memo(TimelineComponent);

exports.Timeline = Timeline;