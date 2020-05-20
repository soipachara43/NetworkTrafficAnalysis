"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOneQuery = exports.addTimelineLink = exports.removeTimelineLink = exports.addGlobalLink = exports.removeGlobalLink = exports.setIsInspected = exports.upsertQuery = exports.toggleLockTimeline = exports.updateInputTimerange = void 0;

var _fp = require("lodash/fp");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateInputTimerange = function updateInputTimerange(inputId, timerange, state) {
  var input = (0, _fp.get)(inputId, state);

  if (input != null) {
    return _objectSpread({}, [inputId].concat(_toConsumableArray(input.linkTo)).reduce(function (acc, linkToId) {
      return _objectSpread({}, acc, _defineProperty({}, linkToId, _objectSpread({}, (0, _fp.get)(linkToId, state), {
        timerange: timerange
      })));
    }, inputId === 'timeline' ? _objectSpread({}, state, {
      global: _objectSpread({}, state.global, {
        linkTo: []
      })
    }) : state));
  }

  return state;
};

exports.updateInputTimerange = updateInputTimerange;

var toggleLockTimeline = function toggleLockTimeline(linkToId, state) {
  var linkToIdAlreadyExist = state.global.linkTo.indexOf(linkToId);
  return _objectSpread({}, state, {
    global: _objectSpread({}, state.global, {
      timerange: linkToIdAlreadyExist > -1 ? state.global.timerange : state.timeline.timerange,
      linkTo: linkToIdAlreadyExist > -1 ? [].concat(_toConsumableArray(state.global.linkTo.slice(0, linkToIdAlreadyExist)), _toConsumableArray(state.global.linkTo.slice(linkToIdAlreadyExist + 1))) : [].concat(_toConsumableArray(state.global.linkTo), [linkToId])
    }),
    timeline: _objectSpread({}, state.timeline, {
      linkTo: linkToIdAlreadyExist > -1 ? [] : ['global']
    })
  });
};

exports.toggleLockTimeline = toggleLockTimeline;

var upsertQuery = function upsertQuery(_ref) {
  var inputId = _ref.inputId,
      id = _ref.id,
      inspect = _ref.inspect,
      loading = _ref.loading,
      refetch = _ref.refetch,
      state = _ref.state;
  var queryIndex = state[inputId].queries.findIndex(function (q) {
    return q.id === id;
  });
  return _objectSpread({}, state, _defineProperty({}, inputId, _objectSpread({}, (0, _fp.get)(inputId, state), {
    queries: queryIndex > -1 ? [].concat(_toConsumableArray(state[inputId].queries.slice(0, queryIndex)), [{
      id: id,
      inspect: inspect,
      isInspected: state[inputId].queries[queryIndex].isInspected,
      loading: loading,
      refetch: refetch,
      selectedInspectIndex: state[inputId].queries[queryIndex].selectedInspectIndex
    }], _toConsumableArray(state[inputId].queries.slice(queryIndex + 1))) : [].concat(_toConsumableArray(state[inputId].queries), [{
      id: id,
      inspect: inspect,
      isInspected: false,
      loading: loading,
      refetch: refetch,
      selectedInspectIndex: 0
    }])
  })));
};

exports.upsertQuery = upsertQuery;

var setIsInspected = function setIsInspected(_ref2) {
  var id = _ref2.id,
      inputId = _ref2.inputId,
      isInspected = _ref2.isInspected,
      selectedInspectIndex = _ref2.selectedInspectIndex,
      state = _ref2.state;
  var myQueryIndex = state[inputId].queries.findIndex(function (q) {
    return q.id === id;
  });
  var myQuery = myQueryIndex > -1 ? state[inputId].queries[myQueryIndex] : null;
  return _objectSpread({}, state, _defineProperty({}, inputId, _objectSpread({}, (0, _fp.get)(inputId, state), {
    queries: myQueryIndex > -1 ? [].concat(_toConsumableArray(state[inputId].queries.slice(0, myQueryIndex)), [_objectSpread({}, myQuery, {
      isInspected: isInspected,
      selectedInspectIndex: selectedInspectIndex
    })], _toConsumableArray(state[inputId].queries.slice(myQueryIndex + 1))) : _toConsumableArray(state[inputId].queries)
  })));
};

exports.setIsInspected = setIsInspected;

var removeGlobalLink = function removeGlobalLink(state) {
  return _objectSpread({}, state, {
    global: _objectSpread({}, state.global, {
      linkTo: []
    })
  });
};

exports.removeGlobalLink = removeGlobalLink;

var addGlobalLink = function addGlobalLink(linkToId, state) {
  return _objectSpread({}, state, {
    global: _objectSpread({}, state.global, {
      linkTo: [linkToId]
    })
  });
};

exports.addGlobalLink = addGlobalLink;

var removeTimelineLink = function removeTimelineLink(state) {
  return _objectSpread({}, state, {
    timeline: _objectSpread({}, state.timeline, {
      linkTo: []
    })
  });
};

exports.removeTimelineLink = removeTimelineLink;

var addTimelineLink = function addTimelineLink(linkToId, state) {
  return _objectSpread({}, state, {
    timeline: _objectSpread({}, state.timeline, {
      linkTo: [linkToId]
    })
  });
};

exports.addTimelineLink = addTimelineLink;

var deleteOneQuery = function deleteOneQuery(_ref3) {
  var inputId = _ref3.inputId,
      id = _ref3.id,
      state = _ref3.state;
  var queryIndex = state[inputId].queries.findIndex(function (q) {
    return q.id === id;
  });
  return _objectSpread({}, state, _defineProperty({}, inputId, _objectSpread({}, (0, _fp.get)(inputId, state), {
    queries: queryIndex > -1 ? [].concat(_toConsumableArray(state[inputId].queries.slice(0, queryIndex)), _toConsumableArray(state[inputId].queries.slice(queryIndex + 1))) : _toConsumableArray(state[inputId].queries)
  })));
};

exports.deleteOneQuery = deleteOneQuery;