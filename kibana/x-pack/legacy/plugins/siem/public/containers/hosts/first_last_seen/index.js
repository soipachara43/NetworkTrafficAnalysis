"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFirstLastSeenHostQuery = useFirstLastSeenHostQuery;

var _fp = require("lodash/fp");

var _react = require("react");

var _kibana = require("../../../lib/kibana");

var _constants = require("../../../../common/constants");

var _first_last_seen = require("./first_last_seen.gql_query");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useFirstLastSeenHostQuery(hostName, sourceId, apolloClient) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      updateLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      firstSeen = _useState4[0],
      updateFirstSeen = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      lastSeen = _useState6[0],
      updateLastSeen = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      errorMessage = _useState8[0],
      updateErrorMessage = _useState8[1];

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_INDEX_KEY),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultIndex = _useUiSetting$2[0];

  function fetchFirstLastSeenHost(_x) {
    return _fetchFirstLastSeenHost.apply(this, arguments);
  }

  function _fetchFirstLastSeenHost() {
    _fetchFirstLastSeenHost = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(signal) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              updateLoading(true);
              return _context.abrupt("return", apolloClient.query({
                query: _first_last_seen.HostFirstLastSeenGqlQuery,
                fetchPolicy: 'cache-first',
                variables: {
                  sourceId: sourceId,
                  hostName: hostName,
                  defaultIndex: defaultIndex
                },
                context: {
                  fetchOptions: {
                    signal: signal
                  }
                }
              }).then(function (result) {
                updateLoading(false);
                updateFirstSeen((0, _fp.get)('data.source.HostFirstLastSeen.firstSeen', result));
                updateLastSeen((0, _fp.get)('data.source.HostFirstLastSeen.lastSeen', result));
                updateErrorMessage(null);
              }, function (error) {
                updateLoading(false);
                updateFirstSeen(null);
                updateLastSeen(null);
                updateErrorMessage(error.message);
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _fetchFirstLastSeenHost.apply(this, arguments);
  }

  (0, _react.useEffect)(function () {
    var abortCtrl = new AbortController();
    var signal = abortCtrl.signal;
    fetchFirstLastSeenHost(signal);
    return function () {
      return abortCtrl.abort();
    };
  }, []);
  return {
    firstSeen: firstSeen,
    lastSeen: lastSeen,
    loading: loading,
    errorMessage: errorMessage
  };
}