"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulTimeline = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _source = require("../../containers/source");

var _use_signal_index = require("../../containers/detection_engine/signals/use_signal_index");

var _store = require("../../store");

var _actions = require("../../store/actions");

var _defaults = require("../../store/timeline/defaults");

var _default_headers = require("./body/column_headers/default_headers");

var _timeline = require("./timeline");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StatefulTimelineComponent = _react.default.memo(function (_ref) {
  var columns = _ref.columns,
      createTimeline = _ref.createTimeline,
      dataProviders = _ref.dataProviders,
      eventType = _ref.eventType,
      end = _ref.end,
      filters = _ref.filters,
      id = _ref.id,
      isLive = _ref.isLive,
      itemsPerPage = _ref.itemsPerPage,
      itemsPerPageOptions = _ref.itemsPerPageOptions,
      kqlMode = _ref.kqlMode,
      kqlQueryExpression = _ref.kqlQueryExpression,
      onClose = _ref.onClose,
      onDataProviderEdited = _ref.onDataProviderEdited,
      removeColumn = _ref.removeColumn,
      removeProvider = _ref.removeProvider,
      show = _ref.show,
      showCallOutUnauthorizedMsg = _ref.showCallOutUnauthorizedMsg,
      sort = _ref.sort,
      start = _ref.start,
      updateDataProviderEnabled = _ref.updateDataProviderEnabled,
      updateDataProviderExcluded = _ref.updateDataProviderExcluded,
      updateDataProviderKqlQuery = _ref.updateDataProviderKqlQuery,
      updateHighlightedDropAndProviderId = _ref.updateHighlightedDropAndProviderId,
      updateItemsPerPage = _ref.updateItemsPerPage,
      upsertColumn = _ref.upsertColumn,
      usersViewing = _ref.usersViewing;

  var _useSignalIndex = (0, _use_signal_index.useSignalIndex)(),
      loading = _useSignalIndex.loading,
      signalIndexExists = _useSignalIndex.signalIndexExists,
      signalIndexName = _useSignalIndex.signalIndexName;

  var indexToAdd = (0, _react.useMemo)(function () {
    if (eventType && signalIndexExists && signalIndexName != null && ['signal', 'all'].includes(eventType)) {
      return [signalIndexName];
    }

    return [];
  }, [eventType, signalIndexExists, signalIndexName]);
  var onDataProviderRemoved = (0, _react.useCallback)(function (providerId, andProviderId) {
    return removeProvider({
      id: id,
      providerId: providerId,
      andProviderId: andProviderId
    });
  }, [id]);
  var onToggleDataProviderEnabled = (0, _react.useCallback)(function (_ref2) {
    var providerId = _ref2.providerId,
        enabled = _ref2.enabled,
        andProviderId = _ref2.andProviderId;
    return updateDataProviderEnabled({
      id: id,
      enabled: enabled,
      providerId: providerId,
      andProviderId: andProviderId
    });
  }, [id]);
  var onToggleDataProviderExcluded = (0, _react.useCallback)(function (_ref3) {
    var providerId = _ref3.providerId,
        excluded = _ref3.excluded,
        andProviderId = _ref3.andProviderId;
    return updateDataProviderExcluded({
      id: id,
      excluded: excluded,
      providerId: providerId,
      andProviderId: andProviderId
    });
  }, [id]);
  var onDataProviderEditedLocal = (0, _react.useCallback)(function (_ref4) {
    var andProviderId = _ref4.andProviderId,
        excluded = _ref4.excluded,
        field = _ref4.field,
        operator = _ref4.operator,
        providerId = _ref4.providerId,
        value = _ref4.value;
    return onDataProviderEdited({
      andProviderId: andProviderId,
      excluded: excluded,
      field: field,
      id: id,
      operator: operator,
      providerId: providerId,
      value: value
    });
  }, [id]);
  var onChangeDataProviderKqlQuery = (0, _react.useCallback)(function (_ref5) {
    var providerId = _ref5.providerId,
        kqlQuery = _ref5.kqlQuery;
    return updateDataProviderKqlQuery({
      id: id,
      kqlQuery: kqlQuery,
      providerId: providerId
    });
  }, [id]);
  var onChangeItemsPerPage = (0, _react.useCallback)(function (itemsChangedPerPage) {
    return updateItemsPerPage({
      id: id,
      itemsPerPage: itemsChangedPerPage
    });
  }, [id]);
  var onChangeDroppableAndProvider = (0, _react.useCallback)(function (providerId) {
    return updateHighlightedDropAndProviderId({
      id: id,
      providerId: providerId
    });
  }, [id]);
  var toggleColumn = (0, _react.useCallback)(function (column) {
    var exists = columns.findIndex(function (c) {
      return c.id === column.id;
    }) !== -1;

    if (!exists && upsertColumn != null) {
      upsertColumn({
        column: column,
        id: id,
        index: 1
      });
    }

    if (exists && removeColumn != null) {
      removeColumn({
        columnId: column.id,
        id: id
      });
    }
  }, [columns, id]);
  (0, _react.useEffect)(function () {
    if (createTimeline != null) {
      createTimeline({
        id: id,
        columns: _default_headers.defaultHeaders,
        show: false
      });
    }
  }, []);
  return _react.default.createElement(_source.WithSource, {
    sourceId: "default",
    indexToAdd: indexToAdd
  }, function (_ref6) {
    var indexPattern = _ref6.indexPattern,
        browserFields = _ref6.browserFields;
    return _react.default.createElement(_timeline.Timeline, {
      browserFields: browserFields,
      columns: columns,
      dataProviders: dataProviders,
      end: end,
      eventType: eventType,
      filters: filters,
      id: id,
      indexPattern: indexPattern,
      indexToAdd: indexToAdd,
      isLive: isLive,
      itemsPerPage: itemsPerPage,
      itemsPerPageOptions: itemsPerPageOptions,
      kqlMode: kqlMode,
      kqlQueryExpression: kqlQueryExpression,
      loadingIndexName: loading,
      onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery,
      onChangeDroppableAndProvider: onChangeDroppableAndProvider,
      onChangeItemsPerPage: onChangeItemsPerPage,
      onClose: onClose,
      onDataProviderEdited: onDataProviderEditedLocal,
      onDataProviderRemoved: onDataProviderRemoved,
      onToggleDataProviderEnabled: onToggleDataProviderEnabled,
      onToggleDataProviderExcluded: onToggleDataProviderExcluded,
      show: show,
      showCallOutUnauthorizedMsg: showCallOutUnauthorizedMsg,
      sort: sort,
      start: start,
      toggleColumn: toggleColumn,
      usersViewing: usersViewing
    });
  });
}, function (prevProps, nextProps) {
  return prevProps.eventType === nextProps.eventType && prevProps.end === nextProps.end && prevProps.id === nextProps.id && prevProps.isLive === nextProps.isLive && prevProps.itemsPerPage === nextProps.itemsPerPage && prevProps.kqlMode === nextProps.kqlMode && prevProps.kqlQueryExpression === nextProps.kqlQueryExpression && prevProps.show === nextProps.show && prevProps.showCallOutUnauthorizedMsg === nextProps.showCallOutUnauthorizedMsg && prevProps.start === nextProps.start && (0, _fastDeepEqual.default)(prevProps.columns, nextProps.columns) && (0, _fastDeepEqual.default)(prevProps.dataProviders, nextProps.dataProviders) && (0, _fastDeepEqual.default)(prevProps.filters, nextProps.filters) && (0, _fastDeepEqual.default)(prevProps.itemsPerPageOptions, nextProps.itemsPerPageOptions) && (0, _fastDeepEqual.default)(prevProps.sort, nextProps.sort) && (0, _fastDeepEqual.default)(prevProps.usersViewing, nextProps.usersViewing);
});

