"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulSearchOrFilter = exports.connector = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _keury = require("../../../lib/keury");

var _store = require("../../../store");

var _actions = require("../../../store/actions");

var _defaults = require("../../../store/timeline/defaults");

var _super_date_picker = require("../../super_date_picker");

var _search_or_filter = require("./search_or_filter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StatefulSearchOrFilterComponent = _react.default.memo(function (_ref) {
  var applyKqlFilterQuery = _ref.applyKqlFilterQuery,
      browserFields = _ref.browserFields,
      dataProviders = _ref.dataProviders,
      eventType = _ref.eventType,
      filters = _ref.filters,
      filterQuery = _ref.filterQuery,
      filterQueryDraft = _ref.filterQueryDraft,
      from = _ref.from,
      fromStr = _ref.fromStr,
      indexPattern = _ref.indexPattern,
      isRefreshPaused = _ref.isRefreshPaused,
      kqlMode = _ref.kqlMode,
      refreshInterval = _ref.refreshInterval,
      savedQueryId = _ref.savedQueryId,
      setFilters = _ref.setFilters,
      setKqlFilterQueryDraft = _ref.setKqlFilterQueryDraft,
      setSavedQueryId = _ref.setSavedQueryId,
      timelineId = _ref.timelineId,
      to = _ref.to,
      toStr = _ref.toStr,
      updateEventType = _ref.updateEventType,
      updateKqlMode = _ref.updateKqlMode,
      updateReduxTime = _ref.updateReduxTime;
  var applyFilterQueryFromKueryExpression = (0, _react.useCallback)(function (expression, kind) {
    return applyKqlFilterQuery({
      id: timelineId,
      filterQuery: {
        kuery: {
          kind: kind,
          expression: expression
        },
        serializedQuery: (0, _keury.convertKueryToElasticSearchQuery)(expression, indexPattern)
      }
    });
  }, [indexPattern, timelineId]);
  var setFilterQueryDraftFromKueryExpression = (0, _react.useCallback)(function (expression, kind) {
    return setKqlFilterQueryDraft({
      id: timelineId,
      filterQueryDraft: {
        kind: kind,
        expression: expression
      }
    });
  }, [timelineId]);
  var setFiltersInTimeline = (0, _react.useCallback)(function (newFilters) {
    return setFilters({
      id: timelineId,
      filters: newFilters
    });
  }, [timelineId]);
  var setSavedQueryInTimeline = (0, _react.useCallback)(function (newSavedQueryId) {
    return setSavedQueryId({
      id: timelineId,
      savedQueryId: newSavedQueryId
    });
  }, [timelineId]);
  var handleUpdateEventType = (0, _react.useCallback)(function (newEventType) {
    return updateEventType({
      id: timelineId,
      eventType: newEventType
    });
  }, [timelineId]);
  return _react.default.createElement(_search_or_filter.SearchOrFilter, {
    applyKqlFilterQuery: applyFilterQueryFromKueryExpression,
    browserFields: browserFields,
    dataProviders: dataProviders,
    eventType: eventType,
    filters: filters,
    filterQuery: filterQuery,
    filterQueryDraft: filterQueryDraft,
    from: from,
    fromStr: fromStr,
    indexPattern: indexPattern,
    isRefreshPaused: isRefreshPaused,
    kqlMode: kqlMode,
    refreshInterval: refreshInterval,
    savedQueryId: savedQueryId,
    setFilters: setFiltersInTimeline,
    setKqlFilterQueryDraft: setFilterQueryDraftFromKueryExpression,
    setSavedQueryId: setSavedQueryInTimeline,
    timelineId: timelineId,
    to: to,
    toStr: toStr,
    updateEventType: handleUpdateEventType,
    updateKqlMode: updateKqlMode,
    updateReduxTime: updateReduxTime
  });
}, function (prevProps, nextProps) {
  return prevProps.eventType === nextProps.eventType && prevProps.from === nextProps.from && prevProps.fromStr === nextProps.fromStr && prevProps.to === nextProps.to && prevProps.toStr === nextProps.toStr && prevProps.isRefreshPaused === nextProps.isRefreshPaused && prevProps.refreshInterval === nextProps.refreshInterval && prevProps.timelineId === nextProps.timelineId && (0, _fastDeepEqual.default)(prevProps.browserFields, nextProps.browserFields) && (0, _fastDeepEqual.default)(prevProps.dataProviders, nextProps.dataProviders) && (0, _fastDeepEqual.default)(prevProps.filters, nextProps.filters) && (0, _fastDeepEqual.default)(prevProps.filterQuery, nextProps.filterQuery) && (0, _fastDeepEqual.default)(prevProps.filterQueryDraft, nextProps.filterQueryDraft) && (0, _fastDeepEqual.default)(prevProps.indexPattern, nextProps.indexPattern) && (0, _fastDeepEqual.default)(prevProps.kqlMode, nextProps.kqlMode) && (0, _fastDeepEqual.default)(prevProps.savedQueryId, nextProps.savedQueryId) && (0, _fastDeepEqual.default)(prevProps.timelineId, nextProps.timelineId);
});

