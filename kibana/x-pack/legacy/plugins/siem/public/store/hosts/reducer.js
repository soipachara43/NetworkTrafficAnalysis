"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostsReducer = exports.initialHostsState = void 0;

var _typescriptFsaReducers = require("typescript-fsa-reducers");

var _types = require("../../graphql/types");

var _constants = require("../constants");

var _actions = require("./actions");

var _helpers = require("./helpers");

var _model = require("./model");

var _queries, _queries2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialHostsState = {
  page: {
    queries: (_queries = {}, _defineProperty(_queries, _model.HostsTableType.authentications, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _defineProperty(_queries, _model.HostsTableType.hosts, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      direction: _types.Direction.desc,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sortField: _types.HostsFields.lastSeen
    }), _defineProperty(_queries, _model.HostsTableType.events, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _defineProperty(_queries, _model.HostsTableType.uncommonProcesses, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _defineProperty(_queries, _model.HostsTableType.anomalies, null), _defineProperty(_queries, _model.HostsTableType.alerts, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _queries)
  },
  details: {
    queries: (_queries2 = {}, _defineProperty(_queries2, _model.HostsTableType.authentications, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _defineProperty(_queries2, _model.HostsTableType.hosts, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      direction: _types.Direction.desc,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sortField: _types.HostsFields.lastSeen
    }), _defineProperty(_queries2, _model.HostsTableType.events, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _defineProperty(_queries2, _model.HostsTableType.uncommonProcesses, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _defineProperty(_queries2, _model.HostsTableType.anomalies, null), _defineProperty(_queries2, _model.HostsTableType.alerts, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _queries2)
  }
};
exports.initialHostsState = initialHostsState;
var hostsReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialHostsState).case(_actions.setHostTablesActivePageToZero, function (state) {
  return _objectSpread({}, state, {
    page: _objectSpread({}, state.page, {
      queries: (0, _helpers.setHostPageQueriesActivePageToZero)(state)
    }),
    details: _objectSpread({}, state.details, {
      queries: (0, _helpers.setHostDetailsQueriesActivePageToZero)(state)
    })
  });
}).case(_actions.setHostDetailsTablesActivePageToZero, function (state) {
  return _objectSpread({}, state, {
    details: _objectSpread({}, state.details, {
      queries: (0, _helpers.setHostDetailsQueriesActivePageToZero)(state)
    })
  });
}).case(_actions.updateTableActivePage, function (state, _ref) {
  var activePage = _ref.activePage,
      hostsType = _ref.hostsType,
      tableType = _ref.tableType;
  return _objectSpread({}, state, _defineProperty({}, hostsType, _objectSpread({}, state[hostsType], {
    queries: _objectSpread({}, state[hostsType].queries, _defineProperty({}, tableType, _objectSpread({}, state[hostsType].queries[tableType], {
      activePage: activePage
    })))
  })));
}).case(_actions.updateTableLimit, function (state, _ref2) {
  var limit = _ref2.limit,
      hostsType = _ref2.hostsType,
      tableType = _ref2.tableType;
  return _objectSpread({}, state, _defineProperty({}, hostsType, _objectSpread({}, state[hostsType], {
    queries: _objectSpread({}, state[hostsType].queries, _defineProperty({}, tableType, _objectSpread({}, state[hostsType].queries[tableType], {
      limit: limit
    })))
  })));
}).case(_actions.updateHostsSort, function (state, _ref3) {
  var sort = _ref3.sort,
      hostsType = _ref3.hostsType;
  return _objectSpread({}, state, _defineProperty({}, hostsType, _objectSpread({}, state[hostsType], {
    queries: _objectSpread({}, state[hostsType].queries, _defineProperty({}, _model.HostsTableType.hosts, _objectSpread({}, state[hostsType].queries[_model.HostsTableType.hosts], {
      direction: sort.direction,
      sortField: sort.field
    })))
  })));
}).build();
exports.hostsReducer = hostsReducer;