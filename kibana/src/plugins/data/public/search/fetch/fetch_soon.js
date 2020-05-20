"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSoon = fetchSoon;

var _call_client = require("./call_client");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * This function introduces a slight delay in the request process to allow multiple requests to queue
 * up (e.g. when a dashboard is loading).
 */
function fetchSoon(_x, _x2, _x3) {
  return _fetchSoon.apply(this, arguments);
}
/**
 * Delays executing a function for a given amount of time, and returns a promise that resolves
 * with the result.
 * @param fn The function to invoke
 * @param ms The number of milliseconds to wait
 * @return Promise<any> A promise that resolves with the result of executing the function
 */


function _fetchSoon() {
  _fetchSoon = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(request, options, fetchHandlers) {
    var msToDelay;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msToDelay = fetchHandlers.config.get('courier:batchSearches') ? 50 : 0;
            return _context.abrupt("return", delayedFetch(request, options, fetchHandlers, msToDelay));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchSoon.apply(this, arguments);
}

function delay(fn, ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      return resolve(fn());
    }, ms);
  });
} // The current batch/queue of requests to fetch


var requestsToFetch = [];
var requestOptions = []; // The in-progress fetch (if there is one)

var fetchInProgress = null;
/**
 * Delay fetching for a given amount of time, while batching up the requests to be fetched.
 * Returns a promise that resolves with the response for the given request.
 * @param request The request to fetch
 * @param ms The number of milliseconds to wait (and batch requests)
 * @return Promise<SearchResponse> The response for the given request
 */

function delayedFetch(_x4, _x5, _x6, _x7) {
  return _delayedFetch.apply(this, arguments);
}

function _delayedFetch() {
  _delayedFetch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(request, options, fetchHandlers, ms) {
    var i, responses;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(ms === 0)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", (0, _call_client.callClient)([request], [options], fetchHandlers)[0]);

          case 2:
            i = requestsToFetch.length;
            requestsToFetch = [].concat(_toConsumableArray(requestsToFetch), [request]);
            requestOptions = [].concat(_toConsumableArray(requestOptions), [options]);
            _context2.next = 7;
            return fetchInProgress = fetchInProgress || delay(function () {
              var response = (0, _call_client.callClient)(requestsToFetch, requestOptions, fetchHandlers);
              requestsToFetch = [];
              requestOptions = [];
              fetchInProgress = null;
              return response;
            }, ms);

          case 7:
            responses = _context2.sent;
            return _context2.abrupt("return", responses[i]);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _delayedFetch.apply(this, arguments);
}