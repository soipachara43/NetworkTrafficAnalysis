"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperDatePicker = exports.connector = exports.makeMapStateToProps = exports.dispatchUpdateReduxTime = exports.formatDate = exports.SuperDatePickerComponent = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _eui = require("@elastic/eui");

var _fp = require("lodash/fp");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _constants = require("../../../common/constants");

var _kibana = require("../../lib/kibana");

var _actions = require("../../store/actions");

var _selectors = require("./selectors");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MAX_RECENTLY_USED_RANGES = 9;

var SuperDatePickerComponent = _react.default.memo(function (_ref) {
  var duration = _ref.duration,
      end = _ref.end,
      fromStr = _ref.fromStr,
      id = _ref.id,
      isLoading = _ref.isLoading,
      kind = _ref.kind,
      kqlQuery = _ref.kqlQuery,
      policy = _ref.policy,
      queries = _ref.queries,
      setDuration = _ref.setDuration,
      start = _ref.start,
      startAutoReload = _ref.startAutoReload,
      stopAutoReload = _ref.stopAutoReload,
      timelineId = _ref.timelineId,
      toStr = _ref.toStr,
      updateReduxTime = _ref.updateReduxTime;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      isQuickSelection = _useState2[0],
      setIsQuickSelection = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      recentlyUsedRanges = _useState4[0],
      setRecentlyUsedRanges = _useState4[1];

  var onRefresh = (0, _react.useCallback)(function (_ref2) {
    var newStart = _ref2.start,
        newEnd = _ref2.end;

    var _updateReduxTime = updateReduxTime({
      end: newEnd,
      id: id,
      isInvalid: false,
      isQuickSelection: isQuickSelection,
      kql: kqlQuery,
      start: newStart,
      timelineId: timelineId
    }),
        kqlHaveBeenUpdated = _updateReduxTime.kqlHaveBeenUpdated;

    var currentStart = formatDate(newStart);
    var currentEnd = isQuickSelection ? formatDate(newEnd, {
      roundUp: true
    }) : formatDate(newEnd);

    if (!kqlHaveBeenUpdated && (!isQuickSelection || start === currentStart && end === currentEnd)) {
      refetchQuery(queries);
    }
  }, [end, id, isQuickSelection, kqlQuery, start, timelineId]);
  var onRefreshChange = (0, _react.useCallback)(function (_ref3) {
    var isPaused = _ref3.isPaused,
        refreshInterval = _ref3.refreshInterval;

    if (duration !== refreshInterval) {
      setDuration({
        id: id,
        duration: refreshInterval
      });
    }

    if (isPaused && policy === 'interval') {
      stopAutoReload({
        id: id
      });
    } else if (!isPaused && policy === 'manual') {
      startAutoReload({
        id: id
      });
    }

    if (!isPaused && (!isQuickSelection || isQuickSelection && toStr !== 'now')) {
      refetchQuery(queries);
    }
  }, [id, isQuickSelection, duration, policy, toStr]);

  var refetchQuery = function refetchQuery(newQueries) {
    newQueries.forEach(function (q) {
      return q.refetch && q.refetch();
    });
  };

  var onTimeChange = (0, _react.useCallback)(function (_ref4) {
    var newStart = _ref4.start,
        newEnd = _ref4.end,
        newIsQuickSelection = _ref4.isQuickSelection,
        isInvalid = _ref4.isInvalid;

    if (!isInvalid) {
      updateReduxTime({
        end: newEnd,
        id: id,
        isInvalid: isInvalid,
        isQuickSelection: newIsQuickSelection,
        kql: kqlQuery,
        start: newStart,
        timelineId: timelineId
      });
      var newRecentlyUsedRanges = [{
        start: newStart,
        end: newEnd
      }].concat(_toConsumableArray((0, _fp.take)(MAX_RECENTLY_USED_RANGES, recentlyUsedRanges.filter(function (recentlyUsedRange) {
        return !(recentlyUsedRange.start === newStart && recentlyUsedRange.end === newEnd);
      }))));
      setRecentlyUsedRanges(newRecentlyUsedRanges);
      setIsQuickSelection(newIsQuickSelection);
    }
  }, [recentlyUsedRanges, kqlQuery]);
  var endDate = kind === 'relative' ? toStr : new Date(end).toISOString();
  var startDate = kind === 'relative' ? fromStr : new Date(start).toISOString();

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_TIMEPICKER_QUICK_RANGES),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      quickRanges = _useUiSetting$2[0];

  var commonlyUsedRanges = (0, _fp.isEmpty)(quickRanges) ? [] : quickRanges.map(function (_ref5) {
    var from = _ref5.from,
        to = _ref5.to,
        display = _ref5.display;
    return {
      start: from,
      end: to,
      label: display
    };
  });
  return _react.default.createElement(_eui.EuiSuperDatePicker, {
    commonlyUsedRanges: commonlyUsedRanges,
    end: endDate,
    isLoading: isLoading,
    isPaused: policy === 'manual',
    onRefresh: onRefresh,
    onRefreshChange: onRefreshChange,
    onTimeChange: onTimeChange,
    recentlyUsedRanges: recentlyUsedRanges,
    refreshInterval: duration,
    showUpdateButton: true,
    start: startDate
  });
});

