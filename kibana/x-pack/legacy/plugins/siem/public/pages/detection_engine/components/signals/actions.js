"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSignalToTimelineAction = exports.determineToAndFrom = exports.updateSignalStatusAction = exports.getFilterAndRuleBounds = exports.getUpdateSignalsQuery = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _fp = require("lodash/fp");

var _moment = _interopRequireDefault(require("moment"));

var _api = require("../../../../containers/detection_engine/signals/api");

var _index = require("../../../../containers/timeline/one/index.gql_query");

var _helpers = require("../../../../components/open_timeline/helpers");

var _keury = require("../../../../lib/keury");

var _defaults = require("../../../../store/timeline/defaults");

var _helpers2 = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getUpdateSignalsQuery = function getUpdateSignalsQuery(eventIds) {
  return {
    query: {
      bool: {
        filter: {
          terms: {
            _id: _toConsumableArray(eventIds)
          }
        }
      }
    }
  };
};

exports.getUpdateSignalsQuery = getUpdateSignalsQuery;

var getFilterAndRuleBounds = function getFilterAndRuleBounds(data) {
  var _ref, _data$0$filter, _data$0$filter$;

  var stringFilter = (_ref = data === null || data === void 0 ? void 0 : (_data$0$filter = data[0].filter(function (d) {
    return d.field === 'signal.rule.filters';
  })) === null || _data$0$filter === void 0 ? void 0 : (_data$0$filter$ = _data$0$filter[0]) === null || _data$0$filter$ === void 0 ? void 0 : _data$0$filter$.value) !== null && _ref !== void 0 ? _ref : [];
  var eventTimes = data.flatMap(function (signal) {
    var _ref2, _signal$filter, _signal$filter$;

    return (_ref2 = (_signal$filter = signal.filter(function (d) {
      return d.field === 'signal.original_time';
    })) === null || _signal$filter === void 0 ? void 0 : (_signal$filter$ = _signal$filter[0]) === null || _signal$filter$ === void 0 ? void 0 : _signal$filter$.value) !== null && _ref2 !== void 0 ? _ref2 : [];
  }).map(function (d) {
    return (0, _moment.default)(d);
  });
  return [stringFilter, _moment.default.min(eventTimes).valueOf(), _moment.default.max(eventTimes).valueOf()];
};

exports.getFilterAndRuleBounds = getFilterAndRuleBounds;

var updateSignalStatusAction =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref4) {
    var query, signalIds, status, setEventsLoading, setEventsDeleted, queryObject;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = _ref4.query, signalIds = _ref4.signalIds, status = _ref4.status, setEventsLoading = _ref4.setEventsLoading, setEventsDeleted = _ref4.setEventsDeleted;
            _context.prev = 1;
            setEventsLoading({
              eventIds: signalIds,
              isLoading: true
            });
            queryObject = query ? {
              query: JSON.parse(query)
            } : getUpdateSignalsQuery(signalIds);
            _context.next = 6;
            return (0, _api.updateSignalStatus)({
              query: queryObject,
              status: status
            });

          case 6:
            // TODO: Only delete those that were successfully updated from updatedRules
            setEventsDeleted({
              eventIds: signalIds,
              isDeleted: true
            });
            _context.next = 11;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);

          case 11:
            _context.prev = 11;
            setEventsLoading({
              eventIds: signalIds,
              isLoading: false
            });
            return _context.finish(11);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9, 11, 14]]);
  }));

  return function updateSignalStatusAction(_x) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateSignalStatusAction = updateSignalStatusAction;

var determineToAndFrom = function determineToAndFrom(_ref5) {
  var _ecsData$signal, _ecsData$signal$rule, _ecsData$signal2, _ecsData$signal2$rule, _ecsData$timestamp, _ecsData$timestamp2;

  var ecsData = _ref5.ecsData;

  var ellapsedTimeRule = _moment.default.duration((0, _moment.default)().diff(_datemath.default.parse(((_ecsData$signal = ecsData.signal) === null || _ecsData$signal === void 0 ? void 0 : (_ecsData$signal$rule = _ecsData$signal.rule) === null || _ecsData$signal$rule === void 0 ? void 0 : _ecsData$signal$rule.from) != null ? (_ecsData$signal2 = ecsData.signal) === null || _ecsData$signal2 === void 0 ? void 0 : (_ecsData$signal2$rule = _ecsData$signal2.rule) === null || _ecsData$signal2$rule === void 0 ? void 0 : _ecsData$signal2$rule.from[0] : 'now-0s')));

  var from = (0, _moment.default)((_ecsData$timestamp = ecsData.timestamp) !== null && _ecsData$timestamp !== void 0 ? _ecsData$timestamp : new Date()).subtract(ellapsedTimeRule).valueOf();
  var to = (0, _moment.default)((_ecsData$timestamp2 = ecsData.timestamp) !== null && _ecsData$timestamp2 !== void 0 ? _ecsData$timestamp2 : new Date()).valueOf();
  return {
    to: to,
    from: from
  };
};