StatefulSearchOrFilterComponent.displayName = 'StatefulSearchOrFilterComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getTimeline = _store.timelineSelectors.getTimelineByIdSelector();

  var getKqlFilterQueryDraft = _store.timelineSelectors.getKqlFilterQueryDraftSelector();

  var getKqlFilterQuery = _store.timelineSelectors.getKqlFilterKuerySelector();

  var getInputsTimeline = _store.inputsSelectors.getTimelineSelector();

  var getInputsPolicy = _store.inputsSelectors.getTimelinePolicySelector();

  var mapStateToProps = function mapStateToProps(state, _ref2) {
    var _getTimeline, _timeline$eventType;

    var timelineId = _ref2.timelineId;
    var timeline = (_getTimeline = getTimeline(state, timelineId)) !== null && _getTimeline !== void 0 ? _getTimeline : _defaults.timelineDefaults;
    var input = getInputsTimeline(state);
    var policy = getInputsPolicy(state);
    return {
      dataProviders: timeline.dataProviders,
      eventType: (_timeline$eventType = timeline.eventType) !== null && _timeline$eventType !== void 0 ? _timeline$eventType : 'raw',
      filterQuery: getKqlFilterQuery(state, timelineId),
      filterQueryDraft: getKqlFilterQueryDraft(state, timelineId),
      filters: timeline.filters,
      from: input.timerange.from,
      fromStr: input.timerange.fromStr,
      isRefreshPaused: policy.kind === 'manual',
      kqlMode: (0, _fp.getOr)('filter', 'kqlMode', timeline),
      refreshInterval: policy.duration,
      savedQueryId: (0, _fp.getOr)(null, 'savedQueryId', timeline),
      to: input.timerange.to,
      toStr: input.timerange.toStr
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    applyKqlFilterQuery: function applyKqlFilterQuery(_ref3) {
      var id = _ref3.id,
          filterQuery = _ref3.filterQuery;
      return dispatch(_actions.timelineActions.applyKqlFilterQuery({
        id: id,
        filterQuery: filterQuery
      }));
    },
    updateEventType: function updateEventType(_ref4) {
      var id = _ref4.id,
          eventType = _ref4.eventType;
      return dispatch(_actions.timelineActions.updateEventType({
        id: id,
        eventType: eventType
      }));
    },
    updateKqlMode: function updateKqlMode(_ref5) {
      var id = _ref5.id,
          kqlMode = _ref5.kqlMode;
      return dispatch(_actions.timelineActions.updateKqlMode({
        id: id,
        kqlMode: kqlMode
      }));
    },
    setKqlFilterQueryDraft: function setKqlFilterQueryDraft(_ref6) {
      var id = _ref6.id,
          filterQueryDraft = _ref6.filterQueryDraft;
      return dispatch(_actions.timelineActions.setKqlFilterQueryDraft({
        id: id,
        filterQueryDraft: filterQueryDraft
      }));
    },
    setSavedQueryId: function setSavedQueryId(_ref7) {
      var id = _ref7.id,
          savedQueryId = _ref7.savedQueryId;
      return dispatch(_actions.timelineActions.setSavedQueryId({
        id: id,
        savedQueryId: savedQueryId
      }));
    },
    setFilters: function setFilters(_ref8) {
      var id = _ref8.id,
          filters = _ref8.filters;
      return dispatch(_actions.timelineActions.setFilters({
        id: id,
        filters: filters
      }));
    },
    updateReduxTime: (0, _super_date_picker.dispatchUpdateReduxTime)(dispatch)
  };
};

var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
exports.connector = connector;
var StatefulSearchOrFilter = connector(StatefulSearchOrFilterComponent);
exports.StatefulSearchOrFilter = StatefulSearchOrFilter;