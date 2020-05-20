"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interceptRequest = interceptRequest;
exports.interceptResponse = interceptResponse;

var _http_intercept_halt_error = require("./http_intercept_halt_error");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function interceptRequest(_x, _x2, _x3) {
  return _interceptRequest.apply(this, arguments);
}

function _interceptRequest() {
  _interceptRequest = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(options, interceptors, controller) {
    var current;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _toConsumableArray(interceptors).reduceRight(function (promise, interceptor) {
              return promise.then(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(fetchOptions) {
                  var overrides;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          current = fetchOptions;
                          checkHalt(controller);

                          if (interceptor.request) {
                            _context.next = 4;
                            break;
                          }

                          return _context.abrupt("return", fetchOptions);

                        case 4:
                          _context.next = 6;
                          return interceptor.request(current, controller);

                        case 6:
                          overrides = _context.sent;
                          return _context.abrupt("return", _objectSpread({}, current, {}, overrides));

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x8) {
                  return _ref.apply(this, arguments);
                };
              }(),
              /*#__PURE__*/
              function () {
                var _ref2 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2(error) {
                  var overrides;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          checkHalt(controller, error);

                          if (interceptor.requestError) {
                            _context2.next = 3;
                            break;
                          }

                          throw error;

                        case 3:
                          _context2.next = 5;
                          return interceptor.requestError({
                            error: error,
                            fetchOptions: current
                          }, controller);

                        case 5:
                          overrides = _context2.sent;

                          if (overrides) {
                            _context2.next = 8;
                            break;
                          }

                          throw error;

                        case 8:
                          current = _objectSpread({}, current, {}, overrides);
                          return _context2.abrupt("return", current);

                        case 10:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x9) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }, Promise.resolve(options)));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _interceptRequest.apply(this, arguments);
}

function interceptResponse(_x4, _x5, _x6, _x7) {
  return _interceptResponse.apply(this, arguments);
}

function _interceptResponse() {
  _interceptResponse = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(fetchOptions, responsePromise, interceptors, controller) {
    var current;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _toConsumableArray(interceptors).reduce(function (promise, interceptor) {
              return promise.then(
              /*#__PURE__*/
              function () {
                var _ref3 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee4(httpResponse) {
                  var interceptorOverrides;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          current = httpResponse;
                          checkHalt(controller);

                          if (interceptor.response) {
                            _context4.next = 4;
                            break;
                          }

                          return _context4.abrupt("return", httpResponse);

                        case 4:
                          _context4.next = 6;
                          return interceptor.response(httpResponse, controller);

                        case 6:
                          _context4.t0 = _context4.sent;

                          if (_context4.t0) {
                            _context4.next = 9;
                            break;
                          }

                          _context4.t0 = {};

                        case 9:
                          interceptorOverrides = _context4.t0;
                          return _context4.abrupt("return", _objectSpread({}, httpResponse, {}, interceptorOverrides));

                        case 11:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x10) {
                  return _ref3.apply(this, arguments);
                };
              }(),
              /*#__PURE__*/
              function () {
                var _ref4 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee5(error) {
                  var request, next;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          request = error.request || current && current.request;
                          checkHalt(controller, error);

                          if (interceptor.responseError) {
                            _context5.next = 4;
                            break;
                          }

                          throw error;

                        case 4:
                          _context5.prev = 4;
                          _context5.next = 7;
                          return interceptor.responseError({
                            error: error,
                            fetchOptions: fetchOptions,
                            request: request,
                            response: error.response || current && current.response,
                            body: error.body || current && current.body
                          }, controller);

                        case 7:
                          next = _context5.sent;
                          checkHalt(controller, error);

                          if (next) {
                            _context5.next = 11;
                            break;
                          }

                          throw error;

                        case 11:
                          return _context5.abrupt("return", _objectSpread({}, next, {
                            request: request,
                            fetchOptions: fetchOptions
                          }));

                        case 14:
                          _context5.prev = 14;
                          _context5.t0 = _context5["catch"](4);
                          checkHalt(controller, _context5.t0);
                          throw _context5.t0;

                        case 18:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, null, [[4, 14]]);
                }));

                return function (_x11) {
                  return _ref4.apply(this, arguments);
                };
              }());
            }, responsePromise);

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _interceptResponse.apply(this, arguments);
}

function checkHalt(controller, error) {
  if (error instanceof _http_intercept_halt_error.HttpInterceptHaltError) {
    throw error;
  } else if (controller.halted) {
    throw new _http_intercept_halt_error.HttpInterceptHaltError();
  }
}