StatefulTimelineComponent.displayName = 'StatefulTimelineComponent';

var makeMapStateToProps = function makeMapStateToProps() {
  var getShowCallOutUnauthorizedMsg = _store.timelineSelectors.getShowCallOutUnauthorizedMsg();

  var getTimeline = _store.timelineSelectors.getTimelineByIdSelector();

  var getKqlQueryTimeline = _store.timelineSelectors.getKqlFilterQuerySelector();

  var getInputsTimeline = _store.inputsSelectors.getTimelineSelector();

  var mapStateToProps = function mapStateToProps(state, _ref7) {
    var _getTimeline;

    var id = _ref7.id;
    var timeline = (_getTimeline = getTimeline(state, id)) !== null && _getTimeline !== void 0 ? _getTimeline : _defaults.timelineDefaults;
    var input = getInputsTimeline(state);
    var columns = timeline.columns,
        dataProviders = timeline.dataProviders,
        eventType = timeline.eventType,
        filters = timeline.filters,
        itemsPerPage = timeline.itemsPerPage,
        itemsPerPageOptions = timeline.itemsPerPageOptions,
        kqlMode = timeline.kqlMode,
        show = timeline.show,
        sort = timeline.sort;
    var kqlQueryExpression = getKqlQueryTimeline(state, id);
    var timelineFilter = kqlMode === 'filter' ? filters || [] : [];
    return {
      columns: columns,
      dataProviders: dataProviders,
      eventType: eventType,
      end: input.timerange.to,
      filters: timelineFilter,
      id: id,
      isLive: input.policy.kind === 'interval',
      itemsPerPage: itemsPerPage,
      itemsPerPageOptions: itemsPerPageOptions,
      kqlMode: kqlMode,
      kqlQueryExpression: kqlQueryExpression,
      show: show,
      showCallOutUnauthorizedMsg: getShowCallOutUnauthorizedMsg(state),
      sort: sort,
      start: input.timerange.from
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  addProvider: _actions.timelineActions.addProvider,
  createTimeline: _actions.timelineActions.createTimeline,
  onDataProviderEdited: _actions.timelineActions.dataProviderEdited,
  removeColumn: _actions.timelineActions.removeColumn,
  removeProvider: _actions.timelineActions.removeProvider,
  updateColumns: _actions.timelineActions.updateColumns,
  updateDataProviderEnabled: _actions.timelineActions.updateDataProviderEnabled,
  updateDataProviderExcluded: _actions.timelineActions.updateDataProviderExcluded,
  updateDataProviderKqlQuery: _actions.timelineActions.updateDataProviderKqlQuery,
  updateHighlightedDropAndProviderId: _actions.timelineActions.updateHighlightedDropAndProviderId,
  updateItemsPerPage: _actions.timelineActions.updateItemsPerPage,
  updateItemsPerPageOptions: _actions.timelineActions.updateItemsPerPageOptions,
  updateSort: _actions.timelineActions.updateSort,
  upsertColumn: _actions.timelineActions.upsertColumn
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
var StatefulTimeline = connector(StatefulTimelineComponent);
exports.StatefulTimeline = StatefulTimeline;