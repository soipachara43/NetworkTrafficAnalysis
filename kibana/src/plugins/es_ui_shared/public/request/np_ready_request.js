"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRequest = exports.sendRequest = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sendRequest =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(httpClient, _ref2) {
    var path, method, body, query, stringifiedBody, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = _ref2.path, method = _ref2.method, body = _ref2.body, query = _ref2.query;
            _context.prev = 1;
            stringifiedBody = typeof body === 'string' ? body : JSON.stringify(body);
            _context.next = 5;
            return httpClient[method](path, {
              body: stringifiedBody,
              query: query
            });

          case 5:
            response = _context.sent;
            return _context.abrupt("return", {
              data: response.data ? response.data : response,
              error: null
            });

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", {
              data: null,
              error: _context.t0.response && _context.t0.response.data ? _context.t0.response.data : _context.t0.body
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function sendRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendRequest = sendRequest;

var useRequest = function useRequest(httpClient, _ref3) {
  var _sendRequestRef$curre3;

  var path = _ref3.path,
      method = _ref3.method,
      query = _ref3.query,
      body = _ref3.body,
      pollIntervalMs = _ref3.pollIntervalMs,
      initialData = _ref3.initialData,
      _ref3$deserializer = _ref3.deserializer,
      deserializer = _ref3$deserializer === void 0 ? function (data) {
    return data;
  } : _ref3$deserializer;
  var sendRequestRef = (0, _react.useRef)(); // Main states for tracking request status and data

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(initialData),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1]; // Consumers can use isInitialRequest to implement a polling UX.


  var _useState7 = (0, _react.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      isInitialRequest = _useState8[0],
      setIsInitialRequest = _useState8[1];

  var pollInterval = (0, _react.useRef)(null);
  var pollIntervalId = (0, _react.useRef)(null); // We always want to use the most recently-set interval in scheduleRequest.

  pollInterval.current = pollIntervalMs; // Tied to every render and bound to each request.

  var isOutdatedRequest = false;

  var scheduleRequest = function scheduleRequest() {
    // Clear current interval
    if (pollIntervalId.current) {
      clearTimeout(pollIntervalId.current);
    } // Set new interval


    if (pollInterval.current) {
      pollIntervalId.current = setTimeout(function () {
        var _sendRequestRef$curre;

        return ((_sendRequestRef$curre = sendRequestRef.current) !== null && _sendRequestRef$curre !== void 0 ? _sendRequestRef$curre : _sendRequest)();
      }, pollInterval.current);
    }
  };

  var _sendRequest =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var requestBody, response, serializedResponseData, responseError, responseData;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // We don't clear error or data, so it's up to the consumer to decide whether to display the
              // "old" error/data or loading state when a new request is in-flight.
              setIsLoading(true);
              requestBody = {
                path: path,
                method: method,
                query: query,
                body: body
              };
              _context2.next = 4;
              return sendRequest(httpClient, requestBody);

            case 4:
              response = _context2.sent;
              serializedResponseData = response.data, responseError = response.error; // If an outdated request has resolved, DON'T update state, but DO allow the processData handler
              // to execute side effects like update telemetry.

              if (!isOutdatedRequest) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", {
                data: null,
                error: null
              });

            case 8:
              setError(responseError);

              if (!responseError) {
                responseData = deserializer(serializedResponseData);
                setData(responseData);
              }

              setIsLoading(false);
              setIsInitialRequest(false); // If we're on an interval, we need to schedule the next request. This also allows us to reset
              // the interval if the user has manually requested the data, to avoid doubled-up requests.

              scheduleRequest();
              return _context2.abrupt("return", {
                data: serializedResponseData,
                error: responseError
              });

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function _sendRequest() {
      return _ref4.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    sendRequestRef.current = _sendRequest;
  }, [_sendRequest]);
  var stringifiedQuery = (0, _react.useMemo)(function () {
    return JSON.stringify(query);
  }, [query]);
  (0, _react.useEffect)(function () {
    var _sendRequestRef$curre2;

    ((_sendRequestRef$curre2 = sendRequestRef.current) !== null && _sendRequestRef$curre2 !== void 0 ? _sendRequestRef$curre2 : _sendRequest)(); // To be functionally correct we'd send a new request if the method, path, query or body changes.
    // But it doesn't seem likely that the method will change and body is likely to be a new
    // object even if its shape hasn't changed, so for now we're just watching the path and the query.
  }, [path, stringifiedQuery]);
  (0, _react.useEffect)(function () {
    scheduleRequest(); // Clean up intervals and inflight requests and corresponding state changes

    return function () {
      isOutdatedRequest = true;

      if (pollIntervalId.current) {
        clearTimeout(pollIntervalId.current);
      }
    };
  }, [pollIntervalMs]);
  return {
    isInitialRequest: isInitialRequest,
    isLoading: isLoading,
    error: error,
    data: data,
    sendRequest: (_sendRequestRef$curre3 = sendRequestRef.current) !== null && _sendRequestRef$curre3 !== void 0 ? _sendRequestRef$curre3 : _sendRequest // Gives the user the ability to manually request data

  };
};

exports.useRequest = useRequest;