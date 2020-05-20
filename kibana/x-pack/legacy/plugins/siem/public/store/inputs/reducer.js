"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputsReducer = exports.createInitialInputsState = exports.initialInputsState = void 0;

var _fp = require("lodash/fp");

var _typescriptFsaReducers = require("typescript-fsa-reducers");

var _default_date_settings = require("../../utils/default_date_settings");

var _actions = require("./actions");

var _helpers = require("./helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialInputsState = {
  global: {
    timerange: _objectSpread({
      kind: 'relative'
    }, (0, _default_date_settings.getTimeRangeSettings)(false)),
    queries: [],
    policy: (0, _default_date_settings.getIntervalSettings)(false),
    linkTo: ['timeline'],
    query: {
      query: '',
      language: 'kuery'
    },
    filters: []
  },
  timeline: {
    timerange: _objectSpread({
      kind: 'relative'
    }, (0, _default_date_settings.getTimeRangeSettings)(false)),
    queries: [],
    policy: (0, _default_date_settings.getIntervalSettings)(false),
    linkTo: ['global'],
    query: {
      query: '',
      language: 'kuery'
    },
    filters: []
  }
};
exports.initialInputsState = initialInputsState;

var createInitialInputsState = function createInitialInputsState() {
  var _getTimeRangeSettings = (0, _default_date_settings.getTimeRangeSettings)(),
      from = _getTimeRangeSettings.from,
      fromStr = _getTimeRangeSettings.fromStr,
      to = _getTimeRangeSettings.to,
      toStr = _getTimeRangeSettings.toStr;

  var _getIntervalSettings = (0, _default_date_settings.getIntervalSettings)(),
      kind = _getIntervalSettings.kind,
      duration = _getIntervalSettings.duration;

  return {
    global: {
      timerange: {
        kind: 'relative',
        fromStr: fromStr,
        toStr: toStr,
        from: from,
        to: to
      },
      queries: [],
      policy: {
        kind: kind,
        duration: duration
      },
      linkTo: ['timeline'],
      query: {
        query: '',
        language: 'kuery'
      },
      filters: []
    },
    timeline: {
      timerange: {
        kind: 'relative',
        fromStr: fromStr,
        toStr: toStr,
        from: from,
        to: to
      },
      queries: [],
      policy: {
        kind: kind,
        duration: duration
      },
      linkTo: ['global'],
      query: {
        query: '',
        language: 'kuery'
      },
      filters: []
    }
  };
};

exports.createInitialInputsState = createInitialInputsState;
var inputsReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialInputsState).case(_actions.setTimelineRangeDatePicker, function (state, _ref) {
  var from = _ref.from,
      to = _ref.to;
  return _objectSpread({}, state, {
    global: _objectSpread({}, state.global, {
      linkTo: []
    }),
    timeline: _objectSpread({}, state.timeline, {
      timerange: {
        kind: 'absolute',
        fromStr: undefined,
        toStr: undefined,
        from: from,
        to: to
      },
      linkTo: []
    })
  });
}).case(_actions.setAbsoluteRangeDatePicker, function (state, _ref2) {
  var id = _ref2.id,
      from = _ref2.from,
      to = _ref2.to;
  var timerange = {
    kind: 'absolute',
    fromStr: undefined,
    toStr: undefined,
    from: from,
    to: to
  };
  return (0, _helpers.updateInputTimerange)(id, timerange, state);
}).case(_actions.setRelativeRangeDatePicker, function (state, _ref3) {
  var id = _ref3.id,
      fromStr = _ref3.fromStr,
      from = _ref3.from,
      to = _ref3.to,
      toStr = _ref3.toStr;
  var timerange = {
    kind: 'relative',
    fromStr: fromStr,
    toStr: toStr,
    from: from,
    to: to
  };
  return (0, _helpers.updateInputTimerange)(id, timerange, state);
}).case(_actions.deleteAllQuery, function (state, _ref4) {
  var id = _ref4.id;
  return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, (0, _fp.get)(id, state), {
    queries: state.global.queries.slice(state.global.queries.length)
  })));
}).case(_actions.setQuery, function (state, _ref5) {
  var inputId = _ref5.inputId,
      id = _ref5.id,
      inspect = _ref5.inspect,
      loading = _ref5.loading,
      refetch = _ref5.refetch;
  return (0, _helpers.upsertQuery)({
    inputId: inputId,
    id: id,
    inspect: inspect,
    loading: loading,
    refetch: refetch,
    state: state
  });
}).case(_actions.deleteOneQuery, function (state, _ref6) {
  var inputId = _ref6.inputId,
      id = _ref6.id;
  return (0, _helpers.deleteOneQuery)({
    inputId: inputId,
    id: id,
    state: state
  });
}).case(_actions.setDuration, function (state, _ref7) {
  var id = _ref7.id,
      duration = _ref7.duration;
  return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, (0, _fp.get)(id, state), {
    policy: _objectSpread({}, (0, _fp.get)("".concat(id, ".policy"), state), {
      duration: duration
    })
  })));
}).case(_actions.startAutoReload, function (state, _ref8) {
  var id = _ref8.id;
  return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, (0, _fp.get)(id, state), {
    policy: _objectSpread({}, (0, _fp.get)("".concat(id, ".policy"), state), {
      kind: 'interval'
    })
  })));
}).case(_actions.stopAutoReload, function (state, _ref9) {
  var id = _ref9.id;
  return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, (0, _fp.get)(id, state), {
    policy: _objectSpread({}, (0, _fp.get)("".concat(id, ".policy"), state), {
      kind: 'manual'
    })
  })));
}).case(_actions.toggleTimelineLinkTo, function (state, _ref10) {
  var linkToId = _ref10.linkToId;
  return (0, _helpers.toggleLockTimeline)(linkToId, state);
}).case(_actions.setInspectionParameter, function (state, _ref11) {
  var id = _ref11.id,
      inputId = _ref11.inputId,
      isInspected = _ref11.isInspected,
      selectedInspectIndex = _ref11.selectedInspectIndex;
  return (0, _helpers.setIsInspected)({
    id: id,
    inputId: inputId,
    isInspected: isInspected,
    selectedInspectIndex: selectedInspectIndex,
    state: state
  });
}).case(_actions.removeGlobalLinkTo, function (state) {
  return (0, _helpers.removeGlobalLink)(state);
}).case(_actions.addGlobalLinkTo, function (state, _ref12) {
  var linkToId = _ref12.linkToId;
  return (0, _helpers.addGlobalLink)(linkToId, state);
}).case(_actions.removeTimelineLinkTo, function (state) {
  return (0, _helpers.removeTimelineLink)(state);
}).case(_actions.addTimelineLinkTo, function (state, _ref13) {
  var linkToId = _ref13.linkToId;
  return (0, _helpers.addTimelineLink)(linkToId, state);
}).case(_actions.setFilterQuery, function (state, _ref14) {
  var id = _ref14.id,
      query = _ref14.query,
      language = _ref14.language;
  return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, (0, _fp.get)(id, state), {
    query: {
      query: query,
      language: language
    }
  })));
}).case(_actions.setSavedQuery, function (state, _ref15) {
  var id = _ref15.id,
      savedQuery = _ref15.savedQuery;
  return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, (0, _fp.get)(id, state), {
    savedQuery: savedQuery
  })));
}).case(_actions.setSearchBarFilter, function (state, _ref16) {
  var id = _ref16.id,
      filters = _ref16.filters;
  return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, (0, _fp.get)(id, state), {
    filters: filters
  })));
}).build();
exports.inputsReducer = inputsReducer;