exports.SuperDatePickerComponent = SuperDatePickerComponent;

var formatDate = function formatDate(date, options) {
  var momentDate = _datemath.default.parse(date, options);

  return momentDate != null && momentDate.isValid() ? momentDate.valueOf() : 0;
};

exports.formatDate = formatDate;

var dispatchUpdateReduxTime = function dispatchUpdateReduxTime(dispatch) {
  return function (_ref6) {
    var end = _ref6.end,
        id = _ref6.id,
        isQuickSelection = _ref6.isQuickSelection,
        kql = _ref6.kql,
        start = _ref6.start,
        timelineId = _ref6.timelineId;
    var fromDate = formatDate(start);
    var toDate = formatDate(end, {
      roundUp: true
    });

    if (isQuickSelection) {
      dispatch(_actions.inputsActions.setRelativeRangeDatePicker({
        id: id,
        fromStr: start,
        toStr: end,
        from: fromDate,
        to: toDate
      }));
    } else {
      toDate = formatDate(end);
      dispatch(_actions.inputsActions.setAbsoluteRangeDatePicker({
        id: id,
        from: formatDate(start),
        to: formatDate(end)
      }));
    }

    if (timelineId != null) {
      dispatch(_actions.timelineActions.updateRange({
        id: timelineId,
        start: fromDate,
        end: toDate
      }));
    }

    if (kql) {
      return {
        kqlHaveBeenUpdated: kql.refetch(dispatch)
      };
    }

    return {
      kqlHaveBeenUpdated: false
    };
  };
};

exports.dispatchUpdateReduxTime = dispatchUpdateReduxTime;

var makeMapStateToProps = function makeMapStateToProps() {
  var getDurationSelector = (0, _selectors.durationSelector)();
  var getEndSelector = (0, _selectors.endSelector)();
  var getFromStrSelector = (0, _selectors.fromStrSelector)();
  var getIsLoadingSelector = (0, _selectors.isLoadingSelector)();
  var getKindSelector = (0, _selectors.kindSelector)();
  var getKqlQuerySelector = (0, _selectors.kqlQuerySelector)();
  var getPolicySelector = (0, _selectors.policySelector)();
  var getQueriesSelector = (0, _selectors.queriesSelector)();
  var getStartSelector = (0, _selectors.startSelector)();
  var getToStrSelector = (0, _selectors.toStrSelector)();
  return function (state, _ref7) {
    var id = _ref7.id;
    var inputsRange = (0, _fp.getOr)({}, "inputs.".concat(id), state);
    return {
      duration: getDurationSelector(inputsRange),
      end: getEndSelector(inputsRange),
      fromStr: getFromStrSelector(inputsRange),
      isLoading: getIsLoadingSelector(inputsRange),
      kind: getKindSelector(inputsRange),
      kqlQuery: getKqlQuerySelector(inputsRange),
      policy: getPolicySelector(inputsRange),
      queries: getQueriesSelector(inputsRange),
      start: getStartSelector(inputsRange),
      toStr: getToStrSelector(inputsRange)
    };
  };
};

exports.makeMapStateToProps = makeMapStateToProps;
SuperDatePickerComponent.displayName = 'SuperDatePickerComponent';

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    startAutoReload: function startAutoReload(_ref8) {
      var id = _ref8.id;
      return dispatch(_actions.inputsActions.startAutoReload({
        id: id
      }));
    },
    stopAutoReload: function stopAutoReload(_ref9) {
      var id = _ref9.id;
      return dispatch(_actions.inputsActions.stopAutoReload({
        id: id
      }));
    },
    setDuration: function setDuration(_ref10) {
      var id = _ref10.id,
          duration = _ref10.duration;
      return dispatch(_actions.inputsActions.setDuration({
        id: id,
        duration: duration
      }));
    },
    updateReduxTime: dispatchUpdateReduxTime(dispatch)
  };
};

var connector = (0, _reactRedux.connect)(makeMapStateToProps, mapDispatchToProps);
exports.connector = connector;
var SuperDatePicker = connector(SuperDatePickerComponent);
exports.SuperDatePicker = SuperDatePicker;