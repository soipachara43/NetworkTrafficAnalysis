"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLastEventTimeQuery = useLastEventTimeQuery;

var _fp = require("lodash/fp");

var _react = require("react");

var _constants = require("../../../../common/constants");

var _kibana = require("../../../lib/kibana");

var _last_event_time = require("./last_event_time.gql_query");

var _apollo_context = require("../../../utils/apollo_context");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useLastEventTimeQuery(indexKey, details, sourceId) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      updateLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      lastSeen = _useState4[0],
      updateLastSeen = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      errorMessage = _useState6[0],
      updateErrorMessage = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      currentIndexKey = _useState8[0],
      updateCurrentIndexKey = _useState8[1];

  var _useUiSetting$ = (0, _kibana.useUiSetting$)(_constants.DEFAULT_INDEX_KEY),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
      defaultIndex = _useUiSetting$2[0];

  var apolloClient = (0, _apollo_context.useApolloClient)();

  function fetchLastEventTime(_x) {
    return _fetchLastEventTime.apply(this, arguments);
  }

  function _fetchLastEventTime() {
    _fetchLastEventTime = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(signal) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              updateLoading(true);

              if (apolloClient) {
                apolloClient.query({
                  query: _last_event_time.LastEventTimeGqlQuery,
                  fetchPolicy: 'cache-first',
                  variables: {
                    sourceId: sourceId,
                    indexKey: indexKey,
                    details: details,
                    defaultIndex: defaultIndex
                  },
                  context: {
                    fetchOptions: {
                      signal: signal
                    }
                  }
                }).then(function (result) {
                  updateLoading(false);
                  updateLastSeen((0, _fp.get)('data.source.LastEventTime.lastSeen', result));
                  updateErrorMessage(null);
                  updateCurrentIndexKey(currentIndexKey);
                }, function (error) {
                  updateLoading(false);
                  updateLastSeen(null);
                  updateErrorMessage(error.message);
                });
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _fetchLastEventTime.apply(this, arguments);
  }

  (0, _react.useEffect)(function () {
    var abortCtrl = new AbortController();
    var signal = abortCtrl.signal;
    fetchLastEventTime(signal);
    return function () {
      return abortCtrl.abort();
    };
  }, [apolloClient, indexKey, details.hostName, details.ip]);
  return {
    lastSeen: lastSeen,
    loading: loading,
    errorMessage: errorMessage
  };
}