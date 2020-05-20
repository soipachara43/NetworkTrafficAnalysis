"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useQuerySignals = void 0;

var _react = require("react");

var _api = require("./api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Hook for using to get a Signals from the Detection Engine API
 *
 * @param initialQuery query dsl object
 *
 */
var useQuerySignals = function useQuerySignals(initialQuery, indexName) {
  var _useState = (0, _react.useState)(initialQuery),
      _useState2 = _slicedToArray(_useState, 2),
      query = _useState2[0],
      setQuery = _useState2[1];

  var _useState3 = (0, _react.useState)({
    data: null,
    response: '',
    request: '',
    setQuery: setQuery,
    refetch: null
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      signals = _useState4[0],
      setSignals = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  (0, _react.useEffect)(function () {
    var isSubscribed = true;
    var abortCtrl = new AbortController();

    function fetchData() {
      return _fetchData.apply(this, arguments);
    }

    function _fetchData() {
      _fetchData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var signalResponse, _ref;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                setLoading(true);
                _context.next = 4;
                return (0, _api.fetchQuerySignals)({
                  query: query,
                  signal: abortCtrl.signal
                });

              case 4:
                signalResponse = _context.sent;

                if (isSubscribed) {
                  setSignals({
                    data: signalResponse,
                    response: JSON.stringify(signalResponse, null, 2),
                    request: JSON.stringify({
                      index: (_ref = [indexName]) !== null && _ref !== void 0 ? _ref : [''],
                      body: query
                    }, null, 2),
                    setQuery: setQuery,
                    refetch: fetchData
                  });
                }

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);

                if (isSubscribed) {
                  setSignals({
                    data: null,
                    response: '',
                    request: '',
                    setQuery: setQuery,
                    refetch: fetchData
                  });
                }

              case 11:
                if (isSubscribed) {
                  setLoading(false);
                }

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));
      return _fetchData.apply(this, arguments);
    }

    fetchData();
    return function () {
      isSubscribed = false;
      abortCtrl.abort();
    };
  }, [query, indexName]);
  return _objectSpread({
    loading: loading
  }, signals);
};

exports.useQuerySignals = useQuerySignals;