"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiService = void 0;

var _PathReporter = require("io-ts/lib/PathReporter");

var _Either = require("fp-ts/lib/Either");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ApiService =
/*#__PURE__*/
function () {
  _createClass(ApiService, [{
    key: "http",
    get: function get() {
      return this._http;
    },
    set: function set(httpSetup) {
      this._http = httpSetup;
    }
  }]);

  function ApiService() {
    _classCallCheck(this, ApiService);

    _defineProperty(this, "_http", void 0);
  }

  _createClass(ApiService, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(apiUrl, params, decodeType) {
        var response, decoded;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._http.get(apiUrl, {
                  query: params
                });

              case 2:
                response = _context.sent;

                if (!decodeType) {
                  _context.next = 10;
                  break;
                }

                decoded = decodeType.decode(response);

                if (!(0, _Either.isRight)(decoded)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", decoded.right);

              case 9:
                // eslint-disable-next-line no-console
                console.error("API ".concat(apiUrl, " is not returning expected response, ").concat(_PathReporter.PathReporter.report(decoded)));

              case 10:
                return _context.abrupt("return", response);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2, _x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(apiUrl, data, decodeType) {
        var response, decoded;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._http.post(apiUrl, {
                  method: 'POST',
                  body: JSON.stringify(data)
                });

              case 2:
                response = _context2.sent;

                if (!decodeType) {
                  _context2.next = 10;
                  break;
                }

                decoded = decodeType.decode(response);

                if (!(0, _Either.isRight)(decoded)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", decoded.right);

              case 9:
                // eslint-disable-next-line no-console
                console.warn("API ".concat(apiUrl, " is not returning expected response, ").concat(_PathReporter.PathReporter.report(decoded)));

              case 10:
                return _context2.abrupt("return", response);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x4, _x5, _x6) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(apiUrl) {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._http.delete(apiUrl);

              case 2:
                response = _context3.sent;

                if (!(response instanceof Error)) {
                  _context3.next = 5;
                  break;
                }

                throw response;

              case 5:
                return _context3.abrupt("return", response);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x7) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!ApiService.instance) {
        ApiService.instance = new ApiService();
      }

      return ApiService.instance;
    }
  }]);

  return ApiService;
}();

_defineProperty(ApiService, "instance", void 0);

var apiService = ApiService.getInstance();
exports.apiService = apiService;