exports.determineToAndFrom = determineToAndFrom;

var sendSignalToTimelineAction =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref7) {
    var _ecsData$signal3, _ecsData$signal3$rule, _ecsData$signal4, _ecsData$signal4$rule, _ecsData$signal5, _ecsData$signal5$rule, _ecsData$signal6, _ecsData$signal6$rule;

    var apolloClient, createTimeline, ecsData, updateTimelineIsLoading, openSignalInBasicTimeline, noteContent, timelineId, _determineToAndFrom, to, from, responseTimeline, resultingTimeline, _ref8, _timeline$kqlQuery, _timeline$kqlQuery$fi, _timeline$kqlQuery$fi2, _timeline$filters, _timeline$dataProvide, _ref9, _timeline$kqlQuery2, _timeline$kqlQuery2$f, _timeline$kqlQuery2$f2, _ref10, _timeline$kqlQuery3, _timeline$kqlQuery3$f, _timeline$kqlQuery3$f2, timelineTemplate, _formatTimelineResult, timeline, query, filters, dataProviders;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            apolloClient = _ref7.apolloClient, createTimeline = _ref7.createTimeline, ecsData = _ref7.ecsData, updateTimelineIsLoading = _ref7.updateTimelineIsLoading;
            openSignalInBasicTimeline = true;
            noteContent = ((_ecsData$signal3 = ecsData.signal) === null || _ecsData$signal3 === void 0 ? void 0 : (_ecsData$signal3$rule = _ecsData$signal3.rule) === null || _ecsData$signal3$rule === void 0 ? void 0 : _ecsData$signal3$rule.note) != null ? (_ecsData$signal4 = ecsData.signal) === null || _ecsData$signal4 === void 0 ? void 0 : (_ecsData$signal4$rule = _ecsData$signal4.rule) === null || _ecsData$signal4$rule === void 0 ? void 0 : _ecsData$signal4$rule.note[0] : '';
            timelineId = ((_ecsData$signal5 = ecsData.signal) === null || _ecsData$signal5 === void 0 ? void 0 : (_ecsData$signal5$rule = _ecsData$signal5.rule) === null || _ecsData$signal5$rule === void 0 ? void 0 : _ecsData$signal5$rule.timeline_id) != null ? (_ecsData$signal6 = ecsData.signal) === null || _ecsData$signal6 === void 0 ? void 0 : (_ecsData$signal6$rule = _ecsData$signal6.rule) === null || _ecsData$signal6$rule === void 0 ? void 0 : _ecsData$signal6$rule.timeline_id[0] : '';
            _determineToAndFrom = determineToAndFrom({
              ecsData: ecsData
            }), to = _determineToAndFrom.to, from = _determineToAndFrom.from;

            if (!(timelineId !== '' && apolloClient != null)) {
              _context2.next = 19;
              break;
            }

            _context2.prev = 6;
            updateTimelineIsLoading({
              id: 'timeline-1',
              isLoading: true
            });
            _context2.next = 10;
            return apolloClient.query({
              query: _index.oneTimelineQuery,
              fetchPolicy: 'no-cache',
              variables: {
                id: timelineId
              }
            });

          case 10:
            responseTimeline = _context2.sent;
            resultingTimeline = (0, _fp.getOr)({}, 'data.getOneTimeline', responseTimeline);

            if (!(0, _fp.isEmpty)(resultingTimeline)) {
              timelineTemplate = (0, _helpers.omitTypenameInTimeline)(resultingTimeline);
              openSignalInBasicTimeline = false;
              _formatTimelineResult = (0, _helpers.formatTimelineResultToModel)(timelineTemplate, true), timeline = _formatTimelineResult.timeline;
              query = (0, _helpers2.replaceTemplateFieldFromQuery)((_ref8 = (_timeline$kqlQuery = timeline.kqlQuery) === null || _timeline$kqlQuery === void 0 ? void 0 : (_timeline$kqlQuery$fi = _timeline$kqlQuery.filterQuery) === null || _timeline$kqlQuery$fi === void 0 ? void 0 : (_timeline$kqlQuery$fi2 = _timeline$kqlQuery$fi.kuery) === null || _timeline$kqlQuery$fi2 === void 0 ? void 0 : _timeline$kqlQuery$fi2.expression) !== null && _ref8 !== void 0 ? _ref8 : '', ecsData);
              filters = (0, _helpers2.replaceTemplateFieldFromMatchFilters)((_timeline$filters = timeline.filters) !== null && _timeline$filters !== void 0 ? _timeline$filters : [], ecsData);
              dataProviders = (0, _helpers2.replaceTemplateFieldFromDataProviders)((_timeline$dataProvide = timeline.dataProviders) !== null && _timeline$dataProvide !== void 0 ? _timeline$dataProvide : [], ecsData);
              createTimeline({
                from: from,
                timeline: _objectSpread({}, timeline, {
                  dataProviders: dataProviders,
                  eventType: 'all',
                  filters: filters,
                  dateRange: {
                    start: from,
                    end: to
                  },
                  kqlQuery: {
                    filterQuery: {
                      kuery: {
                        kind: (_ref9 = (_timeline$kqlQuery2 = timeline.kqlQuery) === null || _timeline$kqlQuery2 === void 0 ? void 0 : (_timeline$kqlQuery2$f = _timeline$kqlQuery2.filterQuery) === null || _timeline$kqlQuery2$f === void 0 ? void 0 : (_timeline$kqlQuery2$f2 = _timeline$kqlQuery2$f.kuery) === null || _timeline$kqlQuery2$f2 === void 0 ? void 0 : _timeline$kqlQuery2$f2.kind) !== null && _ref9 !== void 0 ? _ref9 : 'kuery',
                        expression: query
                      },
                      serializedQuery: (0, _keury.convertKueryToElasticSearchQuery)(query)
                    },
                    filterQueryDraft: {
                      kind: (_ref10 = (_timeline$kqlQuery3 = timeline.kqlQuery) === null || _timeline$kqlQuery3 === void 0 ? void 0 : (_timeline$kqlQuery3$f = _timeline$kqlQuery3.filterQuery) === null || _timeline$kqlQuery3$f === void 0 ? void 0 : (_timeline$kqlQuery3$f2 = _timeline$kqlQuery3$f.kuery) === null || _timeline$kqlQuery3$f2 === void 0 ? void 0 : _timeline$kqlQuery3$f2.kind) !== null && _ref10 !== void 0 ? _ref10 : 'kuery',
                      expression: query
                    }
                  },
                  show: true
                }),
                to: to,
                ruleNote: noteContent
              });
            }

            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](6);
            openSignalInBasicTimeline = true;
            updateTimelineIsLoading({
              id: 'timeline-1',
              isLoading: false
            });

          case 19:
            if (openSignalInBasicTimeline) {
              createTimeline({
                from: from,
                timeline: _objectSpread({}, _defaults.timelineDefaults, {
                  dataProviders: [{
                    and: [],
                    id: "send-signal-to-timeline-action-default-draggable-event-details-value-formatted-field-value-timeline-1-signal-id-".concat(ecsData._id),
                    name: ecsData._id,
                    enabled: true,
                    excluded: false,
                    kqlQuery: '',
                    queryMatch: {
                      field: '_id',
                      value: ecsData._id,
                      operator: ':'
                    }
                  }],
                  id: 'timeline-1',
                  dateRange: {
                    start: from,
                    end: to
                  },
                  eventType: 'all',
                  kqlQuery: {
                    filterQuery: {
                      kuery: {
                        kind: 'kuery',
                        expression: ''
                      },
                      serializedQuery: ''
                    },
                    filterQueryDraft: {
                      kind: 'kuery',
                      expression: ''
                    }
                  }
                }),
                to: to,
                ruleNote: noteContent
              });
            }

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 15]]);
  }));

  return function sendSignalToTimelineAction(_x2) {
    return _ref6.apply(this, arguments);
  };
}();

exports.sendSignalToTimelineAction = sendSignalToTimelineAction;