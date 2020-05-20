"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineKqlFetch = exports.connector = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _store = require("../../store");

var _actions = require("../../store/actions");

var _use_update_kql = require("../../utils/kql/use_update_kql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TimelineKqlFetchComponent = (0, _react.memo)(function (_ref) {
  var id = _ref.id,
      indexPattern = _ref.indexPattern,
      inputId = _ref.inputId,
      kueryFilterQuery = _ref.kueryFilterQuery,
      kueryFilterQueryDraft = _ref.kueryFilterQueryDraft,
      setTimelineQuery = _ref.setTimelineQuery;
  (0, _react.useEffect)(function () {
    setTimelineQuery({
      id: 'kql',
      inputId: inputId,
      inspect: null,
      loading: false,
      refetch: (0, _use_update_kql.useUpdateKql)({
        indexPattern: indexPattern,
        kueryFilterQuery: kueryFilterQuery,
        kueryFilterQueryDraft: kueryFilterQueryDraft,
        storeType: 'timelineType',
        timelineId: id
      })
    });
  }, [kueryFilterQueryDraft, kueryFilterQuery, id]);
  return null;
}, function (prevProps, nextProps) {
  return prevProps.id === nextProps.id && prevProps.inputId === nextProps.inputId && prevProps.setTimelineQuery === nextProps.setTimelineQuery && (0, _fastDeepEqual.default)(prevProps.kueryFilterQuery, nextProps.kueryFilterQuery) && (0, _fastDeepEqual.default)(prevProps.kueryFilterQueryDraft, nextProps.kueryFilterQueryDraft) && (0, _fastDeepEqual.default)(prevProps.indexPattern, nextProps.indexPattern);
});

var makeMapStateToProps = function makeMapStateToProps() {
  var getTimelineKueryFilterQueryDraft = _store.timelineSelectors.getKqlFilterQueryDraftSelector();

  var getTimelineKueryFilterQuery = _store.timelineSelectors.getKqlFilterKuerySelector();

  var mapStateToProps = function mapStateToProps(state, _ref2) {
    var id = _ref2.id;
    return {
      kueryFilterQuery: getTimelineKueryFilterQuery(state, id),
      kueryFilterQueryDraft: getTimelineKueryFilterQueryDraft(state, id)
    };
  };

  return mapStateToProps;
};

var mapDispatchToProps = {
  setTimelineQuery: _actions.inputsActions.setQuery
};
var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
exports.connector = connector;
var TimelineKqlFetch = connector(TimelineKqlFetchComponent);
exports.TimelineKqlFetch = TimelineKqlFetch;