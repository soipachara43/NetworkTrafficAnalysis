"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStreamingBatchedFunction = void 0;

var _public = require("../../../kibana_utils/public");

var _common = require("../../common");

var _streaming = require("../streaming");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Returns a function that does not execute immediately but buffers the call internally until
 * `params.flushOnMaxItems` is reached or after `params.maxItemAge` timeout in milliseconds is reached. Once
 * one of those thresholds is reached all buffered calls are sent in one batch to the
 * server using `params.fetchStreaming` in a POST request. Responses are streamed back
 * and each batch item is resolved once corresponding response is received.
 */
var createStreamingBatchedFunction = function createStreamingBatchedFunction(params) {
  var url = params.url,
      _params$fetchStreamin = params.fetchStreaming,
      fetchStreamingInjected = _params$fetchStreamin === void 0 ? _streaming.fetchStreaming : _params$fetchStreamin,
      _params$flushOnMaxIte = params.flushOnMaxItems,
      flushOnMaxItems = _params$flushOnMaxIte === void 0 ? 25 : _params$flushOnMaxIte,
      _params$maxItemAge = params.maxItemAge,
      maxItemAge = _params$maxItemAge === void 0 ? 10 : _params$maxItemAge;

  var _createBatchedFunctio = (0, _common.createBatchedFunction)({
    onCall: function onCall(payload) {
      var future = (0, _public.defer)();
      var entry = {
        payload: payload,
        future: future
      };
      return [future.promise, entry];
    },
    onBatch: function () {
      var _onBatch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(items) {
        var responsesReceived, batch, _fetchStreamingInject, stream, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                responsesReceived = 0;
                batch = items.map(function (_ref) {
                  var payload = _ref.payload;
                  return payload;
                });
                _fetchStreamingInject = fetchStreamingInjected({
                  url: url,
                  body: JSON.stringify({
                    batch: batch
                  }),
                  method: 'POST'
                }), stream = _fetchStreamingInject.stream;
                stream.pipe((0, _streaming.split)('\n')).subscribe({
                  next: function next(json) {
                    var response = JSON.parse(json);

                    if (response.error) {
                      responsesReceived++;
                      items[response.id].future.reject(response.error);
                    } else if (response.result) {
                      responsesReceived++;
                      items[response.id].future.resolve(response.result);
                    }
                  },
                  error: function error(_error) {
                    var normalizedError = (0, _common.normalizeError)(_error);
                    normalizedError.code = 'STREAM';
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var future = _step.value.future;
                        future.reject(normalizedError);
                      }
                    } catch (err) {
                      _didIteratorError = true;
                      _iteratorError = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                          _iterator.return();
                        }
                      } finally {
                        if (_didIteratorError) {
                          throw _iteratorError;
                        }
                      }
                    }
                  },
                  complete: function complete() {
                    var streamTerminatedPrematurely = responsesReceived !== items.length;

                    if (streamTerminatedPrematurely) {
                      var error = {
                        message: 'Connection terminated prematurely.',
                        code: 'CONNECTION'
                      };
                      var _iteratorNormalCompletion2 = true;
                      var _didIteratorError2 = false;
                      var _iteratorError2 = undefined;

                      try {
                        for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                          var future = _step2.value.future;
                          future.reject(error);
                        }
                      } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                      } finally {
                        try {
                          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                            _iterator2.return();
                          }
                        } finally {
                          if (_didIteratorError2) {
                            throw _iteratorError2;
                          }
                        }
                      }
                    }
                  }
                });
                _context.next = 7;
                return stream.toPromise();

              case 7:
                _context.next = 30;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 14;

                for (_iterator3 = items[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  item = _step3.value;
                  item.future.reject(_context.t0);
                }

                _context.next = 22;
                break;

              case 18:
                _context.prev = 18;
                _context.t1 = _context["catch"](14);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t1;

              case 22:
                _context.prev = 22;
                _context.prev = 23;

                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }

              case 25:
                _context.prev = 25;

                if (!_didIteratorError3) {
                  _context.next = 28;
                  break;
                }

                throw _iteratorError3;

              case 28:
                return _context.finish(25);

              case 29:
                return _context.finish(22);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9], [14, 18, 22, 30], [23,, 25, 29]]);
      }));

      function onBatch(_x) {
        return _onBatch.apply(this, arguments);
      }

      return onBatch;
    }(),
    flushOnMaxItems: flushOnMaxItems,
    maxItemAge: maxItemAge
  }),
      _createBatchedFunctio2 = _slicedToArray(_createBatchedFunctio, 1),
      fn = _createBatchedFunctio2[0];

  return fn;
};

exports.createStreamingBatchedFunction = createStreamingBatchedFunction;