"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.networkReducer = exports.initialNetworkState = void 0;

var _typescriptFsaReducers = require("typescript-fsa-reducers");

var _fp = require("lodash/fp");

var _types = require("../../graphql/types");

var _constants = require("../constants");

var _actions = require("./actions");

var _helpers = require("./helpers");

var _model = require("./model");

var _queries, _queries2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialNetworkState = {
  page: {
    queries: (_queries = {}, _defineProperty(_queries, _model.NetworkTableType.topNFlowSource, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkTopTablesFields.bytes_out,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries, _model.NetworkTableType.topNFlowDestination, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkTopTablesFields.bytes_in,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries, _model.NetworkTableType.dns, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkDnsFields.uniqueDomains,
        direction: _types.Direction.desc
      },
      isPtrIncluded: false
    }), _defineProperty(_queries, _model.NetworkTableType.http, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries, _model.NetworkTableType.tls, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.TlsFields._id,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries, _model.NetworkTableType.topCountriesSource, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkTopTablesFields.bytes_out,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries, _model.NetworkTableType.topCountriesDestination, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkTopTablesFields.bytes_in,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries, _model.NetworkTableType.alerts, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT
    }), _queries)
  },
  details: {
    queries: (_queries2 = {}, _defineProperty(_queries2, _model.IpDetailsTableType.http, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries2, _model.IpDetailsTableType.topCountriesSource, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkTopTablesFields.bytes_out,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries2, _model.IpDetailsTableType.topCountriesDestination, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkTopTablesFields.bytes_in,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries2, _model.IpDetailsTableType.topNFlowSource, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkTopTablesFields.bytes_out,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries2, _model.IpDetailsTableType.topNFlowDestination, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.NetworkTopTablesFields.bytes_in,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries2, _model.IpDetailsTableType.tls, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.TlsFields._id,
        direction: _types.Direction.desc
      }
    }), _defineProperty(_queries2, _model.IpDetailsTableType.users, {
      activePage: _constants.DEFAULT_TABLE_ACTIVE_PAGE,
      limit: _constants.DEFAULT_TABLE_LIMIT,
      sort: {
        field: _types.UsersFields.name,
        direction: _types.Direction.asc
      }
    }), _queries2),
    flowTarget: _types.FlowTarget.source
  }
};
exports.initialNetworkState = initialNetworkState;
var networkReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialNetworkState).case(_actions.updateNetworkTable, function (state, _ref) {
  var networkType = _ref.networkType,
      tableType = _ref.tableType,
      updates = _ref.updates;
  return _objectSpread({}, state, _defineProperty({}, networkType, _objectSpread({}, state[networkType], {
    queries: _objectSpread({}, state[networkType].queries, _defineProperty({}, tableType, _objectSpread({}, (0, _fp.get)([networkType, 'queries', tableType], state), {}, updates)))
  })));
}).case(_actions.setNetworkTablesActivePageToZero, function (state) {
  return _objectSpread({}, state, {
    page: _objectSpread({}, state.page, {
      queries: (0, _helpers.setNetworkPageQueriesActivePageToZero)(state)
    }),
    details: _objectSpread({}, state.details, {
      queries: (0, _helpers.setNetworkDetailsQueriesActivePageToZero)(state)
    })
  });
}).case(_actions.setIpDetailsTablesActivePageToZero, function (state) {
  return _objectSpread({}, state, {
    details: _objectSpread({}, state.details, {
      queries: (0, _helpers.setNetworkDetailsQueriesActivePageToZero)(state)
    })
  });
}).build();
exports.networkReducer = networkReducer;