"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fetch = void 0;

var _lodash = require("lodash");

var _url = require("url");

var _rxjs = require("rxjs");

var _http_fetch_error = require("./http_fetch_error");

var _http_intercept_controller = require("./http_intercept_controller");

var _intercept = require("./intercept");

var _http_intercept_halt_error = require("./http_intercept_halt_error");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSON_CONTENT = /^(application\/(json|x-javascript)|text\/(x-)?javascript|x-json)(;.*)?$/;
var NDJSON_CONTENT = /^(application\/ndjson)(;.*)?$/;

var Fetch =
/*#__PURE__*/
function () {
  function Fetch(params) {
    var _this = this;

    _classCallCheck(this, Fetch);

    this.params = params;

    _defineProperty(this, "interceptors", new Set());

    _defineProperty(this, "requestCount$", new _rxjs.BehaviorSubject(0));

    _defineProperty(this, "delete", this.shorthand('DELETE'));

    _defineProperty(this, "get", this.shorthand('GET'));

    _defineProperty(this, "head", this.shorthand('HEAD'));

    _defineProperty(this, "options", this.shorthand('options'));

    _defineProperty(this, "patch", this.shorthand('PATCH'));

    _defineProperty(this, "post", this.shorthand('POST'));

    _defineProperty(this, "put", this.shorthand('PUT'));

    _defineProperty(this, "fetch",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(pathOrOptions, options) {
        var optionsWithPath, controller;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                optionsWithPath = validateFetchArguments(pathOrOptions, options);
                controller = new _http_intercept_controller.HttpInterceptController(); // We wrap the interception in a separate promise to ensure that when
                // a halt is called we do not resolve or reject, halting handling of the promise.

                return _context2.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(resolve, reject) {
                    var interceptedOptions, initialResponse, interceptedResponse;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;

                            _this.requestCount$.next(_this.requestCount$.value + 1);

                            _context.next = 4;
                            return (0, _intercept.interceptRequest)(optionsWithPath, _this.interceptors, controller);

                          case 4:
                            interceptedOptions = _context.sent;
                            initialResponse = _this.fetchResponse(interceptedOptions);
                            _context.next = 8;
                            return (0, _intercept.interceptResponse)(interceptedOptions, initialResponse, _this.interceptors, controller);

                          case 8:
                            interceptedResponse = _context.sent;

                            if (optionsWithPath.asResponse) {
                              resolve(interceptedResponse);
                            } else {
                              resolve(interceptedResponse.body);
                            }

                            _context.next = 15;
                            break;

                          case 12:
                            _context.prev = 12;
                            _context.t0 = _context["catch"](0);

                            if (!(_context.t0 instanceof _http_intercept_halt_error.HttpInterceptHaltError)) {
                              reject(_context.t0);
                            }

                          case 15:
                            _context.prev = 15;

                            _this.requestCount$.next(_this.requestCount$.value - 1);

                            return _context.finish(15);

                          case 18:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[0, 12, 15, 18]]);
                  }));

                  return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  _createClass(Fetch, [{
    key: "intercept",
    value: function intercept(interceptor) {
      var _this2 = this;

      this.interceptors.add(interceptor);
      return function () {
        _this2.interceptors.delete(interceptor);
      };
    }
  }, {
    key: "removeAllInterceptors",
    value: function removeAllInterceptors() {
      this.interceptors.clear();
    }
  }, {
    key: "getRequestCount$",
    value: function getRequestCount$() {
      return this.requestCount$.asObservable();
    }
  }, {
    key: "createRequest",
    value: function createRequest(options) {
      // Merge and destructure options out that are not applicable to the Fetch API.
      var _merge = (0, _lodash.merge)({
        method: 'GET',
        credentials: 'same-origin',
        prependBasePath: true
      }, options, {
        headers: _objectSpread({
          'Content-Type': 'application/json'
        }, options.headers, {
          'kbn-version': this.params.kibanaVersion
        })
      }),
          query = _merge.query,
          shouldPrependBasePath = _merge.prependBasePath,
          asResponse = _merge.asResponse,
          asSystemRequest = _merge.asSystemRequest,
          fetchOptions = _objectWithoutProperties(_merge, ["query", "prependBasePath", "asResponse", "asSystemRequest"]);

      var url = (0, _url.format)({
        pathname: shouldPrependBasePath ? this.params.basePath.prepend(options.path) : options.path,
        query: query
      }); // Make sure the system request header is only present if `asSystemRequest` is true.

      if (asSystemRequest) {
        fetchOptions.headers['kbn-system-request'] = 'true';
      }

      return new Request(url, fetchOptions);
    }
  }, {
    key: "fetchResponse",
    value: function () {
      var _fetchResponse = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(fetchOptions) {
        var request, response, body, _err$name, contentType, text, _err$name2;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                request = this.createRequest(fetchOptions);
                body = null;
                _context3.prev = 2;
                _context3.next = 5;
                return window.fetch(request);

              case 5:
                response = _context3.sent;
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);
                throw new _http_fetch_error.HttpFetchError(_context3.t0.message, (_err$name = _context3.t0.name) !== null && _err$name !== void 0 ? _err$name : 'Error', request);

              case 11:
                contentType = response.headers.get('Content-Type') || '';
                _context3.prev = 12;

                if (!NDJSON_CONTENT.test(contentType)) {
                  _context3.next = 19;
                  break;
                }

                _context3.next = 16;
                return response.blob();

              case 16:
                body = _context3.sent;
                _context3.next = 29;
                break;

              case 19:
                if (!JSON_CONTENT.test(contentType)) {
                  _context3.next = 25;
                  break;
                }

                _context3.next = 22;
                return response.json();

              case 22:
                body = _context3.sent;
                _context3.next = 29;
                break;

              case 25:
                _context3.next = 27;
                return response.text();

              case 27:
                text = _context3.sent;

                try {
                  body = JSON.parse(text);
                } catch (err) {
                  body = text;
                }

              case 29:
                _context3.next = 34;
                break;

              case 31:
                _context3.prev = 31;
                _context3.t1 = _context3["catch"](12);
                throw new _http_fetch_error.HttpFetchError(_context3.t1.message, (_err$name2 = _context3.t1.name) !== null && _err$name2 !== void 0 ? _err$name2 : 'Error', request, response, body);

              case 34:
                if (response.ok) {
                  _context3.next = 36;
                  break;
                }

                throw new _http_fetch_error.HttpFetchError(response.statusText, 'Error', request, response, body);

              case 36:
                return _context3.abrupt("return", {
                  fetchOptions: fetchOptions,
                  request: request,
                  response: response,
                  body: body
                });

              case 37:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 8], [12, 31]]);
      }));

      function fetchResponse(_x5) {
        return _fetchResponse.apply(this, arguments);
      }

      return fetchResponse;
    }()
  }, {
    key: "shorthand",
    value: function shorthand(method) {
      var _this3 = this;

      return function (pathOrOptions, options) {
        var optionsWithPath = validateFetchArguments(pathOrOptions, options);
        return _this3.fetch(_objectSpread({}, optionsWithPath, {
          method: method
        }));
      };
    }
  }]);

  return Fetch;
}();
/**
 * Ensure that the overloaded arguments to `HttpHandler` are valid.
 */


exports.Fetch = Fetch;

var validateFetchArguments = function validateFetchArguments(pathOrOptions, options) {
  var _fullOptions$headers;

  var fullOptions;

  if (typeof pathOrOptions === 'string' && (_typeof(options) === 'object' || options === undefined)) {
    fullOptions = _objectSpread({}, options, {
      path: pathOrOptions
    });
  } else if (_typeof(pathOrOptions) === 'object' && options === undefined) {
    fullOptions = pathOrOptions;
  } else {
    throw new Error("Invalid fetch arguments, must either be (string, object) or (object, undefined), received (".concat(_typeof(pathOrOptions), ", ").concat(_typeof(options), ")"));
  }

  var invalidHeaders = Object.keys((_fullOptions$headers = fullOptions.headers) !== null && _fullOptions$headers !== void 0 ? _fullOptions$headers : {}).filter(function (headerName) {
    return headerName.startsWith('kbn-');
  });

  if (invalidHeaders.length) {
    throw new Error("Invalid fetch headers, headers beginning with \"kbn-\" are not allowed: [".concat(invalidHeaders.join(','), "]"));
  }

  return fullOptions;
};