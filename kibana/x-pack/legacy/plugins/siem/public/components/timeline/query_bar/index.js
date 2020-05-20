"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataProviderFilter = exports.QueryBarTimeline = void 0;

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _public = require("../../../../../../../../src/plugins/data/public");

var _keury = require("../../../lib/keury");

var _kibana = require("../../../lib/kibana");

var _saved_query_services = require("../../../utils/saved_query_services");

var _query_bar = require("../../query_bar");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var timelineFilterDropArea = 'timeline-filter-drop-area';
var QueryBarTimeline = (0, _react.memo)(function (_ref) {
  var applyKqlFilterQuery = _ref.applyKqlFilterQuery,
      browserFields = _ref.browserFields,
      dataProviders = _ref.dataProviders,
      filters = _ref.filters,
      filterQuery = _ref.filterQuery,
      filterQueryDraft = _ref.filterQueryDraft,
      from = _ref.from,
      fromStr = _ref.fromStr,
      kqlMode = _ref.kqlMode,
      indexPattern = _ref.indexPattern,
      isRefreshPaused = _ref.isRefreshPaused,
      savedQueryId = _ref.savedQueryId,
      setFilters = _ref.setFilters,
      setKqlFilterQueryDraft = _ref.setKqlFilterQueryDraft,
      setSavedQueryId = _ref.setSavedQueryId,
      refreshInterval = _ref.refreshInterval,
      timelineId = _ref.timelineId,
      to = _ref.to,
      toStr = _ref.toStr,
      updateReduxTime = _ref.updateReduxTime;

  var _useState = (0, _react.useState)(fromStr != null ? fromStr : new Date(from).toISOString()),
      _useState2 = _slicedToArray(_useState, 2),
      dateRangeFrom = _useState2[0],
      setDateRangeFrom = _useState2[1];

  var _useState3 = (0, _react.useState)(toStr != null ? toStr : new Date(to).toISOString()),
      _useState4 = _slicedToArray(_useState3, 2),
      dateRangeTo = _useState4[0],
      setDateRangTo = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      savedQuery = _useState6[0],
      setSavedQuery = _useState6[1];

  var _useState7 = (0, _react.useState)({
    query: filterQuery != null ? filterQuery.expression : '',
    language: filterQuery != null ? filterQuery.kind : 'kuery'
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      filterQueryConverted = _useState8[0],
      setFilterQueryConverted = _useState8[1];

  var _useState9 = (0, _react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      queryBarFilters = _useState10[0],
      setQueryBarFilters = _useState10[1];

  var _useState11 = (0, _react.useState)((0, _keury.convertKueryToElasticSearchQuery)((0, _helpers.buildGlobalQuery)(dataProviders, browserFields), indexPattern)),
      _useState12 = _slicedToArray(_useState11, 2),
      dataProvidersDsl = _useState12[0],
      setDataProvidersDsl = _useState12[1];

  var kibana = (0, _kibana.useKibana)();

  var _useState13 = (0, _react.useState)(new _public.FilterManager(kibana.services.uiSettings)),
      _useState14 = _slicedToArray(_useState13, 1),
      filterManager = _useState14[0];

  var savedQueryServices = (0, _saved_query_services.useSavedQueryServices)();
  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var subscriptions = new _rxjs.Subscription();
    filterManager.setFilters(filters);
    subscriptions.add(filterManager.getUpdates$().subscribe({
      next: function next() {
        if (isSubscribed) {
          var filterWithoutDropArea = filterManager.getFilters().filter(function (f) {
            return f.meta.controlledBy !== timelineFilterDropArea;
          });
          setFilters(filterWithoutDropArea);
          setQueryBarFilters(filterWithoutDropArea);
        }
      }
    }));
    return function () {
      isSubscribed = false;
      subscriptions.unsubscribe();
    };
  }, []);
  (0, _react.useEffect)(function () {
    var filterWithoutDropArea = filterManager.getFilters().filter(function (f) {
      return f.meta.controlledBy !== timelineFilterDropArea;
    });

    if (!(0, _fastDeepEqual.default)(filters, filterWithoutDropArea)) {
      filterManager.setFilters(filters);
    }
  }, [filters]);
  (0, _react.useEffect)(function () {
    setFilterQueryConverted({
      query: filterQuery != null ? filterQuery.expression : '',
      language: filterQuery != null ? filterQuery.kind : 'kuery'
    });
  }, [filterQuery]);
  (0, _react.useEffect)(function () {
    setDataProvidersDsl((0, _keury.convertKueryToElasticSearchQuery)((0, _helpers.buildGlobalQuery)(dataProviders, browserFields), indexPattern));
  }, [dataProviders, browserFields, indexPattern]);
  (0, _react.useEffect)(function () {
    if (fromStr != null && toStr != null) {
      setDateRangeFrom(fromStr);
      setDateRangTo(toStr);
    } else if (from != null && to != null) {
      setDateRangeFrom(new Date(from).toISOString());
      setDateRangTo(new Date(to).toISOString());
    }
  }, [from, fromStr, to, toStr]);
  (0, _react.useEffect)(function () {
    var isSubscribed = true;

    function setSavedQueryByServices() {
      return _setSavedQueryByServices.apply(this, arguments);
    }

    function _setSavedQueryByServices() {
      _setSavedQueryByServices = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var mySavedQuery;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(savedQueryId != null && savedQueryServices != null)) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return savedQueryServices.getSavedQuery(savedQueryId);

              case 4:
                mySavedQuery = _context.sent;

                if (isSubscribed && mySavedQuery != null) {
                  setSavedQuery(_objectSpread({}, mySavedQuery, {
                    attributes: _objectSpread({}, mySavedQuery.attributes, {
                      filters: filters.filter(function (f) {
                        return f.meta.controlledBy !== timelineFilterDropArea;
                      })
                    })
                  }));
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                setSavedQuery(null);

              case 11:
                _context.next = 14;
                break;

              case 13:
                if (isSubscribed) {
                  setSavedQuery(null);
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));
      return _setSavedQueryByServices.apply(this, arguments);
    }

    setSavedQueryByServices();
    return function () {
      isSubscribed = false;
    };
  }, [savedQueryId]);
  var onChangedQuery = (0, _react.useCallback)(function (newQuery) {
    if (filterQueryDraft == null || filterQueryDraft != null && filterQueryDraft.expression !== newQuery.query || filterQueryDraft.kind !== newQuery.language) {
      setKqlFilterQueryDraft(newQuery.query, newQuery.language);
    }
  }, [filterQueryDraft]);
  var onSubmitQuery = (0, _react.useCallback)(function (newQuery, timefilter) {
    if (filterQuery == null || filterQuery != null && filterQuery.expression !== newQuery.query || filterQuery.kind !== newQuery.language) {
      setKqlFilterQueryDraft(newQuery.query, newQuery.language);
      applyKqlFilterQuery(newQuery.query, newQuery.language);
    }

    if (timefilter != null) {
      var isQuickSelection = timefilter.from.includes('now') || timefilter.to.includes('now');
      updateReduxTime({
        id: 'timeline',
        end: timefilter.to,
        start: timefilter.from,
        isInvalid: false,
        isQuickSelection: isQuickSelection,
        timelineId: timelineId
      });
    }
  }, [filterQuery, timelineId]);
  var onSavedQuery = (0, _react.useCallback)(function (newSavedQuery) {
    if (newSavedQuery != null) {
      if (newSavedQuery.id !== savedQueryId) {
        setSavedQueryId(newSavedQuery.id);
      }

      if (savedQueryServices != null && dataProvidersDsl !== '') {
        var dataProviderFilterExists = newSavedQuery.attributes.filters != null ? newSavedQuery.attributes.filters.findIndex(function (f) {
          return f.meta.controlledBy === timelineFilterDropArea;
        }) : -1;
        savedQueryServices.saveQuery(_objectSpread({}, newSavedQuery.attributes, {
          filters: newSavedQuery.attributes.filters != null ? dataProviderFilterExists > -1 ? [].concat(_toConsumableArray(newSavedQuery.attributes.filters.slice(0, dataProviderFilterExists)), [getDataProviderFilter(dataProvidersDsl)], _toConsumableArray(newSavedQuery.attributes.filters.slice(dataProviderFilterExists + 1))) : [].concat(_toConsumableArray(newSavedQuery.attributes.filters), [getDataProviderFilter(dataProvidersDsl)]) : []
        }), {
          overwrite: true
        });
      }
    } else {
      setSavedQueryId(null);
    }
  }, [dataProvidersDsl, savedQueryId, savedQueryServices]);
  return _react.default.createElement(_query_bar.QueryBar, {
    dateRangeFrom: dateRangeFrom,
    dateRangeTo: dateRangeTo,
    hideSavedQuery: kqlMode === 'search',
    indexPattern: indexPattern,
    isRefreshPaused: isRefreshPaused,
    filterQuery: filterQueryConverted,
    filterManager: filterManager,
    filters: queryBarFilters,
    onChangedQuery: onChangedQuery,
    onSubmitQuery: onSubmitQuery,
    refreshInterval: refreshInterval,
    savedQuery: savedQuery,
    onSavedQuery: onSavedQuery,
    dataTestSubj: 'timelineQueryInput'
  });
});
exports.QueryBarTimeline = QueryBarTimeline;

var getDataProviderFilter = function getDataProviderFilter(dataProviderDsl) {
  var dslObject = JSON.parse(dataProviderDsl);
  var key = Object.keys(dslObject);
  return _objectSpread({}, dslObject, {
    meta: {
      alias: timelineFilterDropArea,
      controlledBy: timelineFilterDropArea,
      negate: false,
      disabled: false,
      type: 'custom',
      key: (0, _fp.isEmpty)(key) ? 'bool' : key[0],
      value: dataProviderDsl
    },
    $state: {
      store: _public.esFilters.FilterStateStore.APP_STATE
    }
  });
};

exports.getDataProviderFilter = getDataProviderFilter;