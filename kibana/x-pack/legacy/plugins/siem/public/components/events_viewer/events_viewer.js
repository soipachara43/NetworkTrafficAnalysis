"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsViewer = void 0;

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _timeline = require("../../containers/timeline");

var _kibana = require("../../lib/kibana");

var _header_section = require("../header_section");

var _default_headers = require("../timeline/body/column_headers/default_headers");

var _stateful_body = require("../timeline/body/stateful_body");

var _footer = require("../timeline/footer");

var _helpers = require("../timeline/helpers");

var _refetch_timeline = require("../timeline/refetch_timeline");

var _timeline_context = require("../timeline/timeline_context");

var _event_details_width_context = require("./event_details_width_context");

var i18n = _interopRequireWildcard(require("./translations"));

var _public = require("../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_EVENTS_VIEWER_HEIGHT = 500;
var StyledEuiPanel = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "StyledEuiPanel",
  componentId: "sc-12k1fgv-0"
})(["max-width:100%;"]);

var EventsContainerLoading = _styledComponents.default.div.withConfig({
  displayName: "EventsContainerLoading",
  componentId: "sc-12k1fgv-1"
})(["width:100%;overflow:auto;"]);

var EventsViewerComponent = function EventsViewerComponent(_ref) {
  var browserFields = _ref.browserFields,
      columns = _ref.columns,
      dataProviders = _ref.dataProviders,
      deletedEventIds = _ref.deletedEventIds,
      end = _ref.end,
      filters = _ref.filters,
      headerFilterGroup = _ref.headerFilterGroup,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? DEFAULT_EVENTS_VIEWER_HEIGHT : _ref$height,
      id = _ref.id,
      indexPattern = _ref.indexPattern,
      isLive = _ref.isLive,
      itemsPerPage = _ref.itemsPerPage,
      itemsPerPageOptions = _ref.itemsPerPageOptions,
      kqlMode = _ref.kqlMode,
      onChangeItemsPerPage = _ref.onChangeItemsPerPage,
      query = _ref.query,
      start = _ref.start,
      sort = _ref.sort,
      timelineTypeContext = _ref.timelineTypeContext,
      toggleColumn = _ref.toggleColumn,
      utilityBar = _ref.utilityBar;
  var columnsHeader = (0, _fp.isEmpty)(columns) ? _default_headers.defaultHeaders : columns;
  var kibana = (0, _kibana.useKibana)();
  var combinedQueries = (0, _helpers.combineQueries)({
    config: _public.esQuery.getEsQueryConfig(kibana.services.uiSettings),
    dataProviders: dataProviders,
    indexPattern: indexPattern,
    browserFields: browserFields,
    filters: filters,
    kqlQuery: query,
    kqlMode: kqlMode,
    start: start,
    end: end,
    isEventViewer: true
  });
  var queryFields = (0, _react.useMemo)(function () {
    var _timelineTypeContext$;

    return (0, _fp.union)(columnsHeader.map(function (c) {
      return c.id;
    }), (_timelineTypeContext$ = timelineTypeContext.queryFields) !== null && _timelineTypeContext$ !== void 0 ? _timelineTypeContext$ : []);
  }, [columnsHeader, timelineTypeContext.queryFields]);
  var sortField = (0, _react.useMemo)(function () {
    return {
      sortFieldId: sort.columnId,
      direction: sort.sortDirection
    };
  }, [sort.columnId, sort.sortDirection]);
  return _react.default.createElement(StyledEuiPanel, {
    "data-test-subj": "events-viewer-panel"
  }, combinedQueries != null ? _react.default.createElement(_event_details_width_context.EventDetailsWidthProvider, null, _react.default.createElement(_timeline.TimelineQuery, {
    fields: queryFields,
    filterQuery: combinedQueries.filterQuery,
    id: id,
    indexPattern: indexPattern,
    limit: itemsPerPage,
    sortField: sortField,
    sourceId: "default"
  }, function (_ref2) {
    var _ref3, _timelineTypeContext$2, _ref4;

    var events = _ref2.events,
        getUpdatedAt = _ref2.getUpdatedAt,
        inspect = _ref2.inspect,
        loading = _ref2.loading,
        loadMore = _ref2.loadMore,
        pageInfo = _ref2.pageInfo,
        refetch = _ref2.refetch,
        _ref2$totalCount = _ref2.totalCount,
        totalCount = _ref2$totalCount === void 0 ? 0 : _ref2$totalCount;
    var totalCountMinusDeleted = totalCount > 0 ? totalCount - deletedEventIds.length : 0;
    var subtitle = "".concat(i18n.SHOWING, ": ").concat(totalCountMinusDeleted.toLocaleString(), " ").concat((_ref3 = (_timelineTypeContext$2 = timelineTypeContext.unit) === null || _timelineTypeContext$2 === void 0 ? void 0 : _timelineTypeContext$2.call(timelineTypeContext, totalCountMinusDeleted)) !== null && _ref3 !== void 0 ? _ref3 : i18n.UNIT(totalCountMinusDeleted));
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_header_section.HeaderSection, {
      id: id,
      subtitle: utilityBar ? undefined : subtitle,
      title: (_ref4 = timelineTypeContext === null || timelineTypeContext === void 0 ? void 0 : timelineTypeContext.title) !== null && _ref4 !== void 0 ? _ref4 : i18n.EVENTS
    }, headerFilterGroup), utilityBar === null || utilityBar === void 0 ? void 0 : utilityBar(refetch, totalCountMinusDeleted), _react.default.createElement(EventsContainerLoading, {
      "data-test-subj": "events-container-loading-".concat(loading)
    }, _react.default.createElement(_timeline_context.ManageTimelineContext, {
      loading: loading,
      type: timelineTypeContext
    }, _react.default.createElement(_refetch_timeline.TimelineRefetch, {
      id: id,
      inputId: "global",
      inspect: inspect,
      loading: loading,
      refetch: refetch
    }), _react.default.createElement(_stateful_body.StatefulBody, {
      browserFields: browserFields,
      data: events.filter(function (e) {
        return !deletedEventIds.includes(e._id);
      }),
      id: id,
      isEventViewer: true,
      height: height,
      sort: sort,
      toggleColumn: toggleColumn
    }), _react.default.createElement(_footer.Footer, {
      getUpdatedAt: getUpdatedAt,
      hasNextPage: (0, _fp.getOr)(false, 'hasNextPage', pageInfo),
      height: _footer.footerHeight,
      isLive: isLive,
      isLoading: loading,
      itemsCount: events.length,
      itemsPerPage: itemsPerPage,
      itemsPerPageOptions: itemsPerPageOptions,
      onChangeItemsPerPage: onChangeItemsPerPage,
      onLoadMore: loadMore,
      nextCursor: (0, _fp.getOr)(null, 'endCursor.value', pageInfo),
      serverSideEventCount: totalCountMinusDeleted,
      tieBreaker: (0, _fp.getOr)(null, 'endCursor.tiebreaker', pageInfo)
    }))));
  })) : null);
};

var EventsViewer = _react.default.memo(EventsViewerComponent, function (prevProps, nextProps) {
  return (0, _fastDeepEqual.default)(prevProps.browserFields, nextProps.browserFields) && prevProps.columns === nextProps.columns && prevProps.dataProviders === nextProps.dataProviders && prevProps.deletedEventIds === nextProps.deletedEventIds && prevProps.end === nextProps.end && (0, _fastDeepEqual.default)(prevProps.filters, nextProps.filters) && prevProps.height === nextProps.height && prevProps.id === nextProps.id && (0, _fastDeepEqual.default)(prevProps.indexPattern, nextProps.indexPattern) && prevProps.isLive === nextProps.isLive && prevProps.itemsPerPage === nextProps.itemsPerPage && prevProps.itemsPerPageOptions === nextProps.itemsPerPageOptions && prevProps.kqlMode === nextProps.kqlMode && (0, _fastDeepEqual.default)(prevProps.query, nextProps.query) && prevProps.start === nextProps.start && prevProps.sort === nextProps.sort && (0, _fastDeepEqual.default)(prevProps.timelineTypeContext, nextProps.timelineTypeContext) && prevProps.utilityBar === nextProps.utilityBar;
});

exports.EventsViewer = EventsViewer;